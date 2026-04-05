import { execFileSync } from "node:child_process";
import path from "node:path";
import {
  readBaselineSnapshot,
  writeFailureArtifact,
  writeFixReportArtifact,
  writeLatestReviewPacket,
} from "../harness/artifacts.ts";
import { evaluateAllowlist } from "../harness/allowlist.ts";
import { executeDeclaredBrowserChecks, type BrowserExecutionEnvironment } from "../harness/browser-execution.ts";
import { resolveNextUnit } from "../harness/dependencies.ts";
import { acquireProgramLock, releaseProgramLock } from "../harness/lockfile.ts";
import { runPreflight, type PreflightEnvironment } from "../harness/preflight.ts";
import { createPromptPayload, PROMPT_TEMPLATE_VERSION } from "../harness/prompt.ts";
import { assertValidProgramDefinition } from "../harness/registry.ts";
import { writeRuntimeStatusSection } from "../harness/status.ts";
import { readTrackerState, upsertTrackerEntry, writeTrackerState } from "../harness/tracker.ts";
import { createClaudeRunner } from "../runners/claude.ts";
import { createCodexRunner } from "../runners/codex.ts";
import { createFakeRunner } from "../runners/fake.ts";
import type { RemediationRunner } from "../runners/adapter.ts";
import type {
  BaselineComparatorResult,
  FailureArtifact,
  FixReportArtifact,
  RemediationProgramDefinition,
  RemediationRuntimeResult,
  RemediationTrackerEntry,
  RemediationUnit,
  ReviewPacket,
  RunnerAdapterName,
  RunnerExecutionResult,
} from "../types.ts";
import { compareToBaseline } from "../validators/baseline.ts";
import { runBrowserValidator } from "../validators/browser.ts";
import type { CommandExecutor } from "../validators/command.ts";
import { runBuildValidator } from "../validators/build.ts";
import { runLintValidator } from "../validators/lint.ts";
import { runTestValidator } from "../validators/test.ts";
import { runVisualValidator } from "../validators/visual.ts";
import { resolveUnitPolicies } from "../harness/policies.ts";

const MAX_VALIDATION_RETRIES = 2;

interface WorktreeSnapshot {
  changedFiles: string[];
  worktreeState: FailureArtifact["worktreeState"];
}

interface RunUnitEnvironment extends PreflightEnvironment {
  now?: Date;
  pid?: number;
  allowStale?: boolean;
  runner?: RemediationRunner;
  runnerOverride?: RunnerAdapterName;
  preflightLintExecutor?: CommandExecutor;
  preflightBuildExecutor?: CommandExecutor;
  lintExecutor?: CommandExecutor;
  buildExecutor?: CommandExecutor;
  testExecutor?: CommandExecutor;
  browserCommandExecutor?: BrowserExecutionEnvironment["commandExecutor"];
  browserSessionName?: BrowserExecutionEnvironment["sessionName"];
  getWorktreeSnapshot?: (cwd: string) => WorktreeSnapshot;
  stageFiles?: (cwd: string, changedFiles: string[]) => void;
}

export interface RunUnitResult {
  runtime: RemediationRuntimeResult;
  unit: Pick<RemediationUnit, "id" | "title" | "type" | "wave" | "branch">;
  draftCommitMessage?: string;
  fixReportPath?: string;
  failureArtifactPath?: string;
  reviewPacketPath?: string;
  baselineSnapshotPath?: string;
}

function createRunId(unitId: string, now: Date): string {
  return `${unitId.toLowerCase()}-${now.toISOString().replace(/[:.]/g, "-")}`;
}

function getAttemptNumber(entries: RemediationTrackerEntry[], unitId: string): number {
  const currentEntry = entries.find((entry) => entry.unitId === unitId);
  return (currentEntry?.attemptCount ?? 0) + 1;
}

