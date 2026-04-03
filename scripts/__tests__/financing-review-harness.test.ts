import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

const harnessModule = await import("../financing-review-harness.mjs");

const {
  parseTodoSteps,
  parseStatusFile,
  resolveNextStep,
  validateHarnessState,
  getStepMeta,
  guardFile,
  createPrompt,
} = harnessModule;

// ── Parsing ──────────────────────────────────────────────────────────────────

describe("parsing", () => {
  it("parses step ids and outputs from the todo file", () => {
    const todo = `
### Step 1: First

Outputs:

- \`plans/reviews/a.md\`
- \`plans/reviews/b.md\`

Hard stop:

- stop

### Step 2a: Second

Output:

- \`plans/reviews/c.md\`
`;

    const steps = parseTodoSteps(todo);

    expect(steps).toHaveLength(2);
    expect(steps[0]).toMatchObject({
      id: "Step 1",
      title: "First",
      outputs: ["plans/reviews/a.md", "plans/reviews/b.md"],
    });
    expect(steps[1]).toMatchObject({
      id: "Step 2a",
      title: "Second",
      outputs: ["plans/reviews/c.md"],
    });
  });

  it("parses the status file and resolves the next step from next substep", () => {
    const status = parseStatusFile(`
- Current phase: Step 2a
- Current target substep: Step 2a
- Last completed substep: Step 1
- Next substep: Step 2a
- Pass status: not-started
- Current output artifact: \`plans/reviews/financing-step-02a-route-entries.md\`
- Ledger updated: no
- Notes: waiting
`);

    const steps = [
      { id: "Step 1", title: "One", outputs: [] },
      { id: "Step 2a", title: "Two", outputs: [] },
    ];

    expect(status.currentOutputArtifacts).toEqual([
      "plans/reviews/financing-step-02a-route-entries.md",
    ]);
    expect(resolveNextStep(steps, status)?.id).toBe("Step 2a");
  });
});

// ── Validation ───────────────────────────────────────────────────────────────

