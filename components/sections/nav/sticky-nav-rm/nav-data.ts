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
    href: "/used-tow-truck-financing",
    icon: "lightning",
    tint: "#FBF0F6",
    dividerBefore: true,
  },
] as const;

export const LEASING_ITEMS: readonly NavCardItem[] = [
  {
    title: "Tow Truck Leasing",
    description: "Lower payments, tax advantages, trade up every 3-5 years",
    href: "/tow-truck-leasing",
    icon: "book",
    tint: "#EDF1FF",
  },
  {
    title: "Lease vs. Loan",
    description: "Side-by-side comparison to find your best option",
    href: "/resources/tow-truck-lease-vs-loan",
    icon: "chart",
    tint: "#F3EEE7",
  },
  {
    title: "Lease-to-Own",
    description: "Build equity with every payment — own it at the end",
    href: "/tow-truck-leasing#lease-to-own",
    icon: "lightning",
    tint: "#FBF0F6",
  },
] as const;

export const PROGRAMS_ITEMS: readonly NavCardItem[] = [
  {
    title: "Zero Down",
    description: "Add equipment without draining your bank account",
    href: "/zero-down-tow-truck-financing",
    icon: "star",
    tint: "#FBF0F6",
  },
  {
    title: "Fleet Upgrade",
    description: "Special rates when you're adding your next truck",
    href: "/fleet-financing",
    icon: "chart",
    tint: "#EDF1FF",
  },
  {
    title: "Deferred Payments",
    description: "$99 touch payments for up to 180 days while your truck ramps up",
    href: "/deferred-payment-tow-truck-financing",
    icon: "clock",
    tint: "#F3EEE7",
  },
  {
    title: "Private Party",
    description: "Finance trucks from Facebook Marketplace, auctions, or private sellers",
    href: "/private-party-tow-truck-financing",
    icon: "truck",
    tint: "#FBF0F6",
  },
] as const;

export const RESOURCES_ITEMS: readonly NavCardItem[] = [
  {
    title: "Payment Calculator",
    description: "Estimate your monthly payment in under 30 seconds",
    href: "/tow-truck-calculator",
    icon: "calculator",
    tint: "#F3EEE7",
  },
  {
    title: "How Much Does a Truck Cost?",
    description: "2026 pricing guide — new, used, by equipment type",
    href: "/resources/how-much-does-a-tow-truck-cost",
    icon: "book",
    tint: "#EDF1FF",
  },
  {
    title: "Tow Truck ROI Guide",
    description: "How fast does a tow truck pay for itself?",
    href: "/resources/tow-truck-roi",
    icon: "chart",
    tint: "#FBF0F6",
  },
  {
    title: "How to Qualify",
    description: "Requirements, docs needed, and credit ranges",
    href: "/resources/how-to-qualify",
    icon: "shield",
    tint: "#F3EEE7",
  },
  {
    title: "Start a Towing Business",
    description: "Complete startup guide — costs, licenses, and first steps",
    href: "/resources/how-to-start-a-towing-business",
    icon: "lightning",
    tint: "#EDF1FF",
    dividerBefore: true,
  },
] as const;

export const NAV_SECTIONS: readonly NavSection[] = [
  { label: "Financing", value: "financing", items: FINANCING_ITEMS },
  { label: "Leasing", value: "leasing", items: LEASING_ITEMS },
  { label: "Programs", value: "programs", items: PROGRAMS_ITEMS },
  { label: "Resources", value: "resources", items: RESOURCES_ITEMS },
] as const;
