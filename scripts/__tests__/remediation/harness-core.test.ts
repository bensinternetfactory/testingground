import { describe, expect, it } from "vitest";
import {
  getUnresolvedDependencyIds,
  isCompositeUnit,
  listUnitsInExecutionOrder,
  resolveNextUnit,
  validateTrackerEntries,
} from "@/scripts/remediation/harness/dependencies";
import { executeDeclaredBrowserChecks } from "@/scripts/remediation/harness/browser-execution";
import { resolveUnitPolicies, resolveVisualPolicy } from "@/scripts/remediation/harness/policies";
import {
  createNextPromptPayload,
  createPromptPayload,
  PROMPT_TEMPLATE_VERSION,
} from "@/scripts/remediation/harness/prompt";
import { financePagesProgram } from "@/scripts/remediation/programs/finance-pages";
import type { RemediationTrackerEntry } from "@/scripts/remediation/types";

function fixedEntry(unitId: string): RemediationTrackerEntry {
  return {
    unitId,
    state: "fixed",
    attemptCount: 1,
    commitSha: `sha-${unitId.toLowerCase()}`,
  };
}

function buildFixedTracker(
  unitIdsToExclude: string[] = [],
): RemediationTrackerEntry[] {
  const excluded = new Set(unitIdsToExclude);

  return financePagesProgram.units
    .filter((unit) => !excluded.has(unit.id))
    .map((unit) => fixedEntry(unit.id));
}

describe("dependency resolution", () => {
  it("sorts execution order by wave before registry declaration order", () => {
    const orderedUnits = listUnitsInExecutionOrder(financePagesProgram.units);
    const orderedWaves = orderedUnits.map((unit) => unit.wave);

    expect(orderedUnits[0]?.id).toBe("FIN-metadata-001");
    expect(orderedUnits[1]?.id).toBe("FIN-bundle-004");
    expect(orderedWaves).toEqual([...orderedWaves].sort((left, right) => left - right));
  });

  it("treats the FAQ registry merge as one composite remediation unit", () => {
    const compositeUnit = financePagesProgram.units.find(
      (unit) => unit.id === "FIN-faq-unification",
    );

    expect(compositeUnit).toBeDefined();
    expect(isCompositeUnit(compositeUnit!)).toBe(true);
    expect(
      isCompositeUnit(financePagesProgram.units.find((unit) => unit.id === "FIN-metadata-001")!),
    ).toBe(false);
  });

  it("returns the first wave 1 finance unit when no tracker entries exist yet", () => {
    const resolution = resolveNextUnit(financePagesProgram, []);

    expect(resolution.isComplete).toBe(false);
    expect(resolution.currentWave).toBe(1);
    expect(resolution.nextUnit?.id).toBe("FIN-metadata-001");
  });

  it("advances to wave 2 only after all wave 1 units are resolved", () => {
    const trackerEntries = financePagesProgram.units
      .filter((unit) => unit.wave === 1)
      .map((unit) => fixedEntry(unit.id));

    const resolution = resolveNextUnit(financePagesProgram, trackerEntries);

    expect(resolution.currentWave).toBe(2);
    expect(resolution.nextUnit?.id).toBe("FIN-a11y-008");
  });

  it("enforces dependsOn before a dependent unit becomes eligible", () => {
    const tracker = validateTrackerEntries(financePagesProgram, [
      ...buildFixedTracker(["FIN-architecture-006", "FIN-patterns-007"]),
    ]);
    const dependentUnit = financePagesProgram.units.find(
      (unit) => unit.id === "FIN-patterns-007",
    );

    expect(dependentUnit).toBeDefined();
    expect(getUnresolvedDependencyIds(dependentUnit!, tracker.index)).toEqual([
      "FIN-architecture-006",
    ]);
  });

  it("blocks next-unit resolution when the current wave only has blocked work left", () => {
    const trackerEntries = [
      ...buildFixedTracker(["FIN-architecture-006"]),
      {
        unitId: "FIN-architecture-006",
        state: "blocked",
        attemptCount: 3,
        unblockAction: "Rewrite the hero contract fix direction before retrying.",
      } satisfies RemediationTrackerEntry,
    ];

    const resolution = resolveNextUnit(financePagesProgram, trackerEntries);

    expect(resolution.currentWave).toBe(3);
    expect(resolution.nextUnit).toBeUndefined();
    expect(resolution.blockers).toContainEqual(
      expect.objectContaining({
        code: "unit-blocked",
        unitId: "FIN-architecture-006",
      }),
    );
  });

  it("marks the program complete once every unit is fixed or deferred", () => {
    const trackerEntries = financePagesProgram.units.map((unit, index) =>
      index % 2 === 0
        ? fixedEntry(unit.id)
        : {
            unitId: unit.id,
            state: "deferred",
            attemptCount: 0,
            notes: "Deferred by human review.",
          },
    );

    const resolution = resolveNextUnit(financePagesProgram, trackerEntries);

    expect(resolution.isComplete).toBe(true);
    expect(resolution.nextUnit).toBeUndefined();
    expect(resolution.currentWave).toBeUndefined();
  });

  it("rejects invalid tracker rows before next-unit resolution", () => {
    const resolution = resolveNextUnit(financePagesProgram, [
      {
        unitId: "FIN-metadata-001",
        state: "fixed",
        attemptCount: 1,
      },
      {
        unitId: "FIN-metadata-001",
        state: "blocked",
        attemptCount: 3,
      },
    ]);

    expect(resolution.nextUnit).toBeUndefined();
    expect(resolution.trackerIssues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "fixed-missing-commit-sha" }),
        expect.objectContaining({ code: "duplicate-tracker-entry" }),
        expect.objectContaining({ code: "blocked-missing-unblock-action" }),
      ]),
    );
  });
});

