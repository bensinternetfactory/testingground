import { spawnSync } from "node:child_process";
import { execFileSync } from "node:child_process";
import type {
  BrowserCheckObservation,
  RunnerExecutionResult,
  VisualCheckObservation,
} from "../types.ts";
import type {
  RunnerCommandExecutionOptions,
  RunnerCommandExecutionResult,
} from "./adapter.ts";

interface GitStatusSnapshot {
  entries: Map<string, string>;
}

interface StructuredRunnerOutput {
  summary: string;
  details: string[];
  browserObservations: BrowserCheckObservation[];
  visualObservations: VisualCheckObservation[];
  visualSurfaceChanged: boolean;
}

export const DEFAULT_RUNNER_TIMEOUT_MS = 10 * 60 * 1000;

export function defaultRunnerCommandExecutor(
  command: string,
  args: string[],
  options: RunnerCommandExecutionOptions,
): RunnerCommandExecutionResult {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    input: options.input,
    encoding: "utf8",
    timeout: options.timeoutMs,
    stdio: ["pipe", "pipe", "pipe"],
    maxBuffer: 10 * 1024 * 1024,
  });

  return {
    command: [command, ...args],
    exitCode: result.status,
    signal: result.signal,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    timedOut: result.error?.name === "Error" && "code" in result.error
      ? result.error.code === "ETIMEDOUT"
      : false,
    errorMessage: result.error?.message,
  };
}

function normalizeGitStatusPath(rawPath: string): string {
  return rawPath.includes(" -> ") ? rawPath.split(" -> ").at(-1) ?? rawPath : rawPath;
}

function readGitStatusSnapshot(cwd: string): GitStatusSnapshot {
  try {
    const output = execFileSync("git", ["status", "--porcelain"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const entries = new Map<string, string>();

    for (const line of output.split(/\r?\n/)) {
      if (!line.trim()) {
        continue;
      }

      const status = line.slice(0, 2);
      const rawPath = line.slice(3).trim();
      const filePath = normalizeGitStatusPath(rawPath);

      if (filePath) {
        entries.set(filePath, status);
      }
    }

    return { entries };
  } catch {
    return { entries: new Map() };
  }
}

export function captureChangedFilesDuringRun(cwd: string, execute: () => RunnerCommandExecutionResult): {
  execution: RunnerCommandExecutionResult;
  changedFiles: string[];
} {
  const before = readGitStatusSnapshot(cwd);
  const execution = execute();
  const after = readGitStatusSnapshot(cwd);
  const allPaths = new Set<string>([
    ...before.entries.keys(),
    ...after.entries.keys(),
  ]);

  const changedFiles = [...allPaths]
    .filter((filePath) => before.entries.get(filePath) !== after.entries.get(filePath))
    .sort();

  return {
    execution,
    changedFiles,
  };
}

export function buildRunnerOutputSchema() {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      summary: { type: "string" },
      details: {
        type: "array",
        items: { type: "string" },
      },
      browserObservations: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            route: { type: "string" },
            viewport: { enum: ["desktop", "mobile"] },
            assertionsPassed: {
              type: "array",
              items: { type: "string" },
            },
            status: { enum: ["passed", "failed"] },
            notes: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["route", "viewport", "assertionsPassed", "status", "notes"],
        },
      },
      visualObservations: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            route: { type: "string" },
            viewport: { enum: ["desktop", "mobile"] },
            comparison: { enum: ["matched", "approved-change", "unexpected-change", "error"] },
            changed: { type: "boolean" },
            artifactPath: { type: "string" },
            notes: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["route", "viewport", "comparison", "changed", "notes"],
        },
      },
      visualSurfaceChanged: { type: "boolean" },
    },
    required: [
      "summary",
      "details",
      "browserObservations",
      "visualObservations",
      "visualSurfaceChanged",
    ],
  };
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function parseBrowserObservations(value: unknown): BrowserCheckObservation[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const observations: BrowserCheckObservation[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") {
      return undefined;
    }

    const route = "route" in item ? item.route : undefined;
    const viewport = "viewport" in item ? item.viewport : undefined;
    const assertionsPassed = "assertionsPassed" in item ? item.assertionsPassed : undefined;
    const status = "status" in item ? item.status : undefined;
    const notes = "notes" in item ? item.notes : undefined;

    if (
      typeof route !== "string"
      || (viewport !== "desktop" && viewport !== "mobile")
      || !isStringArray(assertionsPassed)
      || (status !== "passed" && status !== "failed")
      || !isStringArray(notes)
    ) {
      return undefined;
    }

    observations.push({
      route,
      viewport,
      assertionsPassed,
      status,
      ...(notes.length > 0 ? { notes } : {}),
    });
  }

  return observations;
}

