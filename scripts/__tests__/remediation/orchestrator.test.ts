import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runSingleRemediationUnit } from "@/scripts/remediation/orchestrator/run-unit";
import { createFakeRunner } from "@/scripts/remediation/runners/fake";
import type { RemediationProgramDefinition } from "@/scripts/remediation/types";

const tempRoots: string[] = [];

function createTempRoot() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "remediation-orchestrator-"));
  tempRoots.push(tempRoot);
  return tempRoot;
}

function writeRepoFile(root: string, relativePath: string, contents = "") {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

function createTestProgram(root: string, attemptBudget = 3): RemediationProgramDefinition {
  const programId = "test-program";
  const requiredFiles = [
    "scripts/remediation/programs/test-program.ts",
    "plans/remidation/source.md",
    "plans/remidation/evidence.md",
    "plans/remidation/status.md",
    "plans/remidation/control.md",
  ];

  for (const file of requiredFiles) {
    writeRepoFile(root, file, `fixture for ${file}\n`);
  }

  writeRepoFile(root, "app/example.tsx", "export default function Example() { return null; }\n");
  fs.mkdirSync(path.join(root, "node_modules"), { recursive: true });

  return {
    program: {
      programId,
      displayName: "Test Program",
      registryPath: "scripts/remediation/programs/test-program.ts",
      trackerPath: "plans/remidation/test-program-tracker.json",
      statusPath: "plans/remidation/status.md",
      artifactRoot: "plans/remidation/artifacts/test-program",
      baselineConfig: {
        defaultViewports: ["desktop", "mobile"],
        enforceLintBaseline: true,
        enforceBuildBaseline: true,
      },
      defaultRunnerPolicyByWave: {
        1: { mode: "supervised-auto-run", adapter: "fake", rationale: "Fixture" },
        2: { mode: "supervised-auto-run", adapter: "fake", rationale: "Fixture" },
        3: { mode: "interactive-review", adapter: "fake", rationale: "Fixture" },
        4: { mode: "interactive-review", adapter: "fake", rationale: "Fixture" },
        5: { mode: "supervised-auto-run", adapter: "fake", rationale: "Fixture" },
      },
      defaultCommitPolicy: {
        mode: "stage-and-approve",
        provenanceRequired: true,
      },
      defaultAttemptBudget: attemptBudget,
      requiredControlFiles: ["plans/remidation/control.md"],
    },
    units: [
      {
        id: "UNIT-001",
        programId,
        wave: 1,
        title: "Fixture remediation unit",
        type: "bugfix-nonvisual",
        branch: "remediation/test-program/wave-1/unit-001",
        sourceRef: {
          kind: "manual",
          path: "plans/remidation/source.md",
          evidencePaths: ["plans/remidation/evidence.md"],
        },
        allowedFiles: ["app/example.tsx"],
        dependsOn: [],
        requiredSkills: [],
        claudeMdHints: [],
        requiresTests: false,
        requiresBrowserValidation: false,
        requiresVisualRegression: false,
        browserChecks: [],
        ownerSurface: "fixture-surface",
        tags: ["fixture"],
        baselineRoutes: [],
        visualChangeScope: "none",
        fixReportPath: "plans/remidation/artifacts/test-program/UNIT-001/fix-report.md",
        rollbackHints: [],
      },
    ],
  };
}

function createSuccessfulExecutors() {
  return {
    lintExecutor: () => ({
      command: ["eslint", ".", "--format", "json"],
      exitCode: 0,
      stdout: JSON.stringify([{ warningCount: 0, errorCount: 0 }]),
      stderr: "",
    }),
    buildExecutor: () => ({
      command: ["npm", "run", "build"],
      exitCode: 0,
      stdout: "build ok",
      stderr: "",
    }),
    testExecutor: () => ({
      command: ["npm", "test"],
      exitCode: 0,
      stdout: "tests ok",
      stderr: "",
    }),
  };
}

afterEach(() => {
  for (const tempRoot of tempRoots.splice(0)) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

describe("remediation orchestrator", () => {
  it("runs one successful fake remediation unit, stages it, and writes approval artifacts", () => {
    const root = createTempRoot();
    const definition = createTestProgram(root);
    const stagedFiles: string[][] = [];

    const result = runSingleRemediationUnit(definition, root, {
      now: new Date("2026-04-05T18:00:00.000Z"),
      runner: createFakeRunner({
        scenario: "success",
        fileWrites: {
          "app/example.tsx": "export default function Example() { return 'updated'; }\n",
        },
      }),
      stageFiles: (_cwd, changedFiles) => {
        stagedFiles.push(changedFiles);
      },
      ...createSuccessfulExecutors(),
    });

    expect(result.runtime.finalState).toBe("passed");
    expect(result.runtime.staged).toBe(true);
    expect(result.runtime.commitApproved).toBe(false);
    expect(result.runtime.allowlistOk).toBe(true);
    expect(result.fixReportPath).toBeDefined();
    expect(result.reviewPacketPath).toBeDefined();
    expect(result.baselineSnapshotPath).toBeDefined();
    expect(stagedFiles).toEqual([["app/example.tsx"]]);

    const tracker = JSON.parse(
      fs.readFileSync(path.join(root, definition.program.trackerPath), "utf8"),
    );
    expect(tracker.entries).toContainEqual(
      expect.objectContaining({
        unitId: "UNIT-001",
        state: "in-progress",
        attemptCount: 1,
      }),
    );

    const statusContents = fs.readFileSync(path.join(root, definition.program.statusPath), "utf8");
    expect(statusContents).toContain("## Remediation Runtime");
    expect(statusContents).toContain("- Final state: passed");
  });

  it("fails closed when the fake runner touches a disallowed file", () => {
    const root = createTempRoot();
    const definition = createTestProgram(root);

    const result = runSingleRemediationUnit(definition, root, {
      now: new Date("2026-04-05T18:10:00.000Z"),
      runner: createFakeRunner({
        scenario: "touches-disallowed-file",
      }),
      stageFiles: () => {
        throw new Error("stageFiles should not run on invalid allowlist output");
      },
      ...createSuccessfulExecutors(),
    });

    expect(result.runtime.finalState).toBe("invalid");
    expect(result.runtime.allowlistOk).toBe(false);
    expect(result.failureArtifactPath).toBeDefined();
    expect(result.runtime.reportWritten).toBe(true);
    expect(fs.readFileSync(result.failureArtifactPath!, "utf8")).toContain("app/disallowed.tsx");
  });

  it("blocks the unit once the attempt budget is exhausted by a repeated deterministic failure", () => {
    const root = createTempRoot();
    const definition = createTestProgram(root, 1);

    const result = runSingleRemediationUnit(definition, root, {
      now: new Date("2026-04-05T18:20:00.000Z"),
      runner: createFakeRunner({
        scenario: "success",
        fileWrites: {
          "app/example.tsx": "export default function Example() { return 'updated'; }\n",
        },
      }),
      preflightLintExecutor: createSuccessfulExecutors().lintExecutor,
      preflightBuildExecutor: createSuccessfulExecutors().buildExecutor,
      lintExecutor: () => ({
        command: ["eslint", ".", "--format", "json"],
        exitCode: 1,
        stdout: JSON.stringify([{ warningCount: 0, errorCount: 1 }]),
        stderr: "lint failed",
      }),
      buildExecutor: createSuccessfulExecutors().buildExecutor,
      testExecutor: createSuccessfulExecutors().testExecutor,
    });

    expect(result.runtime.finalState).toBe("blocked");
    expect(result.runtime.lintOk).toBe(false);
    expect(result.failureArtifactPath).toBeDefined();

    const tracker = JSON.parse(
      fs.readFileSync(path.join(root, definition.program.trackerPath), "utf8"),
    );
    expect(tracker.entries).toContainEqual(
      expect.objectContaining({
        unitId: "UNIT-001",
        state: "blocked",
        attemptCount: 1,
      }),
    );
  });
});
