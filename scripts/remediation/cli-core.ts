import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveNextUnit, validateTrackerEntries } from "./harness/dependencies.ts";
import { runPreflight } from "./harness/preflight.ts";
import { createNextPromptPayload, createPromptPayload } from "./harness/prompt.ts";
import { approveRemediationUnit } from "./orchestrator/approval.ts";
import { rejectRemediationUnit } from "./orchestrator/rejection.ts";
import { rollbackRemediationUnit } from "./orchestrator/rollback.ts";
import { runSingleRemediationUnit } from "./orchestrator/run-unit.ts";
import { assertValidProgramDefinition, validateProgramDefinition } from "./harness/registry.ts";
import { readTrackerState } from "./harness/tracker.ts";
import { unlockStaleProgramLock } from "./harness/lockfile.ts";
import { getRemediationProgramDefinition, listRemediationProgramIds } from "./programs/index.ts";
import type { RunnerAdapterName } from "./types.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultRepoRoot = path.resolve(__dirname, "../..");

type CliCommand =
  | "validate"
  | "next"
  | "prompt"
  | "preflight"
  | "unlock-stale"
  | "run"
  | "approve"
  | "reject"
  | "rollback";

interface ParsedCliArgs {
  command: CliCommand | "help";
  json: boolean;
  programId: string;
  unitId?: string;
  runnerOverride?: RunnerAdapterName;
}

interface CliIo {
  stdout: (line: string) => void;
  stderr: (line: string) => void;
}

interface CliCommandResult {
  exitCode: number;
  stdout: string[];
  stderr: string[];
}

interface ValidateCommandData {
  command: "validate";
  programId: string;
  displayName: string;
  trackerPath: string;
  trackerFilePresent: boolean;
  warnings: string[];
  issues: Array<{ scope: "registry" | "tracker"; code: string; message: string; unitId?: string; field?: string }>;
  isValid: boolean;
  isComplete: boolean;
  currentWave?: number;
  nextUnitId?: string;
}

interface NextCommandData {
  command: "next";
  programId: string;
  displayName: string;
  trackerPath: string;
  trackerFilePresent: boolean;
  warnings: string[];
  isComplete: boolean;
  currentWave?: number;
  nextUnit?: ReturnType<typeof resolveNextUnit>["nextUnit"];
  blockers: ReturnType<typeof resolveNextUnit>["blockers"];
}

interface PromptCommandData {
  command: "prompt";
  programId: string;
  displayName: string;
  trackerPath: string;
  trackerFilePresent: boolean;
  warnings: string[];
  resolution: ReturnType<typeof createNextPromptPayload>["resolution"];
  payload?: ReturnType<typeof createPromptPayload>;
}

interface PreflightCommandData extends ReturnType<typeof runPreflight> {
  command: "preflight";
}

interface UnlockStaleCommandData {
  command: "unlock-stale";
  programId: string;
  displayName: string;
  unlocked: boolean;
  lockPath: string;
  unitId?: string;
  runner?: string;
  timestamp?: string;
}

interface RunCommandData {
  command: "run";
  programId: string;
  displayName: string;
  runtime: ReturnType<typeof runSingleRemediationUnit>["runtime"];
  unit: ReturnType<typeof runSingleRemediationUnit>["unit"];
  draftCommitMessage?: string;
  fixReportPath?: string;
  failureArtifactPath?: string;
  reviewPacketPath?: string;
  baselineSnapshotPath?: string;
}

interface ApproveCommandData {
  command: "approve";
  programId: string;
  displayName: string;
  unit: ReturnType<typeof approveRemediationUnit>["unit"];
  runId: string;
  commitSha: string;
  approvalArtifactPath: string;
  waveSummaryPath?: string;
  nextUnit?: string;
  isProgramComplete: boolean;
}

interface RejectCommandData {
  command: "reject";
  programId: string;
  displayName: string;
  unit: ReturnType<typeof rejectRemediationUnit>["unit"];
  runId: string;
  rejectionArtifactPath: string;
}

interface RollbackCommandData {
  command: "rollback";
  programId: string;
  displayName: string;
  unit: ReturnType<typeof rollbackRemediationUnit>["unit"];
  originalCommitSha: string;
  rollbackCommitSha: string;
  rollbackArtifactPath: string;
  nextUnit?: string;
}

