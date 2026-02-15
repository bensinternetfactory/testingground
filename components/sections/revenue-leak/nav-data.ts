/**
 * nav-data.ts — Server-safe module for dropdown card content.
 *
 * All arrays are hoisted to module scope so they maintain stable references
 * across renders (no inline array allocation in JSX).
 */

export interface NavCardItem {
  title: string;
  description: string;
  href: string;
  icon: "lightning" | "truck" | "chart" | "clock" | "shield" | "calculator" | "book" | "phone" | "star";
  tint?: string;
}

export interface NavSection {
  label: string;
  value: string;
  items: readonly NavCardItem[];
}

export const FINANCING_ITEMS: readonly NavCardItem[] = [
  {
    title: "New Equipment Financing",
    description: "Competitive rates on brand-new rollbacks, wreckers, and rotators",
    href: "#!",
    icon: "truck",
    tint: "#FBF0F6",
  },
  {
    title: "Used Equipment Financing",
    description: "Flexible terms for pre-owned tow trucks and recovery vehicles",
    href: "#!",
    icon: "shield",
    tint: "#F3EEE7",
  },
  {
    title: "Refinancing",
    description: "Lower your monthly payment on an existing truck loan",
    href: "#!",
    icon: "chart",
    tint: "#EDF1FF",
  },
] as const;

export const PROGRAMS_ITEMS: readonly NavCardItem[] = [
  {
    title: "First-Time Buyer Program",
    description: "Get approved with limited credit history or time in business",
    href: "#!",
    icon: "star",
    tint: "#EDF1FF",
  },
  {
    title: "Fleet Expansion",
    description: "Special rates when you're adding a second, third, or tenth truck",
    href: "#!",
    icon: "chart",
    tint: "#FBF0F6",
  },
  {
    title: "Credit Recovery",
    description: "Programs designed for operators rebuilding their credit",
    href: "#!",
    icon: "shield",
    tint: "#F3EEE7",
  },
] as const;

export const RESOURCES_ITEMS: readonly NavCardItem[] = [
  {
    title: "Payment Calculator",
    description: "Estimate your monthly payment in under 30 seconds",
    href: "#!",
    icon: "calculator",
    tint: "#F3EEE7",
  },
  {
    title: "Buyer's Guide",
    description: "Everything you need to know before financing a tow truck",
    href: "#!",
    icon: "book",
    tint: "#EDF1FF",
  },
  {
    title: "Talk to a Specialist",
    description: "Connect with an advisor who knows the towing industry",
    href: "#!",
    icon: "phone",
    tint: "#FBF0F6",
  },
] as const;

export const NAV_SECTIONS: readonly NavSection[] = [
  { label: "Financing", value: "financing", items: FINANCING_ITEMS },
  { label: "Programs", value: "programs", items: PROGRAMS_ITEMS },
  { label: "Resources", value: "resources", items: RESOURCES_ITEMS },
] as const;
