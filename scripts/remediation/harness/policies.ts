import type {
  ResolvedRemediationPolicies,
  RemediationProgramConfig,
  RemediationUnit,
  VisualPolicy,
} from "../types";

function cloneVisualPolicy(policy: VisualPolicy): VisualPolicy {
  return {
    ...policy,
    promptDirectives: [...policy.promptDirectives],
  };
}

export function resolveVisualPolicy(unit: RemediationUnit): VisualPolicy {
  if (unit.type === "bugfix-visual-safe") {
    return {
      mode: "strict-minimum-only",
      declaredScope: unit.visualChangeScope,
      failOnUnexpectedChange: true,
      allowOpportunisticStyling: false,
      reviewRequiresVisualSurfaceChanged: true,
      promptDirectives: [
        "Only the minimum visual change required for this finding is allowed.",
        "Do not add opportunistic polish, redesign, spacing cleanup, font changes, or color changes outside the declared scope.",
        ...(unit.visualChangeNotes ? [unit.visualChangeNotes] : []),
      ],
    };
  }

  return {
    mode: "preserve-appearance",
    declaredScope: unit.visualChangeScope,
    failOnUnexpectedChange: true,
    allowOpportunisticStyling: false,
    reviewRequiresVisualSurfaceChanged: true,
    promptDirectives: [
      "Preserve the current frontend appearance unless a visual change is strictly required to fix the defect.",
      "Do not restyle, redesign, refresh copy, polish spacing, or change fonts or colors unrelated to the ticket.",
      "If a visual change becomes unavoidable, keep it to the minimum necessary scope and justify it in the artifact trail.",
    ],
  };
}

export function resolveUnitPolicies(
  program: RemediationProgramConfig,
  unit: RemediationUnit,
): ResolvedRemediationPolicies {
  return {
    runnerPolicy: {
      ...program.defaultRunnerPolicyByWave[unit.wave],
      ...unit.runnerPolicy,
    },
    commitPolicy: {
      ...program.defaultCommitPolicy,
      ...unit.commitPolicy,
    },
    attemptBudget: unit.attemptBudget ?? program.defaultAttemptBudget,
    visualPolicy: cloneVisualPolicy(resolveVisualPolicy(unit)),
  };
}
