import truck12 from "@/public/truck-12.jpg";
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import { preApprovalEntryHash } from "@/features/pre-approval/drawer/server";
import {
  DRAWER_HASH,
} from "@/components/ui/pre-approval-drawer";
import {
  SHARED_FINANCING_FOOTNOTES_CONFIG,
  buildFaqSection,
} from "../_components/shared-config";
import type { EquipmentFinancingPageConfig } from "../_components/page-config-types";
import type { FinancingOffersSplitConfig } from "@/components/sections/page/financing-offers-split/config";
import type { TertiaryStripConfig } from "@/components/sections/page/tertiary-strip/config";

/* ── Rotator-specific financing offers ──────────────────────────── */

const ROTATOR_FINANCING_OFFERS_SPLIT_CONFIG: FinancingOffersSplitConfig = {
  left: {
    headline: "Zero Down Rotator Financing",
    body:
      "Keep your cash in the business. Qualified operators can finance a rotator with nothing down when the deal, truck, and operating profile support it.",
    iconSrc: "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
    iconAlt: "Zero down payment icon",
    iconWidth: 64,
    iconHeight: 64,
  },
  right: {
    headline: "No Payments for Up to 180 Days",
    body:
      "Get the rotator road-ready and start taking recovery calls before full payments begin. Deferred first-payment options give you runway on large-ticket equipment.",
    iconSrc: "/brand-assets/benefit-icons/deferment/deferment-180-dark.svg",
    iconAlt: "180-day payment deferment icon",
    iconWidth: 64,
    iconHeight: 64,
    countdown: {
      anchorDate: "2026-03-22",
      initialWindowDays: 30,
      autoReset: true,
    },
    learnMoreLink: {
      text: "How deferred payments work",
      href: "/deferred-payment-tow-truck-financing",
    },
  },
};

/* ── Page Config ─────────────────────────────────────────────────── */

const rotatorFaqContent = buildRotatorFaqContent();

function createRotatorTrigger(
  sectionId: string,
  ctaId: string,
  placement: PreApprovalTrigger["origin"]["placement"],
  title?: string,
): PreApprovalTrigger {
  return {
    origin: {
      pageId: "rotator-financing",
      sectionId,
      ctaId,
      placement,
    },
    drawer: title ? { title } : undefined,
  };
}

