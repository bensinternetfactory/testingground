export const REMEDIATION_UNIT_TYPES = [
  "bugfix-nonvisual",
  "bugfix-visual-safe",
  "architecture",
  "docs",
] as const;

export const REMEDIATION_WAVES = [1, 2, 3, 4, 5] as const;

export const RUNNER_ADAPTERS = ["codex", "claude", "fake"] as const;

export const RUNNER_MODES = [
  "supervised-auto-run",
  "interactive-review",
] as const;

export const COMMIT_MODES = [
  "stage-and-approve",
  "auto-commit-allowed",
] as const;

export const REMEDIATION_TRACKER_STATES = [
  "not-started",
  "in-progress",
  "fixed",
  "blocked",
  "deferred",
] as const;

export const SOURCE_KINDS = [
  "ledger",
  "review-doc",
  "scan",
  "accessibility-audit",
  "manual",
  "other",
] as const;

export const VISUAL_CHANGE_SCOPES = [
  "none",
  "strict-minimum",
  "declared-scope",
] as const;

export const VISUAL_POLICY_MODES = [
  "preserve-appearance",
  "strict-minimum-only",
] as const;

export const VIEWPORT_TARGETS = ["desktop", "mobile", "both"] as const;
export const PREFLIGHT_CHECK_STATUSES = ["pass", "warn", "fail"] as const;
export const VALIDATOR_NAMES = [
  "lint",
  "build",
  "test",
  "browser",
  "visual",
  "baseline",
] as const;
export const VALIDATOR_STATUSES = ["passed", "failed", "not-required"] as const;
export const RUNNER_EXECUTION_STATUSES = [
  "completed",
  "timed-out",
  "malformed-output",
  "crashed",
] as const;

export type RemediationUnitType = (typeof REMEDIATION_UNIT_TYPES)[number];
export type RemediationWave = (typeof REMEDIATION_WAVES)[number];
export type RunnerAdapterName = (typeof RUNNER_ADAPTERS)[number];
export type RunnerMode = (typeof RUNNER_MODES)[number];
export type CommitMode = (typeof COMMIT_MODES)[number];
export type RemediationTrackerState = (typeof REMEDIATION_TRACKER_STATES)[number];
export type SourceKind = (typeof SOURCE_KINDS)[number];
export type VisualChangeScope = (typeof VISUAL_CHANGE_SCOPES)[number];
export type VisualPolicyMode = (typeof VISUAL_POLICY_MODES)[number];
export type ViewportTarget = (typeof VIEWPORT_TARGETS)[number];
export type PreflightCheckStatus = (typeof PREFLIGHT_CHECK_STATUSES)[number];
export type ValidatorName = (typeof VALIDATOR_NAMES)[number];
export type ValidatorStatus = (typeof VALIDATOR_STATUSES)[number];
export type RunnerExecutionStatus = (typeof RUNNER_EXECUTION_STATUSES)[number];

export interface RunnerPolicy {
  mode: RunnerMode;
  adapter?: RunnerAdapterName;
  rationale?: string;
}

export interface CommitPolicy {
  mode: CommitMode;
  provenanceRequired: boolean;
}

export interface BrowserCheck {
  route: string;
  viewport: ViewportTarget;
  assertions: string[];
}

export interface RemediationSourceRef {
  kind: SourceKind;
  path: string;
  findingIds?: string[];
  evidencePaths?: string[];
  notes?: string;
}

export interface BaselineConfig {
  defaultViewports: Array<Exclude<ViewportTarget, "both">>;
  enforceLintBaseline: boolean;
  enforceBuildBaseline: boolean;
}

export interface RemediationProgramConfig {
  programId: string;
  displayName: string;
  registryPath: string;
  trackerPath: string;
  statusPath: string;
  artifactRoot: string;
  baselineConfig: BaselineConfig;
  defaultRunnerPolicyByWave: Record<RemediationWave, RunnerPolicy>;
  defaultCommitPolicy: CommitPolicy;
  defaultAttemptBudget: number;
  requiredControlFiles: string[];
}

export interface RemediationUnit {
  id: string;
  programId: string;
  wave: RemediationWave;
  title: string;
  type: RemediationUnitType;
  branch: string;
  sourceRef: RemediationSourceRef;
  allowedFiles: string[];
  dependsOn: string[];
  requiredSkills: string[];
  claudeMdHints: string[];
  requiresTests: boolean;
  requiresBrowserValidation: boolean;
  requiresVisualRegression: boolean;
  browserChecks: BrowserCheck[];
  ownerSurface: string;
  tags: string[];
  baselineRoutes: string[];
  visualChangeScope: VisualChangeScope;
  visualChangeNotes?: string;
  runnerPolicy?: RunnerPolicy;
  commitPolicy?: CommitPolicy;
  attemptBudget?: number;
  fixReportPath: string;
  rollbackHints: string[];
}

