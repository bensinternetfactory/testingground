import { isCompositeUnit, resolveNextUnit } from "./dependencies";
import { resolveUnitPolicies } from "./policies";
import type {
  BrowserCheck,
  RemediationProgramDefinition,
  RemediationPromptPayload,
  RemediationTrackerEntry,
  RemediationUnit,
} from "../types";

export const PROMPT_TEMPLATE_VERSION = "remediation-prompt.v1";

export interface PromptPayloadResolution {
  payload?: RemediationPromptPayload;
  resolution: ReturnType<typeof resolveNextUnit>;
}

function formatList(items: string[], emptyLabel: string): string[] {
  if (items.length === 0) {
    return [`- ${emptyLabel}`];
  }

  return items.map((item) => `- ${item}`);
}

function formatBrowserChecks(checks: BrowserCheck[]): string[] {
  if (checks.length === 0) {
    return ["- No browser assertions required for this unit."];
  }

  return checks.map((check) => {
    const assertions = check.assertions.join(" | ");
    return `- ${check.route} [${check.viewport}]: ${assertions}`;
  });
}

function buildPromptText(payload: Omit<RemediationPromptPayload, "renderedPrompt">): string {
  const { constraints, currentWave, execution, programDisplayName, programId, templateVersion, unit, validation } =
    payload;

  return [
    "You are executing exactly one remediation unit. Do not start, stage, or plan the next unit.",
    "",
    "Execution Context",
    `- Program: ${programDisplayName} (${programId})`,
    `- Prompt template version: ${templateVersion}`,
    `- Wave: ${currentWave}`,
    `- Unit: ${unit.id} - ${unit.title}`,
    `- Unit type: ${unit.type}`,
    `- Branch: ${unit.branch}`,
    `- Owner surface: ${unit.ownerSurface}`,
    `- Composite unit: ${unit.isComposite ? "yes" : "no"}`,
    "- Finding IDs:",
    ...formatList(unit.findingIds, "No finding IDs declared."),
    "",
    "Execution Policy",
    `- Runner mode: ${execution.runnerPolicy.mode}`,
    `- Runner adapter: ${execution.runnerPolicy.adapter ?? "not specified"}`,
    `- Runner rationale: ${execution.runnerPolicy.rationale ?? "No rationale recorded."}`,
    `- Commit mode: ${execution.commitPolicy.mode}`,
    `- Commit provenance required: ${execution.commitPolicy.provenanceRequired ? "yes" : "no"}`,
    `- Attempt budget: ${execution.attemptBudget}`,
    "",
    "Scope Constraints",
    "- Work only inside these allowed files:",
    ...formatList(constraints.allowedFiles, "No allowed files declared."),
    "- Declared dependencies for context:",
    ...formatList(constraints.dependsOn, "No declared dependencies."),
    "- Required skills to load before editing:",
    ...formatList(constraints.requiredSkills, "No required skills declared."),
    "- Read these CLAUDE.md hints if present before changing code:",
    ...formatList(constraints.claudeMdHints, "No CLAUDE.md hints declared."),
    "- Keep these control files aligned with the remediation plan:",
    ...formatList(constraints.requiredControlFiles, "No required control files declared."),
    `- Fix report path: ${constraints.fixReportPath}`,
    "- Rollback hints:",
    ...formatList(constraints.rollbackHints, "No rollback hints declared."),
    "",
    "Source Evidence",
    `- Source kind: ${unit.sourceRef.kind}`,
    `- Source path: ${unit.sourceRef.path}`,
    "- Evidence paths:",
    ...formatList(unit.evidencePaths, "No evidence paths declared."),
    ...(unit.sourceRef.notes ? [`- Source notes: ${unit.sourceRef.notes}`] : []),
    `- Tags: ${unit.tags.join(", ") || "none"}`,
    "",
    "Validation Requirements",
    `- Lint required: ${validation.requiresLint ? "yes" : "no"}`,
    `- Build required: ${validation.requiresBuild ? "yes" : "no"}`,
    `- Tests required: ${validation.requiresTests ? "yes" : "no"}`,
    `- Browser validation required: ${validation.requiresBrowserValidation ? "yes" : "no"}`,
    `- Visual regression required: ${validation.requiresVisualRegression ? "yes" : "no"}`,
    `- Baseline lint enforcement: ${validation.enforceLintBaseline ? "yes" : "no"}`,
    `- Baseline build enforcement: ${validation.enforceBuildBaseline ? "yes" : "no"}`,
    `- Baseline viewports: ${validation.baselineViewports.join(", ")}`,
    `- Baseline routes: ${validation.baselineRoutes.join(", ") || "none"}`,
    "- Browser assertions:",
    ...formatBrowserChecks(validation.browserChecks),
    "",
    "Visual Guardrails",
    ...execution.visualPolicy.promptDirectives.map((directive) => `- ${directive}`),
    "",
    "Task Requirements",
    "- Fix only the defect described by this unit's source evidence.",
    "- Preserve the existing frontend appearance unless this unit explicitly requires a tightly scoped visual fix.",
    "- Do not broaden scope, restyle unrelated surfaces, or edit files outside the allowlist.",
    "- If the safest path requires out-of-scope work, stop and report the blocker instead of improvising.",
  ].join("\n");
}

