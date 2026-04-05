import type { RemediationRunner, RunnerCommandExecutor } from "./adapter.ts";
import type { RunnerExecutionInput } from "./adapter.ts";
import {
  buildRunnerOutputSchema,
  captureChangedFilesDuringRun,
  DEFAULT_RUNNER_TIMEOUT_MS,
  defaultRunnerCommandExecutor,
  mapCommandResultToRunnerResult,
} from "./shared.ts";

export interface ClaudeRunnerOptions {
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
    "- Default visualSurfaceChanged to false unless this unit explicitly required a visible UI change you made.",
    "- Do not wrap the JSON in markdown fences.",
  ].join("\n");
}

export function createClaudeRunner(options: ClaudeRunnerOptions = {}): RemediationRunner {
  const commandExecutor = options.commandExecutor ?? defaultRunnerCommandExecutor;
  const timeoutMs = options.timeoutMs ?? DEFAULT_RUNNER_TIMEOUT_MS;

  return {
    adapter: "claude",
    run(input) {
      const { execution, changedFiles } = captureChangedFilesDuringRun(input.cwd, () =>
        commandExecutor(
          "claude",
          [
            "--print",
            "--input-format",
            "text",
            "--output-format",
            "json",
            "--json-schema",
            JSON.stringify(buildRunnerOutputSchema()),
            "--permission-mode",
            "dontAsk",
          ],
          {
            cwd: input.cwd,
            input: createAdapterPrompt(input),
            timeoutMs,
          },
        ),
      );

      return mapCommandResultToRunnerResult("claude", execution, changedFiles, execution.stdout);
    },
  };
}
