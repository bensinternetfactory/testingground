import { execFileSync } from "node:child_process";
import path from "node:path";
import { resolveNextUnit } from "../harness/dependencies.ts";
import { writeRollbackArtifact } from "../harness/artifacts.ts";
import { assertValidProgramDefinition } from "../harness/registry.ts";
import { writeRuntimeStatusSection } from "../harness/status.ts";
import { upsertTrackerEntry, writeTrackerState, readTrackerState } from "../harness/tracker.ts";
import type {
  RemediationProgramDefinition,
  RemediationUnit,
  RollbackArtifact,
} from "../types.ts";
import { listFilesForCommit } from "./review-state.ts";

export interface RollbackUnitEnvironment {
  now?: Date;
  revertCommit?: (cwd: string, commitSha: string) => string;
  listCommitFiles?: (cwd: string, commitSha: string) => string[];
}

export interface RollbackUnitResult {
  unit: Pick<RemediationUnit, "id" | "title" | "wave" | "branch">;
  originalCommitSha: string;
  rollbackCommitSha: string;
  rollbackArtifactPath: string;
  nextUnit?: string;
}

function defaultRevertCommit(cwd: string, commitSha: string): string {
  execFileSync("git", ["revert", "--no-edit", commitSha], {
    cwd,
    stdio: ["ignore", "ignore", "pipe"],
  });

  return execFileSync("git", ["rev-parse", "HEAD"], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

export function rollbackRemediationUnit(
  definition: RemediationProgramDefinition,
  cwd: string,
  unitId: string,
  environment: RollbackUnitEnvironment = {},
): RollbackUnitResult {
  assertValidProgramDefinition(definition, cwd);

  const trackerState = readTrackerState(definition, cwd);
  const trackerEntry = trackerState.tracker.entries.find((entry) => entry.unitId === unitId);

  if (!trackerEntry || trackerEntry.state !== "fixed" || !trackerEntry.commitSha) {
    throw new Error(`Rollback requires a fixed remediation unit with a recorded commitSha. ${unitId} is not eligible.`);
  }

  const unit = definition.units.find((candidate) => candidate.id === unitId);

  if (!unit) {
    throw new Error(`Unknown remediation unit ${unitId}.`);
  }

  const rollbackCommitSha = (environment.revertCommit ?? defaultRevertCommit)(cwd, trackerEntry.commitSha);
  const changedFiles = (environment.listCommitFiles ?? listFilesForCommit)(cwd, rollbackCommitSha);
  const now = environment.now ?? new Date();
  const trackerEntries = upsertTrackerEntry(trackerState.tracker.entries, {
    unitId: unit.id,
    state: "blocked",
    attemptCount: trackerEntry.attemptCount,
    commitSha: trackerEntry.commitSha,
    lastRunId: trackerEntry.lastRunId,
    blockedReason: `Rolled back approved commit ${trackerEntry.commitSha} via ${rollbackCommitSha}.`,
    unblockAction: `Review the rollback artifact for ${unit.id} and rewrite the fix direction before retrying.`,
    notes: `Rollback commit ${rollbackCommitSha} reverted approved remediation ${trackerEntry.commitSha}.`,
  });

  writeTrackerState(definition, cwd, {
    programId: definition.program.programId,
    entries: trackerEntries,
  });

  const resolution = resolveNextUnit(definition, trackerEntries);
  const rollbackArtifact: RollbackArtifact = {
    programId: definition.program.programId,
    unitId: unit.id,
    rolledBackAt: now.toISOString(),
    wave: unit.wave,
    originalCommitSha: trackerEntry.commitSha,
    rollbackCommitSha,
    changedFiles,
    ...(resolution.nextUnit ? { nextUnit: resolution.nextUnit.id } : {}),
  };
  const rollbackArtifactPath = writeRollbackArtifact(definition, cwd, rollbackArtifact);

  writeRuntimeStatusSection(definition, cwd, {
    operation: "rollback",
    runId: trackerEntry.lastRunId ?? `rollback-${unit.id.toLowerCase()}`,
    unitId: unit.id,
    title: unit.title,
    runner: "rollback",
    attemptNumber: trackerEntry.attemptCount,
    finalState: "blocked",
    nextUnit: resolution.nextUnit?.id,
    artifactPaths: [path.relative(cwd, rollbackArtifactPath)],
    updatedAt: now.toISOString(),
    details: [
      `Original commit SHA: ${trackerEntry.commitSha}`,
      `Rollback commit SHA: ${rollbackCommitSha}`,
    ],
  });

  return {
    unit,
    originalCommitSha: trackerEntry.commitSha,
    rollbackCommitSha,
    rollbackArtifactPath,
    ...(resolution.nextUnit ? { nextUnit: resolution.nextUnit.id } : {}),
  };
}