function createIo(): CliIo {
  return {
    stdout: (line) => console.log(line),
    stderr: (line) => console.error(line),
  };
}

function collectOutput(): CliCommandResult & { io: CliIo } {
  const stdout: string[] = [];
  const stderr: string[] = [];

  return {
    exitCode: 0,
    stdout,
    stderr,
    io: {
      stdout: (line) => {
        stdout.push(line);
      },
      stderr: (line) => {
        stderr.push(line);
      },
    },
  };
}

function parseArgs(argv: string[]): ParsedCliArgs {
  const args = [...argv];
  let command: ParsedCliArgs["command"] = "next";
  let json = false;
  let programId = "finance-pages";
  let unitId: string | undefined;
  let runnerOverride: RunnerAdapterName | undefined;

  const firstArg = args[0];

  if (firstArg && !firstArg.startsWith("-")) {
    if (
      firstArg === "help"
      || firstArg === "validate"
      || firstArg === "next"
      || firstArg === "prompt"
      || firstArg === "preflight"
      || firstArg === "unlock-stale"
      || firstArg === "run"
      || firstArg === "approve"
      || firstArg === "reject"
      || firstArg === "rollback"
    ) {
      command = firstArg;
      args.shift();
    } else {
      throw new Error(`Unknown command: ${firstArg}`);
    }
  }

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--json") {
      json = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      command = "help";
      continue;
    }

    if (arg === "--program") {
      const value = args[index + 1];

      if (!value) {
        throw new Error("Missing value for --program.");
      }

      programId = value;
      index += 1;
      continue;
    }

    if (arg === "--unit") {
      const value = args[index + 1];

      if (!value) {
        throw new Error("Missing value for --unit.");
      }

      unitId = value;
      index += 1;
      continue;
    }

    if (arg === "--runner") {
      const value = args[index + 1];

      if (!value) {
        throw new Error("Missing value for --runner.");
      }

      if (value !== "codex" && value !== "claude" && value !== "fake") {
        throw new Error(`Unsupported runner override: ${value}`);
      }

      runnerOverride = value;
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    command,
    json,
    programId,
    unitId,
    runnerOverride,
  };
}

function renderIssues(
  issues: ValidateCommandData["issues"],
  scopeLabel: string,
): string[] {
  return issues
    .filter((issue) => issue.scope === scopeLabel)
    .map((issue) => {
      const location = issue.unitId ? ` ${issue.unitId}` : "";
      const field = issue.field ? ` (${issue.field})` : "";
      return `${scopeLabel.toUpperCase()}: ${issue.code}${location}${field} - ${issue.message}`;
    });
}

function formatNextUnit(nextUnit: NonNullable<NextCommandData["nextUnit"]>): string {
  const dependencySummary = nextUnit.dependsOn.length > 0 ? nextUnit.dependsOn.join(", ") : "none";
  const browserSummary = nextUnit.requiresBrowserValidation ? "required" : "not required";
  const visualSummary = nextUnit.requiresVisualRegression ? "required" : "not required";

  return [
    `${nextUnit.id}: ${nextUnit.title}`,
    `Wave: ${nextUnit.wave}`,
    `Type: ${nextUnit.type}`,
    `Branch: ${nextUnit.branch}`,
    `Dependencies: ${dependencySummary}`,
    `Browser validation: ${browserSummary}`,
    `Visual regression: ${visualSummary}`,
    `Allowed files: ${nextUnit.allowedFiles.length}`,
  ].join("\n");
}

function formatBlockers(blockers: NextCommandData["blockers"]): string[] {
  if (blockers.length === 0) {
    return [];
  }

  return blockers.map((blocker) => {
    const deps = blocker.dependencyIds?.length ? ` [${blocker.dependencyIds.join(", ")}]` : "";
    return `BLOCKER: ${blocker.code} ${blocker.unitId}${deps} - ${blocker.message}`;
  });
}

function writeJson(io: CliIo, value: unknown) {
  io.stdout(JSON.stringify(value, null, 2));
}