export interface RemediationProgramDefinition {
  program: RemediationProgramConfig;
  units: RemediationUnit[];
}

export interface RemediationTrackerEntry {
  unitId: string;
  state: RemediationTrackerState;
  attemptCount: number;
  commitSha?: string;
  lastRunId?: string;
  blockedReason?: string;
  unblockAction?: string;
  notes?: string;
}

export interface RemediationTrackerFile {
  programId: string;
  entries: RemediationTrackerEntry[];
}

export interface RegistryValidationIssue {
  code: string;
  message: string;
  unitId?: string;
  field?: string;
}

export interface RegistryIndex {
  unitsById: Map<string, RemediationUnit>;
  unitIdsByFindingId: Map<string, string>;
}

export interface RegistryValidationResult {
  issues: RegistryValidationIssue[];
  index: RegistryIndex;
}

export interface RemediationLockFile {
  programId: string;
  unitId: string;
  wave: RemediationWave;
  pid: number;
  runner: RunnerAdapterName;
  timestamp: string;
}

export interface ValidationIssue {
  code: string;
  message: string;
  details?: string[];
}

export interface ValidatorResultBase {
  validator: ValidatorName;
  status: ValidatorStatus;
  ok: boolean;
  summary: string;
  issues: ValidationIssue[];
}

export interface LintValidatorResult extends ValidatorResultBase {
  validator: "lint";
  command: string[];
  warningCount: number;
  errorCount: number;
}

export interface BuildValidatorResult extends ValidatorResultBase {
  validator: "build";
  command: string[];
}

export interface TestValidatorResult extends ValidatorResultBase {
  validator: "test";
  required: boolean;
  command?: string[];
}

export interface BrowserCheckObservation {
  route: string;
  viewport: Exclude<ViewportTarget, "both">;
  assertionsPassed: string[];
  status: "passed" | "failed";
  notes?: string[];
}

export interface BrowserValidatorResult extends ValidatorResultBase {
  validator: "browser";
  required: boolean;
  expectedCheckCount: number;
  observedCheckCount: number;
  missingChecks: string[];
  failedChecks: string[];
}

export interface VisualCheckObservation {
  route: string;
  viewport: Exclude<ViewportTarget, "both">;
  comparison: "matched" | "approved-change" | "unexpected-change" | "error";
  changed: boolean;
  artifactPath?: string;
  notes?: string[];
}

export interface VisualValidatorResult extends ValidatorResultBase {
  validator: "visual";
  required: boolean;
  expectedCaptureCount: number;
  observedCaptureCount: number;
  visualSurfaceChanged: boolean;
  artifactPaths: string[];
  missingCaptures: string[];
}

export interface BaselineComparisonCheck {
  metric: "lint" | "build";
  ok: boolean;
  message: string;
  baselineValue?: string;
  currentValue?: string;
}

export interface BaselineComparatorResult extends ValidatorResultBase {
  validator: "baseline";
  checks: BaselineComparisonCheck[];
}

export interface RemediationRuntimeResult {
  programId: string;
  unitId: string;
  runId: string;
  runner: RunnerAdapterName;
  mode: RunnerMode;
  attemptNumber: number;
  validationRetryCount: number;
  changedFiles: string[];
  allowlistOk: boolean;
  lintOk: boolean;
  buildOk: boolean;
  testOk: boolean;
  browserOk: boolean;
  visualRegressionOk: boolean;
  reportWritten: boolean;
  trackerUpdated: boolean;
  statusUpdated: boolean;
  staged: boolean;
  commitApproved: boolean;
  commitSha?: string;
  promptTemplateVersion: string;
  visualSurfaceChanged: boolean;
  finalState: "passed" | "failed" | "blocked" | "invalid" | "crashed";
  nextUnit?: string;
}

export interface RunnerExecutionResult {
  status: RunnerExecutionStatus;
  summary: string;
  changedFiles: string[];
  browserObservations?: BrowserCheckObservation[];
  visualObservations?: VisualCheckObservation[];
  visualSurfaceChanged?: boolean;
  details?: string[];
}

