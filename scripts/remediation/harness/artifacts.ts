import fs from "node:fs";
import path from "node:path";
import type {
  ApprovalArtifact,
  BaselineSnapshot,
  FailureArtifact,
  FixReportArtifact,
  RejectionArtifact,
  RemediationProgramDefinition,
  ReviewPacket,
  RollbackArtifact,
  WaveSummaryArtifact,
} from "../types.ts";

const BASELINE_SNAPSHOT_FILE = "baseline-snapshot.json";
const LATEST_REVIEW_PACKET_FILE = "latest-review-packet.md";
const LATEST_REVIEW_PACKET_DATA_FILE = "latest-review-packet.json";

function toBoolLabel(value: boolean): string {
  return value ? "yes" : "no";
}

function sanitizeFileToken(value: string): string {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function ensureParentDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeJsonFile(filePath: string, value: unknown) {
  ensureParentDir(filePath);
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function renderValidationSummary(
  validation: FixReportArtifact["validation"] | ReviewPacket["validation"],
): string[] {
  return [
    `- Lint OK: ${toBoolLabel(validation.lintOk)}`,
    `- Build OK: ${toBoolLabel(validation.buildOk)}`,
    `- Tests OK: ${toBoolLabel(validation.testOk)}`,
    `- Browser OK: ${toBoolLabel(validation.browserOk)}`,
    `- Visual regression OK: ${toBoolLabel(validation.visualRegressionOk)}`,
    ...("allowlistOk" in validation ? [`- Allowlist OK: ${toBoolLabel(validation.allowlistOk)}`] : []),
    ...("visualSurfaceChanged" in validation
      ? [`- Visual surface changed: ${toBoolLabel(validation.visualSurfaceChanged)}`]
      : []),
  ];
}

function renderFixReportMarkdown(artifact: FixReportArtifact): string {
  return [
    `# Fix Report: ${artifact.unitId}`,
    "",
    `- Program: ${artifact.programId}`,
    `- Run ID: ${artifact.runId}`,
    `- Title: ${artifact.title}`,
    `- Artifact path: ${artifact.artifactPath}`,
    "",
    "## Summary",
    artifact.summary,
    "",
    "## Changed Files",
    ...(artifact.changedFiles.length > 0 ? artifact.changedFiles.map((file) => `- ${file}`) : ["- None recorded."]),
    "",
    "## Validation",
    ...renderValidationSummary(artifact.validation),
    "",
  ].join("\n");
}

function renderReviewPacketMarkdown(packet: ReviewPacket): string {
  return [
    `# Review Packet: ${packet.unitId}`,
    "",
    `- Program: ${packet.programId}`,
    `- Run ID: ${packet.runId}`,
    `- Wave: ${packet.wave}`,
    `- Title: ${packet.title}`,
    `- Type: ${packet.type}`,
    `- Visual surface changed: ${toBoolLabel(packet.visualSurfaceChanged)}`,
    `- Prompt template version: ${packet.promptTemplateVersion}`,
    `- Draft commit message: ${packet.draftCommitMessage}`,
    `- Next eligible unit: ${packet.nextUnit ?? "none"}`,
    "",
    "## Files Changed",
    ...(packet.filesChanged.length > 0 ? packet.filesChanged.map((file) => `- ${file}`) : ["- None recorded."]),
    "",
    "## Validation",
    ...renderValidationSummary(packet.validation),
    "",
    "## Artifact Paths",
    ...(packet.artifactPaths.length > 0 ? packet.artifactPaths.map((artifactPath) => `- ${artifactPath}`) : ["- None recorded."]),
    "",
    "## Approval Gate",
    "- Approve commit?",
    "- Continue to next unit?",
    "",
  ].join("\n");
}

export function getProgramArtifactRoot(
  definition: RemediationProgramDefinition,
  cwd: string,
): string {
  return path.resolve(cwd, definition.program.artifactRoot);
}

export function ensureProgramArtifactRoot(
  definition: RemediationProgramDefinition,
  cwd: string,
): string {
  const artifactRoot = getProgramArtifactRoot(definition, cwd);
  fs.mkdirSync(artifactRoot, { recursive: true });
  return artifactRoot;
}

export function ensureUnitArtifactDir(
  definition: RemediationProgramDefinition,
  cwd: string,
  unitId: string,
): string {
  const unitDir = path.join(ensureProgramArtifactRoot(definition, cwd), unitId);
  fs.mkdirSync(unitDir, { recursive: true });
  return unitDir;
}

export function getBaselineSnapshotPath(
  definition: RemediationProgramDefinition,
  cwd: string,
): string {
  return path.join(ensureProgramArtifactRoot(definition, cwd), BASELINE_SNAPSHOT_FILE);
}

export function getLatestReviewPacketPath(
  definition: RemediationProgramDefinition,
  cwd: string,
): string {
  return path.join(ensureProgramArtifactRoot(definition, cwd), LATEST_REVIEW_PACKET_FILE);
}

export function getLatestReviewPacketDataPath(
  definition: RemediationProgramDefinition,
  cwd: string,
): string {
  return path.join(ensureProgramArtifactRoot(definition, cwd), LATEST_REVIEW_PACKET_DATA_FILE);
}

export function writeBaselineSnapshot(
  definition: RemediationProgramDefinition,
  cwd: string,
  snapshot: BaselineSnapshot,
): string {
  const artifactPath = getBaselineSnapshotPath(definition, cwd);
  writeJsonFile(artifactPath, snapshot);
  return artifactPath;
}

export function readBaselineSnapshot(
  definition: RemediationProgramDefinition,
  cwd: string,
): BaselineSnapshot | undefined {
  const artifactPath = getBaselineSnapshotPath(definition, cwd);

  if (!fs.existsSync(artifactPath)) {
    return undefined;
  }

  return JSON.parse(fs.readFileSync(artifactPath, "utf8")) as BaselineSnapshot;
}

export function writeFixReportArtifact(
  definition: RemediationProgramDefinition,
  cwd: string,
  artifact: FixReportArtifact,
): string {
  const artifactPath = path.resolve(cwd, artifact.artifactPath);
  ensureUnitArtifactDir(definition, cwd, artifact.unitId);
  ensureParentDir(artifactPath);
  fs.writeFileSync(artifactPath, renderFixReportMarkdown(artifact));
  return artifactPath;
}

export function writeFailureArtifact(
  definition: RemediationProgramDefinition,
  cwd: string,
  artifact: FailureArtifact,
): string {
  const unitDir = ensureUnitArtifactDir(definition, cwd, artifact.unitId);
  const stamp = sanitizeFileToken(artifact.timestamp);
  const artifactPath = path.join(unitDir, `failure-${stamp || "artifact"}.json`);
  writeJsonFile(artifactPath, artifact);
  return artifactPath;
}

export function writeLatestReviewPacket(
  definition: RemediationProgramDefinition,
  cwd: string,
  packet: ReviewPacket,
): string {
  const artifactPath = getLatestReviewPacketPath(definition, cwd);
  ensureParentDir(artifactPath);
  fs.writeFileSync(artifactPath, renderReviewPacketMarkdown(packet));
  writeJsonFile(getLatestReviewPacketDataPath(definition, cwd), packet);
  return artifactPath;
}

export function readLatestReviewPacket(
  definition: RemediationProgramDefinition,
  cwd: string,
): ReviewPacket | undefined {
  const artifactPath = getLatestReviewPacketDataPath(definition, cwd);

  if (!fs.existsSync(artifactPath)) {
    return undefined;
  }

  return JSON.parse(fs.readFileSync(artifactPath, "utf8")) as ReviewPacket;
}

export function writeApprovalArtifact(
  definition: RemediationProgramDefinition,
  cwd: string,
  artifact: ApprovalArtifact,
): string {
  const unitDir = ensureUnitArtifactDir(definition, cwd, artifact.unitId);
  const stamp = sanitizeFileToken(artifact.approvedAt);
  const artifactPath = path.join(unitDir, `approval-${stamp || "artifact"}.json`);
  writeJsonFile(artifactPath, artifact);
  return artifactPath;
}

export function writeRejectionArtifact(
  definition: RemediationProgramDefinition,
  cwd: string,
  artifact: RejectionArtifact,
): string {
  const unitDir = ensureUnitArtifactDir(definition, cwd, artifact.unitId);
  const stamp = sanitizeFileToken(artifact.rejectedAt);
  const artifactPath = path.join(unitDir, `rejection-${stamp || "artifact"}.json`);
  writeJsonFile(artifactPath, artifact);
  return artifactPath;
}

export function writeRollbackArtifact(
  definition: RemediationProgramDefinition,
  cwd: string,
  artifact: RollbackArtifact,
): string {
  const unitDir = ensureUnitArtifactDir(definition, cwd, artifact.unitId);
  const stamp = sanitizeFileToken(artifact.rolledBackAt);
  const artifactPath = path.join(unitDir, `rollback-${stamp || "artifact"}.json`);
  writeJsonFile(artifactPath, artifact);
  return artifactPath;
}

export function writeWaveSummaryArtifact(
  definition: RemediationProgramDefinition,
  cwd: string,
  artifact: WaveSummaryArtifact,
): string {
  const artifactPath = path.join(
    ensureProgramArtifactRoot(definition, cwd),
    "wave-summaries",
    `wave-${artifact.wave}.json`,
  );
  writeJsonFile(artifactPath, artifact);
  return artifactPath;
}