describe("policy resolution", () => {
  it("uses wave defaults for runner and commit policy when a unit does not override them", () => {
    const unit = financePagesProgram.units.find((candidate) => candidate.id === "FIN-bundle-004");
    const policies = resolveUnitPolicies(financePagesProgram.program, unit!);

    expect(policies.runnerPolicy).toMatchObject({
      mode: "supervised-auto-run",
      adapter: "codex",
    });
    expect(policies.commitPolicy).toEqual({
      mode: "stage-and-approve",
      provenanceRequired: true,
    });
    expect(policies.attemptBudget).toBe(3);
  });

  it("merges per-unit runner overrides over the wave default", () => {
    const unit = financePagesProgram.units.find((candidate) => candidate.id === "FIN-bundle-004");
    const policies = resolveUnitPolicies(financePagesProgram.program, {
      ...unit!,
      runnerPolicy: {
        mode: "interactive-review",
      },
      attemptBudget: 5,
    });

    expect(policies.runnerPolicy).toEqual({
      mode: "interactive-review",
      adapter: "codex",
      rationale: "Low-risk nonvisual finance fixes.",
    });
    expect(policies.attemptBudget).toBe(5);
  });

  it("derives a preserve-appearance policy for nonvisual work", () => {
    const unit = financePagesProgram.units.find((candidate) => candidate.id === "FIN-metadata-001");
    const policy = resolveVisualPolicy(unit!);

    expect(policy.mode).toBe("preserve-appearance");
    expect(policy.declaredScope).toBe("none");
    expect(policy.promptDirectives.join(" ")).toContain("Preserve the current frontend appearance");
  });

  it("derives a strict-minimum visual policy for visual-safe work", () => {
    const unit = financePagesProgram.units.find((candidate) => candidate.id === "FIN-a11y-017");
    const policy = resolveVisualPolicy(unit!);

    expect(policy.mode).toBe("strict-minimum-only");
    expect(policy.declaredScope).toBe("strict-minimum");
    expect(policy.promptDirectives).toContain(
      "Only the minimum visual change required for this finding is allowed.",
    );
    expect(policy.promptDirectives.join(" ")).toContain(
      "Only the minimum typography and color changes needed for disclosure readability are allowed.",
    );
  });
});