export interface VisualPolicy {
  mode: VisualPolicyMode;
  declaredScope: VisualChangeScope;
  failOnUnexpectedChange: boolean;
  allowOpportunisticStyling: false;
  reviewRequiresVisualSurfaceChanged: true;
  promptDirectives: string[];
}

export interface ResolvedRemediationPolicies {
  runnerPolicy: RunnerPolicy;
  commitPolicy: CommitPolicy;
  attemptBudget: number;
  visualPolicy: VisualPolicy;
}

export interface PromptUnitDescriptor {
  id: string;
  title: string;
  type: RemediationUnitType;
  wave: RemediationWave;
  branch: string;
  ownerSurface: string;
  tags: string[];
  sourceRef: RemediationSourceRef;
  findingIds: string[];
  evidencePaths: string[];
  isComposite: boolean;
}

export interface PromptConstraints {
  allowedFiles: string[];
  dependsOn: string[];
  requiredSkills: string[];
  claudeMdHints: string[];
  requiredControlFiles: string[];
  rollbackHints: string[];
  fixReportPath: string;
}

export interface PromptValidationPlan {
  requiresLint: true;
  requiresBuild: true;
  requiresTests: boolean;
  requiresBrowserValidation: boolean;
  requiresVisualRegression: boolean;
  browserChecks: BrowserCheck[];
  baselineRoutes: string[];
  baselineViewports: Array<Exclude<ViewportTarget, "both">>;
  enforceLintBaseline: boolean;
  enforceBuildBaseline: boolean;
}

export interface RemediationPromptPayload {
  templateVersion: string;
  programId: string;
  programDisplayName: string;
  unit: PromptUnitDescriptor;
  currentWave: RemediationWave;
  execution: ResolvedRemediationPolicies;
  constraints: PromptConstraints;
  validation: PromptValidationPlan;
  renderedPrompt: string;
}

export interface FixReportArtifact {
  programId: string;
  unitId: string;
  runId: string;
  title: string;
  summary: string;
  changedFiles: string[];
  validation: Pick<
    RemediationRuntimeResult,
    | "allowlistOk"
    | "lintOk"
    | "buildOk"
    | "testOk"
    | "browserOk"
    | "visualRegressionOk"
    | "visualSurfaceChanged"
  >;
  artifactPath: string;
}

export interface FailureArtifact {
  programId: string;
  unitId: string;
  timestamp: string;
  runner: RunnerAdapterName;
  changedFiles: string[];
  failingChecks: string[];
  summary: string;
  agentAttemptCount: number;
  validationRetryCount: number;
  worktreeState: "clean" | "staged" | "unstaged";
  promptTemplateVersion: string;
  commitSha?: string;
}

export interface ReviewPacket {
  programId: string;
  unitId: string;
  title: string;
  type: RemediationUnitType;
  filesChanged: string[];
  visualSurfaceChanged: boolean;
  validation: Pick<
    RemediationRuntimeResult,
    | "lintOk"
    | "buildOk"
    | "testOk"
    | "browserOk"
    | "visualRegressionOk"
  >;
  draftCommitMessage: string;
  promptTemplateVersion: string;
  artifactPaths: string[];
  nextUnit?: string;
}

export interface BaselineSnapshot {
  programId: string;
  timestamp: string;
  gitSha?: string;
  currentWave?: RemediationWave;
  nextUnitId?: string;
  trackerPath: string;
  statusPath: string;
  nodeVersion: string;
  workingTree: {
    status: "clean" | "dirty" | "unavailable";
    changedFiles: string[];
  };
  lint: {
    status: "pending" | "passed" | "failed" | "warning-count-recorded";
    warningCount?: number;
    notes?: string;
  };
  build: {
    status: "pending" | "passed" | "failed";
    notes?: string;
  };
  visual: {
    status: "pending" | "not-required" | "captured";
    routes: string[];
    viewports: Array<Exclude<ViewportTarget, "both">>;
    notes?: string;
  };
}

export interface PreflightCheck {
  name: string;
  status: PreflightCheckStatus;
  summary: string;
  details?: string[];
}

export interface RemediationPreflightResult {
  programId: string;
  displayName: string;
  ok: boolean;
  trackerFilePresent: boolean;
  currentWave?: RemediationWave;
  nextUnitId?: string;
  lockPath: string;
  lockStatus: "clear" | "active" | "stale";
  baselineSnapshotPath?: string;
  warnings: string[];
  checks: PreflightCheck[];
}