function loadProgramState(programId: string, cwd: string) {
  const definition = getRemediationProgramDefinition(programId);
  const registryValidation = validateProgramDefinition(definition, cwd);
  const trackerState = readTrackerState(definition, cwd);
  const trackerValidation = validateTrackerEntries(definition, trackerState.tracker.entries);
  const resolution =
    registryValidation.issues.length === 0 && trackerValidation.issues.length === 0
      ? resolveNextUnit(definition, trackerState.tracker.entries)
      : undefined;

  return {
    definition,
    registryValidation,
    trackerState,
    trackerValidation,
    resolution,
  };
}

function buildValidateData(programId: string, cwd: string): ValidateCommandData {
  const { definition, registryValidation, resolution, trackerState, trackerValidation } = loadProgramState(programId, cwd);

  return {
    command: "validate",
    programId: definition.program.programId,
    displayName: definition.program.displayName,
    trackerPath: definition.program.trackerPath,
    trackerFilePresent: trackerState.exists,
    warnings: trackerState.warnings,
    issues: [
      ...registryValidation.issues.map((issue) => ({ ...issue, scope: "registry" as const })),
      ...trackerValidation.issues.map((issue) => ({ ...issue, scope: "tracker" as const })),
    ],
    isValid: registryValidation.issues.length === 0 && trackerValidation.issues.length === 0,
    isComplete: resolution?.isComplete ?? false,
    currentWave: resolution?.currentWave,
    nextUnitId: resolution?.nextUnit?.id,
  };
}

function runValidate(parsed: ParsedCliArgs, cwd: string, io: CliIo): number {
  const data = buildValidateData(parsed.programId, cwd);

  if (parsed.json) {
    writeJson(io, data);
    return data.isValid ? 0 : 1;
  }

  if (!data.isValid) {
    for (const line of renderIssues(data.issues, "registry")) {
      io.stderr(line);
    }

    for (const line of renderIssues(data.issues, "tracker")) {
      io.stderr(line);
    }

    for (const warning of data.warnings) {
      io.stderr(`WARNING: ${warning}`);
    }

    return 1;
  }

  io.stdout(`Program definition is valid for ${data.displayName} (${data.programId}).`);
  io.stdout(`Tracker path: ${data.trackerPath} (${data.trackerFilePresent ? "present" : "missing"})`);

  if (data.isComplete) {
    io.stdout("Program status: complete");
  } else {
    io.stdout(`Current wave: ${data.currentWave ?? "unknown"}`);
    io.stdout(`Next unit: ${data.nextUnitId ?? "none"}`);
  }

  for (const warning of data.warnings) {
    io.stdout(`WARNING: ${warning}`);
  }

  return 0;
}

function resolvePromptTarget(programId: string, unitId: string | undefined, cwd: string): PromptCommandData {
  const { definition, registryValidation, trackerState, trackerValidation } = loadProgramState(programId, cwd);

  if (registryValidation.issues.length > 0 || trackerValidation.issues.length > 0) {
    throw new Error("Cannot generate a prompt until validate passes.");
  }

  assertValidProgramDefinition(definition, cwd);

  if (unitId) {
    const unit = definition.units.find((candidate) => candidate.id === unitId);

    if (!unit) {
      throw new Error(`Unknown unit ${unitId} for program ${programId}.`);
    }

    return {
      command: "prompt",
      programId: definition.program.programId,
      displayName: definition.program.displayName,
      trackerPath: definition.program.trackerPath,
      trackerFilePresent: trackerState.exists,
      warnings: trackerState.warnings,
      resolution: resolveNextUnit(definition, trackerState.tracker.entries),
      payload: createPromptPayload(definition, unit),
    };
  }

  const result = createNextPromptPayload(definition, trackerState.tracker.entries);

  return {
    command: "prompt",
    programId: definition.program.programId,
    displayName: definition.program.displayName,
    trackerPath: definition.program.trackerPath,
    trackerFilePresent: trackerState.exists,
    warnings: trackerState.warnings,
    resolution: result.resolution,
    payload: result.payload,
  };
}