describe("browser execution", () => {
  it("clears runtime errors between declared checks in a shared session", () => {
    let clearCount = 0;
    let evalCount = 0;
    let errorBuffer = "";

    const observations = executeDeclaredBrowserChecks(
      process.cwd(),
      {
        id: "UNIT-001",
        browserChecks: [
          {
            route: "/example-one",
            viewport: "desktop",
            assertions: ["Drawer still opens from a financing route after the provider moves out of RootLayout."],
          },
          {
            route: "/example-two",
            viewport: "desktop",
            assertions: ["Drawer still opens from a financing route after the provider moves out of RootLayout."],
          },
        ],
      },
      "http://127.0.0.1:3005",
      {
        commandExecutor: (command, args) => {
          expect(command).toBe("agent-browser");

          const subcommand = args[2];

          if (subcommand === "eval") {
            evalCount += 1;

            if (evalCount === 2) {
              errorBuffer = "ReferenceError: drawer exploded";
            }

            return {
              command: [command, ...args],
              exitCode: 0,
              stdout: JSON.stringify({ pass: true, notes: ["ok"] }),
              stderr: "",
            };
          }

          if (subcommand === "errors" && args[3] === "--clear") {
            clearCount += 1;
            errorBuffer = "";
          }

          return {
            command: [command, ...args],
            exitCode: 0,
            stdout: subcommand === "errors" && args[3] !== "--clear" ? errorBuffer : "",
            stderr: "",
          };
        },
      },
    );

    expect(clearCount).toBe(2);
    expect(observations).toHaveLength(2);
    expect(observations[0]).toMatchObject({
      route: "/example-one",
      viewport: "desktop",
      status: "failed",
    });
    expect(observations[1]).toMatchObject({
      route: "/example-two",
      viewport: "desktop",
      status: "passed",
    });
  });
});

describe("prompt payload generation", () => {
  it("builds the next-unit prompt payload from dependency-selected metadata", () => {
    const result = createNextPromptPayload(financePagesProgram, []);

    expect(result.resolution.currentWave).toBe(1);
    expect(result.payload?.templateVersion).toBe(PROMPT_TEMPLATE_VERSION);
    expect(result.payload?.unit.id).toBe("FIN-metadata-001");
    expect(result.payload?.execution.runnerPolicy).toMatchObject({
      mode: "supervised-auto-run",
      adapter: "codex",
    });
    expect(result.payload?.constraints.requiredSkills).toEqual([
      "next-best-practices",
      "vercel-react-best-practices",
      "vercel-composition-patterns",
    ]);
    expect(result.payload?.renderedPrompt).toContain(
      "You are executing exactly one remediation unit.",
    );
    expect(result.payload?.renderedPrompt).toContain(
      "plans/remidation/reusable-remediation-harness-roadmap.md",
    );
  });

  it("captures composite-unit findings and browser checks in the prompt payload", () => {
    const unit = financePagesProgram.units.find((candidate) => candidate.id === "FIN-faq-unification");
    const payload = createPromptPayload(financePagesProgram, unit!);

    expect(payload.unit.isComposite).toBe(true);
    expect(payload.unit.findingIds).toEqual(["FIN-config-003", "FIN-schema-016"]);
    expect(payload.validation.requiresBrowserValidation).toBe(true);
    expect(payload.renderedPrompt).toContain(
      "Composite remediation unit replacing prose-only coupling between FIN-config-003 and FIN-schema-016.",
    );
    expect(payload.renderedPrompt).toContain("/rollback-financing#faq [both]");
    expect(payload.renderedPrompt).toContain(
      "Schema and visible answer copy are produced from the same canonical answer source.",
    );
  });

  it("injects strict minimum visual guardrails for visual-safe units", () => {
    const unit = financePagesProgram.units.find((candidate) => candidate.id === "FIN-a11y-017");
    const payload = createPromptPayload(financePagesProgram, unit!);

    expect(payload.execution.visualPolicy.mode).toBe("strict-minimum-only");
    expect(payload.validation.requiresVisualRegression).toBe(true);
    expect(payload.renderedPrompt).toContain("Visual regression required: yes");
    expect(payload.renderedPrompt).toContain(
      "Only the minimum visual change required for this finding is allowed.",
    );
    expect(payload.renderedPrompt).toContain(
      "Only the minimum typography and color changes needed for disclosure readability are allowed.",
    );
  });

  it("does not emit a prompt payload when no eligible unit can be selected", () => {
    const trackerEntries = [
      ...buildFixedTracker(["FIN-architecture-006"]),
      {
        unitId: "FIN-architecture-006",
        state: "blocked",
        attemptCount: 3,
        unblockAction: "Rewrite the hero contract fix direction before retrying.",
      } satisfies RemediationTrackerEntry,
    ];

    const result = createNextPromptPayload(financePagesProgram, trackerEntries);

    expect(result.payload).toBeUndefined();
    expect(result.resolution.currentWave).toBe(3);
    expect(result.resolution.blockers).toContainEqual(
      expect.objectContaining({
        code: "unit-blocked",
        unitId: "FIN-architecture-006",
      }),
    );
  });
});
