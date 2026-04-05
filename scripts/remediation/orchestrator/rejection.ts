import path from "node:path";
import { writeRejectionArtifact } from "../harness/artifacts.ts";
import { assertValidProgramDefinition } from "../harness/registry.ts";
import { writeRuntimeStatusSection } from "../harness/status.ts";
import { upsertTrackerEntry, writeTrackerState } from "../harness/tracker.ts";
import type {
  RejectionArtifact,
  RemediationProgramDefinition,
  RemediationUnit,
} from "../types.ts";
import {
  listStagedFiles,
  resolvePendingReviewContext,
  unstageFiles,
} from "./review-state.ts";

export interface RejectUnitEnvironment {
  now?: Date;
  getStagedFiles?: (cwd: string) => string[];
  unstageRejectedFiles?: (cwd: string, files: string[]) => void;
}

export interface RejectUnitResult {
  unit: Pick<RemediationUnit, "id" | "title" | "wave" | "branch">;
  runId: string;
  rejectionArtifactPath: string;
}

export function rejectRemediationUnit(
  definition: RemediationProgramDefinition,
  cwd: string,
  unitId: string | undefined,
  environment: RejectUnitEnvironment = {},
): RejectUnitResult {
  assertValidProgramDefinition(definition, cwd);

  const context = resolvePendingReviewContext(definition, cwd, unitId);
  const now = environment.now ?? new Date();
  const stagedFiles = (environment.getStagedFiles ?? listStagedFiles)(cwd);

  (environment.unstageRejectedFiles ?? unstageFiles)(cwd, stagedFiles);

  const trackerEntries = upsertTrackerEntry(context.trackerEntries, {
    unitId: context.unit.id,
    state: "not-started",
    attemptCount: context.trackerEntry.attemptCount,
    lastRunId: context.reviewPacket.runId,
    notes: `Rejected ${context.reviewPacket.runId}; ready for a rewritten retry.`,
  });

  writeTrackerState(definition, cwd, {
    programId: definition.program.programId,
    entries: trackerEntries,
  });

  const rejectionArtifact: RejectionArtifact = {
    programId: definition.program.programId,
    unitId: context.unit.id,
    runId: context.reviewPacket.runId,
    rejectedAt: now.toISOString(),
    attemptNumber: context.trackerEntry.attemptCount,
    changedFiles: context.reviewPacket.filesChanged,
    draftCommitMessage: context.reviewPacket.draftCommitMessage,
    reviewPacketPath: context.reviewPacketPath,
    fixReportPath: context.reviewPacket.artifactPaths.find((artifactPath) => artifactPath.endsWith("fix-report.md")),
  };
  const rejectionArtifactPath = writeRejectionArtifact(definition, cwd, rejectionArtifact);

  writeRuntimeStatusSection(definition, cwd, {
    operation: "reject",
    runId: context.reviewPacket.runId,
    unitId: context.unit.id,
    title: context.unit.title,
    runner: "rejection",
    attemptNumber: context.trackerEntry.attemptCount,
    finalState: "invalid",
    nextUnit: context.unit.id,
    artifactPaths: [path.relative(cwd, rejectionArtifactPath)],
    updatedAt: now.toISOString(),
    details: [
      `Rejected staged review handoff for ${context.unit.id}.`,
      ...(stagedFiles.length > 0 ? [`Unstaged files: ${stagedFiles.join(", ")}`] : ["No staged files were present."]),
    ],
  });

  return {
    unit: context.unit,
    runId: context.reviewPacket.runId,
    rejectionArtifactPath,
  };
}
