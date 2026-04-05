import truck1 from "@/public/truck-1.jpg";
import truck4 from "@/public/truck-4.jpg";
import truck6 from "@/public/truck-6.jpg";
import truck11 from "@/public/truck-11.jpg";
import truck15 from "@/public/truck-15.jpg";
import type { EquipmentFinancingPageConfig } from "../_components/page-config-types";
import {
  SHARED_FINANCING_FOOTNOTES_CONFIG,
  buildFaqSection,
} from "../_components/shared-config";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";
import {
  ROLLBACK_FINANCING_OFFERS_SPLIT_CONFIG,
} from "@/components/sections/page/financing-offers-split/config";
import type {
  TertiaryStripConfig,
} from "@/components/sections/page/tertiary-strip/config";

/* ── Page Config ─────────────────────────────────────────────────── */

const rollbackFaqContent = buildRollbackFaqContent();

export const rollbackFinancingPageConfig: EquipmentFinancingPageConfig = {
  /* ── Page identity & metadata ──────────────────────────── */
  slug: "rollback-financing",

  /* ── Visual sections — top to bottom ───────────────────── */
  hero: {
    kind: "primary-only",
    config: {
      headline: "Need Rollback Financing?",
      bodyCopy:
        "We will pre-approve you for your next rollback in less than 30 seconds. Know your payment before you apply.",
      selectionPrompt: "What do you need financing on?",
      selectionRequiredMessage:
        "Select a rollback type to enable the pre-approval action.",
      cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
      footnoteMarkers: {
        "30 seconds": "¹",
        "before you apply": "²",
      },
      heroImage: truck6,
      heroImageAlt: "Rollback tow truck ready for financing",
      galleryImages: [
        { src: truck6, alt: "Black rollback tow truck at a three-quarter angle" },
        { src: truck1, alt: "Blue rollback tow truck parked at curbside" },
        { src: truck4, alt: "Black rollback truck staged beside service building" },
        { src: truck11, alt: "Blue rollback truck with loading deck raised" },
        { src: truck15, alt: "Orange rollback tow truck at dusk" },
      ],
      tiles: [
        {
          id: "light-duty",
          label: "Light-Duty Rollback",
          iconSrc: "/brand-assets/truck-icons/rollback/rollback-light-green.svg",
          iconWidth: 150,
          iconHeight: 43,
        },
        {
          id: "medium-heavy",
          label: "Medium / Heavy-Duty Rollback",
          iconSrc: "/brand-assets/truck-icons/rollback/rollback-green.svg",
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
        drawerTitle: "How much is the rollback you found?",
      },
      {
        eyebrow: "Haven't found a truck?",
        label: "What's my buying power?",
        href: "/pre-approval",
      },
    ],
  } satisfies TertiaryStripConfig,
  financingOffers: ROLLBACK_FINANCING_OFFERS_SPLIT_CONFIG,
  purchaseAndTerms: {
    purchaseStack: {
      headline: "Buy from anyone. We\u2019ll finance it.",
      body: "Dealership, private seller, auction house, or another towing operator. We finance the truck, not the source.",
      iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
      iconAlt: "Hook icon",
    },
    termSlider: {
      headline: "Older truck? Still financeable.",
      subheading: "See your max term by model year",
      body: "Slide to any model year and see the longest term available. Newer rollbacks stretch further, but we finance trucks back to 2000.",
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
    eyebrow: "ROLLBACK FINANCING",
    headline: "Rollback financing built around the way operators actually buy.",
    body: "Whether you are picking up a new light-duty rollback from a dealer or a medium/heavy off a lot two states away, the financing should not be the part that slows you down. We structure rollback deals around the truck and the business so you get a payment and a timeline you can plan around before you sign anything.",
    imageSrc: truck1,
    imageAlt: "Rollback tow truck ready for financing",
    background: "white",
  },
  purchaseTermsTertiaryStrip: {
    actions: [
      {
        eyebrow: "Buying from a private seller?",
        label: "Private-party rollback financing",
        href: "/private-party-tow-truck-financing",
      },
      {
        eyebrow: "Looking at an older rollback?",
        label: "See if your truck year qualifies",
        href: DRAWER_HASH,
        drawerTitle: "How much is the rollback you're looking at?",
      },
    ],
  },
  faqSection: rollbackFaqContent.section,
  footnotes: SHARED_FINANCING_FOOTNOTES_CONFIG,
  closingCta: {
    iconSrc: "/brand-assets/benefit-icons/fast/fast-funding-watch-light.svg",
    iconAlt: "Fast funding icon",
    eyebrow: "READY WHEN YOU ARE",
    headline: "Get your rollback payment in 30 seconds.",
    body:
      "You do not need corporate runaround. You need to know whether the rollback works and what the payment looks like.",
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
      { label: "Need a wrecker instead?", href: "/wrecker-financing" },
      { label: "Looking at rotators?", href: "/rotator-financing" },
      { label: "Tow truck financing", href: "/" },
    ],
  },

  /* ── Structured data (invisible JsonLd) ────────────────── */
  faqSchema: rollbackFaqContent.schema,
  financialProductSchema: {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Rollback Tow Truck Financing",
    description:
      "Equipment financing for rollback and flatbed tow trucks with used, private seller, auction, and fleet options.",
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
        name: "Rollback Financing",
        item: "https://towloans.com/rollback-financing",
      },
    ],
  },
};

function buildRollbackFaqContent() {
  return buildFaqSection(
    "Rollback financing questions, straight answers.",
    [
      {
        id: "private-party-auction",
        question: "Can I finance a rollback from a private seller or auction?",
        answerContent: [
          {
            type: "text",
            value:
              "Yes. Private-party and auction rollback deals are common for us. Get the truck details and seller information in front of us early and you will get a straight answer fast.",
          },
        ],
      },
      {
        id: "rollback-vs-flatbed",
        question: "What is the difference between a rollback and a flatbed?",
        answerContent: [
          {
            type: "text",
            value:
              "Same truck, different name. Rollback and flatbed both refer to a tow truck with a tilting carrier bed that loads vehicles by rolling the deck back.",
          },
        ],
      },
    ],
  );
}
