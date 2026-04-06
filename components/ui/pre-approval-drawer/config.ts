import {
  preApprovalAmountStep,
  preApprovalDefaultAmount,
  preApprovalDefaultTitle,
  preApprovalMaxAmount,
  preApprovalMinAmount,
} from "@/features/pre-approval/contract";
import {
  buildPreApprovalEntryHref,
  preApprovalEntryHash,
  preApprovalFallbackEntryHref,
} from "@/features/pre-approval/drawer/server";
import {
  buildPreApprovalHref as buildFeaturePreApprovalHref,
  normalizePreApprovalAmount,
  preApprovalPath,
  type PreApprovalHandoffParams,
} from "@/features/pre-approval/routes";

/** Server-safe compatibility aliases for the pre-approval route contract. */
export const SLIDER_MIN = preApprovalMinAmount;
export const SLIDER_MAX = preApprovalMaxAmount;
export const SLIDER_STEP = preApprovalAmountStep;
export const SLIDER_DEFAULT = preApprovalDefaultAmount;
export const PRE_APPROVAL_PATH = preApprovalPath;

/** The URL hash that triggers the drawer open. */
export const DRAWER_HASH = preApprovalEntryHash;

/**
 * Fixed-nav pages without a mounted drawer provider should route to a page that
 * can immediately open the same drawer flow.
 */
export const DRAWER_FALLBACK_HREF = preApprovalFallbackEntryHref;

export function resolveDrawerTriggerHref(pathname: string | null): string {
  return buildPreApprovalEntryHref(pathname);
}

/** Default drawer heading when no custom title is provided by the trigger. */
export const DRAWER_DEFAULT_TITLE = preApprovalDefaultTitle;

export type PreApprovalHrefOptions = PreApprovalHandoffParams;

export { normalizePreApprovalAmount };

export function buildPreApprovalHref(options: PreApprovalHrefOptions): string {
  return buildFeaturePreApprovalHref(options);
}
