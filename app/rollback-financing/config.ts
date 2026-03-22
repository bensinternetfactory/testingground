import truck1 from "@/public/truck-1.jpg";
import truck4 from "@/public/truck-4.jpg";
import truck6 from "@/public/truck-6.jpg";
import truck11 from "@/public/truck-11.jpg";
import truck15 from "@/public/truck-15.jpg";
import type { EquipmentFinancingPageConfig } from "@/app/_shared/equipment-financing/page-config-types";
import {
  SHARED_FINANCING_FOOTNOTES_CONFIG,
  buildFaqSection,
} from "@/app/_shared/equipment-financing/shared-config";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";
import {
  ROLLBACK_FINANCING_OFFERS_SPLIT_CONFIG,
} from "@/components/sections/page/financing-offers-split/config";
import {
  ROLLBACK_PURCHASE_AND_TERMS_CONFIG,
} from "@/components/sections/page/purchase-and-terms/config";
import type {
  TertiaryStripConfig,
} from "@/components/sections/page/tertiary-strip/config";

const rollbackFaq = buildFaqSection("Rollback financing questions, straight answers.", [
  {
    id: "private-party-auction",
    question: "Can I finance a rollback from a private seller or auction?",
    answerText:
      "Yes. TowLoans finances private-party and auction rollback deals when the truck details and transaction structure fit.",
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
    answerText:
      "Rollback and flatbed are interchangeable terms for a tow truck with a tilting carrier bed.",
    answerContent: [
      {
        type: "text",
        value:
          "Same truck, different name. Rollback and flatbed both refer to a tow truck with a tilting carrier bed that loads vehicles by rolling the deck back.",
      },
    ],
  },
]);

export const rollbackFinancingPageConfig: EquipmentFinancingPageConfig = {
  slug: "rollback-financing",
  metadata: {
    title: "Rollback Financing — Pre-Approved in 30 Seconds | TowLoans",
    description:
      "Finance rollback tow trucks with zero down options, up to 84 months on new, longer terms on used trucks, and deferred payments up to 180 days.",
    openGraph: {
      title: "Rollback Financing — Pre-Approved in 30 Seconds | TowLoans",
      description:
        "Used, private seller, auction, and fleet rollback deals with fast pre-approval and commercial tow truck financing options.",
      type: "website",
    },
  },
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
  purchaseAndTerms: ROLLBACK_PURCHASE_AND_TERMS_CONFIG,
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
  faqSection: rollbackFaq.section,
  faqSchema: rollbackFaq.schema,
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
  footnotes: SHARED_FINANCING_FOOTNOTES_CONFIG,
  closingCta: {
    eyebrow: "READY WHEN YOU ARE",
    headline: "Ready to lock in your rollback?",
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
};
