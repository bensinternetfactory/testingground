import type { PreApprovalTrigger, PreApprovalTruckType } from "./contract";

export interface PreApprovalSelectionTrigger extends Omit<PreApprovalTrigger, "handoff"> {
  handoff?: {
    truckType?: PreApprovalTruckType;
  };
  truckTypeByTileId?: Partial<Record<string, PreApprovalTruckType>>;
}

interface PreApprovalSelectionTruckTypeOptions {
  truckType?: PreApprovalTruckType;
  truckTypeByTileId?: Partial<Record<string, PreApprovalTruckType>>;
}

function createHeroPreApprovalSelectionTrigger(
  pageId: string,
  options: PreApprovalSelectionTruckTypeOptions,
): PreApprovalSelectionTrigger {
  return {
    origin: {
      pageId,
      sectionId: "hero-primary",
      ctaId: "hero-main-cta",
      placement: "hero",
    },
    handoff: options.truckType ? { truckType: options.truckType } : undefined,
    truckTypeByTileId: options.truckTypeByTileId,
  };
}

export function resolvePreApprovalSelectionTruckType(
  options: PreApprovalSelectionTruckTypeOptions | undefined,
  selectedTileId: string | null,
): PreApprovalTruckType | undefined {
  if (!options) {
    return undefined;
  }

  return (
    (selectedTileId ? options.truckTypeByTileId?.[selectedTileId] : undefined) ??
    options.truckType
  );
}

export function resolvePreApprovalSelectionTrigger(
  trigger: PreApprovalSelectionTrigger | undefined,
  selectedTileId: string | null,
): PreApprovalTrigger | undefined {
  if (!trigger) {
    return undefined;
  }

  const truckType = resolvePreApprovalSelectionTruckType(
    {
      truckType: trigger.handoff?.truckType,
      truckTypeByTileId: trigger.truckTypeByTileId,
    },
    selectedTileId,
  );

  return {
    origin: trigger.origin,
    drawer: trigger.drawer,
    handoff: truckType ? { truckType } : undefined,
  };
}

export const rollbackHeroPreApprovalSelectionTrigger =
  createHeroPreApprovalSelectionTrigger("rollback-financing", {
    truckType: "rollback",
  });

export const wreckerHeroPreApprovalSelectionTrigger =
  createHeroPreApprovalSelectionTrigger("wrecker-financing", {
    truckTypeByTileId: {
      "light-duty": "wrecker",
      "heavy-wrecker": "heavy-wrecker",
    },
  });

export const rotatorHeroPreApprovalSelectionTrigger =
  createHeroPreApprovalSelectionTrigger("rotator-financing", {
    truckType: "rotator",
  });

export const usedTowTruckHeroPreApprovalSelectionTrigger =
  createHeroPreApprovalSelectionTrigger("used-tow-truck-financing", {
    truckTypeByTileId: {
      rollback: "rollback",
      wrecker: "wrecker",
      "heavy-wrecker": "heavy-wrecker",
      rotator: "rotator",
    },
  });
