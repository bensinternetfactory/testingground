export interface FaqContentTextPart {
  type: "text";
  value: string;
}

export interface FaqContentLinkPart {
  type: "link";
  value: string;
  href: string;
}

export type FaqContentPart = FaqContentTextPart | FaqContentLinkPart;

export interface FaqItemData {
  id: string;
  question: string;
  answerContent: FaqContentPart[];
}

export interface FaqSectionConfig {
  eyebrow?: string;
  heading: string;
  faqs: FaqItemData[];
}

function flattenFaqContent(parts: FaqContentPart[]) {
  return parts.map((part) => part.value).join("");
}

export function buildFaqSchema(faqs: FaqItemData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: flattenFaqContent(faq.answerContent),
      },
    })),
  };
}

export const HOMEPAGE_FAQ_SECTION_CONFIG: FaqSectionConfig = {
  heading: "Tow Truck Financing FAQ",
  faqs: [
    {
      id: "finance-length",
      question: "How long can you finance a tow truck?",
      answerContent: [
        {
          type: "text",
          value:
            "Financing terms range from 24 to 84 months depending on the equipment type, age, and your business profile. Longer terms mean lower monthly payments. Use our ",
        },
        {
          type: "link",
          value: "tow truck calculator",
          href: "/tow-truck-calculator",
        },
        {
          type: "text",
          value: " to see what your payment would look like at different terms.",
        },
      ],
    },
    {
      id: "credit-score",
      question: "What credit score is needed for truck financing?",
      answerContent: [
        {
          type: "text",
          value:
            "There’s no hard minimum. We look at the full picture: time in business, revenue, call volume, and how you run your operation. Most of our operators didn’t start with perfect credit.",
        },
      ],
    },
    {
      id: "truck-profitability",
      question: "Does owning a tow truck make money?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. Typical operators report covering their monthly truck payment within the first week of calls, depending on market and call volume. See the full breakdown in our ",
        },
        {
          type: "link",
          value: "tow truck ROI guide",
          href: "/resources/tow-truck-roi",
        },
        {
          type: "text",
          value: ".",
        },
      ],
    },
    {
      id: "payment-plans",
      question: "Do tow trucks have payment plans?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. Tow truck financing is essentially a payment plan. You make fixed monthly payments over 24 to 84 months until the truck is paid off. We offer multiple structures including deferred payments and $0 down options.",
        },
      ],
    },
    {
      id: "can-not-afford",
      question: "What happens if you can’t afford a tow truck?",
      answerContent: [
        {
          type: "text",
          value: "That’s exactly what financing solves. With ",
        },
        {
          type: "link",
          value: "zero down financing",
          href: "/zero-down-tow-truck-financing",
        },
        {
          type: "text",
          value: " and ",
        },
        {
          type: "link",
          value: "deferred payment programs",
          href: "/deferred-payment-tow-truck-financing",
        },
        {
          type: "text",
          value:
            ", you can start earning revenue before your first full payment is due.",
        },
      ],
    },
    {
      id: "startup-costs",
      question: "How much money do I need to start a tow truck business?",
      answerContent: [
        {
          type: "text",
          value:
            "Startup costs vary, but financing dramatically reduces the upfront capital needed. Read our complete ",
        },
        {
          type: "link",
          value: "guide to starting a towing business",
          href: "/resources/how-to-start-a-towing-business",
        },
        {
          type: "text",
          value: " for a detailed cost breakdown.",
        },
      ],
    },
  ],
};
