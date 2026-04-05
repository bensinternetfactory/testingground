import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import type {
  BaselineSnapshot,
  PreflightCheck,
  RemediationPreflightResult,
  RemediationProgramDefinition,
  RemediationWave,
} from "../types.ts";
import { ensureProgramArtifactRoot, writeBaselineSnapshot } from "./artifacts.ts";
import { resolveNextUnit, validateTrackerEntries } from "./dependencies.ts";
import { DEFAULT_STALE_LOCK_MS, inspectProgramLock } from "./lockfile.ts";
import { resolveUnitPolicies } from "./policies.ts";
import { validateProgramDefinition } from "./registry.ts";
import { readTrackerState } from "./tracker.ts";
import { createBaselineBuildSnapshot, runBuildValidator } from "../validators/build.ts";
import type { CommandExecutor } from "../validators/command.ts";
import { createBaselineLintSnapshot, runLintValidator } from "../validators/lint.ts";

export const MIN_SUPPORTED_NODE_MAJOR = 20;

interface GitStatusSnapshot {
  status: "clean" | "dirty" | "unavailable";
  changedFiles: string[];
}

export interface PreflightEnvironment {
  now?: Date;
  staleAfterMs?: number;
  isProcessAlive?: (pid: number) => boolean;
  getGitSha?: (cwd: string) => string | undefined;
  getGitStatus?: (cwd: string) => GitStatusSnapshot;
  resolveBinary?: (binary: string, cwd: string) => string | undefined;
  lintExecutor?: CommandExecutor;
  buildExecutor?: CommandExecutor;
}

function createCheck(
  name: string,
  status: PreflightCheck["status"],
  summary: string,
  details?: string[],
): PreflightCheck {
  return { name, status, summary, ...(details && details.length > 0 ? { details } : {}) };
}

function getNodeMajor(version: string): number | undefined {
  const match = version.match(/^v(\d+)/);
  return match ? Number(match[1]) : undefined;
}

function defaultGetGitSha(cwd: string): string | undefined {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return undefined;
  }
}

