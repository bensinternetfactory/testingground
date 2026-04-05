import fs from "node:fs";
import path from "node:path";
import type { BaselineSnapshot, LintValidatorResult, ValidationIssue } from "../types.ts";
import { defaultCommandExecutor, type CommandExecutor, getOutputExcerpt } from "./command.ts";

interface LintRunOptions {
  command?: string[];
  executor?: CommandExecutor;
}

interface ParsedLintSummary {
  warningCount: number;
  errorCount: number;
}

function resolveLintCommand(cwd: string): string[] {
  const localBinary = path.resolve(cwd, "node_modules/.bin/eslint");
  return fs.existsSync(localBinary)
    ? [localBinary, ".", "--format", "json"]
    : ["eslint", ".", "--format", "json"];
}

function parseLintSummary(stdout: string): ParsedLintSummary | undefined {
  if (!stdout.trim()) {
    return undefined;
  }

  const parsed = JSON.parse(stdout) as Array<{ warningCount?: number; errorCount?: number }>;

  if (!Array.isArray(parsed)) {
    return undefined;
  }

  return parsed.reduce<ParsedLintSummary>(
    (summary, fileResult) => ({
      warningCount: summary.warningCount + (fileResult.warningCount ?? 0),
      errorCount: summary.errorCount + (fileResult.errorCount ?? 0),
    }),
    { warningCount: 0, errorCount: 0 },
  );
}

export function runLintValidator(
  cwd: string,
  options: LintRunOptions = {},
): LintValidatorResult {
  const executor = options.executor ?? defaultCommandExecutor;
  const command = options.command ?? resolveLintCommand(cwd);
  const execution = executor(command[0]!, command.slice(1), cwd);
  const issues: ValidationIssue[] = [];
  let warningCount = 0;
  let errorCount = 0;

  try {
    const summary = parseLintSummary(execution.stdout);

    if (!summary) {
      issues.push({
        code: "lint-output-unparseable",
        message: "Lint output was not valid JSON.",
        details: getOutputExcerpt(execution),
      });
    } else {
      warningCount = summary.warningCount;
      errorCount = summary.errorCount;
    }
  } catch {
    issues.push({
      code: "lint-output-unparseable",
      message: "Lint output was not valid JSON.",
      details: getOutputExcerpt(execution),
    });
  }

  if (errorCount > 0) {
    issues.push({
      code: "lint-errors-present",
      message: `Lint reported ${errorCount} error(s).`,
    });
  }

  if (execution.exitCode !== 0 && errorCount === 0) {
    issues.push({
      code: "lint-command-failed",
      message: `Lint command exited with code ${execution.exitCode}.`,
      details: getOutputExcerpt(execution),
    });
  }

  const ok = issues.length === 0;
  const summary = ok
    ? warningCount > 0
      ? `Lint completed with ${warningCount} warning(s) recorded for baseline enforcement.`
      : "Lint completed with no warnings."
    : `Lint failed with ${errorCount} error(s) and ${warningCount} warning(s).`;

  return {
    validator: "lint",
    status: ok ? "passed" : "failed",
    ok,
    summary,
    issues,
    command: execution.command,
    warningCount,
    errorCount,
  };
}

export function createBaselineLintSnapshot(
  result: LintValidatorResult,
): BaselineSnapshot["lint"] {
  if (!result.ok) {
    return {
      status: "failed",
      warningCount: result.warningCount,
      notes: result.summary,
    };
  }

  if (result.warningCount > 0) {
    return {
      status: "warning-count-recorded",
      warningCount: result.warningCount,
      notes: result.summary,
    };
  }

  return {
    status: "passed",
    notes: result.summary,
  };
}
