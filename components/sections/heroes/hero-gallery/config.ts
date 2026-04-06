import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import { preApprovalEntryHash } from "@/features/pre-approval/drawer/server";
import type { DrawerTriggerPayload } from "@/components/ui/pre-approval-drawer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TertiaryLink {
  label: string;
  href: string;
  preApprovalTrigger?: PreApprovalTrigger;
  drawer?: DrawerTriggerPayload;
}

export interface HeroGalleryConfig {
  headline: string;
  subheadline: string;
  inputPlaceholder: string;
  ctaLabel: string;
  submitHref: string;
  mobileCta: {
    label: string;
    href: string;
    preApprovalTrigger?: PreApprovalTrigger;
    drawer?: DrawerTriggerPayload;
  };
  tertiaryLinks: TertiaryLink[];
  images: { row1: string[]; row2: string[] };
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

function createHomepageTrigger(
  sectionId: string,
  ctaId: string,
  placement: PreApprovalTrigger["origin"]["placement"],
  title?: string,
): PreApprovalTrigger {
  return {
    origin: {
      pageId: "home",
      sectionId,
      ctaId,
      placement,
    },
    drawer: title ? { title } : undefined,
  };
}

export const HERO_GALLERY_CONFIG: HeroGalleryConfig = {
  headline: "Fast & Easy Tow Truck Financing",
  subheadline:
    "Get pre-approved in less than 30 seconds. Know your truck payment before you apply.",
  inputPlaceholder: "How much do you need?",
  ctaLabel: "Get Pre-Approved",
  submitHref: "/pre-approval",
  mobileCta: {
    label: "Get Pre-Approved",
    href: preApprovalEntryHash,
    preApprovalTrigger: createHomepageTrigger(
      "hero-mobile-primary",
      "hero-mobile-primary",
      "hero",
    ),
  },
  tertiaryLinks: [
    {
      label: "Found a truck? Get financing",
      href: preApprovalEntryHash,
      preApprovalTrigger: createHomepageTrigger(
        "hero-tertiary-links",
        "hero-tertiary-found-truck",
        "hero",
        "How much is the tow truck you found?",
      ),
    },
    {
      label: "What\u2019s my buying power?",
      href: preApprovalEntryHash,
      preApprovalTrigger: createHomepageTrigger(
        "hero-tertiary-links",
        "hero-tertiary-buying-power",
        "hero",
        "Estimate your buying power",
      ),
    },
  ],
  images: {
    row1: [
      "/truck-1.jpg",
      "/truck-2.jpg",
      "/truck-3.jpg",
      "/truck-4.jpg",
      "/truck-5.jpg",
      "/truck-6.jpg",
      "/truck-7.jpg",
    ],
    row2: [
      "/truck-8.jpg",
      "/truck-9.jpg",
      "/truck-10.jpg",
      "/truck-11.jpg",
      "/truck-12.jpg",
      "/truck-13.jpg",
      "/truck-14.jpg",
    ],
  },
};
