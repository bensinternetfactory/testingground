// ── Primary Palette ──────────────────────────────────────────────────────────

export interface ColorToken {
  name: string;
  hex: string;
  cssVar: string;
  tailwind: string;
  textClass: string;
}

export const primaryColors: ColorToken[] = [
  {
    name: "White",
    hex: "#FFFFFF",
    cssVar: "--color-white",
    tailwind: "bg-white",
    textClass: "text-[#101820]",
  },
  {
    name: "Black 6C",
    hex: "#101820",
    cssVar: "--color-black-6c",
    tailwind: "bg-[#101820]",
    textClass: "text-white",
  },
  {
    name: "Green",
    hex: "#22C55E",
    cssVar: "--color-green",
    tailwind: "bg-[#22C55E]",
    textClass: "text-white",
  },
  {
    name: "Dark Green",
    hex: "#15803D",
    cssVar: "--color-dark-green",
    tailwind: "bg-[#15803D]",
    textClass: "text-white",
  },
];

// ── Gray Scale ───────────────────────────────────────────────────────────────

export interface GrayToken {
  step: string;
  hex: string;
}

export const grayScale: GrayToken[] = [
  { step: "50", hex: "#FAFAFA" },
  { step: "100", hex: "#F5F5F5" },
  { step: "200", hex: "#E5E5E5" },
  { step: "300", hex: "#D4D4D4" },
  { step: "400", hex: "#A3A3A3" },
  { step: "500", hex: "#737373" },
  { step: "600", hex: "#545454" },
  { step: "700", hex: "#404040" },
  { step: "800", hex: "#262626" },
  { step: "900", hex: "#171717" },
];

// ── Surface Colors ───────────────────────────────────────────────────────────

export interface SurfaceToken {
  name: string;
  hex: string;
  cssVar: string;
  description: string;
  textColor: string;
}

export const surfaceColors: SurfaceToken[] = [
  {
    name: "Green Wash",
    hex: "#F0FDF4",
    cssVar: "--surface-green-wash",
    description: "Light green backgrounds, highlights",
    textColor: "#101820",
  },
  {
    name: "Green Mist",
    hex: "#DCFCE7",
    cssVar: "--surface-green-mist",
    description: "Badges, tags, subtle accent areas",
    textColor: "#101820",
  },
  {
    name: "Neutral Bg",
    hex: "#F5F5F5",
    cssVar: "--surface-neutral",
    description: "Section backgrounds, card groups",
    textColor: "#101820",
  },
  {
    name: "Dark Surface",
    hex: "#101820",
    cssVar: "--surface-dark",
    description: "Dark hero sections, inverted cards",
    textColor: "#FFFFFF",
  },
];

// ── Type Scale ───────────────────────────────────────────────────────────────

export interface TypeToken {
  level: string;
  size: string;
  weight: number;
  lineHeight: string;
  tag: string;
  tailwind: string;
  sample: string;
}

export const typeScale: TypeToken[] = [
  {
    level: "Display",
    size: "56px",
    weight: 700,
    lineHeight: "1.1",
    tag: "h1",
    tailwind: "text-[56px] font-bold leading-[1.1]",
    sample: "Financing built for towing.",
  },
  {
    level: "Heading 1",
    size: "48px",
    weight: 700,
    lineHeight: "1.15",
    tag: "h1",
    tailwind: "text-5xl font-bold leading-[1.15]",
    sample: "Get on the road faster.",
  },
  {
    level: "Heading 2",
    size: "36px",
    weight: 600,
    lineHeight: "1.2",
    tag: "h2",
    tailwind: "text-4xl font-semibold leading-[1.2]",
    sample: "Why operators choose TowLoans",
  },
  {
    level: "Heading 3",
    size: "24px",
    weight: 600,
    lineHeight: "1.3",
    tag: "h3",
    tailwind: "text-2xl font-semibold leading-[1.3]",
    sample: "Zero down payment options",
  },
  {
    level: "Body",
    size: "16px",
    weight: 400,
    lineHeight: "1.5",
    tag: "p",
    tailwind: "text-base leading-relaxed",
    sample:
      "We finance rollbacks, wreckers, rotators, and heavy-duty equipment for towing operators across the country.",
  },
  {
    level: "Small",
    size: "14px",
    weight: 400,
    lineHeight: "1.5",
    tag: "p",
    tailwind: "text-sm leading-relaxed",
    sample: "Terms and conditions may apply. Subject to credit approval.",
  },
  {
    level: "Caption",
    size: "12px",
    weight: 500,
    lineHeight: "1.4",
    tag: "span",
    tailwind: "text-xs font-medium leading-[1.4]",
    sample: "UPDATED FEB 2026",
  },
];

