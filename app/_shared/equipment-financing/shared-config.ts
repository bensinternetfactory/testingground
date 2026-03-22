import {
  buildFaqSchema,
  type FaqItemData,
  type FaqSectionConfig,
} from "@/components/sections/page/faq";
import type { FinancingFootnotesConfig } from "@/components/sections/page/financing-footnotes";
import type { ProgramCardsConfig } from "@/components/sections/page/program-cards/config";
import type { TrustBridgeConfig } from "@/components/sections/page/trust-bridge/config";

export const SHARED_TRUST_BRIDGE_CONFIG: TrustBridgeConfig = {
  kicker: "HOW IT WORKS",
  headline: "Four steps. One straight answer.",
  steps: [
    { number: "1", title: "Choose the truck you want to finance" },
    { number: "2", title: "Set your financing amount" },
    { number: "3", title: "Answer a few business questions" },
    { number: "4", title: "See your payment range" },
  ],
};

const SHARED_EQUIPMENT_PROGRAMS = [
  {
    id: "zero-down",
    title: "$0 Down Options",
    description:
      "Keep cash in the business when the deal and your operating profile support it.",
    iconId: "zero-down" as const,
    linkText: "See Zero Down",
    linkHref: "/zero-down-tow-truck-financing",
  },
  {
    id: "used-terms",
    title: "Longer Terms on Used Trucks",
    description:
      "Structure used equipment with terms that keep the payment workable instead of forcing a cash-heavy deal.",
    iconId: "used-terms" as const,
    linkText: "Used Truck Financing",
    linkHref: "/used-tow-truck-financing",
  },
  {
    id: "new-terms",
    title: "Up to 84 Months on New",
    description:
      "Stretch newer equipment over longer terms when the truck, seller, and business profile line up.",
    iconId: "new-terms" as const,
    linkText: "See Term Options",
    linkHref: "/tow-truck-financing",
  },
  {
    id: "deferred",
    title: "No Payments for up to 180 Days",
    description:
      "Give the truck time to get on the road and start producing before full payments begin.",
    iconId: "deferred" as const,
    linkText: "See Deferred Options",
    linkHref: "/deferred-payment-tow-truck-financing",
  },
  {
    id: "fleet",
    title: "Fleet Program",
    description:
      "Built for operators adding another truck and trying to keep the next purchase clean and fast.",
    iconId: "fleet" as const,
    linkText: "Fleet Financing",
    linkHref: "/fleet-financing",
  },
];

const equipmentFaqCore: FaqItemData[] = [
  {
    id: "terms-length",
    question: "How long can you finance a tow truck?",
    answerText:
      "Financing terms typically range from 24 to 84 months depending on the truck, seller, and business profile.",
    answerContent: [
      {
        type: "text",
        value:
          "Financing terms typically range from 24 to 84 months depending on the truck, seller, and your business profile. Longer terms can help keep the monthly payment workable, especially on higher-ticket equipment.",
      },
    ],
  },
  {
    id: "credit-and-preapproval",
    question: "Does pre-approval affect my credit?",
    answerText:
      "No. Pre-approval does not require a hard credit pull, and full approval uses a soft Experian inquiry.",
    answerContent: [
      {
        type: "text",
        value:
          "No hard credit pull for pre-approval. If you move forward, full approval uses a soft Experian inquiry so your score stays untouched while we evaluate the deal.",
      },
    ],
  },
  {
    id: "zero-down",
    question: "Can I finance a tow truck with zero down?",
    answerText:
      "Some qualified operators can finance with zero down depending on the truck, structure, and business strength.",
    answerContent: [
      {
        type: "text",
        value:
          "In some deals, yes. Zero down depends on the truck, seller, and your business profile. When zero down is not the right fit, we can usually show a structure that still keeps the deal moving.",
      },
    ],
  },
  {
    id: "deferred-first-payment",
    question: "Can I delay my first truck payment?",
    answerText:
      "Qualified buyers can defer the first payment for up to 180 days.",
    answerContent: [
      {
        type: "text",
        value:
          "Qualified buyers can defer the first payment for up to 180 days. That gives you time to put the truck to work before the full payment starts hitting the account.",
      },
    ],
  },
  {
    id: "used-trucks",
    question: "Do you finance used tow trucks?",
    answerText:
      "Yes. Used tow truck financing is a major part of what TowLoans handles, including private seller and older inventory deals.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Used trucks are a major part of what we finance. That includes dealer inventory, private seller transactions, and older trucks that still make sense operationally.",
      },
    ],
  },
];

export const SHARED_FINANCING_FOOTNOTES_CONFIG: FinancingFootnotesConfig = {
  items: [
    {
      marker: "1",
      text:
        "No credit check for pre-approval. Full approval uses a soft Experian inquiry, so your score stays untouched.",
    },
    {
      marker: "2",
      text:
        "All financing is subject to credit review and approval. Terms vary by truck, seller, and business profile.",
    },
  ],
};

export function buildEquipmentPrograms(
  headline: string,
  subtitle: string
): ProgramCardsConfig {
  return {
    headline,
    subtitle,
    cards: SHARED_EQUIPMENT_PROGRAMS,
  };
}

export function buildFaqSection(
  heading: string,
  additions: FaqItemData[]
): {
  section: FaqSectionConfig;
  schema: ReturnType<typeof buildFaqSchema>;
} {
  const faqs = [...equipmentFaqCore, ...additions];

  return {
    section: {
      eyebrow: "FAQ",
      heading,
      faqs,
    },
    schema: buildFaqSchema(faqs),
  };
}
