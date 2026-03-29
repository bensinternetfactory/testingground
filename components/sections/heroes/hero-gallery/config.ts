import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TertiaryLink {
  label: string;
  href: string;
  drawerTitle?: string;
}

export interface HeroGalleryConfig {
  headline: string;
  subheadline: string;
  inputPlaceholder: string;
  ctaLabel: string;
  submitHref: string;
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
    "Get pre-approved in less than 30 seconds. Know your truck payment before you apply.",
  inputPlaceholder: "How much do you need?",
  ctaLabel: "Get Pre-Approved",
  submitHref: "/pre-approval",
  mobileCta: { label: "Get Pre-Approved", href: DRAWER_HASH },
  tertiaryLinks: [
    {
      label: "Found a truck? Get financing",
      href: DRAWER_HASH,
      drawerTitle: "How much is the tow truck you found?",
    },
    {
      label: "What\u2019s my buying power?",
      href: DRAWER_HASH,
      drawerTitle: "Estimate your buying power",
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
