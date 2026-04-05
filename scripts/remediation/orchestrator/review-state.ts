import { execFileSync } from "node:child_process";
import path from "node:path";
import {
  getLatestReviewPacketPath,
  readLatestReviewPacket,
} from "../harness/artifacts.ts";
import { readTrackerState } from "../harness/tracker.ts";
import type {
  RemediationProgramDefinition,
  RemediationTrackerEntry,
  RemediationUnit,
  ReviewPacket,
} from "../types.ts";

export interface PendingReviewContext {
  trackerEntries: RemediationTrackerEntry[];
  trackerEntry: RemediationTrackerEntry;
  unit: RemediationUnit;
  reviewPacket: ReviewPacket;
  reviewPacketPath: string;
}

function normalizeFiles(files: string[]): string[] {
  return [...new Set(files)].sort((left, right) => left.localeCompare(right));
}

export function listStagedFiles(cwd: string): string[] {
  try {
    const output = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (!output) {
      return [];
    }

    return normalizeFiles(
      output
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean),
    );
  } catch {
    return [];
  }
}

export function unstageFiles(cwd: string, files: string[]) {
  if (files.length === 0) {
    return;
  }

  execFileSync("git", ["reset", "HEAD", "--", ...files], {
    cwd,
    stdio: ["ignore", "ignore", "pipe"],
  });
}

export function listFilesForCommit(cwd: string, commitSha: string): string[] {
  const output = execFileSync("git", ["show", "--pretty=format:", "--name-only", commitSha], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();

  if (!output) {
    return [];
  }

  return normalizeFiles(
    output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  );
}

function sameFiles(left: string[], right: string[]): boolean {
  const normalizedLeft = normalizeFiles(left);
  const normalizedRight = normalizeFiles(right);

  return normalizedLeft.length === normalizedRight.length
    && normalizedLeft.every((value, index) => value === normalizedRight[index]);
}

export function assertMatchingStagedFiles(
  stagedFiles: string[],
  expectedFiles: string[],
) {
  if (!sameFiles(stagedFiles, expectedFiles)) {
    throw new Error(
      `Staged files do not match the persisted review packet. Expected ${expectedFiles.join(", ") || "none"}, received ${stagedFiles.join(", ") || "none"}.`,
    );
  }
}

export function resolvePendingReviewContext(
  definition: RemediationProgramDefinition,
  cwd: string,
  unitId?: string,
): PendingReviewContext {
  const trackerState = readTrackerState(definition, cwd);
  const inProgressEntries = trackerState.tracker.entries.filter((entry) => entry.state === "in-progress");
  const selectedEntry = unitId
    ? inProgressEntries.find((entry) => entry.unitId === unitId)
    : inProgressEntries.length === 1
      ? inProgressEntries[0]
      : undefined;

  if (!selectedEntry) {
    if (unitId) {
      throw new Error(`No in-progress remediation unit exists for ${unitId}.`);
    }

    throw new Error(
      inProgressEntries.length === 0
        ? "No in-progress remediation unit is awaiting approval."
        : "Multiple in-progress remediation units exist; rerun with --unit to disambiguate.",
    );
  }

  const reviewPacket = readLatestReviewPacket(definition, cwd);

  if (!reviewPacket) {
    throw new Error("The latest review packet is missing; approve/reject cannot resume.");
  }

  if (reviewPacket.unitId !== selectedEntry.unitId) {
    throw new Error(
      `Latest review packet targets ${reviewPacket.unitId}, but tracker expects ${selectedEntry.unitId}.`,
    );
  }

  if (selectedEntry.lastRunId && reviewPacket.runId !== selectedEntry.lastRunId) {
    throw new Error(
      `Latest review packet run ${reviewPacket.runId} does not match tracker run ${selectedEntry.lastRunId}.`,
    );
  }

  const unit = definition.units.find((candidate) => candidate.id === selectedEntry.unitId);

  if (!unit) {
    throw new Error(`Unknown remediation unit ${selectedEntry.unitId}.`);
  }

  return {
    trackerEntries: trackerState.tracker.entries,
    trackerEntry: selectedEntry,
    unit,
    reviewPacket,
    reviewPacketPath: path.relative(cwd, getLatestReviewPacketPath(definition, cwd)),
  };
}
