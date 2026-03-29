/**
 * nav-data.ts — Server-safe module for dropdown card content.
 *
 * All arrays are hoisted to module scope so they maintain stable references
 * across renders (no inline array allocation in JSX).
 */

export type NavIconName =
  | "lightning"
  | "truck"
  | "chart"
  | "clock"
  | "shield"
  | "calculator"
  | "book"
  | "phone"
  | "star";

interface NavCardItemBase {
  title: string;
  description: string;
  href: string;
}

export interface NavIconCardItem extends NavCardItemBase {
  kind: "icon";
  icon: NavIconName;
}

export interface NavImageCardItem extends NavCardItemBase {
  kind: "image";
  imageSrc: string;
}

export type NavCardItem = NavIconCardItem | NavImageCardItem;

export interface NavSection {
  label: string;
  value: string;
  items: readonly NavCardItem[];
}

export const FINANCING_ITEMS: readonly NavCardItem[] = [
  {
    kind: "image",
    title: "Rollback Financing",
    description: "Finance a flatbed or car carrier",
    href: "/rollback-financing",
    imageSrc: "/brand-assets/truck-icons/rollback/rollback-green.svg",
  },
  {
    kind: "image",
    title: "Wrecker Financing",
    description: "Finance a light, medium, or heavy wrecker",
    href: "/wrecker-financing",
    imageSrc: "/brand-assets/truck-icons/wrecker/wrecker-green.svg",
  },
  {
    kind: "image",
    title: "Rotator Financing",
    description: "Finance a 50-75 ton rotator",
    href: "/rotator-financing",
    imageSrc: "/brand-assets/truck-icons/rotator/rotator-green.svg",
  },
  {
    kind: "image",
    title: "Used Tow Truck Financing",
    description: "Finance a used truck from any seller",
    href: "/used-tow-truck-financing",
    imageSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
  },
] as const;

export const PROGRAMS_ITEMS: readonly NavCardItem[] = [
  {
    kind: "image",
    title: "Zero Down",
    description: "No money down on equipment",
    href: "/zero-down-tow-truck-financing",
    imageSrc: "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
  },
  {
    kind: "image",
    title: "Fleet Upgrade",
    description: "Special rates for your next truck",
    href: "/fleet-financing",
    imageSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
  },
  {
    kind: "image",
    title: "Deferred Payments",
    description: "$99 payments for up to 180 days",
    href: "/deferred-payment-tow-truck-financing",
    imageSrc: "/brand-assets/benefit-icons/deferment/deferment-180-dark.svg",
  },
  {
    kind: "image",
    title: "Private Party",
    description: "Marketplace, auctions & private sellers",
    href: "/used-tow-truck-financing",
    imageSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
  },
] as const;

export const RESOURCES_ITEMS: readonly NavCardItem[] = [
  {
    kind: "image",
    title: "Tow Truck Prices",
    description: "New & used ranges by type",
    href: "/resources/how-much-does-a-tow-truck-cost",
    imageSrc: "/brand-assets/benefit-icons/terms/magnify-dark.svg",
  },
  {
    kind: "image",
    title: "Payment Calculator",
    description: "Estimate payments & ROI",
    href: "/tow-truck-calculator?angle=roi",
    imageSrc: "/brand-assets/benefit-icons/terms/cost-dark.svg",
  },
  {
    kind: "image",
    title: "Compare Lenders",
    description: "Options, rates & program fit",
    href: "/resources/tow-truck-financing-companies",
    imageSrc: "/brand-assets/benefit-icons/best/best-dark.svg",
  },
  {
    kind: "image",
    title: "Lease vs. Loan",
    description: "Side-by-side comparison",
    href: "/resources/tow-truck-lease-vs-loan",
    imageSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
  },
  {
    kind: "image",
    title: "Tax Write-Offs",
    description: "Section 179 deduction guide",
    href: "/resources/section-179-tow-truck",
    imageSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
  },
] as const;

export const NAV_SECTIONS: readonly NavSection[] = [
  { label: "Financing", value: "financing", items: FINANCING_ITEMS },
  { label: "Programs", value: "programs", items: PROGRAMS_ITEMS },
  { label: "Resources", value: "resources", items: RESOURCES_ITEMS },
] as const;
