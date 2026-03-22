import truck3 from "@/public/truck-3.jpg";
import truck8 from "@/public/truck-8.jpg";
import truck9 from "@/public/truck-9.jpg";
import truck12 from "@/public/truck-12.jpg";
import truck14 from "@/public/truck-14.jpg";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";
import {
  SHARED_FINANCING_FOOTNOTES_CONFIG,
  SHARED_TRUST_BRIDGE_CONFIG,
  buildEquipmentPrograms,
  buildFaqSection,
} from "./shared-config";
import type { EquipmentFinancingPageConfig } from "./page-config-types";

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
    kind: "framed-outline",
    config: {
      headline: "Need Wrecker Financing?",
      bodyCopy:
        "Get a fast answer on the wrecker you are looking at before the deal gets bogged down. Pre-approval takes less than 30 seconds.",
      selectionPrompt: "What do you need financing on?",
      selectionRequiredMessage:
        "Select a wrecker type to enable the pre-approval action.",
      cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
      footnoteMarkers: {
        "30 seconds": "¹",
        "before the deal": "²",
      },
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
  footnotes: SHARED_FINANCING_FOOTNOTES_CONFIG,
  closingCta: {
    eyebrow: "READY WHEN YOU ARE",
    headline: "Ready to lock in your wrecker?",
    body:
      "You do not need a long application process to know whether the service truck works. Start with the payment and the structure.",
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
    kind: "framed-outline",
    config: {
      headline: "Need Rotator Financing?",
      bodyCopy:
        "Rotators are large-ticket purchases. Get a fast read on the payment structure before you commit to the next heavy-recovery unit.",
      selectionPrompt: "What do you need financing on?",
      selectionRequiredMessage:
        "Select a rotator type to enable the pre-approval action.",
      cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
      footnoteMarkers: {
        "fast read": "¹",
        "payment structure": "²",
      },
      tertiaryActions: [
        {
          eyebrow: "Already have a truck in mind?",
          label: "I found a truck and need financing",
          href: DRAWER_HASH,
          drawerTitle: "How much is the rotator you found?",
        },
        {
          eyebrow: "Need to size the deal first?",
          label: "What's my buying power?",
          href: "/pre-approval",
        },
      ],
      heroImage: truck12,
      heroImageAlt: "Rotator truck ready for financing",
      galleryImages: [
        { src: truck12, alt: "Heavy recovery rotator parked at industrial site" },
        { src: truck14, alt: "Heavy-duty recovery truck at sunset" },
        { src: truck8, alt: "Red dual-axle recovery truck in lot" },
        { src: truck9, alt: "Blue and green heavy recovery truck" },
        { src: truck3, alt: "Red heavy tow truck facing the camera" },
      ],
      tiles: [
        {
          id: "50-ton",
          label: "50-Ton Rotator",
          iconSrc: "/brand-assets/truck-icons/rotator/rotator-green.svg",
          iconWidth: 150,
          iconHeight: 43,
        },
        {
          id: "75-ton",
          label: "75-Ton Rotator",
          iconSrc: "/brand-assets/truck-icons/rotator/rotator-light.svg",
          iconWidth: 150,
          iconHeight: 43,
        },
      ],
    },
  },
  programs: buildEquipmentPrograms(
    "Rotator financing built for large recovery deals",
    "For operators structuring high-ticket equipment without letting the payment get away from the business."
  ),
  trustBridge: SHARED_TRUST_BRIDGE_CONFIG,
  dealsSection: {
    eyebrow: "WHAT WE FINANCE",
    heading: "Rotator deals we can structure",
    intro:
      "Rotator financing is usually about balancing serious equipment cost with a payment structure your operation can actually carry.",
    items: [
      {
        title: "New heavy-recovery rotators",
        description:
          "Finance large-ticket replacement or expansion units with terms that fit the scale of the purchase.",
      },
      {
        title: "Used rotator trucks",
        description:
          "Used heavy-recovery units can still be a strong fit when the truck, seller, and business profile line up.",
      },
      {
        title: "Operator-to-operator sales",
        description:
          "Buy a rotator from another towing company without forcing the deal through a traditional dealer.",
      },
      {
        title: "Fleet growth purchases",
        description:
          "Add another major recovery asset when the next contract or service area justifies the move.",
      },
      {
        title: "Replacement for aging heavy units",
        description:
          "Replace an older recovery truck before downtime starts costing more than the upgrade.",
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
  footnotes: SHARED_FINANCING_FOOTNOTES_CONFIG,
  closingCta: {
    eyebrow: "READY WHEN YOU ARE",
    headline: "Ready to lock in your rotator?",
    body:
      "Heavy-recovery equipment is too expensive to guess on. Start with the structure and see whether the unit fits the business.",
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
      { label: "Need a wrecker program?", href: "/wrecker-financing" },
      { label: "Tow truck financing", href: "/" },
    ],
  },
};
