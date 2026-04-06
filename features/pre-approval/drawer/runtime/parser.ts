import type {
  PreApprovalOrigin,
  PreApprovalPlacement,
  PreApprovalTrigger,
  PreApprovalTruckType,
} from "../../contract";

export type PreApprovalTriggerDataset = Partial<
  Record<
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
  schema: "canonical" | "hash" | "production";
  trigger: PreApprovalTrigger;
}

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
): NormalizedPreApprovalTrigger | undefined {
  return hasProductionSchema(dataset)
    ? parseProductionTriggerDataset(dataset)
    : undefined;
}

export function normalizePreApprovalTriggerInput(
  trigger: NormalizedPreApprovalTrigger | PreApprovalTrigger | undefined,
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

  return undefined;
}
