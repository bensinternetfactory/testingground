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
  imageSrc?: string;
  imageSrcLight?: string;
}

export interface NavSection {
  label: string;
  value: string;
  items: readonly NavCardItem[];
}

export const FINANCING_ITEMS: readonly NavCardItem[] = [
  {
    title: "Rollback Financing",
    description: "Finance a flatbed or car carrier",
    href: "/rollback-financing",
    icon: "truck",
    imageSrc: "/brand-assets/truck-icons/rollback/rollback-dark.svg",
    imageSrcLight: "/brand-assets/truck-icons/rollback/rollback-light.svg",
  },
  {
    title: "Wrecker Financing",
    description: "Finance a light, medium, or heavy wrecker",
    href: "/wrecker-financing",
    icon: "shield",
    imageSrc: "/brand-assets/truck-icons/wrecker/wrecker-dark.svg",
    imageSrcLight: "/brand-assets/truck-icons/wrecker/wrecker-light.svg",
  },
  {
    title: "Rotator Financing",
    description: "Finance a 50-75 ton rotator",
    href: "/rotator-financing",
    icon: "star",
    imageSrc: "/brand-assets/truck-icons/rotator/rotator-dark.svg",
    imageSrcLight: "/brand-assets/truck-icons/rotator/rotator-light.svg",
  },
  {
    title: "Used Tow Truck Financing",
    description: "Finance a used truck from any seller",
    href: "/used-tow-truck-financing",
    icon: "lightning",
    imageSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/hook/hook-light.svg",
  },
] as const;

export const LEASING_ITEMS: readonly NavCardItem[] = [
  {
    title: "Tow Truck Leasing",
    description: "Lower payments, tax advantages",
    href: "/tow-truck-leasing",
    icon: "book",
  },
  {
    title: "Lease vs. Loan",
    description: "Side-by-side comparison",
    href: "/resources/tow-truck-lease-vs-loan",
    icon: "chart",
  },
  {
    title: "Lease-to-Own",
    description: "Build equity, own it at the end",
    href: "/tow-truck-leasing#lease-to-own",
    icon: "lightning",
  },
] as const;

export const PROGRAMS_ITEMS: readonly NavCardItem[] = [
  {
    title: "Zero Down",
    description: "No money down on equipment",
    href: "/zero-down-tow-truck-financing",
    icon: "star",
    imageSrc: "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/zero-down/no-money-down-light.svg",
  },
  {
    title: "Fleet Upgrade",
    description: "Special rates for your next truck",
    href: "/fleet-financing",
    icon: "chart",
    imageSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/terms/terms-light.svg",
  },
  {
    title: "Deferred Payments",
    description: "$99 payments for up to 180 days",
    href: "/deferred-payment-tow-truck-financing",
    icon: "clock",
    imageSrc: "/brand-assets/benefit-icons/deferment/deferment-180-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/deferment/deferment-180-light.svg",
  },
  {
    title: "Private Party",
    description: "Marketplace, auctions & private sellers",
    href: "/",
    icon: "truck",
    imageSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/hook/hook-light.svg",
  },
] as const;

export const RESOURCES_ITEMS: readonly NavCardItem[] = [
  {
    title: "How Much Does a Tow Truck Cost?",
    description: "New, used, by type. Real price ranges.",
    href: "/resources/how-much-does-a-tow-truck-cost",
    icon: "book",
    imageSrc: "/brand-assets/benefit-icons/terms/magnify-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/terms/magnify-light.svg",
  },
  {
    title: "Tow Truck Payment + ROI Calculator",
    description: "Run monthly payment and payback math in one tool.",
    href: "/tow-truck-calculator?angle=roi",
    icon: "calculator",
    imageSrc: "/brand-assets/benefit-icons/terms/cost-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/terms/cost-light.svg",
  },
  {
    title: "Tow Truck Financing Companies",
    description: "Compare lender options, terms, speed, and program fit.",
    href: "/resources/tow-truck-financing-companies",
    icon: "chart",
    imageSrc: "/brand-assets/benefit-icons/best/best-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/best/best-light.svg",
  },
  {
    title: "Lease vs. Loan: Which Is Right for You?",
    description: "Side-by-side comparison guide.",
    href: "/resources/tow-truck-lease-vs-loan",
    icon: "book",
    imageSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/terms/terms-light.svg",
  },
  {
    title: "Section 179",
    description: "See how the year-end deduction may apply.",
    href: "/resources/section-179-tow-truck",
    icon: "shield",
    imageSrc: "/brand-assets/benefit-icons/tax/section-179-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/tax/section-179-light.svg",
  },
] as const;

export const NAV_SECTIONS: readonly NavSection[] = [
  { label: "Financing", value: "financing", items: FINANCING_ITEMS },
  { label: "Leasing", value: "leasing", items: LEASING_ITEMS },
  { label: "Programs", value: "programs", items: PROGRAMS_ITEMS },
  { label: "Resources", value: "resources", items: RESOURCES_ITEMS },
] as const;
