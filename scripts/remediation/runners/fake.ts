import fs from "node:fs";
import path from "node:path";
import type {
  BrowserCheckObservation,
  RunnerExecutionResult,
  VisualCheckObservation,
} from "../types.ts";
import type { RemediationRunner, RunnerExecutionInput } from "./adapter.ts";

export type FakeRunnerScenario =
  | "success"
  | "timeout"
  | "malformed-output"
  | "touches-disallowed-file"
  | "crash"
  | "visual-surface-change";

export interface FakeRunnerOptions {
  scenario?: FakeRunnerScenario;
  fileWrites?: Record<string, string>;
  changedFiles?: string[];
  browserObservations?: BrowserCheckObservation[];
  visualObservations?: VisualCheckObservation[];
  summary?: string;
  details?: string[];
}

function ensureParentDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeScenarioFiles(cwd: string, fileWrites: Record<string, string> | undefined) {
  if (!fileWrites) {
    return;
  }

  for (const [relativePath, contents] of Object.entries(fileWrites)) {
    const filePath = path.resolve(cwd, relativePath);
    ensureParentDir(filePath);
    fs.writeFileSync(filePath, contents);
  }
}

export function createFakeRunner(
  options: FakeRunnerOptions = {},
): RemediationRunner {
  return {
    adapter: "fake",
    run(input: RunnerExecutionInput): RunnerExecutionResult {
      const scenario = options.scenario ?? "success";
      const primaryAllowedFile = input.unit.allowedFiles[0] ?? "README.md";
      const changedFiles =
        options.changedFiles
        ?? Object.keys(options.fileWrites ?? {})
        ?? [primaryAllowedFile];

      switch (scenario) {
        case "timeout":
          return {
            status: "timed-out",
            summary: options.summary ?? "Fake runner timed out before returning a valid result.",
            changedFiles,
            details: options.details,
          };
        case "malformed-output":
          return {
            status: "malformed-output",
            summary: options.summary ?? "Fake runner returned malformed output.",
            changedFiles,
            details: options.details,
          };
        case "crash":
          return {
            status: "crashed",
            summary: options.summary ?? "Fake runner crashed during execution.",
            changedFiles,
            details: options.details,
          };
        case "touches-disallowed-file":
          writeScenarioFiles(
            input.cwd,
            options.fileWrites ?? {
              [primaryAllowedFile]: `fake runner update for ${input.unit.id}\n`,
              "app/disallowed.tsx": "export const touched = true;\n",
            },
          );
          return {
            status: "completed",
            summary: options.summary ?? "Fake runner completed with a disallowed file change.",
            changedFiles: options.changedFiles ?? [primaryAllowedFile, "app/disallowed.tsx"],
            browserObservations: options.browserObservations,
            visualObservations: options.visualObservations,
            visualSurfaceChanged: options.visualObservations?.some((entry) => entry.changed) ?? false,
            details: options.details,
          };
        case "visual-surface-change":
          writeScenarioFiles(
            input.cwd,
            options.fileWrites ?? {
              [primaryAllowedFile]: `fake runner update for ${input.unit.id}\n`,
            },
          );
          return {
            status: "completed",
            summary: options.summary ?? "Fake runner reported a visual surface change.",
            changedFiles,
            browserObservations: options.browserObservations,
            visualObservations: options.visualObservations,
            visualSurfaceChanged: true,
            details: options.details,
          };
        case "success":
        default:
          writeScenarioFiles(
            input.cwd,
            options.fileWrites ?? {
              [primaryAllowedFile]: `fake runner update for ${input.unit.id}\n`,
            },
          );
          return {
            status: "completed",
            summary: options.summary ?? "Fake runner completed successfully.",
            changedFiles,
            browserObservations: options.browserObservations,
            visualObservations: options.visualObservations,
            visualSurfaceChanged: options.visualObservations?.some((entry) => entry.changed) ?? false,
            details: options.details,
          };
      }
    },
  };
}
