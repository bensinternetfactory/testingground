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
    imageSrc: "/brand-assets/truck-icons/rollback/rollback-green.svg",
    imageSrcLight: "/brand-assets/truck-icons/rollback/rollback-light.svg",
  },
  {
    title: "Wrecker Financing",
    description: "Finance a light, medium, or heavy wrecker",
    href: "/wrecker-financing",
    icon: "shield",
    imageSrc: "/brand-assets/truck-icons/wrecker/wrecker-green.svg",
    imageSrcLight: "/brand-assets/truck-icons/wrecker/wrecker-light.svg",
  },
  {
    title: "Rotator Financing",
    description: "Finance a 50-75 ton rotator",
    href: "/rotator-financing",
    icon: "star",
    imageSrc: "/brand-assets/truck-icons/rotator/rotator-green.svg",
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
    title: "Tow Truck Prices",
    description: "New & used ranges by type",
    href: "/resources/how-much-does-a-tow-truck-cost",
    icon: "book",
    imageSrc: "/brand-assets/benefit-icons/terms/magnify-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/terms/magnify-light.svg",
  },
  {
    title: "Payment Calculator",
    description: "Estimate payments & ROI",
    href: "/tow-truck-calculator?angle=roi",
    icon: "calculator",
    imageSrc: "/brand-assets/benefit-icons/terms/cost-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/terms/cost-light.svg",
  },
  {
    title: "Compare Lenders",
    description: "Options, rates & program fit",
    href: "/resources/tow-truck-financing-companies",
    icon: "chart",
    imageSrc: "/brand-assets/benefit-icons/best/best-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/best/best-light.svg",
  },
  {
    title: "Lease vs. Loan",
    description: "Side-by-side comparison",
    href: "/resources/tow-truck-lease-vs-loan",
    icon: "book",
    imageSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/terms/terms-light.svg",
  },
  {
    title: "Tax Write-Offs",
    description: "Section 179 deduction guide",
    href: "/resources/section-179-tow-truck",
    icon: "shield",
    imageSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
    imageSrcLight: "/brand-assets/benefit-icons/hook/hook-light.svg",
  },
] as const;

export const NAV_SECTIONS: readonly NavSection[] = [
  { label: "Financing", value: "financing", items: FINANCING_ITEMS },
  { label: "Programs", value: "programs", items: PROGRAMS_ITEMS },
  { label: "Resources", value: "resources", items: RESOURCES_ITEMS },
] as const;
