/** Server-safe constants for the pre-approval financing slider. */

export const SLIDER_MIN = 20_000;
export const SLIDER_MAX = 500_000;
export const SLIDER_STEP = 5_000;
export const SLIDER_DEFAULT = 100_000;

/** The URL hash that triggers the drawer open. */
export const DRAWER_HASH = "#get-pre-approved";

/**
 * Fixed-nav pages without a mounted drawer provider should route to a page that
 * can immediately open the same drawer flow.
 */
export const DRAWER_FALLBACK_HREF = `/rollback-financing${DRAWER_HASH}`;

const DRAWER_ENABLED_PATHS = [
  "/rollback-financing",
  "/wrecker-financing",
  "/rotator-financing",
] as const;

export function resolveDrawerTriggerHref(pathname: string | null): string {
  if (
    pathname &&
    DRAWER_ENABLED_PATHS.some((enabledPath) => enabledPath === pathname)
  ) {
    return DRAWER_HASH;
  }

  return DRAWER_FALLBACK_HREF;
}

/** Default drawer heading when no custom title is provided by the trigger. */
export const DRAWER_DEFAULT_TITLE = "Estimate how much financing you need.";
