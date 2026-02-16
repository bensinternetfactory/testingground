/* ------------------------------------------------------------------ */
/*  Hero Copy Variants — Angle 2 (Conversion-Focused)                  */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type AngleId = 1 | 2 | 3 | 4 | 5;

export interface HeroVariantOverride {
  name: string;
  headline: string;
  bodyCopy: string;
  cta: { label: string };
  microcopy?: string;
  disclaimer?: string;
  tertiaryLinks?: { label: string }[];
  viewAllLink?: string;
  heroImageAlt?: string;
}

type HeroVariantsByAngle = Partial<
  Record<AngleId, readonly HeroVariantOverride[]>
>;

/* ------------------------------------------------------------------ */
/*  Variant Data                                                       */
/* ------------------------------------------------------------------ */

export const heroVariantsByAngle = {
  2: [
    {
      name: "Start with Your Rig",
      headline: "Tow Truck Financing Starts with Your Rig",
      bodyCopy:
        "Pick your truck type below and we\u2019ll show you what you may qualify for. Takes about 30 seconds.",
      cta: { label: "Check Your Options" },
    },
    {
      name: "What Can You Get",
      headline: "Tow Truck Financing \u2014 See What You Can Get",
      bodyCopy:
        "Select your equipment type and get a straight answer on rates, terms, and what you qualify for.",
      cta: { label: "See Your Options" },
    },
    {
      name: "Ready to Add a Truck",
      headline:
        "Ready to Add a Truck? Tow Truck Financing in 30 Seconds.",
      bodyCopy:
        "Choose your equipment type and see what terms look like for your business. No credit pull to check.",
      cta: { label: "Check Your Options" },
    },
    {
      name: "Your Next Truck",
      headline: "Tow Truck Financing for Your Next Truck",
      bodyCopy:
        "Rollback, wrecker, heavy, or rotator \u2014 pick your rig and see what terms you may qualify for.",
      cta: { label: "Get Started" },
    },
    {
      name: "Quick Look",
      headline:
        "Tow Truck Financing \u2014 Get a Quick Look at Your Options",
      bodyCopy:
        "Rollback, wrecker, heavy, or rotator \u2014 pick your rig below and see what you may qualify for. No credit pull.",
      cta: { label: "See What\u2019s Available" },
    },
    {
      name: "Built for Your Fleet",
      headline: "Tow Truck Financing Built for Your Fleet",
      bodyCopy:
        "Whether it\u2019s your first truck or your fifteenth, start by picking your equipment type. We\u2019ll take it from there.",
      cta: { label: "Check Your Options" },
    },
    {
      name: "Know Before You Apply",
      headline: "Tow Truck Financing \u2014 Know Where You Stand",
      bodyCopy:
        "Pick your rig type and see what you may qualify for. No commitment, no credit pull.",
      cta: { label: "Check Your Options" },
    },
    {
      name: "Numbers on Your Terms",
      headline:
        "Tow Truck Financing \u2014 See the Numbers on Your Terms",
      bodyCopy:
        "Select your truck type and get a look at rates and payments that fit how your operation runs.",
      cta: { label: "See Your Numbers" },
    },
    {
      name: "Found Your Truck",
      headline:
        "Found Your Next Truck? Get Tow Truck Financing Today.",
      bodyCopy:
        "Select your equipment type and see what you qualify for. Works for private sellers, auctions, and dealers.",
      cta: { label: "Check Your Options" },
    },
    {
      name: "Straight Answer",
      headline: "Tow Truck Financing. Straight Answer. Right Now.",
      bodyCopy:
        "Pick your rig type and see what you qualify for \u2014 no long application, no waiting around.",
      cta: { label: "Get a Straight Answer" },
    },
  ],
} as const satisfies HeroVariantsByAngle;
