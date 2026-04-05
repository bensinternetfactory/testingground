import {
  DRAWER_HASH,
  type DrawerTriggerPayload,
} from "@/components/ui/pre-approval-drawer";

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface HowItWorksConfig {
  headline: string;
  steps: HowItWorksStep[];
  cta: { label: string; href: string; drawer?: DrawerTriggerPayload };
}

export const HOW_IT_WORKS_CONFIG: HowItWorksConfig = {
  headline: "Faster Tow Truck Financing",
  steps: [
    {
      number: "Step 01",
      title: "Tell Us What You Need",
      description:
        "Pick your truck type, new or used, and your budget. Takes 30\u00a0seconds.",
    },
    {
      number: "Step 02",
      title: "Get Your Payment Range",
      description:
        "Pre-approved in 30\u00a0seconds. No credit check. See real payments.",
    },
    {
      number: "Step 03",
      title: "Drive Your Truck Home",
      description: "We fund the dealer direct. You pick up your truck.",
    },
  ],
  cta: {
    label: "See Your Payment",
    href: DRAWER_HASH,
  },
};
