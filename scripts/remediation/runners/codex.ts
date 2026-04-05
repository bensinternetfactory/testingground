import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { RemediationRunner, RunnerCommandExecutor } from "./adapter.ts";
import type { RunnerExecutionInput } from "./adapter.ts";
import {
  buildRunnerOutputSchema,
  captureChangedFilesDuringRun,
  DEFAULT_RUNNER_TIMEOUT_MS,
  defaultRunnerCommandExecutor,
  mapCommandResultToRunnerResult,
} from "./shared.ts";

export interface CodexRunnerOptions {
  commandExecutor?: RunnerCommandExecutor;
  timeoutMs?: number;
}

function createAdapterPrompt(input: RunnerExecutionInput): string {
  return [
    input.payload.renderedPrompt,
    "",
    "Final response requirements:",
    "- Return exactly one JSON object matching the provided output schema.",
    "- Keep browserObservations and visualObservations empty arrays unless you actually performed those checks.",
    "- Default visualSurfaceChanged to false unless you intentionally changed visible UI surface required by the unit.",
    "- Do not wrap the JSON in markdown fences.",
  ].join("\n");
}

export function createCodexRunner(options: CodexRunnerOptions = {}): RemediationRunner {
  const commandExecutor = options.commandExecutor ?? defaultRunnerCommandExecutor;
  const timeoutMs = options.timeoutMs ?? DEFAULT_RUNNER_TIMEOUT_MS;

  return {
    adapter: "codex",
    run(input) {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "remediation-codex-"));
      const schemaPath = path.join(tempDir, "runner-output-schema.json");
      const outputPath = path.join(tempDir, "runner-output.json");
      fs.writeFileSync(schemaPath, JSON.stringify(buildRunnerOutputSchema(), null, 2));

      try {
        const { execution, changedFiles } = captureChangedFilesDuringRun(input.cwd, () =>
          commandExecutor(
            "codex",
            [
              "exec",
              "--cd",
              input.cwd,
              "--sandbox",
              "workspace-write",
              "--skip-git-repo-check",
              "--color",
              "never",
              "--output-schema",
              schemaPath,
              "--output-last-message",
              outputPath,
              "-",
            ],
            {
              cwd: input.cwd,
              input: createAdapterPrompt(input),
              timeoutMs,
            },
          ),
        );
        const structuredOutputRaw = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : undefined;

        return mapCommandResultToRunnerResult("codex", execution, changedFiles, structuredOutputRaw);
      } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    },
  };
}