export const rotatorFinancingPageConfig: EquipmentFinancingPageConfig = {
  /* ── Page identity & metadata ──────────────────────────── */
  slug: "rotator-financing",

  /* ── Visual sections — top to bottom ───────────────────── */
  hero: {
    kind: "lead-gen",
    config: {
      headline: "Rotator Financing for Heavy Recovery.",
      subheadline:
        "Rotators are the largest equipment purchase most operators make. See your payment structure before you commit to the unit.",
      cta: {
        label: "Get Pre-Approved",
        href: DRAWER_HASH,
        preApprovalTrigger: {
          origin: {
            pageId: "rotator-financing",
            sectionId: "hero-primary",
            ctaId: "hero-main-cta",
            placement: "hero",
          },
          handoff: {
            truckType: "rotator",
          },
        },
      },
      phone: { display: "(888)\u00a0555-0199", href: "tel:+18885550199" },
      trustBadges: [
        { label: "30-Second Pre-Approval" },
        { label: "No Credit Impact" },
        { label: "$0 Down Available" },
      ],
      heroImage: "/truck-12.jpg",
      heroImageAlt: "Heavy-recovery rotator truck ready for financing",
    },
  },
  tertiaryStrip: {
    actions: [
      {
        eyebrow: "Already have a rotator in mind?",
        label: "I found a truck and need financing",
        href: preApprovalEntryHash,
        preApprovalTrigger: createRotatorTrigger(
          "tertiary-strip-primary",
          "found-truck-cta",
          "section",
          "How much is the rotator you found?",
        ),
      },
      {
        eyebrow: "Need to size the deal first?",
        label: "What\u2019s my buying power?",
        href: "/pre-approval",
      },
    ],
  } satisfies TertiaryStripConfig,
  financingOffers: ROTATOR_FINANCING_OFFERS_SPLIT_CONFIG,
  purchaseAndTerms: {
    purchaseStack: {
      headline: "Buy from anyone. We\u2019ll finance it.",
      body: "Dealership, private seller, auction, or another recovery operator. We finance the rotator, not the source.",
      iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
      iconAlt: "Hook icon",
    },
    termSlider: {
      headline: "Older truck? Still financeable.",
      subheading: "See your max term by model year",
      body: "Slide to any model year and see the longest term available. Newer rotators stretch further, but we finance heavy-recovery equipment back to 2000.",
      iconSrc: "/brand-assets/benefit-icons/miles/odometer-dark.svg",
      iconAlt: "Odometer icon",
      defaultYear: 2021,
      lookupTable: [
        { minYear: 2000, maxYear: 2009, maxTermMonths: 36 },
        { minYear: 2010, maxYear: 2014, maxTermMonths: 48 },
        { minYear: 2015, maxYear: 2018, maxTermMonths: 60 },
        { minYear: 2019, maxYear: 2022, maxTermMonths: 72 },
        { minYear: 2023, maxYear: 2099, maxTermMonths: 84 },
      ],
    },
  },
  contentImageSplit: {
    eyebrow: "ROTATOR FINANCING",
    headline: "Rotator financing built around how recovery operators actually buy.",
    body: "Whether you are replacing an aging heavy-recovery unit or adding your first rotator to take on bigger contracts, the financing should not be the part that holds up the deal. We structure rotator purchases around the truck and the operation so you get a payment and a timeline you can plan around before you sign anything.",
    imageSrc: truck12,
    imageAlt: "Heavy-recovery rotator truck",
    background: "white",
  },
  purchaseTermsTertiaryStrip: {
    actions: [
      {
        eyebrow: "Buying from another operator?",
        label: "Operator-to-operator rotator financing",
        href: preApprovalEntryHash,
        preApprovalTrigger: createRotatorTrigger(
          "purchase-terms-tertiary-strip",
          "operator-to-operator-cta",
          "section",
          "How much is the rotator you\u2019re looking at?",
        ),
      },
      {
        eyebrow: "Looking at an older rotator?",
        label: "See if your truck year qualifies",
        href: preApprovalEntryHash,
        preApprovalTrigger: createRotatorTrigger(
          "purchase-terms-tertiary-strip",
          "truck-year-qualifier-cta",
          "section",
          "How much is the rotator you\u2019re looking at?",
        ),
      },
    ],
  } satisfies TertiaryStripConfig,
  faqSection: rotatorFaqContent.section,
  footnotes: SHARED_FINANCING_FOOTNOTES_CONFIG,
  closingCta: {
    iconSrc: "/brand-assets/benefit-icons/fast/fast-funding-watch-light.svg",
    iconAlt: "Fast funding icon",
    eyebrow: "READY WHEN YOU ARE",
    headline: "See your rotator payment in 30 seconds.",
    body:
      "Heavy-recovery equipment is too expensive to guess on. Start with the structure and see whether the unit fits the business.",
    cta: {
      href: preApprovalEntryHash,
      label: "Get Pre-Approved",
      preApprovalTrigger: createRotatorTrigger(
        "closing-cta-primary",
        "closing-cta-primary",
        "footer",
      ),
    },
    contactBlock: {
      prompt: "Prefer to talk?",
      phoneLabel: "(888) 555-0199",
      phoneHref: "tel:+18885550199",
      supportText: "Mon-Fri 8am-6pm CT",
    },
  },
  relatedLinks: {
    links: [
      { label: "Looking at a rollback instead?", href: "/rollback-financing" },
      { label: "Need a wrecker program?", href: "/wrecker-financing" },
      { label: "Tow truck financing", href: "/" },
    ],
  },

  /* ── Structured data (invisible JsonLd) ────────────────── */
  faqSchema: rotatorFaqContent.schema,
  financialProductSchema: {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Rotator Financing",
    description:
      "Equipment financing for heavy-recovery rotators, including used, operator-to-operator, replacement, and fleet expansion deals.",
    provider: {
      "@type": "Organization",
      name: "TowLoans",
      url: "https://towloans.com",
    },
    feesAndCommissionsSpecification:
      "Subject to credit review and approval. Terms vary by truck, seller, and business profile.",
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
        name: "Rotator Financing",
        item: "https://towloans.com/rotator-financing",
      },
    ],
  },
};

function buildRotatorFaqContent() {
  return buildFaqSection("Rotator financing questions, straight answers.", [
    {
      id: "used-rotators",
      question: "Do you finance used rotators?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. Used rotators hold their value well, which makes structured financing a natural fit. We look at the truck, the purchase structure, and your heavy-recovery operation together.",
        },
      ],
    },
    {
      id: "operator-to-operator",
      question: "Can I buy a rotator from another operator?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. Operator-to-operator rotator deals are common for us. Get the truck details and seller information in front of us early and you will get a straight answer fast.",
        },
      ],
    },
    {
      id: "replacement-or-expansion",
      question: "Is rotator financing available for replacement or fleet expansion?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. Some operators are replacing an aging heavy-recovery unit. Others are adding capacity for bigger recovery work. Both are common fit scenarios for rotator financing.",
        },
      ],
    },
  ]);
}
