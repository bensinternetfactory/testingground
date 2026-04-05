import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  writeBaselineSnapshot,
  writeFailureArtifact,
  writeFixReportArtifact,
  writeLatestReviewPacket,
} from "@/scripts/remediation/harness/artifacts";
import {
  acquireProgramLock,
  inspectProgramLock,
  unlockStaleProgramLock,
} from "@/scripts/remediation/harness/lockfile";
import { runPreflight } from "@/scripts/remediation/harness/preflight";
import type { RemediationProgramDefinition } from "@/scripts/remediation/types";

const tempRoots: string[] = [];

function createTempRoot() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "remediation-harness-"));
  tempRoots.push(tempRoot);
  return tempRoot;
}

function writeRepoFile(root: string, relativePath: string, contents = "") {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

function createTestProgram(root: string): RemediationProgramDefinition {
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
      defaultAttemptBudget: 3,
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

afterEach(() => {
  for (const tempRoot of tempRoots.splice(0)) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

describe("remediation persistence", () => {
  it("acquires locks, detects stale locks, and clears only stale locks", () => {
    const root = createTempRoot();
    const definition = createTestProgram(root);

    acquireProgramLock(
      definition,
      root,
      {
        unitId: "UNIT-001",
        wave: 1,
        runner: "fake",
        pid: 4242,
      },
      {
        now: new Date("2026-04-05T15:00:00.000Z"),
        isProcessAlive: () => true,
      },
    );

    const activeLock = inspectProgramLock(definition, root, {
      now: new Date("2026-04-05T15:30:00.000Z"),
      isProcessAlive: () => true,
    });

    expect(activeLock.exists).toBe(true);
    expect(activeLock.isStale).toBe(false);

    expect(() =>
      unlockStaleProgramLock(definition, root, {
        now: new Date("2026-04-05T15:30:00.000Z"),
        isProcessAlive: () => true,
      }),
    ).toThrow("is not stale");

    const staleLock = inspectProgramLock(definition, root, {
      now: new Date("2026-04-05T18:05:00.000Z"),
      isProcessAlive: () => false,
    });

    expect(staleLock.isStale).toBe(true);

    const clearedLock = unlockStaleProgramLock(definition, root, {
      now: new Date("2026-04-05T18:05:00.000Z"),
      isProcessAlive: () => false,
    });

    expect(clearedLock.unitId).toBe("UNIT-001");
    expect(inspectProgramLock(definition, root).exists).toBe(false);
  });

  it("writes baseline, fix, failure, and review artifacts into the program artifact tree", () => {
    const root = createTempRoot();
    const definition = createTestProgram(root);

    const baselinePath = writeBaselineSnapshot(definition, root, {
      programId: "test-program",
      timestamp: "2026-04-05T15:00:00.000Z",
      gitSha: "abc123",
      currentWave: 1,
      nextUnitId: "UNIT-001",
      trackerPath: definition.program.trackerPath,
      statusPath: definition.program.statusPath,
      nodeVersion: process.version,
      workingTree: {
        status: "clean",
        changedFiles: [],
      },
      lint: {
        status: "pending",
        notes: "Pending validator module.",
      },
      build: {
        status: "pending",
        notes: "Pending validator module.",
      },
      visual: {
        status: "not-required",
        routes: [],
        viewports: ["desktop", "mobile"],
        notes: "No visual baselines required.",
      },
    });

    const fixReportPath = writeFixReportArtifact(definition, root, {
      programId: "test-program",
      unitId: "UNIT-001",
      runId: "run-001",
      title: "Fixture remediation unit",
      summary: "Applied the fixture remediation.",
      changedFiles: ["app/example.tsx"],
      validation: {
        allowlistOk: true,
        lintOk: true,
        buildOk: true,
        testOk: true,
        browserOk: true,
        visualRegressionOk: true,
        visualSurfaceChanged: false,
      },
      artifactPath: "plans/remidation/artifacts/test-program/UNIT-001/fix-report.md",
    });

    const failurePath = writeFailureArtifact(definition, root, {
      programId: "test-program",
      unitId: "UNIT-001",
      timestamp: "2026-04-05T16:00:00.000Z",
      runner: "fake",
      changedFiles: ["app/example.tsx"],
      failingChecks: ["lint"],
      summary: "Fixture validation failed.",
      agentAttemptCount: 1,
      validationRetryCount: 0,
      worktreeState: "unstaged",
      promptTemplateVersion: "remediation-prompt.v1",
    });

    const reviewPacketPath = writeLatestReviewPacket(definition, root, {
      programId: "test-program",
      unitId: "UNIT-001",
      title: "Fixture remediation unit",
      type: "bugfix-nonvisual",
      filesChanged: ["app/example.tsx"],
      visualSurfaceChanged: false,
      validation: {
        lintOk: true,
        buildOk: true,
        testOk: true,
        browserOk: true,
        visualRegressionOk: true,
      },
      draftCommitMessage: "Fix fixture remediation unit",
      promptTemplateVersion: "remediation-prompt.v1",
      artifactPaths: [baselinePath, fixReportPath, failurePath],
      nextUnit: "UNIT-002",
    });

    expect(fs.readFileSync(baselinePath, "utf8")).toContain("\"gitSha\": \"abc123\"");
    expect(fs.readFileSync(fixReportPath, "utf8")).toContain("# Fix Report: UNIT-001");
    expect(fs.readFileSync(failurePath, "utf8")).toContain("\"failingChecks\": [");
    expect(fs.readFileSync(reviewPacketPath, "utf8")).toContain("# Review Packet: UNIT-001");
  });

  it("captures a baseline snapshot during preflight once structural checks pass", () => {
    const root = createTempRoot();
    const definition = createTestProgram(root);

    const result = runPreflight(definition, root, {
      now: new Date("2026-04-05T15:00:00.000Z"),
      getGitSha: () => "abc123",
      getGitStatus: () => ({
        status: "clean",
        changedFiles: [],
      }),
      lintExecutor: (command, args) => ({
        command: [command, ...args],
        exitCode: 0,
        stdout: JSON.stringify([
          {
            warningCount: 2,
            errorCount: 0,
          },
        ]),
        stderr: "",
      }),
      buildExecutor: (command, args) => ({
        command: [command, ...args],
        exitCode: 0,
        stdout: "build ok",
        stderr: "",
      }),
    });

    expect(result.ok).toBe(true);
    expect(result.lockStatus).toBe("clear");
    expect(result.currentWave).toBe(1);
    expect(result.nextUnitId).toBe("UNIT-001");
    expect(result.baselineSnapshotPath).toBeDefined();
    expect(result.checks).toContainEqual(
      expect.objectContaining({
        name: "baseline",
        status: "pass",
      }),
    );

    const snapshot = JSON.parse(fs.readFileSync(result.baselineSnapshotPath!, "utf8"));

    expect(snapshot).toMatchObject({
      programId: "test-program",
      gitSha: "abc123",
      currentWave: 1,
      nextUnitId: "UNIT-001",
      lint: {
        status: "warning-count-recorded",
        warningCount: 2,
      },
      build: {
        status: "passed",
      },
      visual: {
        status: "not-required",
      },
    });
  });
});
