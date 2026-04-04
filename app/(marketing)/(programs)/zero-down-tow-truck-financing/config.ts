import type { Metadata } from "next";
import type { HeroLeadGenConfig } from "@/components/sections/heroes/hero-lead-gen/config";
import type { EquipmentClosingCtaConfig } from "@/components/sections/page/equipment-closing-cta/config";
import {
  buildFaqSchema,
  type FaqItemData,
  type FaqSectionConfig,
} from "@/components/sections/page/faq";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TocItem {
  id: string;
  label: string;
}

export interface InlineCtaBandConfig {
  eyebrow?: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
  iconSrc?: string;
  iconAlt?: string;
}

export interface SidebarCtaConfig {
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface BottomLinkItem {
  label: string;
  href: string;
}

export interface BottomLinkGroup {
  label: string;
  links: BottomLinkItem[];
}

export interface BottomLinkGroupsConfig {
  groups: BottomLinkGroup[];
}

export interface ZeroDownPageConfig {
  metadata: Metadata;
  hero: HeroLeadGenConfig;
  toc: TocItem[];
  sidebarCta: SidebarCtaConfig;
  ctaBand1: InlineCtaBandConfig;
  ctaBand2: InlineCtaBandConfig;
  faqSection: FaqSectionConfig;
  closingCta: EquipmentClosingCtaConfig;
  bottomLinks: BottomLinkGroupsConfig;
  faqSchema: Record<string, unknown>;
  serviceSchema: Record<string, unknown>;
  breadcrumbSchema: Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/*  FAQs                                                               */
/* ------------------------------------------------------------------ */

const zeroDownFaqs: FaqItemData[] = [
  {
    id: "higher-rates",
    question: "Does zero down mean higher interest rates?",
    answerText:
      "No. Your rate is based on your credit profile and business history, not your down payment amount. $0 down doesn't mean you pay a premium — the rate is the same whether you put money down or not.",
    answerContent: [
      {
        type: "text",
        value:
          "No. Your rate is based on your credit profile and business history, not your down payment amount. $0 down doesn't mean you pay a premium — the rate is the same whether you put money down or not.",
      },
    ],
  },
  {
    id: "put-money-down",
    question: "Can I still put money down if I want to?",
    answerText:
      "Yes. Some operators prefer a lower monthly payment and choose to put 10-20% down. The option is yours. We don't require it.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Some operators prefer a lower monthly payment and choose to put 10-20% down. The option is yours. We don't require it.",
      },
    ],
  },
  {
    id: "credit-score",
    question: "What credit score do I actually need?",
    answerText:
      "640 is the baseline for both qualification paths. If you're close but not quite there, apply anyway — we look at the full picture, not just the number.",
    answerContent: [
      {
        type: "text",
        value:
          "640 is the baseline for both qualification paths. If you're close but not quite there, apply anyway — we look at the full picture, not just the number.",
      },
    ],
  },
  {
    id: "approval-speed",
    question: "How fast is the approval process?",
    answerText:
      "Pre-approval takes less than 30 seconds and does not impact your credit score. Full approval and funding typically takes 2 hours after you submit your application depending on the time of day.",
    answerContent: [
      {
        type: "text",
        value:
          "Pre-approval takes less than 30 seconds and does not impact your credit score. Full approval and funding typically takes 2 hours after you submit your application depending on the time of day.",
      },
    ],
  },
  {
    id: "private-sellers",
    question: "Do you finance trucks from private sellers?",
    answerText:
      "Yes. Dealer, private party, auction — the source doesn't matter. Same terms, same zero-down availability regardless of where the truck comes from.",
    answerContent: [
      {
        type: "text",
        value: "Yes. Dealer, private party, auction — the source doesn't matter. Same terms, same zero-down availability regardless of where the truck comes from. See ",
      },
      {
        type: "link",
        value: "private-party tow truck financing",
        href: "/private-party-tow-truck-financing",
      },
      {
        type: "text",
        value: " for how private deals work.",
      },
    ],
  },
  {
    id: "comparable-debt",
    question: "What's \u201Ccomparable debt\u201D exactly?",
    answerText:
      "It means you've made at least 12 on-time payments on an auto loan or installment loan worth at least half of what you're looking to borrow. If you're borrowing $80,000, we want to see 12 payments on a $40,000+ loan. It's proof you can manage the payment.",
    answerContent: [
      {
        type: "text",
        value:
          "It means you've made at least 12 on-time payments on an auto loan or installment loan worth at least half of what you're looking to borrow. If you're borrowing $80,000, we want to see 12 payments on a $40,000+ loan. It's proof you can manage the payment.",
      },
    ],
  },
  {
    id: "max-loan-amount",
    question: "Is there a maximum loan amount with zero down?",
    answerText:
      "We finance tow trucks from $25,000 to $3,000,000+. Zero down is available across the full range for qualified operators.",
    answerContent: [
      {
        type: "text",
        value:
          "We finance tow trucks from $25,000 to $3,000,000+. Zero down is available across the full range for qualified operators.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

export const zeroDownPageConfig: ZeroDownPageConfig = {
  metadata: {
    title: "Zero Down Tow Truck Financing \u2014 Any Truck, Any Age | TowLoans",
    description:
      "Zero down tow truck financing on any truck age, any mileage, any seller. Keep your cash in the business and let the truck earn. Pre-approved in 30 seconds.",
    openGraph: {
      title:
        "Zero Down Tow Truck Financing \u2014 Any Truck, Any Age | TowLoans",
      description:
        "Zero down tow truck financing on any truck age, any mileage, any seller. Keep your cash in the business and let the truck earn. Pre-approved in 30 seconds.",
      type: "website",
    },
  },

  hero: {
    headline: "Keep Your Cash. Add a Truck. Let It Earn.",
    subheadline:
      "$0 down on nearly every approval. Any truck age. Any mileage. Any seller. Your working capital stays in the business while the truck starts earning on day one.",
    cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
    phone: { display: "(888)\u00a0555-0199", href: "tel:+18885550199" },
    trustBadges: [
      { label: "30-Second Pre-Approval" },
      { label: "No Credit Impact" },
      { label: "Any Truck. Any Age." },
    ],
    heroImage: "/truck-6.jpg",
    heroImageAlt: "Tow truck financed with zero down",
  },

  toc: [
    { id: "business-case", label: "The business case" },
    { id: "how-to-qualify", label: "How to qualify" },
    { id: "any-truck", label: "Any truck, any age" },
    { id: "the-math", label: "The math" },
    { id: "calculator", label: "Run the numbers" },
    { id: "faq", label: "FAQ" },
  ],

  sidebarCta: {
    headline: "Ready to move?",
    subhead: "Pre-approval in 30 seconds. No credit impact.",
    ctaLabel: "Get Pre-Approved",
    ctaHref: DRAWER_HASH,
  },

  ctaBand1: {
    eyebrow: "STOP SAVING. START EARNING.",
    message: "Know your $0-down payment in 30 seconds.",
    ctaLabel: "Get Pre-Approved",
    ctaHref: DRAWER_HASH,
  },

  ctaBand2: {
    eyebrow: "KNOW YOUR PAYMENT. ZERO DOWN.",
    message: "See your payment before you commit to a truck.",
    ctaLabel: "Get Pre-Approved",
    ctaHref: DRAWER_HASH,
    iconSrc: "/brand-assets/benefit-icons/fast/fast-funding-light.svg",
    iconAlt: "",
  },

  faqSection: {
    heading: "Zero Down Financing FAQ",
    faqs: zeroDownFaqs,
  },

  closingCta: {
    eyebrow: "STOP SAVING. START EARNING.",
    headline: "Every month you wait, the truck doesn't earn.",
    body: "Pre-approval takes 30 seconds and does not impact your credit. You'll know your payment before you commit to a truck.",
    cta: {
      href: DRAWER_HASH,
      label: "Get Pre-Approved",
    },
    contactBlock: {
      prompt: "Prefer to talk?",
      phoneLabel: "(888) 555-0199",
      phoneHref: "tel:+18885550199",
      supportText: "Mon-Fri 8am-6pm CT",
    },
  },

  bottomLinks: {
    groups: [
      {
        label: "Learn more about what we finance",
        links: [
          { label: "Rollback financing", href: "/rollback-financing" },
          { label: "Wrecker financing", href: "/wrecker-financing" },
          { label: "Rotator financing", href: "/rotator-financing" },
        ],
      },
      {
        label: "Looking for something specific?",
        links: [
          {
            label: "I need to finance a used tow truck",
            href: "/used-tow-truck-financing",
          },
          {
            label: "I need deferred payments",
            href: "/deferred-payment-tow-truck-financing",
          },
          {
            label: "I'm adding to my fleet",
            href: "/fleet-financing",
          },
          {
            label: "I found the truck from another operator",
            href: "/private-party-tow-truck-financing",
          },
        ],
      },
      {
        label: "Tools",
        links: [
          {
            label: "Tow truck ROI calculator",
            href: "/tow-truck-calculator",
          },
        ],
      },
    ],
  },

  faqSchema: buildFaqSchema(zeroDownFaqs),

  serviceSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Zero Down Tow Truck Financing",
    description:
      "Zero down tow truck financing on any truck age, mileage, and seller. $0 down available on nearly every approval.",
    provider: {
      "@type": "Organization",
      name: "TowLoans",
      url: "https://towloans.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Equipment Financing",
  },

  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://towloans.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Zero Down Tow Truck Financing",
        item: "https://towloans.com/zero-down-tow-truck-financing",
      },
    ],
  },
};