describe("validation", () => {
  const createControlFileCwd = () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "financing-harness-"));

    fs.mkdirSync(path.join(cwd, "plans", "reviews"), { recursive: true });

    fs.writeFileSync(path.join(cwd, "plans", "reviews", "financing-status.md"), "# status");
    fs.writeFileSync(path.join(cwd, "plans", "reviews", "financing-review-rubric.md"), "# rubric");
    fs.writeFileSync(path.join(cwd, "plans", "reviews", "financing-review-scope.md"), "# scope");
    fs.writeFileSync(
      path.join(cwd, "plans", "reviews", "financing-findings-ledger.md"),
      "# ledger",
    );

    return cwd;
  };

  it("accepts an explicit Step 1 bootstrap state without requiring control files", () => {
    const todo = `
### Step 1: Lock control files

Outputs:

- \`plans/reviews/financing-review-rubric.md\`
- \`plans/reviews/financing-review-scope.md\`
- \`plans/reviews/financing-findings-ledger.md\`
- \`plans/reviews/financing-status.md\`
`;

    const status = `
- Current phase: Step 1
- Current target substep: Step 1
- Last completed substep: none
- Next substep: Step 1
- Pass status: not-started
- Current output artifact: \`plans/reviews/financing-review-rubric.md\`, \`plans/reviews/financing-review-scope.md\`, \`plans/reviews/financing-findings-ledger.md\`, \`plans/reviews/financing-status.md\`
- Ledger updated: no
- Notes: fresh start
`;

    const result = validateHarnessState({
      todoMarkdown: todo,
      statusMarkdown: status,
      cwd: path.resolve("/tmp/nonexistent-harness-test"),
    });

    expect(result.errors).toEqual([]);
    expect(result.nextStep?.id).toBe("Step 1");
  });

  it("fails validation when nextSubstep disagrees with the resolved step", () => {
    const todo = `
### Step 1: Lock control files

Outputs:

- \`plans/reviews/financing-review-rubric.md\`

### Step 2a: Route entries

Outputs:

- \`plans/reviews/financing-step-02a-route-entries.md\`
`;

    const status = `
- Current phase: Step 2a
- Current target substep: Step 2a
- Last completed substep: Step 1
- Next substep: Step 99
- Pass status: not-started
- Current output artifact: \`plans/reviews/financing-step-02a-route-entries.md\`
- Ledger updated: no
- Notes: mismatch
`;

    const result = validateHarnessState({
      todoMarkdown: todo,
      statusMarkdown: status,
      cwd: createControlFileCwd(),
    });

    expect(result.errors).toContainEqual(
      expect.stringContaining("does not match resolved step"),
    );
  });

  it("fails validation when a completed step is missing required outputs", () => {
    const todo = `
### Step 1: Lock control files

Outputs:

- \`plans/reviews/does-not-exist.md\`
`;

    const status = `
- Current phase: Step 1
- Current target substep: Step 1
- Last completed substep: Step 1
- Next substep: done
- Pass status: completed
- Current output artifact: \`plans/reviews/does-not-exist.md\`
- Ledger updated: no
- Notes: done
`;

    const result = validateHarnessState({
      todoMarkdown: todo,
      statusMarkdown: status,
      cwd: createControlFileCwd(),
    });

    expect(result.errors).toContainEqual(
      expect.stringContaining("missing required output artifact"),
    );
  });

  it("fails when ledger updated is yes but ledger file does not exist", () => {
    const todo = `
### Step 2a: Route entries

Outputs:

- \`plans/reviews/financing-step-02a-route-entries.md\`
`;

    const status = `
- Current phase: Step 2a
- Current target substep: Step 2a
- Last completed substep: Step 1
- Next substep: Step 2a
- Pass status: in-progress
- Current output artifact: \`plans/reviews/financing-step-02a-route-entries.md\`
- Ledger updated: yes
- Notes: test
`;

    // Use a cwd where the ledger definitely does not exist
    const result = validateHarnessState({
      todoMarkdown: todo,
      statusMarkdown: status,
      cwd: path.resolve("/tmp/nonexistent-harness-test"),
    });

    expect(result.errors).toContainEqual(
      expect.stringContaining("Ledger updated is yes but"),
    );
  });

  it("fails validation outside Step 1 bootstrap when control files are missing", () => {
    const todo = `
### Step 1: Lock control files

Outputs:

- \`plans/reviews/financing-review-rubric.md\`
- \`plans/reviews/financing-review-scope.md\`
- \`plans/reviews/financing-findings-ledger.md\`
- \`plans/reviews/financing-status.md\`

### Step 2a: Route entries

Outputs:

- \`plans/reviews/financing-step-02a-route-entries.md\`
`;

    const status = `
- Current phase: Step 2a
- Current target substep: Step 2a
- Last completed substep: Step 1
- Next substep: Step 2a
- Pass status: not-started
- Current output artifact: \`plans/reviews/financing-step-02a-route-entries.md\`
- Ledger updated: no
- Notes: missing controls
`;

    const result = validateHarnessState({
      todoMarkdown: todo,
      statusMarkdown: status,
      cwd: path.resolve("/tmp/nonexistent-harness-test"),
    });

    expect(result.errors).toContainEqual(
      expect.stringContaining("Required control file is missing"),
    );
  });

  it("accepts a comma-separated output artifact list for Step 1 when it matches outputs", () => {
    const todo = `
### Step 1: Lock control files

Outputs:

- \`plans/reviews/financing-review-rubric.md\`
- \`plans/reviews/financing-review-scope.md\`
- \`plans/reviews/financing-findings-ledger.md\`
- \`plans/reviews/financing-status.md\`
`;

    const status = `
- Current phase: Step 1
- Current target substep: Step 1
- Last completed substep: none
- Next substep: Step 1
- Pass status: in-progress
- Current output artifact: \`plans/reviews/financing-review-rubric.md\`, \`plans/reviews/financing-review-scope.md\`, \`plans/reviews/financing-findings-ledger.md\`, \`plans/reviews/financing-status.md\`
- Ledger updated: no
- Notes: bootstrap
`;

    const result = validateHarnessState({
      todoMarkdown: todo,
      statusMarkdown: status,
      cwd: path.resolve("/tmp/nonexistent-harness-test"),
    });

    expect(result.errors).toEqual([]);
  });

  it("fails validation when current output artifact does not match the current step outputs", () => {
    const todo = `
### Step 1: Lock control files

Outputs:

- \`plans/reviews/financing-review-rubric.md\`

### Step 2a: Route entries

Outputs:

- \`plans/reviews/financing-step-02a-route-entries.md\`
`;

    const status = `
- Current phase: Step 2a
- Current target substep: Step 2a
- Last completed substep: Step 1
- Next substep: Step 2a
- Pass status: not-started
- Current output artifact: \`plans/reviews/wrong.md\`
- Ledger updated: no
- Notes: mismatch
`;

    const result = validateHarnessState({
      todoMarkdown: todo,
      statusMarkdown: status,
      cwd: path.resolve("."),
    });

    expect(result.errors).toContainEqual(
      expect.stringContaining("Current output artifact does not match declared outputs"),
    );
  });

  it("warns when next step has no metadata defined", () => {
    const todo = `
### Step 99: Unknown step

Outputs:

- \`plans/reviews/mystery.md\`
`;

    const status = `
- Current phase: Step 99
- Current target substep: Step 99
- Last completed substep: none
- Next substep: Step 99
- Pass status: not-started
- Current output artifact: \`plans/reviews/mystery.md\`
- Ledger updated: no
- Notes: test
`;

    const result = validateHarnessState({
      todoMarkdown: todo,
      statusMarkdown: status,
      cwd: path.resolve("."),
    });

    expect(result.warnings).toContainEqual(
      expect.stringContaining("No step metadata defined for Step 99"),
    );
  });
});

