import {
  preApprovalDefaultAmount,
  preApprovalDefaultTitle,
  type PreApprovalOrigin,
  type PreApprovalTrigger,
  type PreApprovalTruckType,
} from "../../contract";
import {
  createHashCompatibilityOrigin,
  normalizePreApprovalTriggerInput,
  type NormalizedPreApprovalTrigger,
} from "./parser";

export type PreApprovalDrawerOpenTrigger =
  | NormalizedPreApprovalTrigger
  | PreApprovalTrigger
  | undefined;

export interface PreApprovalDrawerSessionState {
  amount: number;
  isOpen: boolean;
  openedAt?: number;
  origin: PreApprovalOrigin;
  sessionId?: string;
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
  const normalized = normalizePreApprovalTriggerInput(trigger);

  return {
    amount: preApprovalDefaultAmount,
    isOpen: true,
    openedAt: Date.now(),
    origin:
      normalized?.trigger.origin ??
      createHashCompatibilityOrigin(options?.pathname),
    sessionId: createPreApprovalSessionId(),
    title: normalized?.trigger.drawer?.title ?? preApprovalDefaultTitle,
    truckType: normalized?.trigger.handoff?.truckType,
  };
}

export function createClosedPreApprovalDrawerSession(
  pathname?: string | null,
): PreApprovalDrawerSessionState {
  return {
    amount: preApprovalDefaultAmount,
    isOpen: false,
    origin: createHashCompatibilityOrigin(pathname),
    title: preApprovalDefaultTitle,
  };
}