function runNext(parsed: ParsedCliArgs, cwd: string, io: CliIo): number {
  const validateData = buildValidateData(parsed.programId, cwd);

  if (!validateData.isValid) {
    return runValidate({ ...parsed, json: false }, cwd, io);
  }

  const { definition, resolution, trackerState } = loadProgramState(parsed.programId, cwd);
  const data: NextCommandData = {
    command: "next",
    programId: definition.program.programId,
    displayName: definition.program.displayName,
    trackerPath: definition.program.trackerPath,
    trackerFilePresent: trackerState.exists,
    warnings: trackerState.warnings,
    isComplete: resolution?.isComplete ?? false,
    currentWave: resolution?.currentWave,
    nextUnit: resolution?.nextUnit,
    blockers: resolution?.blockers ?? [],
  };

  if (parsed.json) {
    writeJson(io, data);
    return data.nextUnit || data.isComplete ? 0 : 1;
  }

  io.stdout(`Program: ${data.displayName} (${data.programId})`);
  io.stdout(`Tracker path: ${data.trackerPath} (${data.trackerFilePresent ? "present" : "missing"})`);

  for (const warning of data.warnings) {
    io.stdout(`WARNING: ${warning}`);
  }

  if (data.isComplete) {
    io.stdout("Program is complete.");
    return 0;
  }

  if (!data.nextUnit) {
    for (const blocker of formatBlockers(data.blockers)) {
      io.stderr(blocker);
    }

    return 1;
  }

  io.stdout(formatNextUnit(data.nextUnit));

  if (data.blockers.length > 0) {
    for (const blocker of formatBlockers(data.blockers)) {
      io.stdout(blocker);
    }
  }

  return 0;
}

function runPrompt(parsed: ParsedCliArgs, cwd: string, io: CliIo): number {
  const validateData = buildValidateData(parsed.programId, cwd);

  if (!validateData.isValid) {
    return runValidate({ ...parsed, json: false }, cwd, io);
  }

  const data = resolvePromptTarget(parsed.programId, parsed.unitId, cwd);

  if (parsed.json) {
    writeJson(io, data);
    return data.payload ? 0 : 1;
  }

  for (const warning of data.warnings) {
    io.stdout(`WARNING: ${warning}`);
  }

  if (!data.payload) {
    if (data.resolution.isComplete) {
      io.stderr("Program is complete. No prompt payload remains.");
    } else {
      io.stderr("No eligible remediation unit could be selected for prompt generation.");
      for (const blocker of formatBlockers(data.resolution.blockers)) {
        io.stderr(blocker);
      }
    }

    return 1;
  }

  io.stdout(data.payload.renderedPrompt);
  return 0;
}

function runPreflightCommand(parsed: ParsedCliArgs, cwd: string, io: CliIo): number {
  const definition = getRemediationProgramDefinition(parsed.programId);
  const data: PreflightCommandData = {
    command: "preflight",
    ...runPreflight(definition, cwd),
  };

  if (parsed.json) {
    writeJson(io, data);
    return data.ok ? 0 : 1;
  }

  io.stdout(`Program: ${data.displayName} (${data.programId})`);
  io.stdout(`Lock path: ${path.relative(cwd, data.lockPath)} (${data.lockStatus})`);
  io.stdout(`Tracker file: ${data.trackerFilePresent ? "present" : "missing"}`);

  if (data.currentWave) {
    io.stdout(`Current wave: ${data.currentWave}`);
  }

  if (data.nextUnitId) {
    io.stdout(`Next unit: ${data.nextUnitId}`);
  }

  if (data.baselineSnapshotPath) {
    io.stdout(`Baseline snapshot: ${path.relative(cwd, data.baselineSnapshotPath)}`);
  }

  for (const check of data.checks) {
    const line = `[${check.status.toUpperCase()}] ${check.name}: ${check.summary}`;

    if (check.status === "fail") {
      io.stderr(line);
    } else {
      io.stdout(line);
    }

    for (const detail of check.details ?? []) {
      if (check.status === "fail") {
        io.stderr(`  - ${detail}`);
      } else {
        io.stdout(`  - ${detail}`);
      }
    }
  }

  for (const warning of data.warnings) {
    io.stdout(`WARNING: ${warning}`);
  }

  return data.ok ? 0 : 1;
}

