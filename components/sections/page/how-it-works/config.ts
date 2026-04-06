import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import { preApprovalEntryHash } from "@/features/pre-approval/drawer/server";

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface HowItWorksConfig {
  headline: string;
  steps: HowItWorksStep[];
  cta: {
    label: string;
    href: string;
    preApprovalTrigger?: PreApprovalTrigger;
  };
}

function createHomepageTrigger(
  sectionId: string,
  ctaId: string,
  placement: PreApprovalTrigger["origin"]["placement"],
  title?: string,
): PreApprovalTrigger {
  return {
    origin: {
      pageId: "home",
      sectionId,
      ctaId,
      placement,
    },
    drawer: title ? { title } : undefined,
  };
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
    href: preApprovalEntryHash,
    preApprovalTrigger: createHomepageTrigger(
      "how-it-works-primary",
      "how-it-works-primary",
      "section",
    ),
  },
};