// ── Step metadata ────────────────────────────────────────────────────────────

describe("step metadata", () => {
  it("returns browser validation and skills for interactive steps", () => {
    const meta = getStepMeta("Step 3b");

    expect(meta.browserValidation).toBe(true);
    expect(meta.skills).toContain("vercel-react-best-practices");
    expect(meta.skills).toContain("vercel-composition-patterns");
    expect(meta.skills).toContain("next-best-practices");
    expect(meta.claudeMdHints.length).toBeGreaterThan(0);
  });

  it("returns no browser validation for config-only steps", () => {
    const meta = getStepMeta("Step 2a");

    expect(meta.browserValidation).toBe(false);
    expect(meta.skills.length).toBeGreaterThan(0);
  });

  it("returns reduced skills for boundary-only steps", () => {
    const meta = getStepMeta("Step 4c");

    expect(meta.browserValidation).toBe(false);
    expect(meta.skills).toEqual(["vercel-composition-patterns"]);
  });

  it("returns no skills for setup step", () => {
    const meta = getStepMeta("Step 1");

    expect(meta.skills).toEqual([]);
  });

  it("returns defaults for unknown steps", () => {
    const meta = getStepMeta("Step 99");

    expect(meta.browserValidation).toBe(false);
    expect(meta.skills).toEqual([]);
    expect(meta.claudeMdHints).toEqual([]);
  });
});

// ── Guard ────────────────────────────────────────────────────────────────────

describe("guard", () => {
  const makeGuardArgs = (filePath: string, stepId = "Step 2a", outputs: string[] = []) => ({
    filePath,
    steps: [{ id: stepId, title: "Test", outputs }],
    status: { currentTargetSubstep: stepId },
    cwd: "/fake",
  });

  it("allows valid output for current step", () => {
    const result = guardFile(
      makeGuardArgs(
        "plans/reviews/financing-step-02a-route-entries.md",
        "Step 2a",
        ["plans/reviews/financing-step-02a-route-entries.md"],
      ),
    );

    expect(result.allowed).toBe(true);
  });

  it("blocks output belonging to a different step", () => {
    const result = guardFile(
      makeGuardArgs(
        "plans/reviews/financing-step-03a-hero-wrappers.md",
        "Step 2a",
        ["plans/reviews/financing-step-02a-route-entries.md"],
      ),
    );

    expect(result.allowed).toBe(false);
    expect(result.reason).toContain("not an allowed output");
  });

  it("always allows ledger writes", () => {
    const result = guardFile(
      makeGuardArgs("plans/reviews/financing-findings-ledger.md", "Step 2a", []),
    );

    expect(result.allowed).toBe(true);
  });

  it("always allows status writes", () => {
    const result = guardFile(
      makeGuardArgs("plans/reviews/financing-status.md", "Step 2a", []),
    );

    expect(result.allowed).toBe(true);
  });

  it("passes through non-review files without checking", () => {
    const result = guardFile(makeGuardArgs("app/page.tsx", "Step 2a", []));

    expect(result.allowed).toBe(true);
    expect(result.reason).toBe("not a review file");
  });

  it("blocks when no current step can be determined", () => {
    const result = guardFile({
      filePath: "plans/reviews/something.md",
      steps: [{ id: "Step 2a", title: "Test", outputs: [] }],
      status: { currentTargetSubstep: "Step 99" },
      cwd: "/fake",
    });

    expect(result.allowed).toBe(false);
    expect(result.reason).toContain("no current step");
  });
});

