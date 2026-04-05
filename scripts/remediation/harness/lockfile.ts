import fs from "node:fs";
import path from "node:path";
import type {
  RemediationLockFile,
  RemediationProgramDefinition,
  RemediationWave,
  RunnerAdapterName,
} from "../types.ts";
import { REMEDIATION_WAVES, RUNNER_ADAPTERS } from "../types.ts";

export const DEFAULT_STALE_LOCK_MS = 2 * 60 * 60 * 1000;
const LOCK_FILE_NAME = "active-lock.json";

interface LockfileOptions {
  now?: Date;
  staleAfterMs?: number;
  isProcessAlive?: (pid: number) => boolean;
}

export interface LockInspection {
  exists: boolean;
  path: string;
  lock?: RemediationLockFile;
  ageMs?: number;
  pidActive?: boolean;
  isStale: boolean;
}

export interface AcquireLockInput {
  unitId: string;
  wave: RemediationWave;
  runner: RunnerAdapterName;
  pid?: number;
  timestamp?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isWave(value: unknown): value is RemediationWave {
  return typeof value === "number" && REMEDIATION_WAVES.includes(value as RemediationWave);
}

function isRunner(value: unknown): value is RunnerAdapterName {
  return typeof value === "string" && RUNNER_ADAPTERS.includes(value as RunnerAdapterName);
}

function defaultProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function getProgramLockPath(
  definition: RemediationProgramDefinition,
  cwd: string,
): string {
  return path.resolve(cwd, definition.program.artifactRoot, LOCK_FILE_NAME);
}

export function parseLockFileContents(raw: string): RemediationLockFile {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Lock file is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Lock file must contain an object.");
  }

  const { pid, programId, runner, timestamp, unitId, wave } = parsed;

  if (typeof programId !== "string" || programId.trim().length === 0) {
    throw new Error("Lock file must declare a non-empty programId.");
  }

  if (typeof unitId !== "string" || unitId.trim().length === 0) {
    throw new Error("Lock file must declare a non-empty unitId.");
  }

  if (!isWave(wave)) {
    throw new Error("Lock file must declare a valid remediation wave.");
  }

  if (typeof pid !== "number" || !Number.isInteger(pid) || pid <= 0) {
    throw new Error("Lock file must declare a positive integer pid.");
  }

  if (!isRunner(runner)) {
    throw new Error("Lock file must declare a valid runner.");
  }

  if (typeof timestamp !== "string" || Number.isNaN(Date.parse(timestamp))) {
    throw new Error("Lock file must declare an ISO timestamp.");
  }

  return {
    programId,
    unitId,
    wave,
    pid,
    runner,
    timestamp,
  };
}

export function inspectProgramLock(
  definition: RemediationProgramDefinition,
  cwd: string,
  options: LockfileOptions = {},
): LockInspection {
  const lockPath = getProgramLockPath(definition, cwd);

  if (!fs.existsSync(lockPath)) {
    return {
      exists: false,
      path: lockPath,
      isStale: false,
    };
  }

  const lock = parseLockFileContents(fs.readFileSync(lockPath, "utf8"));

  if (lock.programId !== definition.program.programId) {
    throw new Error(
      `Lock file programId ${lock.programId} does not match ${definition.program.programId}.`,
    );
  }

  const now = options.now ?? new Date();
  const staleAfterMs = options.staleAfterMs ?? DEFAULT_STALE_LOCK_MS;
  const isProcessAlive = options.isProcessAlive ?? defaultProcessAlive;
  const ageMs = Math.max(now.getTime() - new Date(lock.timestamp).getTime(), 0);
  const pidActive = isProcessAlive(lock.pid);
  const isStale = !pidActive && ageMs >= staleAfterMs;

  return {
    exists: true,
    path: lockPath,
    lock,
    ageMs,
    pidActive,
    isStale,
  };
}

export function acquireProgramLock(
  definition: RemediationProgramDefinition,
  cwd: string,
  input: AcquireLockInput,
  options: LockfileOptions = {},
): RemediationLockFile {
  const inspection = inspectProgramLock(definition, cwd, options);

  if (inspection.exists) {
    const ageMinutes = Math.floor((inspection.ageMs ?? 0) / 60000);

    if (inspection.isStale) {
      throw new Error(
        `Cannot acquire lock for ${definition.program.programId}; a stale lock remains at ${path.relative(cwd, inspection.path)} for ${inspection.lock?.unitId}. Clear it with unlock-stale first.`,
      );
    }

    throw new Error(
      `Cannot acquire lock for ${definition.program.programId}; ${inspection.lock?.unitId} is already locked by PID ${inspection.lock?.pid} (${ageMinutes}m old).`,
    );
  }

  fs.mkdirSync(path.dirname(inspection.path), { recursive: true });

  const lock: RemediationLockFile = {
    programId: definition.program.programId,
    unitId: input.unitId,
    wave: input.wave,
    pid: input.pid ?? process.pid,
    runner: input.runner,
    timestamp: input.timestamp ?? (options.now ?? new Date()).toISOString(),
  };

  fs.writeFileSync(inspection.path, `${JSON.stringify(lock, null, 2)}\n`, { flag: "wx" });
  return lock;
}

export function releaseProgramLock(
  definition: RemediationProgramDefinition,
  cwd: string,
): boolean {
  const lockPath = getProgramLockPath(definition, cwd);

  if (!fs.existsSync(lockPath)) {
    return false;
  }

  fs.rmSync(lockPath);
  return true;
}

export function unlockStaleProgramLock(
  definition: RemediationProgramDefinition,
  cwd: string,
  options: LockfileOptions = {},
): RemediationLockFile {
  const inspection = inspectProgramLock(definition, cwd, options);

  if (!inspection.exists || !inspection.lock) {
    throw new Error(`No lock file exists for ${definition.program.programId}.`);
  }

  if (!inspection.isStale) {
    throw new Error(
      `Lock for ${inspection.lock.unitId} is not stale and cannot be cleared safely.`,
    );
  }

  fs.rmSync(inspection.path);
  return inspection.lock;
}