// ── Spacing Scale ────────────────────────────────────────────────────────────

export interface SpacingToken {
  step: number;
  px: number;
  tailwind: string;
}

export const spacingScale: SpacingToken[] = [
  { step: 1, px: 4, tailwind: "p-1" },
  { step: 2, px: 8, tailwind: "p-2" },
  { step: 3, px: 12, tailwind: "p-3" },
  { step: 4, px: 16, tailwind: "p-4" },
  { step: 5, px: 20, tailwind: "p-5" },
  { step: 6, px: 24, tailwind: "p-6" },
  { step: 8, px: 32, tailwind: "p-8" },
  { step: 10, px: 40, tailwind: "p-10" },
  { step: 12, px: 48, tailwind: "p-12" },
  { step: 16, px: 64, tailwind: "p-16" },
  { step: 20, px: 80, tailwind: "p-20" },
  { step: 24, px: 96, tailwind: "p-24" },
];

// ── Benefit Icon Manifest ────────────────────────────────────────────────────

export interface IconVariant {
  label: string;
  src: string;
  bg: "light" | "dark" | "green";
}

export interface IconCategory {
  name: string;
  variants: IconVariant[];
}

export const benefitIcons: IconCategory[] = [
  {
    name: "Zero Down",
    variants: [
      { label: "Dark", src: "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg", bg: "light" },
      { label: "Light", src: "/brand-assets/benefit-icons/zero-down/no-money-down-light.svg", bg: "dark" },
    ],
  },
  {
    name: "Credit Inquiry",
    variants: [
      { label: "Dark", src: "/brand-assets/benefit-icons/inquiry/credit-inquiry-dark.svg", bg: "light" },
      { label: "Green", src: "/brand-assets/benefit-icons/inquiry/credit-inquiry-green.svg", bg: "green" },
    ],
  },
  {
    name: "Fast Funding",
    variants: [
      { label: "Dark", src: "/brand-assets/benefit-icons/fast/fast-funding-dark.svg", bg: "light" },
      { label: "Light", src: "/brand-assets/benefit-icons/fast/fast-funding-light.svg", bg: "dark" },
      { label: "Watch Dark", src: "/brand-assets/benefit-icons/fast/fast-funding-watch-dark.svg", bg: "light" },
      { label: "Watch Light", src: "/brand-assets/benefit-icons/fast/fast-funding-watch-light.svg", bg: "dark" },
    ],
  },
  {
    name: "Deferment",
    variants: [
      { label: "60-Day Dark", src: "/brand-assets/benefit-icons/deferment/deferment-60-dark.svg", bg: "light" },
      { label: "60-Day Light", src: "/brand-assets/benefit-icons/deferment/deferment-60-light.svg", bg: "dark" },
      { label: "90-Day Dark", src: "/brand-assets/benefit-icons/deferment/deferment-90-dark.svg", bg: "light" },
      { label: "90-Day Light", src: "/brand-assets/benefit-icons/deferment/deferment-90-light.svg", bg: "dark" },
      { label: "180-Day Dark", src: "/brand-assets/benefit-icons/deferment/deferment-180-dark.svg", bg: "light" },
      { label: "180-Day Light", src: "/brand-assets/benefit-icons/deferment/deferment-180-light.svg", bg: "dark" },
    ],
  },
  {
    name: "Terms",
    variants: [
      { label: "Dark", src: "/brand-assets/benefit-icons/terms/terms-dark.svg", bg: "light" },
      { label: "Light", src: "/brand-assets/benefit-icons/terms/terms-light.svg", bg: "dark" },
    ],
  },
  {
    name: "Best Rates",
    variants: [
      { label: "Dark", src: "/brand-assets/benefit-icons/best/best-dark.svg", bg: "light" },
      { label: "Green", src: "/brand-assets/benefit-icons/best/best-green.svg", bg: "green" },
      { label: "Light", src: "/brand-assets/benefit-icons/best/best-light.svg", bg: "dark" },
      { label: "Trophy Dark", src: "/brand-assets/benefit-icons/best/trophy-dark-outline.svg", bg: "light" },
      { label: "Trophy Green", src: "/brand-assets/benefit-icons/best/trophy-green.svg", bg: "green" },
      { label: "Trophy Light", src: "/brand-assets/benefit-icons/best/trophy-light-outline.svg", bg: "dark" },
    ],
  },
  {
    name: "Mileage",
    variants: [
      { label: "Dark", src: "/brand-assets/benefit-icons/miles/miles-dark.svg", bg: "light" },
      { label: "Light", src: "/brand-assets/benefit-icons/miles/miles-light.svg", bg: "dark" },
      { label: "Odometer Dark", src: "/brand-assets/benefit-icons/miles/odometer-dark.svg", bg: "light" },
      { label: "Odometer Light", src: "/brand-assets/benefit-icons/miles/odometer-light.svg", bg: "dark" },
    ],
  },
];