// ── Prompt generation ────────────────────────────────────────────────────────

describe("prompt generation", () => {
  it("includes preflight commands", () => {
    const step = { id: "Step 2a", title: "Route entries", outputs: ["plans/reviews/x.md"] };
    const prompt = createPrompt(step);

    expect(prompt).toContain("npm run review:financing:validate");
    expect(prompt).toContain("npm run review:financing:next");
    expect(prompt).toContain("**Step 2a**");
  });

  it("includes skills for audit steps", () => {
    const step = { id: "Step 3b", title: "Hero interactions", outputs: ["plans/reviews/x.md"] };
    const prompt = createPrompt(step);

    expect(prompt).toContain("/vercel-composition-patterns");
    expect(prompt).toContain("/vercel-react-best-practices");
    expect(prompt).toContain("/next-best-practices");
  });

  it("omits skills section for setup steps", () => {
    const step = { id: "Step 1", title: "Lock control files", outputs: ["plans/reviews/x.md"] };
    const prompt = createPrompt(step);

    expect(prompt).not.toContain("Required Skills");
  });

  it("includes browser validation instructions for interactive steps", () => {
    const step = { id: "Step 6a", title: "FAQ", outputs: ["plans/reviews/x.md"] };
    const prompt = createPrompt(step);

    expect(prompt).toContain("Browser Validation: REQUIRED");
    expect(prompt).toContain("port `3005`");
    expect(prompt).toContain("390x844");
  });

  it("marks browser validation as not required for config steps", () => {
    const step = { id: "Step 2b", title: "Shell config", outputs: ["plans/reviews/x.md"] };
    const prompt = createPrompt(step);

    expect(prompt).toContain("Browser Validation: NOT REQUIRED");
  });

  it("includes CLAUDE.md hints from step metadata", () => {
    const step = { id: "Step 3b", title: "Hero interactions", outputs: ["plans/reviews/x.md"] };
    const prompt = createPrompt(step);

    expect(prompt).toContain("components/sections/heroes/hero-convert-framed/CLAUDE.md");
    expect(prompt).toContain("components/ui/ripple-cta-link/CLAUDE.md");
  });

  it("includes output rules and hard stop", () => {
    const step = { id: "Step 4a", title: "Strip offers", outputs: ["plans/reviews/step-04a.md"] };
    const prompt = createPrompt(step);

    expect(prompt).toContain("plans/reviews/step-04a.md");
    expect(prompt).toContain("STOP");
    expect(prompt).toContain("do not proceed beyond Step 4a");
  });

  it("uses a Step 1 bootstrap prompt that lists files to create instead of control files to read", () => {
    const step = {
      id: "Step 1",
      title: "Lock control files",
      outputs: [
        "plans/reviews/financing-review-rubric.md",
        "plans/reviews/financing-review-scope.md",
      ],
    };
    const prompt = createPrompt(step);

    expect(prompt).toContain("Files to create:");
    expect(prompt).toContain("plans/todo.md");
    expect(prompt).toContain("CLAUDE.md");
    expect(prompt).not.toContain("1. `plans/reviews/financing-status.md`");
    expect(prompt).not.toContain("2. `plans/reviews/financing-review-rubric.md`");
  });

  it("includes required lenses checklist", () => {
    const step = { id: "Step 2a", title: "Route entries", outputs: [] };
    const prompt = createPrompt(step);

    expect(prompt).toContain("accessibility");
    expect(prompt).toContain("responsive behavior");
    expect(prompt).toContain("Core Web Vitals risk");
    expect(prompt).toContain("repo convention compliance");
  });

  it("includes control files in context section", () => {
    const step = { id: "Step 2a", title: "Route entries", outputs: [] };
    const prompt = createPrompt(step);

    expect(prompt).toContain("financing-status.md");
    expect(prompt).toContain("financing-review-rubric.md");
    expect(prompt).toContain("financing-review-scope.md");
    expect(prompt).toContain("financing-findings-ledger.md");
    expect(prompt).toContain("CLAUDE.md");
  });
});
