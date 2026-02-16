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
  dividerBefore?: boolean;
}

export interface NavSection {
  label: string;
  value: string;
  items: readonly NavCardItem[];
}

export const FINANCING_ITEMS: readonly NavCardItem[] = [
  {
    title: "Rollback Financing",
    description: "The most common flatbed — competitive rates, fast approval",
    href: "/rollback-financing",
    icon: "truck",
    tint: "#FBF0F6",
  },
  {
    title: "Wrecker Financing",
    description: "Light, medium, and heavy duty — terms built for operators",
    href: "/wrecker-financing",
    icon: "shield",
    tint: "#F3EEE7",
  },
  {
    title: "Rotator Financing",
    description: "Finance $200K–$1.3M rotators with towing-specific terms",
    href: "/rotator-financing",
    icon: "star",
    tint: "#EDF1FF",
  },
  {
    title: "Used Tow Truck Financing",
    description: "Any age, any seller — private party, auction, Marketplace",
    href: "#!",
    icon: "lightning",
    tint: "#FBF0F6",
    dividerBefore: true,
  },
] as const;

export const PROGRAMS_ITEMS: readonly NavCardItem[] = [
  {
    title: "Fleet Upgrade",
    description: "Special rates when you're adding your next truck",
    href: "/fleet-financing",
    icon: "chart",
    tint: "#EDF1FF",
  },
  {
    title: "Zero Down",
    description: "Add equipment without draining your bank account",
    href: "/zero-down-tow-truck-financing",
    icon: "star",
    tint: "#FBF0F6",
  },
  {
    title: "Deferred Payments",
    description: "$99 touch payments for up to 180 days while your truck ramps up",
    href: "/deferred-payment-tow-truck-financing",
    icon: "clock",
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
