import type {
  RemediationProgramDefinition,
  RemediationTrackerEntry,
  RemediationTrackerState,
  RemediationUnit,
  RemediationWave,
} from "../types";

export interface TrackerValidationIssue {
  code: string;
  message: string;
  unitId?: string;
  field?: string;
}

export interface TrackerIndex {
  entriesByUnitId: Map<string, RemediationTrackerEntry>;
}

export interface TrackerValidationResult {
  issues: TrackerValidationIssue[];
  index: TrackerIndex;
}

export interface DependencyBlocker {
  code:
    | "tracker-invalid"
    | "dependency-unresolved"
    | "unit-blocked"
    | "unit-in-progress";
  unitId: string;
  message: string;
  dependencyIds?: string[];
}

export interface NextUnitResolution {
  currentWave?: RemediationWave;
  nextUnit?: RemediationUnit;
  blockers: DependencyBlocker[];
  trackerIssues: TrackerValidationIssue[];
  isComplete: boolean;
}

function createTrackerIndex(entries: RemediationTrackerEntry[]): TrackerIndex {
  return {
    entriesByUnitId: new Map(
      entries.map((entry) => [entry.unitId, entry] satisfies [string, RemediationTrackerEntry]),
    ),
  };
}

function isResolvedState(state: RemediationTrackerState): boolean {
  return state === "fixed" || state === "deferred";
}

export function validateTrackerEntries(
  definition: RemediationProgramDefinition,
  entries: RemediationTrackerEntry[],
): TrackerValidationResult {
  const issues: TrackerValidationIssue[] = [];
  const seenUnitIds = new Set<string>();
  const knownUnitIds = new Set(definition.units.map((unit) => unit.id));

  for (const entry of entries) {
    if (seenUnitIds.has(entry.unitId)) {
      issues.push({
        code: "duplicate-tracker-entry",
        unitId: entry.unitId,
        field: "unitId",
        message: `tracker contains duplicate entry for ${entry.unitId}`,
      });
    } else {
      seenUnitIds.add(entry.unitId);
    }

    if (!knownUnitIds.has(entry.unitId)) {
      issues.push({
        code: "unknown-tracker-unit",
        unitId: entry.unitId,
        field: "unitId",
        message: `tracker references unknown unit ${entry.unitId}`,
      });
    }

    if (!Number.isInteger(entry.attemptCount) || entry.attemptCount < 0) {
      issues.push({
        code: "invalid-attempt-count",
        unitId: entry.unitId,
        field: "attemptCount",
        message: `${entry.unitId} attemptCount must be a non-negative integer`,
      });
    }

    if (entry.state === "fixed" && !entry.commitSha) {
      issues.push({
        code: "fixed-missing-commit-sha",
        unitId: entry.unitId,
        field: "commitSha",
        message: `${entry.unitId} is fixed and must record commitSha`,
      });
    }

    if (entry.state === "blocked" && !entry.unblockAction) {
      issues.push({
        code: "blocked-missing-unblock-action",
        unitId: entry.unitId,
        field: "unblockAction",
        message: `${entry.unitId} is blocked and must record unblockAction`,
      });
    }
  }

  return {
    issues,
    index: createTrackerIndex(entries),
  };
}

export function getTrackerState(
  trackerIndex: TrackerIndex,
  unitId: string,
): RemediationTrackerState {
  return trackerIndex.entriesByUnitId.get(unitId)?.state ?? "not-started";
}

export function isCompositeUnit(unit: RemediationUnit): boolean {
  return (unit.sourceRef.findingIds?.length ?? 0) > 1;
}

export function getUnresolvedDependencyIds(
  unit: RemediationUnit,
  trackerIndex: TrackerIndex,
): string[] {
  return unit.dependsOn.filter(
    (dependencyId) => getTrackerState(trackerIndex, dependencyId) !== "fixed",
  );
}

export function listUnitsInExecutionOrder(
  units: RemediationUnit[],
): RemediationUnit[] {
  return units
    .map((unit, order) => ({ unit, order }))
    .sort((left, right) => {
      if (left.unit.wave !== right.unit.wave) {
        return left.unit.wave - right.unit.wave;
      }

      return left.order - right.order;
    })
    .map(({ unit }) => unit);
}

export function resolveNextUnit(
  definition: RemediationProgramDefinition,
  entries: RemediationTrackerEntry[],
): NextUnitResolution {
  const tracker = validateTrackerEntries(definition, entries);

  if (tracker.issues.length > 0) {
    return {
      blockers: tracker.issues.map((issue) => ({
        code: "tracker-invalid",
        unitId: issue.unitId ?? "tracker",
        message: issue.message,
      })),
      trackerIssues: tracker.issues,
      isComplete: false,
    };
  }

  const orderedUnits = listUnitsInExecutionOrder(definition.units);
  const unresolvedUnits = orderedUnits.filter((unit) => {
    const state = getTrackerState(tracker.index, unit.id);
    return !isResolvedState(state);
  });

  if (unresolvedUnits.length === 0) {
    return {
      blockers: [],
      trackerIssues: [],
      isComplete: true,
    };
  }

  const currentWave = unresolvedUnits[0].wave;
  const blockers: DependencyBlocker[] = [];

  for (const unit of orderedUnits) {
    if (unit.wave !== currentWave) {
      continue;
    }

    const state = getTrackerState(tracker.index, unit.id);

    if (isResolvedState(state)) {
      continue;
    }

    if (state === "in-progress") {
      blockers.push({
        code: "unit-in-progress",
        unitId: unit.id,
        message: `${unit.id} is already in progress`,
      });
      continue;
    }

    const dependencyIds = getUnresolvedDependencyIds(unit, tracker.index);

    if (dependencyIds.length > 0) {
      blockers.push({
        code: "dependency-unresolved",
        unitId: unit.id,
        dependencyIds,
        message: `${unit.id} is waiting on ${dependencyIds.join(", ")}`,
      });
      continue;
    }

    if (state === "blocked") {
      blockers.push({
        code: "unit-blocked",
        unitId: unit.id,
        message: `${unit.id} is blocked until a human updates the fix direction`,
      });
      continue;
    }

    return {
      currentWave,
      nextUnit: unit,
      blockers,
      trackerIssues: [],
      isComplete: false,
    };
  }

  return {
    currentWave,
    blockers,
    trackerIssues: [],
    isComplete: false,
  };
}
