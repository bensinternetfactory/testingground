export interface MiniROIConfig {
  headline: { base: string; accent: string };
  subheadline: string;
  slider: {
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  };
  assumptions: {
    purchasePrice: number;
    downPayment: number;
    interestRate: number;
    termMonths: number;
    towsPerDay: number;
    daysPerMonth: number;
  };
  cta: { label: string; basePath: string };
  disclaimer: string;
}

export const MINI_ROI_CONFIG: MiniROIConfig = {
  headline: {
    base: "Will Your Next Truck",
    accent: "Cash Flow?",
  },
  subheadline:
    "Enter what you charge per tow and see your projected profit instantly. Then build a full plan in our calculator.",
  slider: {
    label: "What do you charge per tow?",
    min: 100,
    max: 500,
    step: 25,
    defaultValue: 200,
  },
  assumptions: {
    purchasePrice: 65_000,
    downPayment: 6_500,
    interestRate: 8.5,
    termMonths: 60,
    towsPerDay: 3,
    daysPerMonth: 22,
  },
  cta: {
    label: "Build Your Full Profit Plan",
    basePath: "/tow-truck-calculator",
  },
  disclaimer:
    "Estimates only. Actual results vary by market, call volume, and equipment type. Does not include operating expenses beyond the loan payment.",
};
