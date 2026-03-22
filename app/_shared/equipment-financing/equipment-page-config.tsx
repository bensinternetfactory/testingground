import type { Metadata } from "next";
import truck1 from "@/public/truck-1.jpg";
import truck3 from "@/public/truck-3.jpg";
import truck4 from "@/public/truck-4.jpg";
import truck6 from "@/public/truck-6.jpg";
import truck8 from "@/public/truck-8.jpg";
import truck9 from "@/public/truck-9.jpg";
import truck11 from "@/public/truck-11.jpg";
import truck12 from "@/public/truck-12.jpg";
import truck14 from "@/public/truck-14.jpg";
import truck15 from "@/public/truck-15.jpg";
import type { HeroConvertFramedConfig } from "@/components/sections/heroes/hero-convert-framed";
import {
  buildFaqSchema,
  type FaqItemData,
  type FaqSectionConfig,
} from "@/components/sections/page/faq";
import type { ProgramCardsConfig } from "@/components/sections/page/program-cards/config";
import type { TrustBridgeConfig } from "@/components/sections/page/trust-bridge/config";
import type { EquipmentDealsSectionConfig } from "@/components/sections/page/equipment-deals";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";

interface RelatedLink {
  label: string;
  href: string;
}

interface ClosingCtaConfig {
  headline: string;
  body: string;
}

/* ── Tertiary Strip ─────────────────────────────────────────────── */
export interface TertiaryStripAction {
  eyebrow: string;
  label: string;
  href: string;
  drawerTitle?: string;
}
export interface TertiaryStripConfig {
  actions: TertiaryStripAction[];
}

/* ── Financing Offers Split ─────────────────────────────────────── */
export interface FinancingOfferHalf {
  headline: string;
  body: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
}
export interface FinancingOffersSplitConfig {
  left: FinancingOfferHalf;
  right: FinancingOfferHalf;
}

/* ── Purchase Source Stack ──────────────────────────────────────── */
export interface PurchaseSourceCard {
  id: string;
  sourceName: string;
  sourceSubtitle: string;
  iconSrc: string;
  iconAlt: string;
  badgeLabel: string;
  sampleListing: string;
  samplePrice: string;
}
export interface PurchaseSourceStackConfig {
  headline: string;
  body: string;
  iconSrc: string;
  iconAlt: string;
  cards: PurchaseSourceCard[];
  rotationIntervalMs: number;
}

/* ── Term Slider ────────────────────────────────────────────────── */
export interface TermLookupEntry {
  minYear: number;
  maxYear: number;
  maxTermMonths: number;
}
export interface TermSliderConfig {
  headline: string;
  subheading: string;
  body: string;
  iconSrc: string;
  iconAlt: string;
  defaultYear: number;
  lookupTable: TermLookupEntry[];
}

/* ── Purchase & Terms (parent wrapper) ──────────────────────────── */
export interface PurchaseAndTermsConfig {
  purchaseStack: PurchaseSourceStackConfig;
  termSlider: TermSliderConfig;
}

/* ── Page Config ────────────────────────────────────────────────── */
export interface EquipmentFinancingPageConfig {
  slug: "rollback-financing" | "wrecker-financing" | "rotator-financing";
  metadata: Metadata;
  hero: HeroConvertFramedConfig;
  programs?: ProgramCardsConfig;
  trustBridge?: TrustBridgeConfig;
  dealsSection?: EquipmentDealsSectionConfig;
  tertiaryStrip?: TertiaryStripConfig;
  financingOffers?: FinancingOffersSplitConfig;
  purchaseAndTerms?: PurchaseAndTermsConfig;
  faqSection: FaqSectionConfig;
  faqSchema: ReturnType<typeof buildFaqSchema>;
  financialProductSchema: Record<string, unknown>;
  breadcrumbSchema: Record<string, unknown>;
  closingCta: ClosingCtaConfig;
  relatedLinks: RelatedLink[];
}

const SHARED_TRUST_BRIDGE_CONFIG: TrustBridgeConfig = {
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

function buildEquipmentPrograms(headline: string, subtitle: string): ProgramCardsConfig {
  return {
    headline,
    subtitle,
    cards: SHARED_EQUIPMENT_PROGRAMS,
  };
}

function buildFaqSection(
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

const wreckerFaq = buildFaqSection("Wrecker financing questions, straight answers.", [
  {
    id: "self-loader-repo",
    question: "Do you finance self-loader or repo wreckers?",
    answerText:
      "Yes. Self-loader and repo-style wrecker deals are financeable when the truck, seller, and business profile fit the program.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Self-loader and repo units are part of the market we understand. If the truck specs, purchase structure, and operating history make sense, we can usually show you a workable path.",
      },
    ],
  },
  {
    id: "used-wreckers",
    question: "Do you finance used wrecker trucks?",
    answerText:
      "Yes. Used wrecker financing is common, including service trucks bought from dealers, auctions, and private sellers.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Used wrecker deals are common, especially for operators adding another service truck without paying new-truck money.",
      },
    ],
  },
]);

