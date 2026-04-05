import type {
  BaselineComparatorResult,
  BaselineSnapshot,
  BuildValidatorResult,
  LintValidatorResult,
  RemediationProgramConfig,
  ValidationIssue,
} from "../types.ts";

interface BaselineComparatorOptions {
  program: RemediationProgramConfig;
  baseline: BaselineSnapshot;
  lintResult?: LintValidatorResult;
  buildResult?: BuildValidatorResult;
}

export function compareToBaseline(
  options: BaselineComparatorOptions,
): BaselineComparatorResult {
  const checks: BaselineComparatorResult["checks"] = [];
  const issues: ValidationIssue[] = [];

  if (options.program.baselineConfig.enforceLintBaseline) {
    if (!options.lintResult) {
      checks.push({
        metric: "lint",
        ok: false,
        message: "Lint baseline enforcement requires a current lint result.",
      });
      issues.push({
        code: "baseline-lint-result-missing",
        message: "Lint baseline enforcement requires a current lint result.",
      });
    } else if (options.baseline.lint.status === "pending" || options.baseline.lint.status === "failed") {
      checks.push({
        metric: "lint",
        ok: false,
        message: "Baseline lint snapshot is not usable for enforcement.",
        baselineValue: options.baseline.lint.status,
      });
      issues.push({
        code: "baseline-lint-unusable",
        message: "Baseline lint snapshot is not usable for enforcement.",
      });
    } else if (!options.lintResult.ok) {
      checks.push({
        metric: "lint",
        ok: false,
        message: "Current lint run failed.",
        baselineValue: options.baseline.lint.status,
        currentValue: "failed",
      });
      issues.push({
        code: "baseline-lint-current-failed",
        message: "Current lint run failed relative to baseline.",
      });
    } else {
      const baselineWarningCount =
        options.baseline.lint.status === "warning-count-recorded"
          ? options.baseline.lint.warningCount ?? 0
          : 0;
      const ok = options.lintResult.warningCount <= baselineWarningCount;

      checks.push({
        metric: "lint",
        ok,
        message: ok
          ? `Lint warning count stayed within the baseline (${options.lintResult.warningCount}/${baselineWarningCount}).`
          : `Lint warning count regressed from ${baselineWarningCount} to ${options.lintResult.warningCount}.`,
        baselineValue: String(baselineWarningCount),
        currentValue: String(options.lintResult.warningCount),
      });

      if (!ok) {
        issues.push({
          code: "baseline-lint-regressed",
          message: `Lint warning count regressed from ${baselineWarningCount} to ${options.lintResult.warningCount}.`,
        });
      }
    }
  }

  if (options.program.baselineConfig.enforceBuildBaseline) {
    if (!options.buildResult) {
      checks.push({
        metric: "build",
        ok: false,
        message: "Build baseline enforcement requires a current build result.",
      });
      issues.push({
        code: "baseline-build-result-missing",
        message: "Build baseline enforcement requires a current build result.",
      });
    } else if (options.baseline.build.status !== "passed") {
      checks.push({
        metric: "build",
        ok: false,
        message: "Baseline build snapshot is not usable for enforcement.",
        baselineValue: options.baseline.build.status,
      });
      issues.push({
        code: "baseline-build-unusable",
        message: "Baseline build snapshot is not usable for enforcement.",
      });
    } else {
      const ok = options.buildResult.ok;

      checks.push({
        metric: "build",
        ok,
        message: ok
          ? "Build status matched the passing baseline."
          : "Build status regressed relative to the passing baseline.",
        baselineValue: "passed",
        currentValue: ok ? "passed" : "failed",
      });

      if (!ok) {
        issues.push({
          code: "baseline-build-regressed",
          message: "Build status regressed relative to baseline.",
        });
      }
    }
  }

  const enforcedChecks = checks.length;
  const ok = issues.length === 0;

  return {
    validator: "baseline",
    status: enforcedChecks === 0 ? "not-required" : ok ? "passed" : "failed",
    ok,
    summary:
      enforcedChecks === 0
        ? "Baseline comparison is not required for this program."
        : ok
          ? "Current validation results stayed within the recorded baseline."
          : "Current validation results regressed relative to baseline.",
    issues,
    checks,
  };
}