// ── Truck Icon Manifest ──────────────────────────────────────────────────────

export interface TruckType {
  name: string;
  variants: IconVariant[];
}

export const truckIcons: TruckType[] = [
  {
    name: "Rollback",
    variants: [
      { label: "Dark", src: "/brand-assets/truck-icons/rollback/rollback-dark.svg", bg: "light" },
      { label: "Green", src: "/brand-assets/truck-icons/rollback/rollback-green.svg", bg: "light" },
      { label: "Light", src: "/brand-assets/truck-icons/rollback/rollback-light.svg", bg: "dark" },
      { label: "Light-Dark", src: "/brand-assets/truck-icons/rollback/rollback-light-dark.svg", bg: "light" },
      { label: "Light-Green", src: "/brand-assets/truck-icons/rollback/rollback-light-green.svg", bg: "light" },
      { label: "Light-Light", src: "/brand-assets/truck-icons/rollback/rollback-light-light.svg", bg: "dark" },
    ],
  },
  {
    name: "Wrecker",
    variants: [
      { label: "Dark", src: "/brand-assets/truck-icons/wrecker/wrecker-dark.svg", bg: "light" },
      { label: "Green", src: "/brand-assets/truck-icons/wrecker/wrecker-green.svg", bg: "light" },
      { label: "Light", src: "/brand-assets/truck-icons/wrecker/wrecker-light.svg", bg: "dark" },
    ],
  },
  {
    name: "Rotator",
    variants: [
      { label: "Dark", src: "/brand-assets/truck-icons/rotator/rotator-dark.svg", bg: "light" },
      { label: "Green", src: "/brand-assets/truck-icons/rotator/rotator-green.svg", bg: "light" },
      { label: "Light", src: "/brand-assets/truck-icons/rotator/rotator-light.svg", bg: "dark" },
    ],
  },
  {
    name: "Heavy Wrecker",
    variants: [
      { label: "Dark", src: "/brand-assets/truck-icons/heavywrecker/heavywrecker-dark.svg", bg: "light" },
      { label: "Green", src: "/brand-assets/truck-icons/heavywrecker/heavywrecker-green.svg", bg: "light" },
      { label: "Light", src: "/brand-assets/truck-icons/heavywrecker/heavywrecker-light.svg", bg: "dark" },
    ],
  },
];

// ── Section Nav Items ────────────────────────────────────────────────────────

export const brandSections = [
  { id: "logo", label: "Logo" },
  { id: "colors", label: "Colors" },
  { id: "type", label: "Type" },
  { id: "buttons", label: "Buttons" },
  { id: "benefit-icons", label: "Benefit Icons" },
  { id: "trucks", label: "Trucks" },
  { id: "spacing", label: "Spacing" },
  { id: "rules", label: "Rules" },
] as const;
