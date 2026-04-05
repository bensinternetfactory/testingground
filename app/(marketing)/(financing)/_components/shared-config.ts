import {
  buildFaqSchema,
  type FaqItemData,
  type FaqSectionConfig,
} from "@/components/sections/page/faq";
import type { FinancingFootnotesConfig } from "@/components/sections/page/financing-footnotes";

export const equipmentFaqCore: FaqItemData[] = [
  {
    id: "terms-length",
    question: "How long can you finance a tow truck?",
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
}

export function buildFaqSection(
  heading: string,
  additions: FaqItemData[],
  corePosition: "before" | "after" = "before"
): {
  section: FaqSectionConfig;
  schema: ReturnType<typeof buildFaqSchema>;
} {
  const faqs =
    corePosition === "after"
      ? [...additions, ...equipmentFaqCore]
      : [...equipmentFaqCore, ...additions];

  return {
    section: {
      eyebrow: "FAQ",
      heading,
      faqs,
    },
    schema: buildFaqSchema(faqs),
  };
}