function runUnlockStale(parsed: ParsedCliArgs, cwd: string, io: CliIo): number {
  const definition = getRemediationProgramDefinition(parsed.programId);
  const clearedLock = unlockStaleProgramLock(definition, cwd);
  const data: UnlockStaleCommandData = {
    command: "unlock-stale",
    programId: definition.program.programId,
    displayName: definition.program.displayName,
    unlocked: true,
    lockPath: path.resolve(cwd, definition.program.artifactRoot, "active-lock.json"),
    unitId: clearedLock.unitId,
    runner: clearedLock.runner,
    timestamp: clearedLock.timestamp,
  };

  if (parsed.json) {
    writeJson(io, data);
    return 0;
  }

  io.stdout(`Cleared stale lock for ${data.displayName} (${data.programId}).`);
  io.stdout(`Unit: ${data.unitId}`);
  io.stdout(`Runner: ${data.runner}`);
  io.stdout(`Timestamp: ${data.timestamp}`);
  io.stdout(`Lock path: ${path.relative(cwd, data.lockPath)}`);
  return 0;
}

function runUnitCommand(parsed: ParsedCliArgs, cwd: string, io: CliIo): number {
  const definition = getRemediationProgramDefinition(parsed.programId);
  const result = runSingleRemediationUnit(definition, cwd, {
    ...(parsed.runnerOverride ? { runnerOverride: parsed.runnerOverride } : {}),
  });
  const data: RunCommandData = {
    command: "run",
    programId: definition.program.programId,
    displayName: definition.program.displayName,
    runtime: result.runtime,
    unit: result.unit,
    draftCommitMessage: result.draftCommitMessage,
    fixReportPath: result.fixReportPath,
    failureArtifactPath: result.failureArtifactPath,
    reviewPacketPath: result.reviewPacketPath,
    baselineSnapshotPath: result.baselineSnapshotPath,
  };

  if (parsed.json) {
    writeJson(io, data);
    return result.runtime.finalState === "passed" ? 0 : 1;
  }

  io.stdout(`Program: ${data.displayName} (${data.programId})`);
  io.stdout(`Unit: ${data.unit.id} - ${data.unit.title}`);
  io.stdout(`Final state: ${data.runtime.finalState}`);
  io.stdout(`Runner: ${data.runtime.runner}`);
  io.stdout(`Changed files: ${data.runtime.changedFiles.length}`);

  if (data.baselineSnapshotPath) {
    io.stdout(`Baseline snapshot: ${path.relative(cwd, data.baselineSnapshotPath)}`);
  }

  if (data.fixReportPath) {
    io.stdout(`Fix report: ${path.relative(cwd, data.fixReportPath)}`);
  }

  if (data.failureArtifactPath) {
    io.stdout(`Failure artifact: ${path.relative(cwd, data.failureArtifactPath)}`);
  }

  if (data.reviewPacketPath) {
    io.stdout(`Review packet: ${path.relative(cwd, data.reviewPacketPath)}`);
  }

  if (data.draftCommitMessage) {
    io.stdout("Draft commit message:");
    io.stdout(data.draftCommitMessage);
  }

  return result.runtime.finalState === "passed" ? 0 : 1;
}

function runApproveCommand(parsed: ParsedCliArgs, cwd: string, io: CliIo): number {
  const definition = getRemediationProgramDefinition(parsed.programId);
  const result = approveRemediationUnit(definition, cwd, parsed.unitId);
  const data: ApproveCommandData = {
    command: "approve",
    programId: definition.program.programId,
    displayName: definition.program.displayName,
    unit: result.unit,
    runId: result.runId,
    commitSha: result.commitSha,
    approvalArtifactPath: result.approvalArtifactPath,
    waveSummaryPath: result.waveSummaryPath,
    nextUnit: result.nextUnit,
    isProgramComplete: result.isProgramComplete,
  };

  if (parsed.json) {
    writeJson(io, data);
    return 0;
  }

  io.stdout(`Program: ${data.displayName} (${data.programId})`);
  io.stdout(`Approved unit: ${data.unit.id} - ${data.unit.title}`);
  io.stdout(`Run ID: ${data.runId}`);
  io.stdout(`Commit SHA: ${data.commitSha}`);
  io.stdout(`Approval artifact: ${path.relative(cwd, data.approvalArtifactPath)}`);

  if (data.waveSummaryPath) {
    io.stdout(`Wave summary: ${path.relative(cwd, data.waveSummaryPath)}`);
  }

  if (data.isProgramComplete) {
    io.stdout("Program is complete.");
  } else {
    io.stdout(`Next unit: ${data.nextUnit ?? "none"}`);
  }

  return 0;
}

