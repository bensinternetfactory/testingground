import type { TestValidatorResult, ValidationIssue } from "../types.ts";
import { defaultCommandExecutor, type CommandExecutor, getOutputExcerpt } from "./command.ts";

interface TestRunOptions {
  required: boolean;
  command?: string[];
  executor?: CommandExecutor;
}

export function runTestValidator(
  cwd: string,
  options: TestRunOptions,
): TestValidatorResult {
  if (!options.required) {
    return {
      validator: "test",
      status: "not-required",
      ok: true,
      summary: "Tests are not required for this remediation unit.",
      issues: [],
      required: false,
    };
  }

  const executor = options.executor ?? defaultCommandExecutor;
  const command = options.command ?? ["npm", "test"];
  const execution = executor(command[0]!, command.slice(1), cwd);
  const issues: ValidationIssue[] = [];

  if (execution.exitCode !== 0) {
    issues.push({
      code: "test-command-failed",
      message: `Test command exited with code ${execution.exitCode}.`,
      details: getOutputExcerpt(execution),
    });
  }

  const ok = issues.length === 0;

  return {
    validator: "test",
    status: ok ? "passed" : "failed",
    ok,
    summary: ok ? "Tests completed successfully." : "Tests failed.",
    issues,
    required: true,
    command: execution.command,
  };
}
