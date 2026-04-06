import truck3 from "@/public/truck-3.jpg";
import truck8 from "@/public/truck-8.jpg";
import truck9 from "@/public/truck-9.jpg";
import truck12 from "@/public/truck-12.jpg";
import truck14 from "@/public/truck-14.jpg";
import {
  DRAWER_HASH,
} from "@/components/ui/pre-approval-drawer";
import { wreckerHeroPreApprovalSelectionTrigger } from "@/features/pre-approval/selection";
import {
  SHARED_FINANCING_FOOTNOTES_CONFIG,
  buildFaqSection,
} from "../_components/shared-config";
import type { EquipmentFinancingPageConfig } from "../_components/page-config-types";
import type { FinancingOffersSplitConfig } from "@/components/sections/page/financing-offers-split/config";
import type { TertiaryStripConfig } from "@/components/sections/page/tertiary-strip/config";

/* ── Wrecker-specific financing offers ──────────────────────────── */

const WRECKER_FINANCING_OFFERS_SPLIT_CONFIG: FinancingOffersSplitConfig = {
  left: {
    headline: "Zero Down Wrecker Financing",
    body:
      "Keep your cash in the business. Qualified operators can finance a wrecker with nothing down when the deal, truck, and operating profile support it.",
    iconSrc: "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
    iconAlt: "Zero down payment icon",
    iconWidth: 64,
    iconHeight: 64,
  },
  right: {
    headline: "No Payments for Up to 180 Days",
    body:
      "Get the wrecker on the road and start running calls before full payments begin. Deferred first-payment options give you time to put the truck to work.",
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

const wreckerFaqContent = buildWreckerFaqContent();

export const wreckerFinancingPageConfig: EquipmentFinancingPageConfig = {
  /* ── Page identity & metadata ──────────────────────────── */
  slug: "wrecker-financing",

  /* ── Visual sections — top to bottom ───────────────────── */
  hero: {
    kind: "primary-only",
    config: {
      headline: "Need Wrecker Financing?",
      bodyCopy:
        "We will pre-approve you for your next wrecker in less than 30 seconds. Know your payment before the deal gets bogged down.",
      selectionPrompt: "What do you need financing on?",
      selectionRequiredMessage:
        "Select a wrecker type to enable the pre-approval action.",
      cta: {
        label: "Get Pre-Approved",
        href: DRAWER_HASH,
        preApprovalSelectionTrigger: wreckerHeroPreApprovalSelectionTrigger,
      },
      footnoteMarkers: {
        "30 seconds": "¹",
        "before the deal": "²",
      },
      heroImage: truck3,
      heroImageAlt: "Wrecker truck ready for financing",
      galleryImages: [
        { src: truck3, alt: "Red wrecker tow truck" },
        { src: truck9, alt: "Blue and green wrecker tow truck" },
        { src: truck14, alt: "White wrecker tow truck at sunset" },
        { src: truck8, alt: "Dual-axle red-and-black wrecker in lot" },
        { src: truck12, alt: "Heavy recovery truck parked near industrial bays" },
      ],
      tiles: [
        {
          id: "light-duty",
          label: "Light-Duty Wrecker",
          iconSrc: "/brand-assets/truck-icons/wrecker/wrecker-green.svg",
          iconWidth: 150,
          iconHeight: 43,
        },
        {
          id: "heavy-wrecker",
          label: "Heavy Wrecker",
          iconSrc: "/brand-assets/truck-icons/heavywrecker/heavywrecker-green.svg",
          iconWidth: 150,
          iconHeight: 43,
        },
      ],
    },
  },
  tertiaryStrip: {
    actions: [
      {
        eyebrow: "Already have a truck in mind?",
        label: "I found a truck and need financing",
        href: DRAWER_HASH,
        drawer: { title: "How much is the wrecker you found?" },
      },
      {
        eyebrow: "Haven\u2019t found a truck?",
        label: "What\u2019s my buying power?",
        href: "/pre-approval",
      },
    ],
  } satisfies TertiaryStripConfig,
  financingOffers: WRECKER_FINANCING_OFFERS_SPLIT_CONFIG,
  purchaseAndTerms: {
    purchaseStack: {
      headline: "Buy from anyone. We\u2019ll finance it.",
      body: "Dealership, private seller, auction, or another towing operator. We finance the wrecker, not the source.",
      iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
      iconAlt: "Hook icon",
    },
    termSlider: {
      headline: "Older truck? Still financeable.",
      subheading: "See your max term by model year",
      body: "Slide to any model year and see the longest term available. Newer wreckers stretch further, but we finance trucks back to 2000.",
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
    eyebrow: "WRECKER FINANCING",
    headline: "Wrecker financing built around how operators actually buy.",
    body: "Whether you are picking up a light-duty service truck from a dealer or an integrated heavy wrecker from another operator two states away, the financing should not be the part that slows you down. We structure wrecker deals around the truck and the business so you get a payment and a timeline you can plan around before you sign anything.",
    imageSrc: truck3,
    imageAlt: "Wrecker tow truck ready for financing",
    background: "white",
  },
  purchaseTermsTertiaryStrip: {
    actions: [
      {
        eyebrow: "Buying from a private seller?",
        label: "Private-party wrecker financing",
        href: "/private-party-tow-truck-financing",
      },
      {
        eyebrow: "Looking at an older wrecker?",
        label: "See if your truck year qualifies",
        href: DRAWER_HASH,
        drawer: { title: "How much is the wrecker you\u2019re looking at?" },
      },
    ],
  } satisfies TertiaryStripConfig,
  faqSection: wreckerFaqContent.section,
  footnotes: SHARED_FINANCING_FOOTNOTES_CONFIG,
  closingCta: {
    iconSrc: "/brand-assets/benefit-icons/fast/fast-funding-watch-light.svg",
    iconAlt: "Fast funding icon",
    eyebrow: "READY WHEN YOU ARE",
    headline: "Get your wrecker payment in 30 seconds.",
    body:
      "You do not need corporate runaround. You need to know whether the wrecker works and what the payment looks like.",
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
  relatedLinks: {
    links: [
      { label: "Looking at a rollback instead?", href: "/rollback-financing" },
      { label: "Need a rotator program?", href: "/rotator-financing" },
      { label: "Tow truck financing", href: "/" },
    ],
  },

  /* ── Structured data (invisible JsonLd) ────────────────── */
  faqSchema: wreckerFaqContent.schema,
  financialProductSchema: {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Wrecker Financing",
    description:
      "Equipment financing for wrecker tow trucks, including light-duty, heavy wrecker, used, private seller, and fleet expansion deals.",
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
        name: "Wrecker Financing",
        item: "https://towloans.com/wrecker-financing",
      },
    ],
  },
};

function buildWreckerFaqContent() {
  return buildFaqSection("Wrecker financing questions, straight answers.", [
    {
      id: "heavy-wreckers",
      question: "Do you finance heavy wreckers?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. Integrated heavy wreckers are part of the market we finance. If the truck, purchase structure, and your recovery operation make sense together, we can usually show you a workable path.",
        },
      ],
    },
    {
      id: "used-wreckers",
      question: "Do you finance used wrecker trucks?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. Used wrecker deals are common, especially for operators adding another service truck without paying new-truck money. We finance used wreckers from dealers, auctions, and private sellers.",
        },
      ],
    },
    {
      id: "private-party-wrecker",
      question: "Can I finance a wrecker from a private seller?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. Private-party wrecker deals are common for us. Get the truck details and seller information in front of us early and you will get a straight answer fast.",
        },
      ],
    },
  ]);
}
