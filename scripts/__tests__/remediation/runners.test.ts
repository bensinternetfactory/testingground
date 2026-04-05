import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";
import { createClaudeRunner } from "@/scripts/remediation/runners/claude";
import { createCodexRunner } from "@/scripts/remediation/runners/codex";
import type { RunnerCommandExecutor, RunnerExecutionInput } from "@/scripts/remediation/runners/adapter";
import type { RemediationProgramDefinition } from "@/scripts/remediation/types";

const tempRoots: string[] = [];

function createTempRoot() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "remediation-runners-"));
  tempRoots.push(tempRoot);
  return tempRoot;
}

function writeRepoFile(root: string, relativePath: string, contents = "") {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

function initializeGitRepo(root: string) {
  execFileSync("git", ["init"], { cwd: root, stdio: ["ignore", "ignore", "ignore"] });
  execFileSync("git", ["config", "user.name", "Remediation Test"], { cwd: root });
  execFileSync("git", ["config", "user.email", "remediation@example.com"], { cwd: root });
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync("git", ["commit", "-m", "Initial fixture"], {
    cwd: root,
    stdio: ["ignore", "ignore", "ignore"],
  });
}

function createRunnerFixture(root: string): {
  definition: RemediationProgramDefinition;
  input: RunnerExecutionInput;
} {
  writeRepoFile(root, "app/example.tsx", "export default function Example() { return null; }\n");
  writeRepoFile(root, "plans/remidation/source.md", "fixture\n");
  initializeGitRepo(root);

  const definition: RemediationProgramDefinition = {
    program: {
      programId: "test-program",
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
        1: { mode: "supervised-auto-run", adapter: "codex" },
        2: { mode: "supervised-auto-run", adapter: "codex" },
        3: { mode: "interactive-review", adapter: "codex" },
        4: { mode: "interactive-review", adapter: "codex" },
        5: { mode: "supervised-auto-run", adapter: "codex" },
      },
      defaultCommitPolicy: {
        mode: "stage-and-approve",
        provenanceRequired: true,
      },
      defaultAttemptBudget: 3,
      requiredControlFiles: [],
    },
    units: [
      {
        id: "UNIT-001",
        programId: "test-program",
        wave: 1,
        title: "Fixture remediation unit",
        type: "bugfix-nonvisual",
        branch: "remediation/test-program/wave-1/unit-001",
        sourceRef: {
          kind: "manual",
          path: "plans/remidation/source.md",
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

  return {
    definition,
    input: {
      cwd: root,
      definition,
      unit: definition.units[0],
      payload: {
        templateVersion: "remediation-prompt.v1",
        programId: "test-program",
        programDisplayName: "Test Program",
        unit: {
          id: "UNIT-001",
          title: "Fixture remediation unit",
          type: "bugfix-nonvisual",
          wave: 1,
          branch: "remediation/test-program/wave-1/unit-001",
          ownerSurface: "fixture-surface",
          tags: ["fixture"],
          sourceRef: {
            kind: "manual",
            path: "plans/remidation/source.md",
          },
          findingIds: [],
          evidencePaths: [],
          isComposite: false,
        },
        currentWave: 1,
        execution: {
          runnerPolicy: { mode: "supervised-auto-run", adapter: "codex" },
          commitPolicy: { mode: "stage-and-approve", provenanceRequired: true },
          attemptBudget: 3,
          visualPolicy: {
            mode: "preserve-appearance",
            declaredScope: "none",
            failOnUnexpectedChange: true,
            allowOpportunisticStyling: false,
            reviewRequiresVisualSurfaceChanged: true,
            promptDirectives: [],
          },
        },
        constraints: {
          allowedFiles: ["app/example.tsx"],
          dependsOn: [],
          requiredSkills: [],
          claudeMdHints: [],
          requiredControlFiles: [],
          rollbackHints: [],
          fixReportPath: "plans/remidation/artifacts/test-program/UNIT-001/fix-report.md",
        },
        validation: {
          requiresLint: true,
          requiresBuild: true,
          requiresTests: false,
          requiresBrowserValidation: false,
          requiresVisualRegression: false,
          browserChecks: [],
          baselineRoutes: [],
          baselineViewports: ["desktop", "mobile"],
          enforceLintBaseline: true,
          enforceBuildBaseline: true,
        },
        renderedPrompt: "Fix the fixture.",
      },
      runId: "unit-001-run",
      attemptNumber: 1,
    },
  };
}

afterEach(() => {
  for (const tempRoot of tempRoots.splice(0)) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

describe("real remediation runners", () => {
  it("maps a successful codex subprocess run into a completed normalized result", () => {
    const root = createTempRoot();
    const { input } = createRunnerFixture(root);

    const commandExecutor: RunnerCommandExecutor = (_command, args, options) => {
      expect(args).toContain("exec");
      expect(args).toContain("--output-schema");
      expect(args.at(-1)).toBe("-");
      expect(options.cwd).toBe(root);
      expect(options.input).toContain("Final response requirements:");

      writeRepoFile(root, "app/example.tsx", "export default function Example() { return 'updated'; }\n");

      const outputPath = args[args.indexOf("--output-last-message") + 1];
      fs.writeFileSync(
        outputPath,
        JSON.stringify({
          summary: "Updated the fixture file.",
          details: ["Kept the change inside the allowlist."],
          browserObservations: [],
          visualObservations: [],
          visualSurfaceChanged: false,
        }),
      );

      return {
        command: ["codex", ...args],
        exitCode: 0,
        signal: null,
        stdout: "",
        stderr: "",
        timedOut: false,
      };
    };

    const result = createCodexRunner({ commandExecutor }).run(input);

    expect(result).toMatchObject({
      status: "completed",
      summary: "Updated the fixture file.",
      changedFiles: ["app/example.tsx"],
      visualSurfaceChanged: false,
    });
  });

  it("maps a timed out claude subprocess run to the timed-out runner status", () => {
    const root = createTempRoot();
    const { input } = createRunnerFixture(root);

    const commandExecutor: RunnerCommandExecutor = (_command, args, options) => {
      expect(args).toContain("--print");
      expect(args).toContain("--permission-mode");
      expect(args).toContain("dontAsk");
      expect(options.cwd).toBe(root);

      return {
        command: ["claude", ...args],
        exitCode: null,
        signal: "SIGTERM",
        stdout: "",
        stderr: "timed out",
        timedOut: true,
      };
    };

    const result = createClaudeRunner({ commandExecutor }).run(input);

    expect(result.status).toBe("timed-out");
    expect(result.changedFiles).toEqual([]);
  });

  it("marks malformed structured output when the subprocess exits cleanly without valid JSON", () => {
    const root = createTempRoot();
    const { input } = createRunnerFixture(root);

    const commandExecutor: RunnerCommandExecutor = () => ({
      command: ["claude"],
      exitCode: 0,
      signal: null,
      stdout: "not json",
      stderr: "",
      timedOut: false,
    });

    const result = createClaudeRunner({ commandExecutor }).run(input);

    expect(result.status).toBe("malformed-output");
  });
});
