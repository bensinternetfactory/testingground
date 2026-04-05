import fs from "node:fs";
import path from "node:path";
import type {
  RegistryIndex,
  RegistryValidationIssue,
  RegistryValidationResult,
  RemediationProgramConfig,
  RemediationProgramDefinition,
  RemediationUnit,
} from "../types";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRepoRelativePath(value: string): boolean {
  return (
    isNonEmptyString(value) &&
    !path.isAbsolute(value) &&
    !value.startsWith("./") &&
    !value.startsWith("../") &&
    !value.includes("\\")
  );
}

function pushIssue(
  issues: RegistryValidationIssue[],
  issue: RegistryValidationIssue,
) {
  issues.push(issue);
}

function validateRelativePathField(
  issues: RegistryValidationIssue[],
  value: string,
  field: string,
  unitId?: string,
  repoRoot?: string,
) {
  if (!isRepoRelativePath(value)) {
    pushIssue(issues, {
      code: "invalid-path",
      field,
      unitId,
      message: `${field} must be a repo-relative path: ${value}`,
    });
    return;
  }

  if (repoRoot && !fs.existsSync(path.resolve(repoRoot, value))) {
    pushIssue(issues, {
      code: "missing-path",
      field,
      unitId,
      message: `${field} does not exist in the repo: ${value}`,
    });
  }
}

function validateProgramConfig(
  program: RemediationProgramConfig,
  issues: RegistryValidationIssue[],
  repoRoot?: string,
) {
  if (!isNonEmptyString(program.programId)) {
    pushIssue(issues, {
      code: "missing-program-id",
      field: "program.programId",
      message: "program.programId is required",
    });
  }

  if (!Number.isInteger(program.defaultAttemptBudget) || program.defaultAttemptBudget < 1) {
    pushIssue(issues, {
      code: "invalid-attempt-budget",
      field: "program.defaultAttemptBudget",
      message: "program.defaultAttemptBudget must be a positive integer",
    });
  }

  validateRelativePathField(
    issues,
    program.registryPath,
    "program.registryPath",
    undefined,
    repoRoot,
  );

  validateRelativePathField(
    issues,
    program.statusPath,
    "program.statusPath",
    undefined,
    repoRoot,
  );

  validateRelativePathField(
    issues,
    program.artifactRoot,
    "program.artifactRoot",
  );

  validateRelativePathField(
    issues,
    program.trackerPath,
    "program.trackerPath",
  );

  for (const controlFile of program.requiredControlFiles) {
    validateRelativePathField(
      issues,
      controlFile,
      "program.requiredControlFiles",
      undefined,
      repoRoot,
    );
  }
}

