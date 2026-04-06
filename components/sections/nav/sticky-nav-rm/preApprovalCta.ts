import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import { buildPreApprovalEntryHref } from "@/features/pre-approval/drawer/server";

function derivePageId(pathname: string | null): string {
  if (!pathname) {
    return "unknown-page";
  }

  const slug = pathname.replace(/^\/+|\/+$/g, "");
  return slug || "home";
}

export interface StickyNavPreApprovalCtas {
  href: string;
  desktopTrigger: PreApprovalTrigger;
  mobileTrigger: PreApprovalTrigger;
}

export function buildStickyNavPreApprovalCtas(
  pathname: string | null,
): StickyNavPreApprovalCtas {
  const pageId = derivePageId(pathname);

  return {
    href: buildPreApprovalEntryHref(pathname),
    desktopTrigger: {
      origin: {
        pageId,
        sectionId: "sticky-nav-primary",
        ctaId: "sticky-nav-apply-now",
        placement: "sticky-nav",
      },
    },
    mobileTrigger: {
      origin: {
        pageId,
        sectionId: "sticky-nav-mobile-overlay",
        ctaId: "sticky-nav-mobile-get-pre-approved",
        placement: "sticky-nav",
      },
    },
  };
}
