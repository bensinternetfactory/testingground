import type { BaselineSnapshot, BuildValidatorResult, ValidationIssue } from "../types.ts";
import { defaultCommandExecutor, type CommandExecutor, getOutputExcerpt } from "./command.ts";

interface BuildRunOptions {
  command?: string[];
  executor?: CommandExecutor;
}

export function runBuildValidator(
  cwd: string,
  options: BuildRunOptions = {},
): BuildValidatorResult {
  const executor = options.executor ?? defaultCommandExecutor;
  const command = options.command ?? ["npm", "run", "build"];
  const execution = executor(command[0]!, command.slice(1), cwd);
  const issues: ValidationIssue[] = [];

  if (execution.exitCode !== 0) {
    issues.push({
      code: "build-command-failed",
      message: `Build command exited with code ${execution.exitCode}.`,
      details: getOutputExcerpt(execution),
    });
  }

  const ok = issues.length === 0;

  return {
    validator: "build",
    status: ok ? "passed" : "failed",
    ok,
    summary: ok ? "Build completed successfully." : "Build failed.",
    issues,
    command: execution.command,
  };
}

export function createBaselineBuildSnapshot(
  result: BuildValidatorResult,
): BaselineSnapshot["build"] {
  return result.ok
    ? {
        status: "passed",
        notes: result.summary,
      }
    : {
        status: "failed",
        notes: result.summary,
      };
}
