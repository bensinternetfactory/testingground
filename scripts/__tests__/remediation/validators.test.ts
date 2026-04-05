import { describe, expect, it } from "vitest";
import { compareToBaseline } from "@/scripts/remediation/validators/baseline";
import { runBrowserValidator } from "@/scripts/remediation/validators/browser";
import { runBuildValidator } from "@/scripts/remediation/validators/build";
import { createBaselineLintSnapshot, runLintValidator } from "@/scripts/remediation/validators/lint";
import { runTestValidator } from "@/scripts/remediation/validators/test";
import { runVisualValidator } from "@/scripts/remediation/validators/visual";

function createExecutor(exitCode: number, stdout: string, stderr = "") {
  return (command: string, args: string[]) => ({
    command: [command, ...args],
    exitCode,
    stdout,
    stderr,
  });
}

describe("remediation validators", () => {
  it("records lint warnings without treating them as a failure", () => {
    const result = runLintValidator(process.cwd(), {
      executor: createExecutor(
        0,
        JSON.stringify([
          { warningCount: 1, errorCount: 0 },
          { warningCount: 2, errorCount: 0 },
        ]),
      ),
    });

    expect(result.ok).toBe(true);
    expect(result.warningCount).toBe(3);
    expect(createBaselineLintSnapshot(result)).toMatchObject({
      status: "warning-count-recorded",
      warningCount: 3,
    });
  });

  it("fails lint validation when the command exits nonzero", () => {
    const result = runLintValidator(process.cwd(), {
      executor: createExecutor(1, JSON.stringify([{ warningCount: 0, errorCount: 1 }])),
    });

    expect(result.ok).toBe(false);
    expect(result.issues).toContainEqual(
      expect.objectContaining({
        code: "lint-errors-present",
      }),
    );
  });

  it("fails build validation on a nonzero exit", () => {
    const result = runBuildValidator(process.cwd(), {
      executor: createExecutor(1, "", "build failed"),
    });

    expect(result.ok).toBe(false);
    expect(result.issues).toContainEqual(
      expect.objectContaining({
        code: "build-command-failed",
      }),
    );
  });

  it("returns not-required for tests when the unit does not require them", () => {
    const result = runTestValidator(process.cwd(), {
      required: false,
    });

    expect(result.ok).toBe(true);
    expect(result.status).toBe("not-required");
  });

  it("requires browser evidence for every route and viewport assertion", () => {
    const passResult = runBrowserValidator({
      required: true,
      checks: [
        {
          route: "/rollback-financing#faq",
          viewport: "both",
          assertions: ["faq renders", "accordion opens"],
        },
      ],
      observations: [
        {
          route: "/rollback-financing#faq",
          viewport: "desktop",
          assertionsPassed: ["faq renders", "accordion opens"],
          status: "passed",
        },
        {
          route: "/rollback-financing#faq",
          viewport: "mobile",
          assertionsPassed: ["faq renders", "accordion opens"],
          status: "passed",
        },
      ],
    });

    const failResult = runBrowserValidator({
      required: true,
      checks: [
        {
          route: "/rollback-financing#faq",
          viewport: "both",
          assertions: ["faq renders", "accordion opens"],
        },
      ],
      observations: [
        {
          route: "/rollback-financing#faq",
          viewport: "desktop",
          assertionsPassed: ["faq renders"],
          status: "passed",
        },
      ],
    });

    expect(passResult.ok).toBe(true);
    expect(failResult.ok).toBe(false);
    expect(failResult.missingChecks).toContain("/rollback-financing#faq [mobile]");
    expect(failResult.failedChecks).toContain("/rollback-financing#faq [desktop] :: accordion opens");
  });

  it("fails visual validation on unexpected visual change", () => {
    const result = runVisualValidator({
      required: true,
      routes: ["/rollback-financing"],
      viewports: ["desktop", "mobile"],
      visualPolicy: {
        mode: "strict-minimum-only",
        declaredScope: "strict-minimum",
        failOnUnexpectedChange: true,
        allowOpportunisticStyling: false,
        reviewRequiresVisualSurfaceChanged: true,
        promptDirectives: [],
      },
      observations: [
        {
          route: "/rollback-financing",
          viewport: "desktop",
          comparison: "matched",
          changed: false,
        },
        {
          route: "/rollback-financing",
          viewport: "mobile",
          comparison: "unexpected-change",
          changed: true,
          notes: ["Typography drifted outside the disclosure block."],
        },
      ],
    });

    expect(result.ok).toBe(false);
    expect(result.visualSurfaceChanged).toBe(true);
    expect(result.issues).toContainEqual(
      expect.objectContaining({
        code: "visual-unexpected-change",
      }),
    );
  });

  it("fails baseline comparison when lint warnings regress above the recorded baseline", () => {
    const lintResult = runLintValidator(process.cwd(), {
      executor: createExecutor(0, JSON.stringify([{ warningCount: 4, errorCount: 0 }])),
    });
    const buildResult = runBuildValidator(process.cwd(), {
      executor: createExecutor(0, "build ok"),
    });

    const result = compareToBaseline({
      program: {
        programId: "test-program",
        displayName: "Test Program",
        baseBranch: "main",
        registryPath: "registry.ts",
        trackerPath: "tracker.json",
        statusPath: "status.md",
        artifactRoot: "artifacts",
        baselineConfig: {
          defaultViewports: ["desktop", "mobile"],
          enforceLintBaseline: true,
          enforceBuildBaseline: true,
        },
        defaultRunnerPolicyByWave: {
          1: { mode: "supervised-auto-run", adapter: "fake" },
          2: { mode: "supervised-auto-run", adapter: "fake" },
          3: { mode: "supervised-auto-run", adapter: "fake" },
          4: { mode: "supervised-auto-run", adapter: "fake" },
          5: { mode: "supervised-auto-run", adapter: "fake" },
        },
        defaultCommitPolicy: {
          mode: "stage-and-approve",
          provenanceRequired: true,
        },
        defaultAttemptBudget: 3,
        requiredControlFiles: [],
      },
      baseline: {
        programId: "test-program",
        timestamp: "2026-04-05T15:00:00.000Z",
        trackerPath: "tracker.json",
        statusPath: "status.md",
        nodeVersion: process.version,
        workingTree: {
          status: "clean",
          changedFiles: [],
        },
        lint: {
          status: "warning-count-recorded",
          warningCount: 2,
        },
        build: {
          status: "passed",
        },
        visual: {
          status: "not-required",
          routes: [],
          viewports: ["desktop", "mobile"],
        },
      },
      lintResult,
      buildResult,
    });

    expect(result.ok).toBe(false);
    expect(result.issues).toContainEqual(
      expect.objectContaining({
        code: "baseline-lint-regressed",
      }),
    );
    expect(result.checks).toContainEqual(
      expect.objectContaining({
        metric: "build",
        ok: true,
      }),
    );
  });
});
