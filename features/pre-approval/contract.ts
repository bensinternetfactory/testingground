export type PreApprovalTruckType =
  | "rollback"
  | "wrecker"
  | "heavy-wrecker"
  | "rotator";

export type PreApprovalPlacement =
  | "hero"
  | "section"
  | "sticky-nav"
  | "footer"
  | "inline";

export interface PreApprovalOrigin {
  pageId: string;
  sectionId: string;
  ctaId: string;
  placement: PreApprovalPlacement;
}

export interface PreApprovalTrigger {
  origin: PreApprovalOrigin;
  drawer?: {
    title?: string;
  };
  handoff?: {
    truckType?: PreApprovalTruckType;
  };
}

export interface PreApprovalSession {
  sessionId: string;
  isOpen: boolean;
  amount: number;
  title: string;
  origin: PreApprovalOrigin;
  truckType?: PreApprovalTruckType;
  openedAt: number;
}

export type PreApprovalCloseReason =
  | "backdrop"
  | "escape"
  | "close-button"
  | "drag-dismiss"
  | "route-change"
  | "programmatic";

interface PreApprovalEventBase {
  sessionId: string;
  origin: PreApprovalOrigin;
  amount: number;
  truckType?: PreApprovalTruckType;
}

export type PreApprovalEvent =
  | ({
      type: "drawer_opened";
      title: string;
    } & PreApprovalEventBase)
  | ({
      type: "amount_changed";
    } & PreApprovalEventBase)
  | ({
      type: "drawer_continued";
      href: string;
    } & PreApprovalEventBase)
  | ({
      type: "drawer_closed";
      reason: PreApprovalCloseReason;
    } & PreApprovalEventBase);

export const preApprovalDefaultAmount = 100_000;
export const preApprovalMinAmount = 20_000;
export const preApprovalMaxAmount = 500_000;
export const preApprovalAmountStep = 5_000;
export const preApprovalDefaultTitle =
  "Estimate how much financing you need.";
