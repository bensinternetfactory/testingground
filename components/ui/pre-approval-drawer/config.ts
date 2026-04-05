/** Server-safe constants for the pre-approval financing slider. */

export const SLIDER_MIN = 20_000;
export const SLIDER_MAX = 500_000;
export const SLIDER_STEP = 5_000;
export const SLIDER_DEFAULT = 100_000;
export const PRE_APPROVAL_PATH = "/pre-approval";

/** The URL hash that triggers the drawer open. */
export const DRAWER_HASH = "#get-pre-approved";

/**
 * Fixed-nav pages without a mounted drawer provider should route to a page that
 * can immediately open the same drawer flow.
 */
export const DRAWER_FALLBACK_HREF = `/rollback-financing${DRAWER_HASH}`;

export function resolveDrawerTriggerHref(pathname: string | null): string {
  return pathname ? DRAWER_HASH : DRAWER_FALLBACK_HREF;
}

/** Default drawer heading when no custom title is provided by the trigger. */
export const DRAWER_DEFAULT_TITLE = "Estimate how much financing you need.";

export interface PreApprovalHrefOptions {
  amount: number | string;
  truckType?: string;
}

export function normalizePreApprovalAmount(value: number | string): string {
  const digits = String(value).replace(/\D/g, "");
  return digits || String(SLIDER_DEFAULT);
}

export function buildPreApprovalHref({
  amount,
  truckType,
}: PreApprovalHrefOptions): string {
  const params = new URLSearchParams({
    amount: normalizePreApprovalAmount(amount),
  });

  if (truckType) {
    params.set("trucktype", truckType);
  }

  return `${PRE_APPROVAL_PATH}?${params.toString()}`;
}
