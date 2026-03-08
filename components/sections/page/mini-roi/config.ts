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
    min: 30,
    max: 500,
    step: 10,
    defaultValue: 200,
  },
  assumptions: {
    towsPerDay: 3,
    daysPerMonth: 22,
  },
  cta: {
    label: "Build Your Full Profit Plan",
    basePath: "/tow-truck-calculator",
  },
  disclaimer:
    "Estimates only. Click through to create a full truck profit and loss statement.",
};
