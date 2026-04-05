import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import type { PreflightCheck, RemediationProgramDefinition, RemediationUnit, WaveSummaryArtifact } from "../types.ts";
import { getProgramArtifactRoot } from "./artifacts.ts";

const STALE_BRANCH_COMMIT_THRESHOLD = 10;

export interface BranchGateEnvironment {
  getCurrentBranch?: (cwd: string) => string | undefined;
  branchExists?: (cwd: string, branch: string) => boolean;
  countCommitsBehind?: (cwd: string, branch: string, baseBranch: string) => number | undefined;
  isCommitMergedIntoBranch?: (cwd: string, commitSha: string, branch: string) => boolean;
}

export interface BranchGateResult {
  ok: boolean;
  checks: PreflightCheck[];
}

function createCheck(
  name: string,
  status: PreflightCheck["status"],
  summary: string,
  details?: string[],
): PreflightCheck {
  return { name, status, summary, ...(details && details.length > 0 ? { details } : {}) };
}

function defaultGetCurrentBranch(cwd: string): string | undefined {
  try {
    return execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return undefined;
  }
}

function defaultBranchExists(cwd: string, branch: string): boolean {
  try {
    execFileSync("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`], {
      cwd,
      stdio: ["ignore", "ignore", "ignore"],
    });
    return true;
  } catch {
    return false;
  }
}

function defaultCountCommitsBehind(cwd: string, branch: string, baseBranch: string): number | undefined {
  try {
    return Number(
      execFileSync("git", ["rev-list", "--count", `${branch}..${baseBranch}`], {
        cwd,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim(),
    );
  } catch {
    return undefined;
  }
}

function defaultIsCommitMergedIntoBranch(cwd: string, commitSha: string, branch: string): boolean {
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", commitSha, branch], {
      cwd,
      stdio: ["ignore", "ignore", "ignore"],
    });
    return true;
  } catch {
    return false;
  }
}

function getWaveSummaryPath(
  definition: RemediationProgramDefinition,
  cwd: string,
  wave: number,
): string {
  return path.join(getProgramArtifactRoot(definition, cwd), "wave-summaries", `wave-${wave}.json`);
}

function readWaveSummary(
  definition: RemediationProgramDefinition,
  cwd: string,
  wave: number,
): WaveSummaryArtifact | undefined {
  const summaryPath = getWaveSummaryPath(definition, cwd, wave);

  if (!fs.existsSync(summaryPath)) {
    return undefined;
  }

  try {
    return JSON.parse(fs.readFileSync(summaryPath, "utf8")) as WaveSummaryArtifact;
  } catch {
    return undefined;
  }
}

export function evaluateWaveBranchGate(
  definition: RemediationProgramDefinition,
  cwd: string,
  unit: RemediationUnit,
  options: {
    allowStale?: boolean;
    environment?: BranchGateEnvironment;
  } = {},
): BranchGateResult {
  const environment = options.environment ?? {};
  const checks: PreflightCheck[] = [];
  const baseBranch = definition.program.baseBranch;

  if (unit.wave > 1) {
    const previousWave = unit.wave - 1;
    const waveSummary = readWaveSummary(definition, cwd, previousWave);

    if (!waveSummary) {
      checks.push(
        createCheck(
          "wave-branch-gate",
          "fail",
          `Wave ${unit.wave} cannot begin until the Wave ${previousWave} summary artifact exists.`,
          [path.relative(cwd, getWaveSummaryPath(definition, cwd, previousWave))],
        ),
      );

      return { ok: false, checks };
    }

    const mergedChecks = Object.entries(waveSummary.commitShas)
      .filter(([, commitSha]) => Boolean(commitSha))
      .map(([unitId, commitSha]) => ({
        unitId,
        commitSha,
        merged: (environment.isCommitMergedIntoBranch ?? defaultIsCommitMergedIntoBranch)(
          cwd,
          commitSha,
          baseBranch,
        ),
      }));

    const unmerged = mergedChecks.filter((entry) => !entry.merged);

    checks.push(
      unmerged.length === 0
        ? createCheck(
            "wave-branch-gate",
            "pass",
            `Wave ${unit.wave} is unblocked because Wave ${previousWave} commits are merged into ${baseBranch}.`,
          )
        : createCheck(
            "wave-branch-gate",
            "fail",
            `Wave ${unit.wave} cannot begin until Wave ${previousWave} commits are merged into ${baseBranch}.`,
            unmerged.map((entry) => `${entry.unitId}: ${entry.commitSha}`),
          ),
    );

    if (unmerged.length > 0) {
      return { ok: false, checks };
    }
  }

  const branchExists = (environment.branchExists ?? defaultBranchExists)(cwd, unit.branch);
  const currentBranch = (environment.getCurrentBranch ?? defaultGetCurrentBranch)(cwd);

  if (!branchExists) {
    checks.push(
      createCheck(
        "wave-branch-context",
        "warn",
        `Target branch ${unit.branch} does not exist locally yet; the orchestrator will continue on ${currentBranch ?? "the current branch"}.`,
      ),
    );

    return { ok: checks.every((check) => check.status !== "fail"), checks };
  }

  if (currentBranch && currentBranch !== unit.branch) {
    checks.push(
      createCheck(
        "wave-branch-context",
        "fail",
        `Target branch ${unit.branch} exists but the current branch is ${currentBranch}.`,
      ),
    );
    return { ok: false, checks };
  }

  const behindBy = (environment.countCommitsBehind ?? defaultCountCommitsBehind)(cwd, unit.branch, baseBranch);

  if (behindBy === undefined || Number.isNaN(behindBy)) {
    checks.push(
      createCheck(
        "wave-branch-staleness",
        "fail",
        `Unable to determine whether ${unit.branch} is stale against ${baseBranch}; verify the base branch is available locally or rerun from a complete git checkout.`,
      ),
    );

    return { ok: false, checks };
  }

  if (behindBy > STALE_BRANCH_COMMIT_THRESHOLD) {
    checks.push(
      createCheck(
        "wave-branch-staleness",
        options.allowStale ? "warn" : "fail",
        options.allowStale
          ? `Target branch ${unit.branch} is ${behindBy} commits behind ${baseBranch}, but --allow-stale was provided.`
          : `Target branch ${unit.branch} is ${behindBy} commits behind ${baseBranch}; rerun with --allow-stale to override.`,
      ),
    );
  } else {
    checks.push(
      createCheck(
        "wave-branch-staleness",
        behindBy > 0 ? "warn" : "pass",
        behindBy > 0
          ? `Target branch ${unit.branch} is ${behindBy} commits behind ${baseBranch}.`
          : `Target branch ${unit.branch} is current with ${baseBranch}.`,
      ),
    );
  }

  return {
    ok: checks.every((check) => check.status !== "fail"),
    checks,
  };
}
