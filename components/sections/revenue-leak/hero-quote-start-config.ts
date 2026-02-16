import truck1 from "@/public/truck-1.jpg";
import type { StaticImageData } from "next/image";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface EquipmentTileData {
  id: string;
  label: string;
  iconPath: string;
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
    {
      id: "flatbed",
      label: "Flatbed / Rollback",
      iconPath:
        "M3 16l1.5-5h11L17 16M5 16a2 2 0 1 0 4 0M11 16a2 2 0 1 0 4 0M1 16h1M17 16h2l1-3V9l-3-3H7L4 9",
    },
    {
      id: "wrecker",
      label: "Wrecker / Heavy-Duty",
      iconPath:
        "M1 16h1m15 0h2l1-3V9l-3-3h-5V3L8 6v5H4L2 16m3 0a2 2 0 1 0 4 0m4 0a2 2 0 1 0 4 0",
    },
    {
      id: "wheel-lift",
      label: "Wheel-Lift",
      iconPath:
        "M3 16h1m13 0h2l1-3v-3h-6V7H8v3H2l1 6m2 0a2 2 0 1 0 4 0m4 0a2 2 0 1 0 4 0",
    },
    {
      id: "carrier",
      label: "Carrier / Multi-Car",
      iconPath:
        "M1 14h18M3 14V8l3-4h8l3 4v6M5 14a2 2 0 1 0 4 0m2 0a2 2 0 1 0 4 0M6 4l-1 4m10-4l1 4",
    },
    {
      id: "repo",
      label: "Repo / Snatch Truck",
      iconPath:
        "M2 16h1m14 0h2l1-3V9l-3-3h-5V4L9 6v4H4L2 16m3 0a2 2 0 1 0 4 0m4 0a2 2 0 1 0 4 0",
    },
    {
      id: "fleet",
      label: "Fleet Expansion / Upfit",
      iconPath:
        "M10 3v4m-4-2l2 2m6-2l-2 2M3 16h1m13 0h2l1-3V9l-3-3H7L4 9l-2 7m3 0a2 2 0 1 0 4 0m4 0a2 2 0 1 0 4 0",
    },
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
  heroImageAlt: "Flatbed tow truck ready for financing",
};
