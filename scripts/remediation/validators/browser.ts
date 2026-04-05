import type {
  BrowserCheck,
  BrowserCheckObservation,
  BrowserValidatorResult,
  ValidationIssue,
} from "../types.ts";
import { expandViewport, formatRouteViewportKey } from "./shared.ts";

interface BrowserValidatorOptions {
  required: boolean;
  checks: BrowserCheck[];
  observations?: BrowserCheckObservation[];
}

export function runBrowserValidator(
  options: BrowserValidatorOptions,
): BrowserValidatorResult {
  if (!options.required) {
    return {
      validator: "browser",
      status: "not-required",
      ok: true,
      summary: "Browser validation is not required for this remediation unit.",
      issues: [],
      required: false,
      expectedCheckCount: 0,
      observedCheckCount: options.observations?.length ?? 0,
      missingChecks: [],
      failedChecks: [],
    };
  }

  const observations = options.observations ?? [];
  const observationMap = new Map(
    observations.map((observation) => [
      formatRouteViewportKey(observation.route, observation.viewport),
      observation,
    ]),
  );
  const missingChecks: string[] = [];
  const failedChecks: string[] = [];
  const issues: ValidationIssue[] = [];
  let expectedCheckCount = 0;

  if (options.checks.length === 0) {
    issues.push({
      code: "browser-checks-missing",
      message: "Browser validation is required but no browser checks were declared.",
    });
  }

  for (const check of options.checks) {
    for (const viewport of expandViewport(check.viewport)) {
      expectedCheckCount += 1;
      const key = formatRouteViewportKey(check.route, viewport);
      const observation = observationMap.get(key);

      if (!observation) {
        missingChecks.push(key);
        continue;
      }

      if (observation.status !== "passed") {
        failedChecks.push(key);
      }

      for (const assertion of check.assertions) {
        if (!observation.assertionsPassed.includes(assertion)) {
          failedChecks.push(`${key} :: ${assertion}`);
        }
      }
    }
  }

  if (missingChecks.length > 0) {
    issues.push({
      code: "browser-checks-missing-results",
      message: "One or more required browser checks were not observed.",
      details: missingChecks,
    });
  }

  if (failedChecks.length > 0) {
    issues.push({
      code: "browser-checks-failed",
      message: "One or more required browser assertions failed.",
      details: failedChecks,
    });
  }

  const ok = issues.length === 0;

  return {
    validator: "browser",
    status: ok ? "passed" : "failed",
    ok,
    summary: ok
      ? `Browser validation passed for ${expectedCheckCount} required check(s).`
      : "Browser validation failed.",
    issues,
    required: true,
    expectedCheckCount,
    observedCheckCount: observations.length,
    missingChecks,
    failedChecks,
  };
}
