import truck1 from "@/public/truck-1.jpg";
import type { StaticImageData } from "next/image";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface EquipmentTileData {
  id: string;
  label: string;
}

export interface HeroQuoteStartConfig {
  headline: string;
  bodyCopy: string;
  tiles: EquipmentTileData[];
  cta: { label: string; href: string };
  tertiaryLinks: { label: string; href: string }[];
  viewAllLink: string;
  microcopy: string;
  disclaimer: string;
  heroImage: StaticImageData;
  heroImageAlt: string;
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

export const HERO_QUOTE_START_CONFIG: HeroQuoteStartConfig = {
  headline: "Tow Truck Financing Built for Your Business",
  bodyCopy: "See what you may qualify for\u2026",
  tiles: [
    { id: "rollback", label: "Rollback" },
    { id: "wrecker", label: "Wrecker" },
    { id: "heavy-wrecker", label: "Heavy Wrecker" },
    { id: "rotator", label: "Rotator" },
  ],
  cta: { label: "Check Your Options", href: "#pre-approve" },
  tertiaryLinks: [
    { label: "Continue Your Saved Application", href: "#saved" },
    { label: "Talk to a Specialist", href: "#specialist" },
  ],
  viewAllLink: "View All Equipment Types",
  microcopy: "Checking won\u2019t affect your credit score.",
  disclaimer:
    "Subject to credit review. All financing is subject to approval. Terms and conditions apply.",
  heroImage: truck1,
  heroImageAlt: "Tow truck ready for financing",
};
