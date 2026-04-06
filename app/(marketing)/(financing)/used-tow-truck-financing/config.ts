import type { EquipmentFinancingPageConfig } from "../_components/page-config-types";
import truck2 from "@/public/truck-2.jpg";
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import { preApprovalEntryHash } from "@/features/pre-approval/drawer/server";
import {
  buildFaqSection,
  SHARED_FINANCING_FOOTNOTES_CONFIG,
} from "../_components/shared-config";
import {
  DRAWER_HASH,
} from "@/components/ui/pre-approval-drawer";
import { usedTowTruckHeroPreApprovalSelectionTrigger } from "@/features/pre-approval/selection";
import type { FaqItemData } from "@/components/sections/page/faq/config";

/* ── Page Config ─────────────────────────────────────────────────── */

const usedTowTruckFaqContent = buildUsedTowTruckFaqContent();

function createUsedTowTruckTrigger(
  sectionId: string,
  ctaId: string,
  placement: PreApprovalTrigger["origin"]["placement"],
  title?: string,
): PreApprovalTrigger {
  return {
    origin: {
      pageId: "used-tow-truck-financing",
      sectionId,
      ctaId,
      placement,
    },
    drawer: title ? { title } : undefined,
  };
}

export const usedTowTruckFinancingPageConfig: EquipmentFinancingPageConfig = {
  /* ── Page identity & metadata ──────────────────────────── */
  slug: "used-tow-truck-financing",

  /* ── Visual sections — top to bottom ───────────────────── */
  hero: {
    kind: "tile-right",
    config: {
      headline:
        "Finance Any Used Tow Truck. Any Age. Any Mileage. Any Seller.",
      bodyCopy:
        "Other lenders draw lines on used trucks. We do not. No age restrictions. No mileage caps. Dealer, auction, Facebook Marketplace, or the operator down the road. If the truck makes sense for your business, we will structure the deal.",
      selectionPrompt: "What used tow truck do you need financing?",
      selectionRequiredMessage: "Select a truck type to continue.",
      cta: {
        label: "Get Pre-Approved",
        href: DRAWER_HASH,
        preApprovalSelectionTrigger:
          usedTowTruckHeroPreApprovalSelectionTrigger,
      },
      microcopy: "Checking won't affect your credit score.\u00B9",
      disclaimer:
        "All financing subject to credit review and approval.\u00B2",
      tiles: [
        {
          id: "rollback",
          label: "Rollback",
          iconSrc:
            "/brand-assets/truck-icons/rollback/rollback-green.svg",
          iconWidth: 150,
          iconHeight: 43,
        },
        {
          id: "wrecker",
          label: "Wrecker",
          iconSrc:
            "/brand-assets/truck-icons/wrecker/wrecker-green.svg",
          iconWidth: 150,
          iconHeight: 43,
        },
        {
          id: "heavy-wrecker",
          label: "Heavy Wrecker",
          iconSrc:
            "/brand-assets/truck-icons/heavywrecker/heavywrecker-green.svg",
          iconWidth: 150,
          iconHeight: 43,
        },
        {
          id: "rotator",
          label: "Rotator",
          iconSrc:
            "/brand-assets/truck-icons/rotator/rotator-green.svg",
          iconWidth: 150,
          iconHeight: 43,
        },
      ],
    },
  },
  tertiaryStrip: {
    actions: [
      {
        eyebrow: "Buying from a private seller or auction?",
        label: "Private-party tow truck financing",
        href: "/private-party-tow-truck-financing",
      },
      {
        eyebrow: "Want to keep cash in the business?",
        label: "Zero down tow truck financing",
        href: "/zero-down-tow-truck-financing",
      },
    ],
  },
  financingOffers: {
    left: {
      headline: "Zero Down on Used Trucks",
      body: "Keep your cash working. On the right used truck deal, qualified operators can finance with nothing down — the truck starts earning before you put money into it.",
      iconSrc: "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
      iconAlt: "Zero down payment icon",
      iconWidth: 64,
      iconHeight: 64,
      learnMoreLink: {
        text: "See zero down options",
        href: "/zero-down-tow-truck-financing",
      },
    },
    right: {
      headline: "No Payments for Up to 180 Days",
      body: "Get the truck lettered, inspected, and on rotation before full payments start. Deferred first-payment options are especially useful on used trucks that need ramp-up time.",
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
  },
  financingOffersSecondary: {
    left: {
      headline: "Fleet Program for Used Trucks",
      body: "Adding another used truck to the fleet should be clean and fast. Built for operators scaling with used equipment instead of buying new every time.",
      iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
      iconAlt: "Fleet program icon",
      iconWidth: 64,
      iconHeight: 64,
      learnMoreLink: {
        text: "Fleet financing details",
        href: "/fleet-financing",
      },
    },
    right: {
      headline: "Private Seller Financing",
      body: "Buy from another towing company, an independent seller, or someone you found through your network. No dealer required — if the truck and title check out, we can structure the deal.",
      iconSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
      iconAlt: "Private party financing icon",
      iconWidth: 64,
      iconHeight: 64,
      learnMoreLink: {
        text: "Private-party financing details",
        href: "/private-party-tow-truck-financing",
      },
    },
  },
  contentImageSplit: {
    eyebrow: "USED TOW TRUCK FINANCING",
    headline: "Know the payment before you commit to the truck.",
    body: "You should not have to negotiate the truck, then wait weeks to find out if the financing works. Tell us the truck, the price, and where you found it. We will show you the payment and the structure upfront so you can make the call with real numbers, not guesswork.",
    imageSrc: truck2,
    imageAlt: "Used tow truck ready for financing",
  },
  purchaseAndTermsSecondary: {
    purchaseStack: {
      headline: "Buy from anyone. We\u2019ll finance it.",
      body: "Dealership, private seller, auction house, or another towing operator. We finance the truck, not where you found it.",
      iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
      iconAlt: "Hook icon",
    },
    termSlider: {
      headline: "Older truck? Still financeable.",
      subheading: "See your max term by model year",
      body: "Slide to any model year and see the longest term available. We finance used tow trucks back to 2000 \u2014 no age limits.",
      iconSrc: "/brand-assets/benefit-icons/miles/odometer-dark.svg",
      iconAlt: "Odometer icon",
      defaultYear: 2019,
      lookupTable: [
        { minYear: 2000, maxYear: 2009, maxTermMonths: 36 },
        { minYear: 2010, maxYear: 2014, maxTermMonths: 48 },
        { minYear: 2015, maxYear: 2018, maxTermMonths: 60 },
        { minYear: 2019, maxYear: 2022, maxTermMonths: 72 },
        { minYear: 2023, maxYear: 2099, maxTermMonths: 84 },
      ],
    },
  },
  faqSection: usedTowTruckFaqContent.section,
  footnotes: SHARED_FINANCING_FOOTNOTES_CONFIG,
  closingCta: {
    iconSrc: "/brand-assets/benefit-icons/fast/fast-funding-watch-light.svg",
    iconAlt: "Fast funding icon",
    eyebrow: "READY WHEN YOU ARE",
    headline: "See your payment in 30 seconds.",
    body: "You found the truck. You know it fits the business. Do not let the age, the mileage, or the seller type slow down the deal. Start with the payment and the structure.",
    cta: {
      href: preApprovalEntryHash,
      label: "Get Pre-Approved",
      preApprovalTrigger: createUsedTowTruckTrigger(
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
      { label: "Need a rollback instead?", href: "/rollback-financing" },
      { label: "Looking at wreckers?", href: "/wrecker-financing" },
      { label: "Looking at rotators?", href: "/rotator-financing" },
    ],
  },

  /* ── Structured data (invisible JsonLd) ────────────────── */
  faqSchema: usedTowTruckFaqContent.schema,
  financialProductSchema: {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Used Tow Truck Financing",
    description:
      "Equipment financing for used tow trucks including rollbacks, wreckers, heavy wreckers, and rotators from any seller — dealer, auction, private party, or marketplace — with no age or mileage restrictions.",
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
        name: "Used Tow Truck Financing",
        item: "https://towloans.com/used-tow-truck-financing",
      },
    ],
  },
};

