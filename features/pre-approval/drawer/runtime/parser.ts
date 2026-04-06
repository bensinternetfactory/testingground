import type {
  PreApprovalOrigin,
  PreApprovalPlacement,
  PreApprovalTrigger,
  PreApprovalTruckType,
} from "../../contract";

export type LegacyDrawerTriggerSource = "standard" | "hero";
export type LegacyDrawerHeroTruckType = PreApprovalTruckType;

export type LegacyDrawerTriggerPayload = {
  title?: string;
  source?: LegacyDrawerTriggerSource;
  truckType?: LegacyDrawerHeroTruckType;
};

export type PreApprovalTriggerDataset = Partial<
  Record<
    | "drawerTitle"
    | "drawerSource"
    | "drawerTruckType"
    | "preApprovalVersion"
    | "preApprovalOriginPageId"
    | "preApprovalOriginSectionId"
    | "preApprovalOriginCtaId"
    | "preApprovalOriginPlacement"
    | "preApprovalDrawerTitle"
    | "preApprovalHandoffTruckType",
    string | undefined
  >
>;

export interface NormalizedPreApprovalTrigger {
  compatibilitySource?: LegacyDrawerTriggerSource;
  schema: "canonical" | "hash" | "legacy" | "production";
  trigger: PreApprovalTrigger;
}

interface NormalizePreApprovalTriggerOptions {
  pathname?: string | null;
}

const legacyCompatibilitySectionId = "legacy-section";
const legacyCompatibilityCtaId = "legacy-cta";
const hashCompatibilitySectionId = "hash-entry";
const hashCompatibilityCtaId = "direct-url";