function parseVisualObservations(value: unknown): VisualCheckObservation[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const observations: VisualCheckObservation[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") {
      return undefined;
    }

    const route = "route" in item ? item.route : undefined;
    const viewport = "viewport" in item ? item.viewport : undefined;
    const comparison = "comparison" in item ? item.comparison : undefined;
    const changed = "changed" in item ? item.changed : undefined;
    const artifactPath = "artifactPath" in item ? item.artifactPath : undefined;
    const notes = "notes" in item ? item.notes : undefined;

    if (
      typeof route !== "string"
      || (viewport !== "desktop" && viewport !== "mobile")
      || (
        comparison !== "matched"
        && comparison !== "approved-change"
        && comparison !== "unexpected-change"
        && comparison !== "error"
      )
      || typeof changed !== "boolean"
      || (artifactPath !== undefined && typeof artifactPath !== "string")
      || !isStringArray(notes)
    ) {
      return undefined;
    }

    observations.push({
      route,
      viewport,
      comparison,
      changed,
      ...(artifactPath ? { artifactPath } : {}),
      ...(notes.length > 0 ? { notes } : {}),
    });
  }

  return observations;
}

export function parseStructuredRunnerOutput(rawOutput: string): StructuredRunnerOutput | undefined {
  const trimmed = rawOutput.trim();

  if (!trimmed) {
    return undefined;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return undefined;
  }

  const candidate =
    parsed && typeof parsed === "object" && "result" in parsed && parsed.result && typeof parsed.result === "object"
      ? parsed.result
      : parsed;

  if (!candidate || typeof candidate !== "object") {
    return undefined;
  }

  const summary = "summary" in candidate ? candidate.summary : undefined;
  const details = "details" in candidate ? candidate.details : undefined;
  const browserObservations =
    "browserObservations" in candidate ? parseBrowserObservations(candidate.browserObservations) : undefined;
  const visualObservations =
    "visualObservations" in candidate ? parseVisualObservations(candidate.visualObservations) : undefined;
  const visualSurfaceChanged =
    "visualSurfaceChanged" in candidate ? candidate.visualSurfaceChanged : undefined;

  if (
    typeof summary !== "string"
    || !isStringArray(details)
    || !browserObservations
    || !visualObservations
    || typeof visualSurfaceChanged !== "boolean"
  ) {
    return undefined;
  }

  return {
    summary,
    details,
    browserObservations,
    visualObservations,
    visualSurfaceChanged,
  };
}

function getOutputExcerpt(stdout: string, stderr: string, maxLines = 8): string[] {
  const joined = [stdout, stderr]
    .filter(Boolean)
    .join("\n")
    .trim();

  if (!joined) {
    return [];
  }

  return joined
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(-maxLines);
}

export function mapCommandResultToRunnerResult(
  adapter: "codex" | "claude",
  execution: RunnerCommandExecutionResult,
  changedFiles: string[],
  structuredOutputRaw: string | undefined,
): RunnerExecutionResult {
  if (execution.timedOut) {
    return {
      status: "timed-out",
      summary: `${adapter} runner timed out before returning a structured result.`,
      changedFiles,
      details: getOutputExcerpt(execution.stdout, execution.stderr),
    };
  }

  if (execution.exitCode !== 0 || execution.signal) {
    const signalDetail = execution.signal ? ` (signal: ${execution.signal})` : "";
    return {
      status: "crashed",
      summary: `${adapter} runner exited abnormally with code ${execution.exitCode ?? "null"}${signalDetail}.`,
      changedFiles,
      details: getOutputExcerpt(execution.stdout, execution.stderr),
    };
  }

  const structuredOutput = parseStructuredRunnerOutput(structuredOutputRaw ?? execution.stdout);

  if (!structuredOutput) {
    return {
      status: "malformed-output",
      summary: `${adapter} runner completed but did not return valid structured JSON output.`,
      changedFiles,
      details: getOutputExcerpt(execution.stdout, execution.stderr),
    };
  }

  return {
    status: "completed",
    summary: structuredOutput.summary,
    changedFiles,
    details: structuredOutput.details,
    browserObservations: structuredOutput.browserObservations,
    visualObservations: structuredOutput.visualObservations,
    visualSurfaceChanged: structuredOutput.visualSurfaceChanged,
  };
}
