export { DrawerProvider } from "./DrawerProvider";
export { useDrawer } from "./DrawerContext";
export { MarketingDrawerProvider } from "./MarketingDrawerProvider";
export {
  PreApprovalDrawerRoot,
  useOpenPreApproval,
  usePreApprovalSession,
} from "@/features/pre-approval/drawer/client";
export {
  buildPreApprovalHref,
  normalizePreApprovalAmount,
  preApprovalPath as PRE_APPROVAL_PATH,
} from "@/features/pre-approval/routes";
export type {
  PreApprovalCloseReason,
  PreApprovalEvent,
  PreApprovalOrigin,
  PreApprovalPlacement,
  PreApprovalSession,
  PreApprovalTrigger,
  PreApprovalTruckType,
} from "@/features/pre-approval/contract";
export {
  buildPreApprovalEntryHref,
  buildPreApprovalEntryHref as resolveDrawerTriggerHref,
  buildPreApprovalTriggerAttributes,
  preApprovalEntryHash,
  preApprovalEntryHash as DRAWER_HASH,
  preApprovalFallbackEntryHref,
  preApprovalFallbackEntryHref as DRAWER_FALLBACK_HREF,
} from "@/features/pre-approval/drawer/server";
export {
  preApprovalAmountStep as SLIDER_STEP,
  preApprovalDefaultAmount as SLIDER_DEFAULT,
  preApprovalDefaultTitle as DRAWER_DEFAULT_TITLE,
  preApprovalMaxAmount as SLIDER_MAX,
  preApprovalMinAmount as SLIDER_MIN,
} from "@/features/pre-approval/contract";