function runRejectCommand(parsed: ParsedCliArgs, cwd: string, io: CliIo): number {
  const definition = getRemediationProgramDefinition(parsed.programId);
  const result = rejectRemediationUnit(definition, cwd, parsed.unitId);
  const data: RejectCommandData = {
    command: "reject",
    programId: definition.program.programId,
    displayName: definition.program.displayName,
    unit: result.unit,
    runId: result.runId,
    rejectionArtifactPath: result.rejectionArtifactPath,
  };

  if (parsed.json) {
    writeJson(io, data);
    return 0;
  }

  io.stdout(`Program: ${data.displayName} (${data.programId})`);
  io.stdout(`Rejected unit: ${data.unit.id} - ${data.unit.title}`);
  io.stdout(`Run ID: ${data.runId}`);
  io.stdout(`Rejection artifact: ${path.relative(cwd, data.rejectionArtifactPath)}`);
  io.stdout(`Next unit: ${data.unit.id}`);
  return 0;
}

function runRollbackCommand(parsed: ParsedCliArgs, cwd: string, io: CliIo): number {
  if (!parsed.unitId) {
    throw new Error("Rollback requires --unit <unit-id>.");
  }

  const definition = getRemediationProgramDefinition(parsed.programId);
  const result = rollbackRemediationUnit(definition, cwd, parsed.unitId);
  const data: RollbackCommandData = {
    command: "rollback",
    programId: definition.program.programId,
    displayName: definition.program.displayName,
    unit: result.unit,
    originalCommitSha: result.originalCommitSha,
    rollbackCommitSha: result.rollbackCommitSha,
    rollbackArtifactPath: result.rollbackArtifactPath,
    nextUnit: result.nextUnit,
  };

  if (parsed.json) {
    writeJson(io, data);
    return 0;
  }

  io.stdout(`Program: ${data.displayName} (${data.programId})`);
  io.stdout(`Rolled back unit: ${data.unit.id} - ${data.unit.title}`);
  io.stdout(`Original commit SHA: ${data.originalCommitSha}`);
  io.stdout(`Rollback commit SHA: ${data.rollbackCommitSha}`);
  io.stdout(`Rollback artifact: ${path.relative(cwd, data.rollbackArtifactPath)}`);
  io.stdout(`Next unit: ${data.nextUnit ?? "none"}`);
  return 0;
}

function writeHelp(io: CliIo): number {
  io.stdout(
    "Usage: remediation <validate|next|prompt|preflight|unlock-stale|run|approve|reject|rollback> [--program <program-id>] [--json] [--unit <unit-id>] [--runner <codex|claude|fake>]",
  );
  io.stdout(`Available programs: ${listRemediationProgramIds().join(", ")}`);
  return 0;
}

export function runCli(argv: string[], options: { cwd?: string; io?: CliIo } = {}): number {
  const cwd = options.cwd ?? defaultRepoRoot;
  const io = options.io ?? createIo();

  let parsed: ParsedCliArgs;

  try {
    parsed = parseArgs(argv);
  } catch (error) {
    io.stderr(error instanceof Error ? error.message : String(error));
    return 1;
  }

  try {
    switch (parsed.command) {
      case "help":
        return writeHelp(io);
      case "validate":
        return runValidate(parsed, cwd, io);
      case "next":
        return runNext(parsed, cwd, io);
      case "prompt":
        return runPrompt(parsed, cwd, io);
      case "preflight":
        return runPreflightCommand(parsed, cwd, io);
      case "unlock-stale":
        return runUnlockStale(parsed, cwd, io);
      case "run":
        return runUnitCommand(parsed, cwd, io);
      case "approve":
        return runApproveCommand(parsed, cwd, io);
      case "reject":
        return runRejectCommand(parsed, cwd, io);
      case "rollback":
        return runRollbackCommand(parsed, cwd, io);
      default:
        return writeHelp(io);
    }
  } catch (error) {
    io.stderr(error instanceof Error ? error.message : String(error));
    return 1;
  }
}

export function runCliForTest(argv: string[], cwd = defaultRepoRoot): CliCommandResult {
  const result = collectOutput();
  result.exitCode = runCli(argv, { cwd, io: result.io });

  return {
    exitCode: result.exitCode,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}
