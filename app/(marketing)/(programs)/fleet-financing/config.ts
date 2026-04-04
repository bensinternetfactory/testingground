import { createElement } from "react";
import type { ProgramPageConfig } from "../_components/page-config-types";
import {
  buildFaqSchema,
  type FaqItemData,
} from "@/components/sections/page/faq";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";

const strongText = (text: string) =>
  createElement("span", { className: "font-semibold text-[#111]" }, text);

const fleetFinancingFaqs: FaqItemData[] = [
  {
    id: "borrowing-history",
    question:
      "Do I need to have financed trucks before to qualify for fleet financing?",
    answerText:
      "No. One of the things that sets this program apart: we don't require deep borrowing history. If you've been running a tow operation for years and the trucks on the road prove it, that operating history carries real weight. Apply and we'll tell you what you qualify for.",
    answerContent: [
      {
        type: "text",
        value:
          "No. One of the things that sets this program apart: we don't require deep borrowing history. If you've been running a tow operation for years and the trucks on the road prove it, that operating history carries real weight. Apply and we'll tell you what you qualify for.",
      },
    ],
  },
  {
    id: "fleet-size",
    question:
      "How many trucks do I need to be running to apply for fleet financing?",
    answerText:
      "Fleet financing starts at 3 or more trucks and 2+ years in business. That's the entry point. Whether you're going from 3 trucks to 4, or from 8 to 12, the program is built for operators who've already proven they can run a fleet.",
    answerContent: [
      {
        type: "text",
        value:
          "Fleet financing starts at 3 or more trucks and 2+ years in business. That's the entry point. Whether you're going from 3 trucks to 4, or from 8 to 12, the program is built for operators who've already proven they can run a fleet.",
      },
    ],
  },
  {
    id: "truck-types",
    question: "What kind of trucks can I finance in a fleet deal?",
    answerText:
      "Any combination. Rollbacks, wreckers, heavy wreckers, rotators. New, used, any age, any mileage. From a dealer, an auction, or a private seller. Fleet financing doesn't asterisk the truck type or the source.",
    answerContent: [
      {
        type: "text",
        value:
          "Any combination. Rollbacks, wreckers, heavy wreckers, rotators. New, used, any age, any mileage. From a dealer, an auction, or a private seller. Fleet financing doesn't asterisk the truck type or the source.",
      },
    ],
  },
  {
    id: "all-at-once",
    question: "Do I have to finance all my new trucks at once?",
    answerText:
      "No. Fleet financing is a relationship, not a single transaction. Add one truck now, another in three months, another next year. Once you're in as a fleet customer, subsequent approvals move faster because we already know the operation.",
    answerContent: [
      {
        type: "text",
        value:
          "No. Fleet financing is a relationship, not a single transaction. Add one truck now, another in three months, another next year. Once you're in as a fleet customer, subsequent approvals move faster because we already know the operation.",
      },
    ],
  },
  {
    id: "approval-speed",
    question: "What does the approval process look like?",
    answerText:
      "Pre-approval takes less than 30 seconds and does not impact your credit. Full approval and funding typically happens within hours of a complete application, depending on time of day.",
    answerContent: [
      {
        type: "text",
        value:
          "Pre-approval takes less than 30 seconds and does not impact your credit. Full approval and funding typically happens within hours of a complete application, depending on time of day.",
      },
    ],
  },
  {
    id: "credit-profile",
    question: "Can I get fleet financing if my credit isn't perfect?",
    answerText:
      "Yes. Credit is one input, not the only one. We weigh operating history, the fleet you're already running, and the economics of the business. If there's a path to approval, we'll find it. Apply and we'll tell you where you stand.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Credit is one input, not the only one. We weigh operating history, the fleet you're already running, and the economics of the business. If there's a path to approval, we'll find it. Apply and we'll tell you where you stand.",
      },
    ],
  },
  {
    id: "older-trucks",
    question: "What if I want to finance an older or higher-mileage truck in the deal?",
    answerText:
      "No cap. No odometer ceiling. If the truck makes business sense and it's going into a working fleet, we'll finance it. The operation is what we're underwriting.",
    answerContent: [
      {
        type: "text",
        value:
          "No cap. No odometer ceiling. If the truck makes business sense and it's going into a working fleet, we'll finance it. The operation is what we're underwriting. See ",
      },
      {
        type: "link",
        value: "used tow truck financing",
        href: "/used-tow-truck-financing",
      },
      {
        type: "text",
        value: " for how age and mileage factor in.",
      },
    ],
  },
  {
    id: "vs-single-truck",
    question: "Is fleet financing different from single-truck financing?",
    answerText:
      "Structurally, yes. Fleet financing factors in the business you're already running — the trucks, the drivers, the calls, the years of operation. That typically means access to more capital and more flexible terms than a single-truck approval. The more established the operation, the more room we have to work with.",
    answerContent: [
      {
        type: "text",
        value:
          "Structurally, yes. Fleet financing factors in the business you're already running \u2014 the trucks, the drivers, the calls, the years of operation. That typically means access to more capital and more flexible terms than a single-truck approval. The more established the operation, the more room we have to work with.",
      },
    ],
  },
];

