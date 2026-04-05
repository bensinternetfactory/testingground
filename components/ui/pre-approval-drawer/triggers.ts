import {
  buildPreApprovalHref,
  DRAWER_DEFAULT_TITLE,
  SLIDER_DEFAULT,
} from "./config";

export type DrawerTriggerSource = "standard" | "hero";
export type DrawerHeroTruckType =
  | "rollback"
  | "wrecker"
  | "heavy-wrecker"
  | "rotator";

export interface DrawerTriggerPayload {
  title?: string;
  source?: DrawerTriggerSource;
  truckType?: DrawerHeroTruckType;
}

export interface DrawerSelectionTrigger
  extends Omit<DrawerTriggerPayload, "truckType"> {
  truckType?: DrawerHeroTruckType;
  truckTypeByTileId?: Partial<Record<string, DrawerHeroTruckType>>;
}

export interface DrawerSessionState {
  isOpen: boolean;
  title: string;
  amount: number;
  source: DrawerTriggerSource;
  heroTruckType?: DrawerHeroTruckType;
}

export interface DrawerTriggerDataAttributes {
  "data-drawer-title"?: string;
  "data-drawer-source"?: DrawerTriggerSource;
  "data-drawer-truck-type"?: DrawerHeroTruckType;
}

type DrawerDataset = Partial<
  Record<"drawerTitle" | "drawerSource" | "drawerTruckType", string | undefined>
>;

const HERO_DRAWER_SOURCE: DrawerTriggerSource = "hero";
const STANDARD_DRAWER_SOURCE: DrawerTriggerSource = "standard";

function isHeroTruckType(value: string | undefined): value is DrawerHeroTruckType {
  return (
    value === "rollback" ||
    value === "wrecker" ||
    value === "heavy-wrecker" ||
    value === "rotator"
  );
}

function isTriggerSource(value: string | undefined): value is DrawerTriggerSource {
  return value === STANDARD_DRAWER_SOURCE || value === HERO_DRAWER_SOURCE;
}

export function createDrawerSession(
  trigger?: DrawerTriggerPayload,
): DrawerSessionState {
  const source = trigger?.source ?? STANDARD_DRAWER_SOURCE;
  const heroTruckType =
    source === HERO_DRAWER_SOURCE && trigger?.truckType
      ? trigger.truckType
      : undefined;

  return {
    isOpen: true,
    title: trigger?.title ?? DRAWER_DEFAULT_TITLE,
    amount: SLIDER_DEFAULT,
    source,
    heroTruckType,
  };
}

export function getClosedDrawerSession(): DrawerSessionState {
  return {
    isOpen: false,
    title: DRAWER_DEFAULT_TITLE,
    amount: SLIDER_DEFAULT,
    source: STANDARD_DRAWER_SOURCE,
  };
}

export function buildDrawerContinueHref(
  session: Pick<DrawerSessionState, "amount" | "heroTruckType" | "source">,
): string {
  return buildPreApprovalHref({
    amount: session.amount,
    truckType: session.source === HERO_DRAWER_SOURCE ? session.heroTruckType : undefined,
  });
}

export function buildDrawerTriggerDataAttributes(
  trigger?: DrawerTriggerPayload,
): DrawerTriggerDataAttributes {
  if (!trigger) {
    return {};
  }

  const attributes: DrawerTriggerDataAttributes = {};

  if (trigger.title) {
    attributes["data-drawer-title"] = trigger.title;
  }

  if (trigger.source) {
    attributes["data-drawer-source"] = trigger.source;
  }

  if (trigger.source === HERO_DRAWER_SOURCE && trigger.truckType) {
    attributes["data-drawer-truck-type"] = trigger.truckType;
  }

  return attributes;
}

export function parseDrawerTriggerDataAttributes(
  dataset: DrawerDataset,
): DrawerTriggerPayload | undefined {
  const title = dataset.drawerTitle?.trim() || undefined;
  const source = isTriggerSource(dataset.drawerSource)
    ? dataset.drawerSource
    : undefined;
  const truckType =
    source === HERO_DRAWER_SOURCE && isHeroTruckType(dataset.drawerTruckType)
      ? dataset.drawerTruckType
      : undefined;

  if (!title && !source && !truckType) {
    return undefined;
  }

  return { title, source, truckType };
}

export function resolveSelectionDrawerTrigger(
  trigger: DrawerSelectionTrigger | undefined,
  selectedTileId: string | null,
): DrawerTriggerPayload | undefined {
  if (!trigger) {
    return undefined;
  }

  const resolvedTruckType =
    (selectedTileId ? trigger.truckTypeByTileId?.[selectedTileId] : undefined) ??
    trigger.truckType;
  const payload: DrawerTriggerPayload = {
    title: trigger.title,
    source: trigger.source,
    truckType:
      trigger.source === HERO_DRAWER_SOURCE ? resolvedTruckType : undefined,
  };

  if (!payload.title && !payload.source && !payload.truckType) {
    return undefined;
  }

  return payload;
}

export const ROLLBACK_HERO_DRAWER: DrawerSelectionTrigger = {
  source: HERO_DRAWER_SOURCE,
  truckType: "rollback",
};

export const WRECKER_HERO_DRAWER: DrawerSelectionTrigger = {
  source: HERO_DRAWER_SOURCE,
  truckTypeByTileId: {
    "light-duty": "wrecker",
    "heavy-wrecker": "heavy-wrecker",
  },
};

export const ROTATOR_HERO_DRAWER: DrawerSelectionTrigger = {
  source: HERO_DRAWER_SOURCE,
  truckType: "rotator",
};

export const USED_TOW_TRUCK_HERO_DRAWER: DrawerSelectionTrigger = {
  source: HERO_DRAWER_SOURCE,
  truckTypeByTileId: {
    rollback: "rollback",
    wrecker: "wrecker",
    "heavy-wrecker": "heavy-wrecker",
    rotator: "rotator",
  },
};