function trimToUndefined(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function isPreApprovalTruckType(
  value: string | undefined,
): value is PreApprovalTruckType {
  return (
    value === "rollback" ||
    value === "wrecker" ||
    value === "heavy-wrecker" ||
    value === "rotator"
  );
}

function isPreApprovalPlacement(
  value: string | undefined,
): value is PreApprovalPlacement {
  return (
    value === "hero" ||
    value === "section" ||
    value === "sticky-nav" ||
    value === "footer" ||
    value === "inline"
  );
}

function isLegacyDrawerTriggerSource(
  value: string | undefined,
): value is LegacyDrawerTriggerSource {
  return value === "standard" || value === "hero";
}

function hasProductionSchema(dataset: PreApprovalTriggerDataset): boolean {
  return (
    dataset.preApprovalVersion === "2" ||
    Boolean(
      dataset.preApprovalOriginPageId ||
        dataset.preApprovalOriginSectionId ||
        dataset.preApprovalOriginCtaId ||
        dataset.preApprovalOriginPlacement ||
        dataset.preApprovalDrawerTitle ||
        dataset.preApprovalHandoffTruckType,
    )
  );
}

function isNormalizedPreApprovalTrigger(
  value: unknown,
): value is NormalizedPreApprovalTrigger {
  return (
    typeof value === "object" &&
    value !== null &&
    "schema" in value &&
    "trigger" in value
  );
}

function isCanonicalPreApprovalTrigger(
  value: unknown,
): value is PreApprovalTrigger {
  return (
    typeof value === "object" &&
    value !== null &&
    "origin" in value &&
    typeof (value as { origin?: unknown }).origin === "object"
  );
}

export function derivePreApprovalPageId(pathname?: string | null): string {
  if (!pathname) {
    return "unknown-page";
  }

  const normalizedPath = pathname.split("#", 1)[0]?.split("?", 1)[0]?.trim();

  if (!normalizedPath) {
    return "unknown-page";
  }

  const slug = normalizedPath.replace(/^\/+|\/+$/g, "");
  return slug || "home";
}

function createCompatibilityOrigin(
  pathname: string | null | undefined,
  sectionId: string,
  ctaId: string,
): PreApprovalOrigin {
  return {
    pageId: derivePreApprovalPageId(pathname),
    sectionId,
    ctaId,
    placement: "inline",
  };
}

export function createLegacyCompatibilityOrigin(
  pathname?: string | null,
): PreApprovalOrigin {
  return createCompatibilityOrigin(
    pathname,
    legacyCompatibilitySectionId,
    legacyCompatibilityCtaId,
  );
}

export function createHashCompatibilityOrigin(
  pathname?: string | null,
): PreApprovalOrigin {
  return createCompatibilityOrigin(
    pathname,
    hashCompatibilitySectionId,
    hashCompatibilityCtaId,
  );
}

export function createHashOpenPreApprovalTrigger(
  pathname?: string | null,
): NormalizedPreApprovalTrigger {
  return {
    schema: "hash",
    trigger: {
      origin: createHashCompatibilityOrigin(pathname),
    },
  };
}

function normalizeLegacyDrawerTrigger(
  trigger: LegacyDrawerTriggerPayload | undefined,
  options?: NormalizePreApprovalTriggerOptions,
): NormalizedPreApprovalTrigger | undefined {
  const title = trimToUndefined(trigger?.title);
  const source = isLegacyDrawerTriggerSource(trigger?.source)
    ? trigger.source
    : undefined;
  const truckType =
    source === "hero" && isPreApprovalTruckType(trigger?.truckType)
      ? trigger.truckType
      : undefined;

  if (!title && !source && !truckType) {
    return undefined;
  }

  const normalized: NormalizedPreApprovalTrigger = {
    compatibilitySource: source,
    schema: "legacy",
    trigger: {
      origin: createLegacyCompatibilityOrigin(options?.pathname),
    },
  };

  if (title) {
    normalized.trigger.drawer = { title };
  }

  if (truckType) {
    normalized.trigger.handoff = { truckType };
  }

  return normalized;
}

function parseProductionTriggerDataset(
  dataset: PreApprovalTriggerDataset,
): NormalizedPreApprovalTrigger | undefined {
  const pageId = trimToUndefined(dataset.preApprovalOriginPageId);
  const sectionId = trimToUndefined(dataset.preApprovalOriginSectionId);
  const ctaId = trimToUndefined(dataset.preApprovalOriginCtaId);
  const placement = isPreApprovalPlacement(dataset.preApprovalOriginPlacement)
    ? dataset.preApprovalOriginPlacement
    : undefined;

  if (!pageId || !sectionId || !ctaId || !placement) {
    return undefined;
  }

  const title = trimToUndefined(dataset.preApprovalDrawerTitle);
  const truckType = isPreApprovalTruckType(dataset.preApprovalHandoffTruckType)
    ? dataset.preApprovalHandoffTruckType
    : undefined;

  const normalized: NormalizedPreApprovalTrigger = {
    schema: "production",
    trigger: {
      origin: {
        pageId,
        sectionId,
        ctaId,
        placement,
      },
    },
  };

  if (title) {
    normalized.trigger.drawer = { title };
  }

  if (truckType) {
    normalized.trigger.handoff = { truckType };
  }

  return normalized;
}

export function parsePreApprovalTriggerDataset(
  dataset: PreApprovalTriggerDataset,
  options?: NormalizePreApprovalTriggerOptions,
): NormalizedPreApprovalTrigger | undefined {
  if (hasProductionSchema(dataset)) {
    return parseProductionTriggerDataset(dataset);
  }

  return normalizeLegacyDrawerTrigger(
    {
      title: dataset.drawerTitle,
      source: isLegacyDrawerTriggerSource(dataset.drawerSource)
        ? dataset.drawerSource
        : undefined,
      truckType: isPreApprovalTruckType(dataset.drawerTruckType)
        ? dataset.drawerTruckType
        : undefined,
    },
    options,
  );
}

export function normalizePreApprovalTriggerInput(
  trigger:
    | LegacyDrawerTriggerPayload
    | NormalizedPreApprovalTrigger
    | PreApprovalTrigger
    | undefined,
  options?: NormalizePreApprovalTriggerOptions,
): NormalizedPreApprovalTrigger | undefined {
  if (!trigger) {
    return undefined;
  }

  if (isNormalizedPreApprovalTrigger(trigger)) {
    return trigger;
  }

  if (isCanonicalPreApprovalTrigger(trigger)) {
    return {
      schema: "canonical",
      trigger,
    };
  }

  return normalizeLegacyDrawerTrigger(trigger, options);
}