export const fleetFinancingPageConfig: ProgramPageConfig = {
  slug: "fleet-financing",
  metadata: {
    title:
      "Tow Truck Fleet Financing \u2014 Built Around Your Operation | TowLoans",
    description:
      "Tow truck fleet financing structured around the business you've already built. Scale your fleet at the pace of opportunity \u2014 not the pace of savings. Pre-approved in 30 seconds.",
    openGraph: {
      title:
        "Tow Truck Fleet Financing \u2014 Built Around Your Operation | TowLoans",
      description:
        "Tow truck fleet financing structured around the business you've already built. Scale your fleet at the pace of opportunity \u2014 not the pace of savings. Pre-approved in 30 seconds.",
      type: "website",
    },
  },
  hero: {
    headline: "You've Built the Operation. Now Scale the Fleet.",
    subheadline:
      "Tow truck fleet financing structured around the business you've already built. Move at the pace of the next opportunity \u2014 not the pace of savings.",
    cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
    phone: { display: "(888)\u00a0555-0199", href: "tel:+18885550199" },
    trustBadges: [
      { label: "30-Second Pre-Approval" },
      { label: "No Credit Impact" },
      { label: "3+ Trucks \u00b7 2+ Years TIB" },
    ],
    heroImage: "/truck-10.jpg",
    heroImageAlt: "Tow truck fleet ready for expansion financing",
  },
  sidebarCta: {
    headline: "Ready to grow?",
    subhead: "Pre-approval in 30 seconds. No credit impact.",
    ctaLabel: "Get Pre-Approved",
    ctaHref: DRAWER_HASH,
  },
  sections: [
    {
      kind: "intro",
      paragraphs: [
        "Every fleet operator knows the moment. The call comes in. A retiring operator is selling his trucks. A contract opens up across the county. A clean rollback shows up at auction, priced right.",
        "You do the math in your head. The revenue's there. The drivers are there. Everything's there \u2014 except the cash to move right now.",
        "That's what tow truck fleet financing solves.",
        "We structure fleet loans around what you've already built: the years on the road, the trucks running, the drivers on payroll, the weekly call volume. That operating history is what qualifies you. Your working capital stays where it belongs \u2014 inside the business. The new trucks go on the road.",
      ],
    },
    {
      kind: "contentSection",
      id: "business-case",
      tocLabel: "The business case",
      heading: "Self-Funded Growth Is the Slowest Kind of Growth",
      paragraphs: [
        "Here's the pattern most fleet operators recognize:",
        "You save. For months. Sometimes a year. You finally hit the number for the next truck. You buy it. Cash is drained. Now you're back to saving \u2014 and the next truck is a year away again.",
        "Meanwhile, the operator down the road who took on fleet financing added two trucks in the time it took you to save for one. He's running more contracts. His drivers are busier. His overhead is spread across more revenue.",
        "The math isn't complicated:",
      ],
    },
    {
      kind: "pullQuote",
      content:
        "A fleet operator adding one truck a year from savings is at five trucks in five years. The same operator financing at the pace of opportunity is at ten trucks in three. The compounding isn't on the trucks. It's on the calls those trucks run while the slower operator is still saving.",
    },
    {
      kind: "contentSection",
      paragraphs: [
        "So why drain working capital when the operation is ready to run more iron right now?",
        "The cash you'd burn buying the next truck outright isn't sitting idle if it stays in the business. It's doing work:",
      ],
      list: [
        {
          label: "Driver payroll",
          body: "payroll doesn't wait for the next net-30 to clear",
        },
        {
          label: "Insurance renewals",
          body: "one annual premium can match a truck's down payment",
        },
        {
          label: "Repairs and equipment",
          body: "new beds, wheel lifts, GPS, lighting, tires",
        },
        {
          label: "Seasonal gaps",
          body:
            "slow months are real, and they don't care about your fleet goals",
        },
        {
          label: "The next opportunity",
          body:
            "the auction truck next month, the contract in Q3, the operator retiring down the road",
        },
      ],
      closingParagraphs: [
        "Fleet financing isn't about borrowing because you can't afford to buy. It's about keeping capital inside the operation, where it earns the most.",
      ],
    },
    {
      kind: "inlineCta",
      config: {
        eyebrow: "MORE TRUCKS. FASTER.",
        message: "See what the next truck looks like on paper in 30 seconds.",
        ctaLabel: "Get Pre-Approved",
        ctaHref: DRAWER_HASH,
        iconSrc: "/brand-assets/benefit-icons/best/best-light.svg",
        iconAlt: "",
      },
    },
    {
      kind: "contentSection",
      id: "how-you-qualify",
      tocLabel: "How you qualify",
      heading: "Built Around the Business You've Already Built",
      paragraphs: [
        "Most lenders write fleet loans for operators who've borrowed before. Prior truck loans. Comparable debt. A track record of lender payments. If your borrowing history is thin \u2014 or you've historically paid cash \u2014 the typical lender puts you at the back of the line.",
        "We don't look at it that way.",
        "Fleet operators aren't consumers. An established tow operation with trucks on the road, drivers on payroll, and a steady call volume has already proven what it needs to prove. The operation is the credential.",
        "So we structure fleet financing around operating history first:",
      ],
      list: [
        {
          label: "Time in business counts",
          body: "years on the road matter more than years as a borrower",
        },
        {
          label: "The trucks you're already running make the case",
          body: "a working fleet is proof of operation",
        },
        {
          label: "The calls you're running tell the real story",
          body: "revenue patterns speak louder than a credit file",
        },
      ],
      closingParagraphs: [
        [
          "The entry floor is straightforward: ",
          strongText("3 or more trucks on the road"),
          " and ",
          strongText("2+ years in business"),
          ". If that's you, there's an approval path. How much we can do from there depends on the operation. Drop your details into the pre-approval form and we'll tell you what's available in 30 seconds.",
        ],
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "featureGrid",
      id: "any-truck",
      tocLabel: "Any truck, any stage",
      heading: "Any Truck Type. Any Growth Stage. Any Seller.",
      introParagraphs: [
        "Fleet financing doesn't come with asterisks here.",
      ],
      items: [
        {
          title: "Truck types",
          body:
            "Rollbacks, wreckers, heavy wreckers, rotators, integrated carriers. Light duty through heavy recovery. Mix them across the same deal.",
        },
        {
          title: "Growth stages",
          body:
            "Adding your third truck. Your fifth. Your fifteenth. The program adapts to where you are.",
        },
        {
          title: "Sellers",
          body:
            "Dealer, auction, private party, operator-to-operator. Source doesn't change the terms.",
        },
        {
          title: "Truck age",
          body:
            "New off the lot or decades old. If it'll pull calls, we'll finance it.",
        },
      ],
      closingParagraphs: [
        "The truck needs to make sense for the operation. That's the bar.",
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "comparisonTable",
      id: "the-math",
      tocLabel: "The math",
      heading: "What Financed Growth Actually Looks Like",
      introParagraphs: [
        "Abstract arguments don't move operators. Real numbers do.",
      ],
      example:
        "Example: Two operators. Same starting point \u2014 3 trucks, same market, similar revenue. Both want to grow over 36 months.",
      withDownLabel: "Self-Funded (Cash Only)",
      zeroDownLabel: "Fleet Financed",
      mobileWithDownLabel: "Self-funded",
      mobileZeroDownLabel: "Financed",
      rows: [
        {
          label: "Trucks at month 12",
          withDown: "4",
          zeroDown: "5\u20136",
        },
        {
          label: "Trucks at month 24",
          withDown: "5",
          zeroDown: "7\u20138",
        },
        {
          label: "Trucks at month 36",
          withDown: "6",
          zeroDown: "9\u201310",
        },
        {
          label: "Working capital",
          withDown: "Drained each purchase",
          zeroDown: "Intact",
        },
        {
          label: "Revenue trajectory",
          withDown: "Linear",
          zeroDown: "Compounding",
        },
        {
          label: "Opportunities captured",
          withDown: "Only what the savings timeline caught",
          zeroDown: "Most of them",
        },
      ],
      closingParagraphs: [
        "The self-funded operator isn't more disciplined. He's just slower. Every dollar he put down was a dollar that couldn't fund the next truck.",
        [
          "By month 36, the financed operator isn't just running more trucks \u2014 ",
          strongText(
            "he's running more calls, more contracts, more overhead absorbed across a bigger fleet.",
          ),
          " That's the compounding the spreadsheet doesn't show until you stretch the timeline.",
        ],
      ],
    },
    {
      kind: "inlineCta",
      config: {
        eyebrow: "MOVE AT THE SPEED OF OPPORTUNITY.",
        message: "Know your fleet financing options in 30 seconds.",
        ctaLabel: "Get Pre-Approved",
        ctaHref: DRAWER_HASH,
        iconSrc: "/brand-assets/benefit-icons/fast/fast-funding-light.svg",
        iconAlt: "",
      },
    },
    {
      kind: "promoPanel",
      id: "calculator",
      tocLabel: "Run the numbers",
      heading: "Run the Numbers on the Next Truck",
      paragraphs: [
        "You know the operation. We'll show you the math. Plug in purchase price, your average tow rate, call volume, and operating costs. The calculator returns:",
      ],
      bullets: [
        {
          title: "Monthly cash flow",
          body: "after the payment and operating costs",
        },
        {
          title: "Breakeven calls",
          body: "how many tows per month cover the truck",
        },
        {
          title: "Payback period",
          body: "when the truck has earned back its cost",
        },
        {
          title: "Profit per tow",
          body: "what you keep on every call",
        },
      ],
      closingParagraphs: [
        "No signup. No email. Just your numbers and the answer.",
      ],
      cta: {
        href: "/tow-truck-calculator",
        label: "Run the Calculator",
      },
    },
    {
      kind: "relatedPrograms",
      heading: "Pair It With the Terms That Fit the Deal",
      paragraphs: [
        "Fleet financing stacks with the rest of our programs. Mix them to shape the deal.",
      ],
      programs: [
        {
          title: "Zero down",
          body:
            "$0 down on nearly every approval. Add trucks without touching working capital. Combined with fleet financing, the new trucks go on the road without pulling cash from the operation.",
          linkLabel: "See details",
          href: "/zero-down-tow-truck-financing",
          iconSrc:
            "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
        },
        {
          title: "Deferred payments",
          body:
            "No payments for up to 180 days. The new trucks start earning before the first bill hits. Pair it with fleet financing when you're adding trucks ahead of a contract that hasn't ramped yet.",
          linkLabel: "See details",
          href: "/deferred-payment-tow-truck-financing",
          iconSrc:
            "/brand-assets/benefit-icons/deferment/deferment-180-dark.svg",
        },
        {
          title: "Private-party financing",
          body:
            "Buying from another operator? Same terms as dealer deals. No markup, no middleman. Common on fleet deals where the best trucks come from operators exiting the business.",
          linkLabel: "See details",
          href: "/private-party-tow-truck-financing",
          iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
        },
      ],
    },
  ],
  faqSection: {
    heading: "Fleet Financing FAQ",
    faqs: fleetFinancingFaqs,
  },
  closingCta: {
    iconSrc: "/brand-assets/benefit-icons/terms/terms-light.svg",
    iconAlt: "",
    eyebrow: "THE OPERATION'S READY.",
    headline: "Grow the Fleet at the Pace It's Earning.",
    body: "Pre-approval takes 30 seconds and doesn't impact your credit. See what's available against the operation you've already built.",
    tiles: [
      {
        label: "Rollback",
        href: DRAWER_HASH,
        iconSrc: "/brand-assets/truck-icons/rollback/rollback-green.svg",
      },
      {
        label: "Wrecker",
        href: DRAWER_HASH,
        iconSrc: "/brand-assets/truck-icons/wrecker/wrecker-green.svg",
      },
      {
        label: "Heavy Wrecker",
        href: DRAWER_HASH,
        iconSrc:
          "/brand-assets/truck-icons/heavywrecker/heavywrecker-green.svg",
      },
      {
        label: "Rotator",
        href: DRAWER_HASH,
        iconSrc: "/brand-assets/truck-icons/rotator/rotator-green.svg",
      },
    ],
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
            label: "I need zero down",
            href: "/zero-down-tow-truck-financing",
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
  schemas: {
    faq: buildFaqSchema(fleetFinancingFaqs),
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Tow Truck Fleet Financing",
      description:
        "Tow truck fleet financing for established operators with 3 or more trucks and 2+ years in business. Structured around operating history, not borrowing history.",
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
    breadcrumb: {
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
          name: "Tow Truck Fleet Financing",
          item: "https://towloans.com/fleet-financing",
        },
      ],
    },
  },
};