function validateUnit(
  unit: RemediationUnit,
  program: RemediationProgramConfig,
  issues: RegistryValidationIssue[],
  repoRoot?: string,
) {
  if (!isNonEmptyString(unit.id)) {
    pushIssue(issues, {
      code: "missing-unit-id",
      field: "id",
      message: "unit.id is required",
    });
  }

  if (unit.programId !== program.programId) {
    pushIssue(issues, {
      code: "program-mismatch",
      unitId: unit.id,
      field: "programId",
      message: `${unit.id} programId must match ${program.programId}`,
    });
  }

  if (!isNonEmptyString(unit.title)) {
    pushIssue(issues, {
      code: "missing-title",
      unitId: unit.id,
      field: "title",
      message: `${unit.id} title is required`,
    });
  }

  if (!isNonEmptyString(unit.branch)) {
    pushIssue(issues, {
      code: "missing-branch",
      unitId: unit.id,
      field: "branch",
      message: `${unit.id} branch is required`,
    });
  }

  if (!unit.allowedFiles.length) {
    pushIssue(issues, {
      code: "missing-allowlist",
      unitId: unit.id,
      field: "allowedFiles",
      message: `${unit.id} must declare at least one allowed file`,
    });
  }

  for (const allowedFile of unit.allowedFiles) {
    validateRelativePathField(
      issues,
      allowedFile,
      "allowedFiles",
      unit.id,
    );
  }

  validateRelativePathField(
    issues,
    unit.fixReportPath,
    "fixReportPath",
    unit.id,
  );

  validateRelativePathField(
    issues,
    unit.sourceRef.path,
    "sourceRef.path",
    unit.id,
    repoRoot,
  );

  for (const evidencePath of unit.sourceRef.evidencePaths ?? []) {
    validateRelativePathField(
      issues,
      evidencePath,
      "sourceRef.evidencePaths",
      unit.id,
      repoRoot,
    );
  }

  for (const hintPath of unit.claudeMdHints) {
    validateRelativePathField(
      issues,
      hintPath,
      "claudeMdHints",
      unit.id,
      repoRoot,
    );
  }

  if (!unit.requiresBrowserValidation && unit.browserChecks.length > 0) {
    pushIssue(issues, {
      code: "browser-check-mismatch",
      unitId: unit.id,
      field: "browserChecks",
      message: `${unit.id} defines browser checks but browser validation is disabled`,
    });
  }

  if (unit.requiresBrowserValidation && unit.browserChecks.length === 0) {
    pushIssue(issues, {
      code: "missing-browser-checks",
      unitId: unit.id,
      field: "browserChecks",
      message: `${unit.id} requires browser validation and must declare browserChecks`,
    });
  }

  if (unit.requiresVisualRegression && unit.baselineRoutes.length === 0) {
    pushIssue(issues, {
      code: "missing-baseline-routes",
      unitId: unit.id,
      field: "baselineRoutes",
      message: `${unit.id} requires visual regression and must declare baselineRoutes`,
    });
  }

  if ((unit.type === "bugfix-nonvisual" || unit.type === "architecture" || unit.type === "docs")
    && unit.visualChangeScope !== "none") {
    pushIssue(issues, {
      code: "invalid-visual-scope",
      unitId: unit.id,
      field: "visualChangeScope",
      message: `${unit.id} must declare visualChangeScope "none" for ${unit.type}`,
    });
  }

  if (unit.type === "bugfix-visual-safe" && unit.visualChangeScope === "none") {
    pushIssue(issues, {
      code: "missing-visual-scope",
      unitId: unit.id,
      field: "visualChangeScope",
      message: `${unit.id} should declare an explicit non-none visual change scope`,
    });
  }

  if (unit.attemptBudget !== undefined) {
    if (!Number.isInteger(unit.attemptBudget) || unit.attemptBudget < 1) {
      pushIssue(issues, {
        code: "invalid-unit-attempt-budget",
        unitId: unit.id,
        field: "attemptBudget",
        message: `${unit.id} attemptBudget must be a positive integer`,
      });
    }
  }
}

export function createRegistryIndex(units: RemediationUnit[]): RegistryIndex {
  const unitsById = new Map<string, RemediationUnit>();
  const unitIdsByFindingId = new Map<string, string>();

  for (const unit of units) {
    unitsById.set(unit.id, unit);

    for (const findingId of unit.sourceRef.findingIds ?? []) {
      unitIdsByFindingId.set(findingId, unit.id);
    }
  }

  return {
    unitsById,
    unitIdsByFindingId,
  };
}

export function validateProgramDefinition(
  definition: RemediationProgramDefinition,
  repoRoot?: string,
): RegistryValidationResult {
  const issues: RegistryValidationIssue[] = [];

  validateProgramConfig(definition.program, issues, repoRoot);

  const seenUnitIds = new Set<string>();
  const seenFindingIds = new Map<string, string>();

  for (const unit of definition.units) {
    if (seenUnitIds.has(unit.id)) {
      pushIssue(issues, {
        code: "duplicate-unit-id",
        unitId: unit.id,
        field: "id",
        message: `duplicate unit id: ${unit.id}`,
      });
    }

    seenUnitIds.add(unit.id);
    validateUnit(unit, definition.program, issues, repoRoot);

    for (const findingId of unit.sourceRef.findingIds ?? []) {
      const owner = seenFindingIds.get(findingId);

      if (owner) {
        pushIssue(issues, {
          code: "duplicate-finding-link",
          unitId: unit.id,
          field: "sourceRef.findingIds",
          message: `${findingId} is already owned by ${owner}; finding ownership must be unique in the registry`,
        });
      } else {
        seenFindingIds.set(findingId, unit.id);
      }
    }
  }

  const index = createRegistryIndex(definition.units);

  for (const unit of definition.units) {
    for (const dependencyId of unit.dependsOn) {
      if (!index.unitsById.has(dependencyId)) {
        pushIssue(issues, {
          code: "missing-dependency",
          unitId: unit.id,
          field: "dependsOn",
          message: `${unit.id} depends on unknown unit ${dependencyId}`,
        });
      }
    }
  }

  return {
    issues,
    index,
  };
}

export function assertValidProgramDefinition(
  definition: RemediationProgramDefinition,
  repoRoot?: string,
): RegistryIndex {
  const result = validateProgramDefinition(definition, repoRoot);

  if (result.issues.length > 0) {
    throw new Error(
      result.issues
        .map((issue) => `${issue.code}: ${issue.message}`)
        .join("\n"),
    );
  }

  return result.index;
}
