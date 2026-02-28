export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface HowItWorksConfig {
  headline: string;
  steps: HowItWorksStep[];
  cta: { label: string; href: string };
}

export const HOW_IT_WORKS_CONFIG: HowItWorksConfig = {
  headline: "From Application to Keys in 3\u00a0Steps",
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
        "Pre-approved in 30 seconds. No credit check. See real payments.",
    },
    {
      number: "Step 03",
      title: "Drive Your Truck Home",
      description: "We fund the dealer direct. You pick up your truck.",
    },
  ],
  cta: {
    label: "See Your Payment",
    href: "#",
  },
};
