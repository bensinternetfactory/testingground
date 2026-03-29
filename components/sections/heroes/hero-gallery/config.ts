import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TertiaryLink {
  eyebrow: string;
  label: string;
  href: string;
  drawerTitle?: string;
}

export interface HeroGalleryConfig {
  headline: string;
  subheadline: string;
  inputPlaceholder: string;
  ctaLabel: string;
  mobileCta: { label: string; href: string };
  tertiaryLinks: TertiaryLink[];
  images: { row1: string[]; row2: string[] };
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

export const HERO_GALLERY_CONFIG: HeroGalleryConfig = {
  headline: "Fast & Easy Tow Truck Financing",
  subheadline:
    "Get pre-approved in less then 30 seconds. Know your truck payment before you apply.",
  inputPlaceholder: "How much do you need?",
  ctaLabel: "Get Pre-Approved",
  mobileCta: { label: "Get Pre-Approved", href: DRAWER_HASH },
  tertiaryLinks: [
    {
      eyebrow: "Already found a truck?",
      label: "Found a truck? Get financing",
      href: DRAWER_HASH,
      drawerTitle: "How much is the tow truck you found?",
    },
    {
      eyebrow: "Not sure yet?",
      label: "What\u2019s my buying power?",
      href: "#",
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
