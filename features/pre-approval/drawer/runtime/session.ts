import {
  preApprovalDefaultAmount,
  preApprovalDefaultTitle,
  type PreApprovalOrigin,
  type PreApprovalTrigger,
  type PreApprovalTruckType,
} from "../../contract";
import {
  createLegacyCompatibilityOrigin,
  normalizePreApprovalTriggerInput,
  type LegacyDrawerTriggerPayload,
  type LegacyDrawerTriggerSource,
  type NormalizedPreApprovalTrigger,
} from "./parser";

export type PreApprovalDrawerOpenTrigger =
  | LegacyDrawerTriggerPayload
  | NormalizedPreApprovalTrigger
  | PreApprovalTrigger
  | undefined;

export interface PreApprovalDrawerSessionState {
  amount: number;
  heroTruckType?: PreApprovalTruckType;
  isOpen: boolean;
  openedAt?: number;
  origin: PreApprovalOrigin;
  sessionId?: string;
  source: LegacyDrawerTriggerSource;
  title: string;
  truckType?: PreApprovalTruckType;
}

interface CreatePreApprovalDrawerSessionOptions {
  pathname?: string | null;
}

function createPreApprovalSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `pre-approval-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createPreApprovalDrawerSession(
  trigger?: PreApprovalDrawerOpenTrigger,
  options?: CreatePreApprovalDrawerSessionOptions,
): PreApprovalDrawerSessionState {
  const normalized = normalizePreApprovalTriggerInput(trigger, options);
  const source = normalized?.compatibilitySource ?? "standard";
  const truckType = normalized?.trigger.handoff?.truckType;

  return {
    amount: preApprovalDefaultAmount,
    heroTruckType: source === "hero" ? truckType : undefined,
    isOpen: true,
    openedAt: Date.now(),
    origin:
      normalized?.trigger.origin ??
      createLegacyCompatibilityOrigin(options?.pathname),
    sessionId: createPreApprovalSessionId(),
    source,
    title: normalized?.trigger.drawer?.title ?? preApprovalDefaultTitle,
    truckType,
  };
}

export function createClosedPreApprovalDrawerSession(
  pathname?: string | null,
): PreApprovalDrawerSessionState {
  return {
    amount: preApprovalDefaultAmount,
    isOpen: false,
    origin: createLegacyCompatibilityOrigin(pathname),
    source: "standard",
    title: preApprovalDefaultTitle,
  };
}