function buildUsedTowTruckFaqContent() {
  const customFaqs: FaqItemData[] = [
    {
      id: "age-mileage-limit",
      question:
        "Is there an age or mileage limit on used tow trucks you finance?",
      answerContent: [
        {
          type: "text",
          value:
            "No age or mileage cutoffs. If the truck is operational and the deal structure makes sense, model year and odometer reading are not disqualifiers. We evaluate the truck, the price, and how it fits into your operation.",
        },
      ],
    },
    {
      id: "marketplace-auction",
      question:
        "Can I finance a used tow truck from Facebook Marketplace or at auction?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. As long as the truck and title can be verified, we can structure the financing. We work with marketplace, auction, and private-party deals regularly.",
        },
      ],
    },
    {
      id: "used-vs-new-terms",
      question:
        "Are financing terms worse on used tow trucks than new?",
      answerContent: [
        {
          type: "text",
          value:
            "Not necessarily. Used trucks can qualify for competitive terms, zero down, and deferred first payments. The structure depends on the truck, the seller, and your business profile — not just whether it is new or used.",
        },
      ],
    },
    {
      id: "heavy-wrecker-rotator",
      question: "Will you finance a used heavy wrecker or rotator?",
      answerContent: [
        {
          type: "text",
          value:
            "Yes. Heavy wreckers and rotators over 33,000 lbs GVW carry a 12% federal excise tax (FET) when purchased new. Buy used and that tax is already paid. Finance a used heavy wrecker or rotator from Facebook Marketplace, an auction, or another operator and skip the FET entirely.",
        },
      ],
    },
  ];

  return buildFaqSection(
    "Used tow truck financing questions, straight answers.",
    customFaqs,
    "after"
  );
}