function defaultGetGitStatus(cwd: string): GitStatusSnapshot {
  try {
    const output = execFileSync("git", ["status", "--short"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (!output) {
      return {
        status: "clean",
        changedFiles: [],
      };
    }

    return {
      status: "dirty",
      changedFiles: output
        .split(/\r?\n/)
        .map((line) => line.slice(3).trim())
        .filter(Boolean),
    };
  } catch {
    return {
      status: "unavailable",
      changedFiles: [],
    };
  }
}

function defaultResolveBinary(binary: string, cwd: string): string | undefined {
  try {
    return execFileSync("which", [binary], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return undefined;
  }
}

function collectVisualBaselinePlan(definition: RemediationProgramDefinition) {
  const routes = [...new Set(definition.units.flatMap((unit) => unit.baselineRoutes))];

  return {
    status: routes.length > 0 ? ("pending" as const) : ("not-required" as const),
    routes,
    viewports: [...definition.program.baselineConfig.defaultViewports],
    notes:
      routes.length > 0
        ? "Visual snapshot capture will be added with the validator module."
        : "No units currently require visual regression baselines.",
  };
}

export function buildBaselineSnapshot(
  definition: RemediationProgramDefinition,
  data: {
    now: Date;
    gitSha?: string;
    gitStatus: GitStatusSnapshot;
    currentWave?: RemediationWave;
    nextUnitId?: string;
    lint: BaselineSnapshot["lint"];
    build: BaselineSnapshot["build"];
  },
): BaselineSnapshot {
  return {
    programId: definition.program.programId,
    timestamp: data.now.toISOString(),
    ...(data.gitSha ? { gitSha: data.gitSha } : {}),
    ...(data.currentWave ? { currentWave: data.currentWave } : {}),
    ...(data.nextUnitId ? { nextUnitId: data.nextUnitId } : {}),
    trackerPath: definition.program.trackerPath,
    statusPath: definition.program.statusPath,
    nodeVersion: process.version,
    workingTree: data.gitStatus,
    lint: data.lint,
    build: data.build,
    visual: collectVisualBaselinePlan(definition),
  };
}

export function runPreflight(
  definition: RemediationProgramDefinition,
  cwd: string,
  environment: PreflightEnvironment = {},
): RemediationPreflightResult {
  const now = environment.now ?? new Date();
  const checks: PreflightCheck[] = [];
  const warnings: string[] = [];

  const registryValidation = validateProgramDefinition(definition, cwd);

  checks.push(
    registryValidation.issues.length === 0
      ? createCheck("registry", "pass", "Program registry and referenced evidence files validated.")
      : createCheck(
          "registry",
          "fail",
          "Program registry validation failed.",
          registryValidation.issues.map((issue) => `${issue.code}: ${issue.message}`),
        ),
  );

  const trackerState = readTrackerState(definition, cwd);
  warnings.push(...trackerState.warnings);

  const trackerValidation = validateTrackerEntries(definition, trackerState.tracker.entries);

  checks.push(
    trackerValidation.issues.length === 0
      ? createCheck(
          "tracker",
          trackerState.exists ? "pass" : "warn",
          trackerState.exists
            ? "Tracker state is structurally valid."
            : "Tracker file is missing; bootstrap state will be used until the first write.",
          trackerState.exists ? undefined : trackerState.warnings,
        )
      : createCheck(
          "tracker",
          "fail",
          "Tracker validation failed.",
          trackerValidation.issues.map((issue) => `${issue.code}: ${issue.message}`),
        ),
  );

  ensureProgramArtifactRoot(definition, cwd);
  checks.push(
    createCheck(
      "artifacts",
      "pass",
      `Artifact root is ready at ${definition.program.artifactRoot}.`,
    ),
  );

  let lockStatus: RemediationPreflightResult["lockStatus"] = "clear";
  const lockInspection = inspectProgramLock(definition, cwd, {
    now,
    staleAfterMs: environment.staleAfterMs ?? DEFAULT_STALE_LOCK_MS,
    isProcessAlive: environment.isProcessAlive,
  });

  if (!lockInspection.exists) {
    checks.push(createCheck("lock", "pass", "No active remediation lock is present."));
  } else if (lockInspection.isStale) {
    lockStatus = "stale";
    checks.push(
      createCheck(
        "lock",
        "fail",
        `A stale lock remains for ${lockInspection.lock?.unitId}; clear it with unlock-stale before running the orchestrator.`,
      ),
    );
  } else {
    lockStatus = "active";
    checks.push(
      createCheck(
        "lock",
        "fail",
        `An active lock already exists for ${lockInspection.lock?.unitId} (PID ${lockInspection.lock?.pid}).`,
      ),
    );
  }

  const nodeMajor = getNodeMajor(process.version);

  checks.push(
    nodeMajor !== undefined && nodeMajor >= MIN_SUPPORTED_NODE_MAJOR
      ? createCheck("node", "pass", `Node ${process.version} satisfies the minimum supported version.`)
      : createCheck(
          "node",
          "fail",
          `Node ${process.version} is below the supported minimum v${MIN_SUPPORTED_NODE_MAJOR}.`,
        ),
  );

  const nodeModulesPath = path.resolve(cwd, "node_modules");
  const dependenciesInstalled = fs.existsSync(nodeModulesPath);
  checks.push(
    dependenciesInstalled
      ? createCheck("dependencies", "pass", "Installed dependencies were detected in node_modules.")
      : createCheck("dependencies", "fail", "Dependencies are not installed; node_modules is missing."),
  );

  const gitStatus = (environment.getGitStatus ?? defaultGetGitStatus)(cwd);
  checks.push(
    gitStatus.status === "clean"
      ? createCheck("worktree", "pass", "Working tree is clean.")
      : gitStatus.status === "dirty"
        ? createCheck(
            "worktree",
            "warn",
            "Working tree is dirty; later orchestrator policy can decide whether this is acceptable.",
            gitStatus.changedFiles,
          )
        : createCheck(
            "worktree",
            "warn",
            "Git worktree status could not be determined from this environment.",
          ),
  );

  const resolution =
    registryValidation.issues.length === 0 && trackerValidation.issues.length === 0
      ? resolveNextUnit(definition, trackerState.tracker.entries)
      : undefined;
  const nextUnit = resolution?.nextUnit;
  let baselineLint: BaselineSnapshot["lint"] = {
    status: "pending",
    notes: "Baseline lint capture is pending.",
  };
  let baselineBuild: BaselineSnapshot["build"] = {
    status: "pending",
    notes: "Baseline build capture is pending.",
  };

  if (dependenciesInstalled && registryValidation.issues.length === 0 && trackerValidation.issues.length === 0) {
    const lintResult = runLintValidator(cwd, {
      executor: environment.lintExecutor,
    });
    baselineLint = createBaselineLintSnapshot(lintResult);
    checks.push(
      lintResult.ok
        ? createCheck("lint-baseline", "pass", lintResult.summary)
        : createCheck(
            "lint-baseline",
            "fail",
            lintResult.summary,
            lintResult.issues.flatMap((issue) => issue.details ?? issue.message),
          ),
    );

    const buildResult = runBuildValidator(cwd, {
      executor: environment.buildExecutor,
    });
    baselineBuild = createBaselineBuildSnapshot(buildResult);
    checks.push(
      buildResult.ok
        ? createCheck("build-baseline", "pass", buildResult.summary)
        : createCheck(
            "build-baseline",
            "fail",
            buildResult.summary,
            buildResult.issues.flatMap((issue) => issue.details ?? issue.message),
          ),
    );
  }

  if (nextUnit) {
    const runnerAdapter = resolveUnitPolicies(definition.program, nextUnit).runnerPolicy.adapter;

    if (runnerAdapter && runnerAdapter !== "fake") {
      const binaryPath = (environment.resolveBinary ?? defaultResolveBinary)(runnerAdapter, cwd);
      checks.push(
        binaryPath
          ? createCheck("runner-binary", "pass", `Runner binary ${runnerAdapter} is available at ${binaryPath}.`)
          : createCheck(
              "runner-binary",
              "warn",
              `Runner binary ${runnerAdapter} was not found. This remains warning-only until the runner adapter module lands.`,
            ),
      );
    }

    if (nextUnit.requiresBrowserValidation) {
      const browserBinary = (environment.resolveBinary ?? defaultResolveBinary)("agent-browser", cwd);
      checks.push(
        browserBinary
          ? createCheck("browser-tooling", "pass", `Browser tooling is available at ${browserBinary}.`)
          : createCheck(
              "browser-tooling",
              "fail",
              "Browser tooling was not found for a unit that requires browser validation.",
            ),
      );
      checks.push(
        createCheck(
          "dev-port",
          "warn",
          "Open-port probing is deferred until the browser validator module is implemented.",
        ),
      );
    }
  }

  const ok = checks.every((check) => check.status !== "fail");
  let baselineSnapshotPath: string | undefined;

  if (ok) {
    const gitSha = (environment.getGitSha ?? defaultGetGitSha)(cwd);
    const snapshot = buildBaselineSnapshot(definition, {
      now,
      gitSha,
      gitStatus,
      currentWave: resolution?.currentWave,
      nextUnitId: resolution?.nextUnit?.id,
      lint: baselineLint,
      build: baselineBuild,
    });
    baselineSnapshotPath = writeBaselineSnapshot(definition, cwd, snapshot);
    checks.push(
      createCheck(
        "baseline",
        "pass",
        `Baseline snapshot captured at ${path.relative(cwd, baselineSnapshotPath)}.`,
      ),
    );
  }

  return {
    programId: definition.program.programId,
    displayName: definition.program.displayName,
    ok,
    trackerFilePresent: trackerState.exists,
    currentWave: resolution?.currentWave,
    nextUnitId: resolution?.nextUnit?.id,
    lockPath: lockInspection.path,
    lockStatus,
    baselineSnapshotPath,
    warnings,
    checks,
  };
}