const rotatorFaq = buildFaqSection("Rotator financing questions, straight answers.", [
  {
    id: "expensive-used-rotators",
    question: "Do you finance expensive used rotators?",
    answerText:
      "Yes. High-value used rotator deals can be financed when the truck condition, structure, and business profile support it.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Used rotators are often still large-ticket transactions, which makes structured financing more important, not less. We look at the truck, the purchase structure, and your operation together.",
      },
    ],
  },
  {
    id: "replacement-or-expansion",
    question: "Is rotator financing available for replacement or fleet expansion?",
    answerText:
      "Yes. Rotator financing can work for both replacement purchases and heavy-recovery fleet expansion.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Some operators are replacing an aging heavy-recovery unit. Others are adding capacity for bigger recovery work. Both are common fit scenarios for rotator financing.",
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
    headline: "Need Rollback Financing?",
    bodyCopy:
      "We will pre-approve you for your next rollback in less than 30 seconds. Know your payment before you apply.",
    selectionPrompt: "What do you need financing on?",
    selectionRequiredMessage:
      "Select a rollback type to enable the pre-approval action.",
    cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
    tertiaryVariant: "outline",
    showTertiaryInHero: false,
    footnoteMarkers: {
      "30 seconds": "¹",
      "before you apply": "²",
    },
    tertiaryLinks: [
      {
        label: "I found a truck and need financing",
        href: DRAWER_HASH,
        drawerTitle: "How much is the rollback you found?",
      },
      {
        label: "What's my buying power?",
        href: "/pre-approval",
      },
    ],
    tertiaryActions: [
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
  },
  financingOffers: {
    left: {
      headline: "Zero Down Rollback Financing",
      body: "Keep your cash in the business. Qualified operators can finance a rollback with nothing down when the deal, truck, and operating profile support it.",
      iconSrc: "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
      iconAlt: "Zero down payment icon",
      iconWidth: 64,
      iconHeight: 64,
    },
    right: {
      headline: "No Payments for Up to 180 Days",
      body: "Put the rollback on the road and start producing revenue before full payments begin. Deferred first-payment options give you runway.",
      iconSrc: "/brand-assets/benefit-icons/deferment/deferment-180-dark.svg",
      iconAlt: "180-day payment deferment icon",
      iconWidth: 64,
      iconHeight: 64,
    },
  },
  purchaseAndTerms: {
    purchaseStack: {
      headline: "Buy from anyone. We'll finance it.",
      body: "Dealership, private seller, auction house, or another towing operator. We finance the truck, not the source.",
      iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
      iconAlt: "Hook icon",
      rotationIntervalMs: 4500,
      cards: [
        {
          id: "dealer",
          sourceName: "Authorized Retailers",
          sourceSubtitle: "Dealer Inventory",
          iconSrc: "/brand-assets/source-icons/placeholder-dealer.svg",
          iconAlt: "Dealer icon",
          badgeLabel: "For Sale",
          sampleListing: "2024 Kenworth T270 Rollback",
          samplePrice: "$87,500",
        },
        {
          id: "fbmp",
          sourceName: "Facebook Marketplace",
          sourceSubtitle: "Private Seller Listings",
          iconSrc: "/brand-assets/source-icons/placeholder-fbmp.svg",
          iconAlt: "Facebook Marketplace icon",
          badgeLabel: "For Sale",
          sampleListing: "2019 Hino 258 Rollback",
          samplePrice: "$62,500",
        },
        {
          id: "auction",
          sourceName: "Ritchie Brothers",
          sourceSubtitle: "Auction Listings",
          iconSrc: "/brand-assets/source-icons/placeholder-auction.svg",
          iconAlt: "Auction house icon",
          badgeLabel: "For Sale",
          sampleListing: "2021 Freightliner M2 Rollback",
          samplePrice: "$74,000",
        },
        {
          id: "private",
          sourceName: "Private Sellers",
          sourceSubtitle: "Operator-to-Operator",
          iconSrc: "/brand-assets/source-icons/placeholder-private.svg",
          iconAlt: "Private seller icon",
          badgeLabel: "For Sale",
          sampleListing: "2017 International 4300 Rollback",
          samplePrice: "$51,000",
        },
      ],
    },
    termSlider: {
      headline: "Older truck? Still financeable.",
      subheading: "See your max term by model year",
      body: "Slide to any model year and see the longest term available. Newer rollbacks stretch further, but we finance trucks back to 2000.",
      iconSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
      iconAlt: "Term length icon",
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
  closingCta: {
    headline: "Ready to lock in your rollback?",
    body:
      "You do not need corporate runaround. You need to know whether the rollback works and what the payment looks like.",
  },
  relatedLinks: [
    { label: "Need a wrecker instead?", href: "/wrecker-financing" },
    { label: "Looking at rotators?", href: "/rotator-financing" },
    { label: "Tow truck financing", href: "/" },
  ],
};

export const wreckerFinancingPageConfig: EquipmentFinancingPageConfig = {
  slug: "wrecker-financing",
  metadata: {
    title: "Wrecker Financing — Pre-Approved in 30 Seconds | TowLoans",
    description:
      "Finance wrecker trucks with zero down options, longer terms on used units, up to 84 months on new, and deferred payments up to 180 days.",
    openGraph: {
      title: "Wrecker Financing — Pre-Approved in 30 Seconds | TowLoans",
      description:
        "Commercial wrecker financing for used, self-loader, private seller, and fleet expansion deals.",
      type: "website",
    },
  },
  hero: {
    headline: "Need Wrecker Financing?",
    bodyCopy:
      "Get a fast answer on the wrecker you are looking at before the deal gets bogged down. Pre-approval takes less than 30 seconds.",
    selectionPrompt: "What do you need financing on?",
    selectionRequiredMessage:
      "Select a wrecker type to enable the pre-approval action.",
    cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
    tertiaryVariant: "outline",
    footnoteMarkers: {
      "30 seconds": "¹",
      "before the deal": "²",
    },
    tertiaryLinks: [
      {
        label: "I found a truck and need financing",
        href: DRAWER_HASH,
        drawerTitle: "How much is the wrecker you found?",
      },
      {
        label: "What's my buying power?",
        href: "/pre-approval",
      },
    ],
    tertiaryActions: [
      {
        eyebrow: "Already have a truck in mind?",
        label: "I found a truck and need financing",
        href: DRAWER_HASH,
        drawerTitle: "How much is the wrecker you found?",
      },
      {
        eyebrow: "Need to size the payment first?",
        label: "What's my buying power?",
        href: "/pre-approval",
      },
    ],
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
        id: "self-loader",
        label: "Self-Loader / Repo",
        iconSrc: "/brand-assets/truck-icons/wrecker/wrecker-light.svg",
        iconWidth: 150,
        iconHeight: 43,
      },
    ],
  },
  programs: buildEquipmentPrograms(
    "Wrecker financing programs built for service units",
    "For operators buying a workhorse truck and needing the structure to fit the way towing businesses actually add equipment."
  ),
  trustBridge: SHARED_TRUST_BRIDGE_CONFIG,
  dealsSection: {
    eyebrow: "WHAT WE FINANCE",
    heading: "Wrecker deals we can structure",
    intro:
      "Wrecker financing is usually about getting another service truck on the road fast, without overcomplicating the deal.",
    items: [
      {
        title: "Light-duty wreckers",
        description:
          "Finance standard service wreckers for daily towing work, replacements, or coverage expansion.",
      },
      {
        title: "Self-loader and repo units",
        description:
          "Structure repo-style equipment when the truck and operating profile line up with the program.",
      },
      {
        title: "Used service trucks",
        description:
          "Used wrecker deals are common when operators want another revenue truck without buying new.",
      },
      {
        title: "Private seller purchases",
        description:
          "Buy from another company or operator without forcing the transaction through a dealership.",
      },
      {
        title: "Fleet additions",
        description:
          "Add another service or repo unit when you need more capacity but still want the numbers to stay disciplined.",
      },
    ],
  },
  faqSection: wreckerFaq.section,
  faqSchema: wreckerFaq.schema,
  financialProductSchema: {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Wrecker Financing",
    description:
      "Equipment financing for wrecker tow trucks, including self-loader, used, private seller, and fleet expansion deals.",
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
  closingCta: {
    headline: "Ready to lock in your wrecker?",
    body:
      "You do not need a long application process to know whether the service truck works. Start with the payment and the structure.",
  },
  relatedLinks: [
    { label: "Looking at a rollback instead?", href: "/rollback-financing" },
    { label: "Need a rotator program?", href: "/rotator-financing" },
    { label: "Tow truck financing", href: "/" },
  ],
};

export const rotatorFinancingPageConfig: EquipmentFinancingPageConfig = {
  slug: "rotator-financing",
  metadata: {
    title: "Rotator Financing — Pre-Approved in 30 Seconds | TowLoans",
    description:
      "Finance rotators with zero down options, up to 84 months on new, longer terms on used units, and deferred payments up to 180 days.",
    openGraph: {
      title: "Rotator Financing — Pre-Approved in 30 Seconds | TowLoans",
      description:
        "Commercial rotator financing for heavy-duty replacement units, used deals, operator-to-operator sales, and fleet expansion.",
      type: "website",
    },
  },
  hero: {
    headline: "Need Rotator Financing?",
    bodyCopy:
      "Rotators are large-ticket purchases. Get a fast read on the payment structure before you commit to the next heavy-recovery unit.",
    selectionPrompt: "What do you need financing on?",
    selectionRequiredMessage:
      "Select a rotator type to enable the pre-approval action.",
    cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
    tertiaryVariant: "outline",
    footnoteMarkers: {
      "fast read": "¹",
      "before you commit": "²",
    },
    tertiaryLinks: [
      {
        label: "I found a truck and need financing",
        href: DRAWER_HASH,
        drawerTitle: "How much is the rotator you found?",
      },
      {
        label: "What's my buying power?",
        href: "/pre-approval",
      },
    ],
    tertiaryActions: [
      {
        eyebrow: "Already looking at a rotator?",
        label: "I found a truck and need financing",
        href: DRAWER_HASH,
        drawerTitle: "How much is the rotator you found?",
      },
      {
        eyebrow: "Need to frame the deal first?",
        label: "What's my buying power?",
        href: "/pre-approval",
      },
    ],
    heroImage: truck12,
    heroImageAlt: "Heavy-duty recovery truck ready for financing",
    galleryImages: [
      { src: truck12, alt: "Heavy recovery truck parked near industrial bays" },
      { src: truck14, alt: "White heavy recovery truck at sunset" },
      { src: truck9, alt: "Blue and green heavy tow truck" },
      { src: truck8, alt: "Dual-axle heavy wrecker in lot" },
      { src: truck3, alt: "Red heavy recovery truck" },
    ],
    tiles: [
      {
        id: "standard-rotator",
        label: "Heavy-Duty Rotator",
        iconSrc: "/brand-assets/truck-icons/rotator/rotator-green.svg",
        iconWidth: 150,
        iconHeight: 43,
      },
      {
        id: "replacement-unit",
        label: "Replacement / Expansion Unit",
        iconSrc: "/brand-assets/truck-icons/rotator/rotator-light.svg",
        iconWidth: 150,
        iconHeight: 43,
      },
    ],
  },
  programs: buildEquipmentPrograms(
    "Rotator financing programs built for bigger numbers",
    "When the truck is expensive, the structure matters more. Keep the payment, term, and timing aligned with the operation."
  ),
  trustBridge: SHARED_TRUST_BRIDGE_CONFIG,
  dealsSection: {
    eyebrow: "WHAT WE FINANCE",
    heading: "Rotator deals we can structure",
    intro:
      "Rotator financing is not about generic equipment language. It is about fitting a large purchase into a serious heavy-recovery operation.",
    items: [
      {
        title: "Heavy-duty rotators",
        description:
          "Structure new or newer heavy-recovery purchases with terms that reflect the size of the equipment.",
      },
      {
        title: "High-value used units",
        description:
          "Used rotators are still large-ticket deals, which makes payment structure and term flexibility critical.",
      },
      {
        title: "Operator-to-operator sales",
        description:
          "Buy from another towing company or private seller without relying on a dealer-only financing path.",
      },
      {
        title: "Replacement purchases",
        description:
          "Replace an aging heavy-recovery truck without forcing all of the capital out of the business at once.",
      },
      {
        title: "Fleet expansion",
        description:
          "Add heavy-recovery capacity when bigger jobs justify the next truck and the payment needs to stay disciplined.",
      },
    ],
  },
  faqSection: rotatorFaq.section,
  faqSchema: rotatorFaq.schema,
  financialProductSchema: {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Rotator Financing",
    description:
      "Equipment financing for heavy-duty rotator tow trucks, including used, private seller, replacement, and fleet expansion deals.",
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
  closingCta: {
    headline: "Ready to structure your rotator deal?",
    body:
      "You are not shopping for a casual purchase. Start with a fast read on the structure before you lock in the next heavy-recovery truck.",
  },
  relatedLinks: [
    { label: "Need a rollback page instead?", href: "/rollback-financing" },
    { label: "Looking at a service wrecker?", href: "/wrecker-financing" },
    { label: "Tow truck financing", href: "/" },
  ],
};
