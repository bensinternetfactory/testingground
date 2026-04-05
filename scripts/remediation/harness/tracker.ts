import fs from "node:fs";
import path from "node:path";
import type {
  RemediationProgramDefinition,
  RemediationTrackerEntry,
  RemediationTrackerFile,
} from "../types.ts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseTrackerEntry(value: unknown, index: number): RemediationTrackerEntry {
  if (!isRecord(value)) {
    throw new Error(`Tracker entry at index ${index} must be an object.`);
  }

  const { attemptCount, state, unitId } = value;

  if (typeof unitId !== "string" || unitId.trim().length === 0) {
    throw new Error(`Tracker entry at index ${index} is missing a valid unitId.`);
  }

  if (typeof state !== "string" || state.trim().length === 0) {
    throw new Error(`Tracker entry ${unitId} is missing a valid state.`);
  }

  if (!Number.isInteger(attemptCount)) {
    throw new Error(`Tracker entry ${unitId} must declare an integer attemptCount.`);
  }

  return {
    unitId,
    state,
    attemptCount,
    ...(typeof value.commitSha === "string" ? { commitSha: value.commitSha } : {}),
    ...(typeof value.lastRunId === "string" ? { lastRunId: value.lastRunId } : {}),
    ...(typeof value.blockedReason === "string" ? { blockedReason: value.blockedReason } : {}),
    ...(typeof value.unblockAction === "string" ? { unblockAction: value.unblockAction } : {}),
    ...(typeof value.notes === "string" ? { notes: value.notes } : {}),
  } as RemediationTrackerEntry;
}

export function parseTrackerFileContents(raw: string): RemediationTrackerFile {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Tracker file is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Tracker file must contain an object.");
  }

  if (typeof parsed.programId !== "string" || parsed.programId.trim().length === 0) {
    throw new Error("Tracker file must declare a non-empty programId.");
  }

  if (!Array.isArray(parsed.entries)) {
    throw new Error("Tracker file must declare an entries array.");
  }

  return {
    programId: parsed.programId,
    entries: parsed.entries.map((entry, index) => parseTrackerEntry(entry, index)),
  };
}

export interface LoadedTrackerState {
  exists: boolean;
  path: string;
  tracker: RemediationTrackerFile;
  warnings: string[];
}

export function readTrackerState(
  definition: RemediationProgramDefinition,
  cwd: string,
): LoadedTrackerState {
  const trackerPath = path.resolve(cwd, definition.program.trackerPath);

  if (!fs.existsSync(trackerPath)) {
    return {
      exists: false,
      path: trackerPath,
      tracker: {
        programId: definition.program.programId,
        entries: [],
      },
      warnings: [
        `Tracker file does not exist yet at ${definition.program.trackerPath}; using an empty tracker.`,
      ],
    };
  }

  const tracker = parseTrackerFileContents(fs.readFileSync(trackerPath, "utf8"));

  if (tracker.programId !== definition.program.programId) {
    throw new Error(
      `Tracker file programId ${tracker.programId} does not match ${definition.program.programId}.`,
    );
  }

  return {
    exists: true,
    path: trackerPath,
    tracker,
    warnings: [],
  };
}