function resolvePreviewNextUnitId(
  definition: RemediationProgramDefinition,
  entries: RemediationTrackerEntry[],
  unitId: string,
  attemptNumber: number,
): string | undefined {
  const previewResolution = resolveNextUnit(
    definition,
    upsertTrackerEntry(entries, {
      unitId,
      state: "fixed",
      attemptCount: attemptNumber,
      commitSha: "pending-approval",
    }),
  );

  return previewResolution.nextUnit?.id;
}

function createDraftCommitMessage(
  unit: RemediationUnit,
  runId: string,
  provenanceRequired: boolean,
): string {
  const subject = `Fix ${unit.id}: ${unit.title}`;

  if (!provenanceRequired) {
    return subject;
  }

  return [
    subject,
    "",
    `Remediation-Run-Id: ${runId}`,
    `Prompt-Template-Version: ${PROMPT_TEMPLATE_VERSION}`,
  ].join("\n");
}

function defaultStageFiles(cwd: string, changedFiles: string[]) {
  if (changedFiles.length === 0) {
    return;
  }

  execFileSync("git", ["add", "--", ...changedFiles], {
    cwd,
    stdio: ["ignore", "ignore", "pipe"],
  });
}

function defaultGetWorktreeSnapshot(cwd: string): WorktreeSnapshot {
  try {
    const output = execFileSync("git", ["status", "--porcelain"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (!output) {
      return {
        changedFiles: [],
        worktreeState: "clean",
      };
    }

    let hasStagedChanges = false;
    let hasUnstagedChanges = false;
    const changedFiles = output
      .split(/\r?\n/)
      .map((line) => {
        const staged = line[0] && line[0] !== " " && line[0] !== "?";
        const unstaged = line[1] && line[1] !== " ";
        hasStagedChanges ||= Boolean(staged);
        hasUnstagedChanges ||= Boolean(unstaged);

        const rawPath = line.slice(3).trim();
        return rawPath.includes(" -> ") ? rawPath.split(" -> ").at(-1) ?? rawPath : rawPath;
      })
      .filter(Boolean);

    return {
      changedFiles,
      worktreeState: hasStagedChanges ? "staged" : hasUnstagedChanges ? "unstaged" : "clean",
    };
  } catch {
    return {
      changedFiles: [],
      worktreeState: "clean",
    };
  }
}

function collectFailingChecks(
  allowlistOk: boolean,
  runnerResult: RunnerExecutionResult,
  validators: Array<{
    name: string;
    ok: boolean;
  }>,
  baselineResult?: BaselineComparatorResult,
  unexpectedVisualChange?: boolean,
): string[] {
  const failingChecks: string[] = [];

  if (runnerResult.status !== "completed") {
    failingChecks.push(`runner:${runnerResult.status}`);
  }

  if (!allowlistOk) {
    failingChecks.push("allowlist");
  }

  for (const validator of validators) {
    if (!validator.ok) {
      failingChecks.push(validator.name);
    }
  }

  if (baselineResult && !baselineResult.ok) {
    failingChecks.push("baseline");
  }

  if (unexpectedVisualChange) {
    failingChecks.push("visual-surface-change");
  }

  return failingChecks;
}

function summarizeFailure(
  unit: RemediationUnit,
  runnerResult: RunnerExecutionResult,
  failingChecks: string[],
  attemptNumber: number,
  attemptBudget: number,
): string {
  const budgetNote =
    attemptNumber >= attemptBudget
      ? ` Attempt budget ${attemptBudget} reached; the unit should be blocked for human intervention.`
      : "";

  return `${unit.id} failed: ${runnerResult.summary}${failingChecks.length > 0 ? ` Failing checks: ${failingChecks.join(", ")}.` : ""}${budgetNote}`;
}

function withValidationRetries<T extends { ok: boolean }>(
  run: () => T,
): { result: T; retryCount: number } {
  let result = run();
  let retryCount = 0;

  while (!result.ok && retryCount < MAX_VALIDATION_RETRIES) {
    retryCount += 1;
    result = run();
  }

  return { result, retryCount };
}

function createFailureRuntimeResult(
  definition: RemediationProgramDefinition,
  unit: RemediationUnit,
  runId: string,
  runnerName: RunnerAdapterName,
  mode: RemediationRuntimeResult["mode"],
  attemptNumber: number,
  changedFiles: string[],
  validationRetryCount: number,
  promptTemplateVersion: string,
  finalState: RemediationRuntimeResult["finalState"],
  nextUnit: string | undefined,
  data: {
    allowlistOk?: boolean;
    lintOk?: boolean;
    buildOk?: boolean;
    testOk?: boolean;
    browserOk?: boolean;
    visualRegressionOk?: boolean;
    reportWritten?: boolean;
    trackerUpdated?: boolean;
    statusUpdated?: boolean;
    visualSurfaceChanged?: boolean;
  } = {},
): RemediationRuntimeResult {
  return {
    programId: definition.program.programId,
    unitId: unit.id,
    runId,
    runner: runnerName,
    mode,
    attemptNumber,
    validationRetryCount,
    changedFiles,
    allowlistOk: data.allowlistOk ?? true,
    lintOk: data.lintOk ?? false,
    buildOk: data.buildOk ?? false,
    testOk: data.testOk ?? !unit.requiresTests,
    browserOk: data.browserOk ?? !unit.requiresBrowserValidation,
    visualRegressionOk: data.visualRegressionOk ?? !unit.requiresVisualRegression,
    reportWritten: data.reportWritten ?? false,
    trackerUpdated: data.trackerUpdated ?? false,
    statusUpdated: data.statusUpdated ?? false,
    staged: false,
    commitApproved: false,
    promptTemplateVersion,
    visualSurfaceChanged: data.visualSurfaceChanged ?? false,
    finalState,
    nextUnit,
  };
}

function resolveRunner(
  adapterName: RunnerAdapterName,
  environment: RunUnitEnvironment,
): RemediationRunner {
  if (environment.runner) {
    return environment.runner;
  }

  if (adapterName === "codex") {
    return createCodexRunner();
  }

  if (adapterName === "claude") {
    return createClaudeRunner();
  }

  return createFakeRunner();
}

export function runSingleRemediationUnit(
  definition: RemediationProgramDefinition,
  cwd: string,
  environment: RunUnitEnvironment = {},
): RunUnitResult {
  assertValidProgramDefinition(definition, cwd);
  const preflight = runPreflight(definition, cwd, {
    ...environment,
    allowStale: environment.allowStale,
    lintExecutor: environment.preflightLintExecutor ?? environment.lintExecutor,
    buildExecutor: environment.preflightBuildExecutor ?? environment.buildExecutor,
  });

  if (!preflight.ok) {
    throw new Error("Preflight failed; the orchestrator cannot start.");
  }

  const trackerState = readTrackerState(definition, cwd);
  const resolution = resolveNextUnit(definition, trackerState.tracker.entries);

  if (!resolution.nextUnit) {
    throw new Error(
      resolution.isComplete
        ? "Program is complete; no remediation unit remains."
        : "No eligible remediation unit could be selected for execution.",
    );
  }

  const unit = resolution.nextUnit;
  const payload = createPromptPayload(definition, unit);
  const policies = resolveUnitPolicies(definition.program, unit);
  const runnerName = environment.runnerOverride ?? policies.runnerPolicy.adapter ?? "fake";
  const runner = resolveRunner(runnerName, environment);
  const now = environment.now ?? new Date();
  const runId = createRunId(unit.id, now);
  const attemptNumber = getAttemptNumber(trackerState.tracker.entries, unit.id);
  const previewNextUnit = resolvePreviewNextUnitId(
    definition,
    trackerState.tracker.entries,
    unit.id,
    attemptNumber,
  );

  acquireProgramLock(
    definition,
    cwd,
    {
      unitId: unit.id,
      wave: unit.wave,
      runner: runner.adapter,
      pid: environment.pid ?? process.pid,
      timestamp: now.toISOString(),
    },
    {
      now,
      isProcessAlive: environment.isProcessAlive,
      staleAfterMs: environment.staleAfterMs,
    },
  );

  try {
    const runnerResult = runner.run({
      cwd,
      definition,
      unit,
      payload,
      runId,
      attemptNumber,
    });
    const worktreeSnapshot = environment.getWorktreeSnapshot?.(cwd) ?? defaultGetWorktreeSnapshot(cwd);
    const changedFiles =
      worktreeSnapshot.changedFiles.length > 0
        ? worktreeSnapshot.changedFiles
        : [...new Set(runnerResult.changedFiles)];
    const allowlistResult = evaluateAllowlist(changedFiles, unit.allowedFiles);
    const visualSurfaceChanged = Boolean(
      runnerResult.visualSurfaceChanged
      || runnerResult.visualObservations?.some((observation) => observation.changed),
    );

    if (runnerResult.status !== "completed") {
      const finalState =
        runnerResult.status === "crashed"
          ? "crashed"
          : attemptNumber >= policies.attemptBudget
            ? "blocked"
            : runnerResult.status === "malformed-output"
              ? "invalid"
              : "failed";
      const failingChecks = collectFailingChecks(allowlistResult.ok, runnerResult, []);
      const failureArtifactPath = writeFailureArtifact(definition, cwd, {
        programId: definition.program.programId,
        unitId: unit.id,
        timestamp: now.toISOString(),
        runner: runner.adapter,
        changedFiles: allowlistResult.changedFiles,
        failingChecks,
        summary: summarizeFailure(unit, runnerResult, failingChecks, attemptNumber, policies.attemptBudget),
        agentAttemptCount: attemptNumber,
        validationRetryCount: 0,
        worktreeState: worktreeSnapshot.worktreeState,
        promptTemplateVersion: payload.templateVersion,
      });
      const trackerEntries = upsertTrackerEntry(trackerState.tracker.entries, {
        unitId: unit.id,
        state: finalState === "blocked" ? "blocked" : "in-progress",
        attemptCount: attemptNumber,
        lastRunId: runId,
        ...(finalState === "blocked"
          ? {
              blockedReason: runnerResult.summary,
              unblockAction: `Review the ${runnerResult.status} failure for ${unit.id} before retrying.`,
            }
          : {
              notes: runnerResult.summary,
            }),
      });
      writeTrackerState(definition, cwd, {
        programId: definition.program.programId,
        entries: trackerEntries,
      });
      writeRuntimeStatusSection(definition, cwd, {
        runId,
        unitId: unit.id,
        title: unit.title,
        runner: runner.adapter,
        attemptNumber,
        finalState,
        nextUnit: previewNextUnit,
        artifactPaths: [path.relative(cwd, failureArtifactPath)],
        updatedAt: now.toISOString(),
      });

      return {
        runtime: createFailureRuntimeResult(
          definition,
          unit,
          runId,
          runner.adapter,
          policies.runnerPolicy.mode,
          attemptNumber,
          allowlistResult.changedFiles,
          0,
          payload.templateVersion,
          finalState,
          previewNextUnit,
          {
            allowlistOk: allowlistResult.ok,
            reportWritten: true,
            trackerUpdated: true,
            statusUpdated: true,
            visualSurfaceChanged,
          },
        ),
        unit,
        failureArtifactPath,
        baselineSnapshotPath: preflight.baselineSnapshotPath,
      };
    }

    const unexpectedVisualChange =
      visualSurfaceChanged
      && !unit.requiresVisualRegression
      && policies.visualPolicy.failOnUnexpectedChange;

    if (!allowlistResult.ok || unexpectedVisualChange) {
      const failingChecks = collectFailingChecks(
        allowlistResult.ok,
        runnerResult,
        [],
        undefined,
        unexpectedVisualChange,
      );
      const finalState = attemptNumber >= policies.attemptBudget ? "blocked" : "invalid";
      const failureArtifactPath = writeFailureArtifact(definition, cwd, {
        programId: definition.program.programId,
        unitId: unit.id,
        timestamp: now.toISOString(),
        runner: runner.adapter,
        changedFiles: allowlistResult.changedFiles,
        failingChecks,
        summary: !allowlistResult.ok
          ? `${unit.id} touched disallowed files: ${allowlistResult.disallowedFiles.join(", ")}.`
          : `${unit.id} reported a visual surface change outside the permitted scope.`,
        agentAttemptCount: attemptNumber,
        validationRetryCount: 0,
        worktreeState: worktreeSnapshot.worktreeState,
        promptTemplateVersion: payload.templateVersion,
      });
      const trackerEntries = upsertTrackerEntry(trackerState.tracker.entries, {
        unitId: unit.id,
        state: finalState === "blocked" ? "blocked" : "in-progress",
        attemptCount: attemptNumber,
        lastRunId: runId,
        ...(finalState === "blocked"
          ? {
              blockedReason: !allowlistResult.ok
                ? `Disallowed files changed: ${allowlistResult.disallowedFiles.join(", ")}`
                : "Unexpected visual surface change reported.",
              unblockAction: !allowlistResult.ok
                ? `Rewrite ${unit.id} so it only touches the declared allowlist.`
                : `Constrain ${unit.id} to preserve appearance or reclassify the unit.`,
            }
          : {
              notes: !allowlistResult.ok
                ? `Disallowed files changed: ${allowlistResult.disallowedFiles.join(", ")}`
                : "Unexpected visual surface change reported.",
            }),
      });
      writeTrackerState(definition, cwd, {
        programId: definition.program.programId,
        entries: trackerEntries,
      });
      writeRuntimeStatusSection(definition, cwd, {
        runId,
        unitId: unit.id,
        title: unit.title,
        runner: runner.adapter,
        attemptNumber,
        finalState,
        nextUnit: previewNextUnit,
        artifactPaths: [path.relative(cwd, failureArtifactPath)],
        updatedAt: now.toISOString(),
      });

      return {
        runtime: createFailureRuntimeResult(
          definition,
          unit,
          runId,
          runner.adapter,
          policies.runnerPolicy.mode,
          attemptNumber,
          allowlistResult.changedFiles,
          0,
          payload.templateVersion,
          finalState,
          previewNextUnit,
          {
            allowlistOk: allowlistResult.ok,
            reportWritten: true,
            trackerUpdated: true,
            statusUpdated: true,
            visualSurfaceChanged,
          },
        ),
        unit,
        failureArtifactPath,
        baselineSnapshotPath: preflight.baselineSnapshotPath,
      };
    }

    const lintRun = withValidationRetries(() =>
      runLintValidator(cwd, {
        executor: environment.lintExecutor,
      }),
    );
    const buildRun = withValidationRetries(() =>
      runBuildValidator(cwd, {
        executor: environment.buildExecutor,
      }),
    );
    const testRun = withValidationRetries(() =>
      runTestValidator(cwd, {
        required: unit.requiresTests,
        executor: environment.testExecutor,
      }),
    );
    const browserObservations = preflight.devServer?.url
      ? executeDeclaredBrowserChecks(cwd, unit, preflight.devServer.url, {
          commandExecutor: environment.browserCommandExecutor,
          sessionName: environment.browserSessionName,
        })
      : runnerResult.browserObservations;
    const browserResult = runBrowserValidator({
      required: unit.requiresBrowserValidation,
      checks: unit.browserChecks,
      observations: browserObservations,
    });
    const visualResult = runVisualValidator({
      required: unit.requiresVisualRegression,
      routes: unit.baselineRoutes,
      viewports: definition.program.baselineConfig.defaultViewports,
      visualPolicy: policies.visualPolicy,
      observations: runnerResult.visualObservations,
    });
    const baselineSnapshot = readBaselineSnapshot(definition, cwd);

    if (!baselineSnapshot) {
      throw new Error("Baseline snapshot is missing after preflight completed.");
    }

    const baselineResult = compareToBaseline({
      program: definition.program,
      baseline: baselineSnapshot,
      lintResult: lintRun.result,
      buildResult: buildRun.result,
    });
    const validationRetryCount = lintRun.retryCount + buildRun.retryCount + testRun.retryCount;
    const allValidatorsPassed =
      lintRun.result.ok
      && buildRun.result.ok
      && testRun.result.ok
      && browserResult.ok
      && visualResult.ok
      && baselineResult.ok;

    if (!allValidatorsPassed) {
      const finalState = attemptNumber >= policies.attemptBudget ? "blocked" : "failed";
      const failingChecks = collectFailingChecks(
        allowlistResult.ok,
        runnerResult,
        [
          { name: "lint", ok: lintRun.result.ok },
          { name: "build", ok: buildRun.result.ok },
          { name: "test", ok: testRun.result.ok },
          { name: "browser", ok: browserResult.ok },
          { name: "visual", ok: visualResult.ok },
        ],
        baselineResult,
      );
      const failureArtifactPath = writeFailureArtifact(definition, cwd, {
        programId: definition.program.programId,
        unitId: unit.id,
        timestamp: now.toISOString(),
        runner: runner.adapter,
        changedFiles: allowlistResult.changedFiles,
        failingChecks,
        summary: summarizeFailure(unit, runnerResult, failingChecks, attemptNumber, policies.attemptBudget),
        agentAttemptCount: attemptNumber,
        validationRetryCount,
        worktreeState: worktreeSnapshot.worktreeState,
        promptTemplateVersion: payload.templateVersion,
      });
      const trackerEntries = upsertTrackerEntry(trackerState.tracker.entries, {
        unitId: unit.id,
        state: finalState === "blocked" ? "blocked" : "in-progress",
        attemptCount: attemptNumber,
        lastRunId: runId,
        ...(finalState === "blocked"
          ? {
              blockedReason: `Validation failed for ${unit.id}: ${failingChecks.join(", ")}`,
              unblockAction: `Review the validation failures for ${unit.id} before retrying.`,
            }
          : {
              notes: `Validation failed: ${failingChecks.join(", ")}`,
            }),
      });
      writeTrackerState(definition, cwd, {
        programId: definition.program.programId,
        entries: trackerEntries,
      });
      writeRuntimeStatusSection(definition, cwd, {
        runId,
        unitId: unit.id,
        title: unit.title,
        runner: runner.adapter,
        attemptNumber,
        finalState,
        nextUnit: previewNextUnit,
        artifactPaths: [path.relative(cwd, failureArtifactPath)],
        updatedAt: now.toISOString(),
      });

      return {
        runtime: createFailureRuntimeResult(
          definition,
          unit,
          runId,
          runner.adapter,
          policies.runnerPolicy.mode,
          attemptNumber,
          allowlistResult.changedFiles,
          validationRetryCount,
          payload.templateVersion,
          finalState,
          previewNextUnit,
          {
            allowlistOk: allowlistResult.ok,
            lintOk: lintRun.result.ok,
            buildOk: buildRun.result.ok,
            testOk: testRun.result.ok,
            browserOk: browserResult.ok,
            visualRegressionOk: visualResult.ok,
            reportWritten: true,
            trackerUpdated: true,
            statusUpdated: true,
            visualSurfaceChanged: visualResult.visualSurfaceChanged || visualSurfaceChanged,
          },
        ),
        unit,
        failureArtifactPath,
        baselineSnapshotPath: preflight.baselineSnapshotPath,
      };
    }

    const fixReportArtifact: FixReportArtifact = {
      programId: definition.program.programId,
      unitId: unit.id,
      runId,
      title: unit.title,
      summary: runnerResult.summary,
      changedFiles: allowlistResult.changedFiles,
      validation: {
        allowlistOk: allowlistResult.ok,
        lintOk: lintRun.result.ok,
        buildOk: buildRun.result.ok,
        testOk: testRun.result.ok,
        browserOk: browserResult.ok,
        visualRegressionOk: visualResult.ok,
        visualSurfaceChanged: visualResult.visualSurfaceChanged || visualSurfaceChanged,
      },
      artifactPath: unit.fixReportPath,
    };
    const fixReportPath = writeFixReportArtifact(definition, cwd, fixReportArtifact);
    const trackerEntries = upsertTrackerEntry(trackerState.tracker.entries, {
      unitId: unit.id,
      state: "in-progress",
      attemptCount: attemptNumber,
      lastRunId: runId,
      notes: "Validated and awaiting approval before commit.",
    });
    writeTrackerState(definition, cwd, {
      programId: definition.program.programId,
      entries: trackerEntries,
    });
    writeRuntimeStatusSection(definition, cwd, {
      runId,
      unitId: unit.id,
      title: unit.title,
      runner: runner.adapter,
      attemptNumber,
      finalState: "passed",
      nextUnit: previewNextUnit,
      artifactPaths: [
        path.relative(cwd, preflight.baselineSnapshotPath ?? ""),
        path.relative(cwd, fixReportPath),
      ].filter(Boolean),
      updatedAt: now.toISOString(),
    });

    (environment.stageFiles ?? defaultStageFiles)(cwd, allowlistResult.changedFiles);

    const draftCommitMessage = createDraftCommitMessage(
      unit,
      runId,
      policies.commitPolicy.provenanceRequired,
    );
    const reviewPacket: ReviewPacket = {
      programId: definition.program.programId,
      unitId: unit.id,
      runId,
      wave: unit.wave,
      title: unit.title,
      type: unit.type,
      filesChanged: allowlistResult.changedFiles,
      visualSurfaceChanged: visualResult.visualSurfaceChanged || visualSurfaceChanged,
      validation: {
        lintOk: lintRun.result.ok,
        buildOk: buildRun.result.ok,
        testOk: testRun.result.ok,
        browserOk: browserResult.ok,
        visualRegressionOk: visualResult.ok,
      },
      draftCommitMessage,
      promptTemplateVersion: payload.templateVersion,
      artifactPaths: [
        path.relative(cwd, preflight.baselineSnapshotPath ?? ""),
        path.relative(cwd, fixReportPath),
      ].filter(Boolean),
      nextUnit: previewNextUnit,
    };
    const reviewPacketPath = writeLatestReviewPacket(definition, cwd, reviewPacket);

    return {
      runtime: {
        programId: definition.program.programId,
        unitId: unit.id,
        runId,
        runner: runner.adapter,
        mode: policies.runnerPolicy.mode,
        attemptNumber,
        validationRetryCount,
        changedFiles: allowlistResult.changedFiles,
        allowlistOk: allowlistResult.ok,
        lintOk: lintRun.result.ok,
        buildOk: buildRun.result.ok,
        testOk: testRun.result.ok,
        browserOk: browserResult.ok,
        visualRegressionOk: visualResult.ok,
        reportWritten: true,
        trackerUpdated: true,
        statusUpdated: true,
        staged: true,
        commitApproved: false,
        promptTemplateVersion: payload.templateVersion,
        visualSurfaceChanged: visualResult.visualSurfaceChanged || visualSurfaceChanged,
        finalState: "passed",
        nextUnit: previewNextUnit,
      },
      unit,
      draftCommitMessage,
      fixReportPath,
      reviewPacketPath,
      baselineSnapshotPath: preflight.baselineSnapshotPath,
    };
  } finally {
    releaseProgramLock(definition, cwd);
  }
}