export function createPromptPayload(
  definition: RemediationProgramDefinition,
  unit: RemediationUnit,
): RemediationPromptPayload {
  const execution = resolveUnitPolicies(definition.program, unit);
  const payloadWithoutPrompt: Omit<RemediationPromptPayload, "renderedPrompt"> = {
    templateVersion: PROMPT_TEMPLATE_VERSION,
    programId: definition.program.programId,
    programDisplayName: definition.program.displayName,
    unit: {
      id: unit.id,
      title: unit.title,
      type: unit.type,
      wave: unit.wave,
      branch: unit.branch,
      ownerSurface: unit.ownerSurface,
      tags: [...unit.tags],
      sourceRef: { ...unit.sourceRef },
      findingIds: [...(unit.sourceRef.findingIds ?? [])],
      evidencePaths: [...(unit.sourceRef.evidencePaths ?? [])],
      isComposite: isCompositeUnit(unit),
    },
    currentWave: unit.wave,
    execution,
    constraints: {
      allowedFiles: [...unit.allowedFiles],
      dependsOn: [...unit.dependsOn],
      requiredSkills: [...unit.requiredSkills],
      claudeMdHints: [...unit.claudeMdHints],
      requiredControlFiles: [...definition.program.requiredControlFiles],
      rollbackHints: [...unit.rollbackHints],
      fixReportPath: unit.fixReportPath,
    },
    validation: {
      requiresLint: true,
      requiresBuild: true,
      requiresTests: unit.requiresTests,
      requiresBrowserValidation: unit.requiresBrowserValidation,
      requiresVisualRegression: unit.requiresVisualRegression,
      browserChecks: unit.browserChecks.map((check) => ({
        ...check,
        assertions: [...check.assertions],
      })),
      baselineRoutes: [...unit.baselineRoutes],
      baselineViewports: [...definition.program.baselineConfig.defaultViewports],
      enforceLintBaseline: definition.program.baselineConfig.enforceLintBaseline,
      enforceBuildBaseline: definition.program.baselineConfig.enforceBuildBaseline,
    },
  };

  return {
    ...payloadWithoutPrompt,
    renderedPrompt: buildPromptText(payloadWithoutPrompt),
  };
}

export function createNextPromptPayload(
  definition: RemediationProgramDefinition,
  entries: RemediationTrackerEntry[],
): PromptPayloadResolution {
  const resolution = resolveNextUnit(definition, entries);

  if (!resolution.nextUnit) {
    return { resolution };
  }

  return {
    resolution,
    payload: createPromptPayload(definition, resolution.nextUnit),
  };
}
