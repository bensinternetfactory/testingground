import truck1 from "@/public/truck-1.jpg";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import type { PreApprovalSelectionTrigger } from "@/features/pre-approval/selection";
import { preApprovalEntryHash } from "@/features/pre-approval/drawer/server";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SelectionTileData {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface HeroConvertCtaConfig {
  label: string;
  href: string;
  preApprovalSelectionTrigger?: PreApprovalSelectionTrigger;
}

export interface HeroConvertConfig {
  headline: string;
  bodyCopy: string;
  selectionPrompt: string;
  selectionRequiredMessage: string;
  tiles: SelectionTileData[];
  cta: HeroConvertCtaConfig;
  tertiaryLinks: {
    label: string;
    href: string;
    preApprovalTrigger?: PreApprovalTrigger;
  }[];
  viewAllLink?: { label: string; href: string };
  microcopy?: string;
  disclaimer?: string;
  heroImage: StaticImageData;
  heroImageAlt: string;
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

export const HERO_CONVERT_CONFIG: HeroConvertConfig = {
  headline: "Tow Truck Financing Built for Your Business",
  bodyCopy: "See what you may qualify for\u2026",
  selectionPrompt: "Choose the equipment you want to finance first.",
  selectionRequiredMessage: "Select a truck type to continue.",
  tiles: [
    { id: "rollback", label: "Rollback" },
    { id: "wrecker", label: "Wrecker" },
    { id: "heavy-wrecker", label: "Heavy Wrecker" },
    { id: "rotator", label: "Rotator" },
  ],
  cta: {
    label: "Check Your Options",
    href: preApprovalEntryHash,
    preApprovalSelectionTrigger: {
      origin: {
        pageId: "hero-convert-geico",
        sectionId: "hero-primary",
        ctaId: "hero-main-cta",
        placement: "hero",
      },
      truckTypeByTileId: {
        rollback: "rollback",
        wrecker: "wrecker",
        "heavy-wrecker": "heavy-wrecker",
        rotator: "rotator",
      },
    },
  },
  tertiaryLinks: [
    { label: "Continue Your Saved Application", href: "#saved" },
    { label: "Talk to a Specialist", href: "#specialist" },
  ],
  viewAllLink: { label: "View All Equipment Types", href: "#" },
  microcopy: "Checking won\u2019t affect your credit score.",
  disclaimer:
    "Subject to credit review. All financing is subject to approval. Terms and conditions apply.",
  heroImage: truck1,
  heroImageAlt: "Tow truck ready for financing",
};
