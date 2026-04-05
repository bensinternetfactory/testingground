import type {
  VisualCheckObservation,
  VisualPolicy,
  VisualValidatorResult,
  ValidationIssue,
} from "../types.ts";
import type { ConcreteViewport } from "./shared.ts";
import { formatRouteViewportKey } from "./shared.ts";

interface VisualValidatorOptions {
  required: boolean;
  routes: string[];
  viewports: ConcreteViewport[];
  visualPolicy: VisualPolicy;
  observations?: VisualCheckObservation[];
}

export function runVisualValidator(
  options: VisualValidatorOptions,
): VisualValidatorResult {
  if (!options.required) {
    return {
      validator: "visual",
      status: "not-required",
      ok: true,
      summary: "Visual regression validation is not required for this remediation unit.",
      issues: [],
      required: false,
      expectedCaptureCount: 0,
      observedCaptureCount: options.observations?.length ?? 0,
      visualSurfaceChanged: false,
      artifactPaths: [],
      missingCaptures: [],
    };
  }

  const observations = options.observations ?? [];
  const observationMap = new Map(
    observations.map((observation) => [
      formatRouteViewportKey(observation.route, observation.viewport),
      observation,
    ]),
  );
  const missingCaptures: string[] = [];
  const issues: ValidationIssue[] = [];
  const artifactPaths = observations
    .map((observation) => observation.artifactPath)
    .filter((artifactPath): artifactPath is string => Boolean(artifactPath));
  let expectedCaptureCount = 0;

  if (options.routes.length === 0) {
    issues.push({
      code: "visual-routes-missing",
      message: "Visual regression is required but no baseline routes were declared.",
    });
  }

  for (const route of options.routes) {
    for (const viewport of options.viewports) {
      expectedCaptureCount += 1;
      const key = formatRouteViewportKey(route, viewport);
      const observation = observationMap.get(key);

      if (!observation) {
        missingCaptures.push(key);
        continue;
      }

      if (observation.comparison === "error") {
        issues.push({
          code: "visual-comparison-error",
          message: `Visual comparison failed for ${key}.`,
          details: observation.notes,
        });
      }

      if (observation.comparison === "unexpected-change" && options.visualPolicy.failOnUnexpectedChange) {
        issues.push({
          code: "visual-unexpected-change",
          message: `Unexpected visual change detected for ${key}.`,
          details: observation.notes,
        });
      }
    }
  }

  if (missingCaptures.length > 0) {
    issues.push({
      code: "visual-captures-missing",
      message: "One or more required visual captures were not observed.",
      details: missingCaptures,
    });
  }

  const visualSurfaceChanged = observations.some((observation) => observation.changed);
  const ok = issues.length === 0;

  return {
    validator: "visual",
    status: ok ? "passed" : "failed",
    ok,
    summary: ok
      ? `Visual regression validation passed for ${expectedCaptureCount} required capture(s).`
      : "Visual regression validation failed.",
    issues,
    required: true,
    expectedCaptureCount,
    observedCaptureCount: observations.length,
    visualSurfaceChanged,
    artifactPaths,
    missingCaptures,
  };
}
