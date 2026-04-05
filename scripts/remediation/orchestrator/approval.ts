import { execFileSync } from "node:child_process";
import path from "node:path";
import { resolveNextUnit } from "../harness/dependencies.ts";
import {
  writeApprovalArtifact,
  writeWaveSummaryArtifact,
} from "../harness/artifacts.ts";
import { assertValidProgramDefinition } from "../harness/registry.ts";
import { writeRuntimeStatusSection } from "../harness/status.ts";
import { upsertTrackerEntry, writeTrackerState } from "../harness/tracker.ts";
import type {
  ApprovalArtifact,
  RemediationProgramDefinition,
  RemediationTrackerEntry,
  RemediationUnit,
  WaveSummaryArtifact,
} from "../types.ts";
import {
  assertMatchingStagedFiles,
  listStagedFiles,
  resolvePendingReviewContext,
} from "./review-state.ts";

export interface ApproveUnitEnvironment {
  now?: Date;
  getStagedFiles?: (cwd: string) => string[];
  commitChanges?: (cwd: string, commitMessage: string) => string;
}

export interface ApproveUnitResult {
  unit: Pick<RemediationUnit, "id" | "title" | "wave" | "branch">;
  runId: string;
  commitSha: string;
  approvalArtifactPath: string;
  waveSummaryPath?: string;
  nextUnit?: string;
  isProgramComplete: boolean;
}

function defaultCommitChanges(cwd: string, commitMessage: string): string {
  execFileSync("git", ["commit", "--file", "-"], {
    cwd,
    input: commitMessage,
    stdio: ["pipe", "ignore", "pipe"],
  });

  return execFileSync("git", ["rev-parse", "HEAD"], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function buildWaveSummaryArtifact(
  definition: RemediationProgramDefinition,
  unit: RemediationUnit,
  trackerEntries: RemediationTrackerEntry[],
  closedAt: string,
  nextUnitId: string | undefined,
  isProgramComplete: boolean,
): WaveSummaryArtifact {
  const waveUnits = definition.units.filter((candidate) => candidate.wave === unit.wave);
  const trackerByUnitId = new Map(
    trackerEntries.map((entry) => [entry.unitId, entry] satisfies [string, RemediationTrackerEntry]),
  );
  const fixedUnitIds = waveUnits
    .filter((candidate) => trackerByUnitId.get(candidate.id)?.state === "fixed")
    .map((candidate) => candidate.id);
  const deferredUnitIds = waveUnits
    .filter((candidate) => trackerByUnitId.get(candidate.id)?.state === "deferred")
    .map((candidate) => candidate.id);
  const commitShas = Object.fromEntries(
    fixedUnitIds
      .map((unitId) => {
        const commitSha = trackerByUnitId.get(unitId)?.commitSha;
        return commitSha ? ([unitId, commitSha] as const) : undefined;
      })
      .filter((entry): entry is readonly [string, string] => Boolean(entry)),
  );

  return {
    programId: definition.program.programId,
    wave: unit.wave,
    closedAt,
    closingUnitId: unit.id,
    fixedUnitIds,
    deferredUnitIds,
    commitShas,
    ...(isProgramComplete || !nextUnitId ? {} : { nextWave: definition.units.find((candidate) => candidate.id === nextUnitId)?.wave }),
    ...(nextUnitId ? { nextUnitId } : {}),
    isProgramComplete,
  };
}

export function approveRemediationUnit(
  definition: RemediationProgramDefinition,
  cwd: string,
  unitId: string | undefined,
  environment: ApproveUnitEnvironment = {},
): ApproveUnitResult {
  assertValidProgramDefinition(definition, cwd);

  const context = resolvePendingReviewContext(definition, cwd, unitId);
  const stagedFiles = (environment.getStagedFiles ?? listStagedFiles)(cwd);

  assertMatchingStagedFiles(stagedFiles, context.reviewPacket.filesChanged);

  const commitSha = (environment.commitChanges ?? defaultCommitChanges)(
    cwd,
    context.reviewPacket.draftCommitMessage,
  );
  const now = environment.now ?? new Date();

  const trackerEntries = upsertTrackerEntry(context.trackerEntries, {
    unitId: context.unit.id,
    state: "fixed",
    attemptCount: context.trackerEntry.attemptCount,
    commitSha,
    lastRunId: context.reviewPacket.runId,
    notes: `Approved ${context.reviewPacket.runId} into commit ${commitSha}.`,
  });

  writeTrackerState(definition, cwd, {
    programId: definition.program.programId,
    entries: trackerEntries,
  });

  const resolution = resolveNextUnit(definition, trackerEntries);
  const nextUnit = resolution.nextUnit?.id;
  const waveClosed = resolution.isComplete || resolution.currentWave !== context.unit.wave;
  const waveSummaryPath = waveClosed
    ? writeWaveSummaryArtifact(
        definition,
        cwd,
        buildWaveSummaryArtifact(
          definition,
          context.unit,
          trackerEntries,
          now.toISOString(),
          nextUnit,
          resolution.isComplete,
        ),
      )
    : undefined;
  const approvalArtifact: ApprovalArtifact = {
    programId: definition.program.programId,
    unitId: context.unit.id,
    runId: context.reviewPacket.runId,
    approvedAt: now.toISOString(),
    commitSha,
    attemptNumber: context.trackerEntry.attemptCount,
    draftCommitMessage: context.reviewPacket.draftCommitMessage,
    changedFiles: context.reviewPacket.filesChanged,
    reviewPacketPath: context.reviewPacketPath,
    fixReportPath: context.reviewPacket.artifactPaths.find((artifactPath) => artifactPath.endsWith("fix-report.md")),
    ...(waveSummaryPath ? { waveSummaryPath: path.relative(cwd, waveSummaryPath) } : {}),
    ...(nextUnit ? { nextUnit } : {}),
  };
  const approvalArtifactPath = writeApprovalArtifact(definition, cwd, approvalArtifact);

  writeRuntimeStatusSection(definition, cwd, {
    operation: "approve",
    runId: context.reviewPacket.runId,
    unitId: context.unit.id,
    title: context.unit.title,
    runner: "approval",
    attemptNumber: context.trackerEntry.attemptCount,
    finalState: "passed",
    nextUnit,
    artifactPaths: [
      path.relative(cwd, approvalArtifactPath),
      ...(waveSummaryPath ? [path.relative(cwd, waveSummaryPath)] : []),
    ],
    updatedAt: now.toISOString(),
    details: [`Commit SHA: ${commitSha}`],
  });

  return {
    unit: context.unit,
    runId: context.reviewPacket.runId,
    commitSha,
    approvalArtifactPath,
    ...(waveSummaryPath ? { waveSummaryPath } : {}),
    ...(nextUnit ? { nextUnit } : {}),
    isProgramComplete: resolution.isComplete,
  };
}
