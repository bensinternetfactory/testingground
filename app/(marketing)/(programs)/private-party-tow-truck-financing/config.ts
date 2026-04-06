import { createElement } from "react";
import type { ProgramPageConfig } from "../_components/page-config-types";
import {
  buildFaqSchema,
  type FaqItemData,
} from "@/components/sections/page/faq";
import type {
  PreApprovalTrigger,
  PreApprovalTruckType,
} from "@/features/pre-approval/contract";
import { preApprovalEntryHash } from "@/features/pre-approval/drawer/server";

const strongText = (text: string) =>
  createElement("span", { className: "font-semibold text-[#111]" }, text);

const privatePartyPageId = "private-party-tow-truck-financing";

function createPrivatePartyTrigger(
  sectionId: string,
  ctaId: string,
  placement: PreApprovalTrigger["origin"]["placement"],
  options?: {
    title?: string;
    truckType?: PreApprovalTruckType;
  },
): PreApprovalTrigger {
  return {
    origin: {
      pageId: privatePartyPageId,
      sectionId,
      ctaId,
      placement,
    },
    drawer: options?.title ? { title: options.title } : undefined,
    handoff: options?.truckType ? { truckType: options.truckType } : undefined,
  };
}

const privatePartyFaqs: FaqItemData[] = [
  {
    id: "seller-has-loan",
    question: "What if the seller still has a loan on the truck?",
    answerContent: [
      {
        type: "text",
        value:
          "We handle it. The seller gets a 10\u201315 day payoff letter from their lender. We wire the payoff amount to their bank, send the remaining equity to the seller, and the title releases clean. It adds a few days to the timeline and doesn't change the outcome.",
      },
    ],
  },
  {
    id: "valuation",
    question: "How do you determine what the truck is worth?",
    answerContent: [
      {
        type: "text",
        value:
          "We run comps on similar trucks \u2014 recent sales and current listings for the same year, make, model, and configuration. If the agreed price is in range, the deal moves. If it's well over market, we'll tell you and you can renegotiate before committing.",
      },
    ],
  },
  {
    id: "seller-effort",
    question: "How much does the seller actually have to do?",
    answerContent: [
      {
        type: "text",
        value:
          "Not much. Electronic docs to sign, roughly 15 minutes of their time. They ship the title to us once funds hit their account. If there's a lien on the truck, they also pull a payoff letter from their bank. That's the full list.",
      },
    ],
  },
  {
    id: "close-speed",
    question: "How fast can you close a private-party deal?",
    answerContent: [
      {
        type: "text",
        value:
          "Same-day is possible when your docs are signed, insurance is in place, and the seller is ready to go through the process with us. Most deals close in a few days. Deals with a lien payoff take a little longer because of the 10\u201315 day payoff window.",
      },
    ],
  },
  {
    id: "older-trucks",
    question: "Do you finance older trucks or high-mileage equipment?",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. No age cap. No mileage cap. If the truck still runs, makes business sense, and fits the $20,000 minimum, we finance it. Private-party is often the only way to get specific older equipment that's earned its reputation.",
      },
    ],
  },
  {
    id: "auctions",
    question: "Can you finance trucks from auctions?",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Auction purchases are private-party deals \u2014 same process. You provide the auction paperwork alongside the financing docs, we verify the title, fund the seller, and the truck is yours.",
      },
    ],
  },
  {
    id: "heavy-wreckers",
    question: "Can I finance a heavy wrecker or rotator from a private seller?",
    answerContent: [
      {
        type: "text",
        value:
          "Yes \u2014 and private-party is actually the right fit for a lot of heavy equipment. The best heavy wreckers and rotators often come from operators exiting the business or fleets consolidating. Our $20,000 minimum means the program is built for higher-ticket equipment like this. See ",
      },
      {
        type: "link",
        value: "wrecker financing",
        href: "/wrecker-financing",
      },
      {
        type: "text",
        value: " and ",
      },
      {
        type: "link",
        value: "rotator financing",
        href: "/rotator-financing",
      },
      {
        type: "text",
        value: " for how those specific deals get structured.",
      },
    ],
  },
  {
    id: "states",
    question: "What states do you cover?",
    answerContent: [
      {
        type: "text",
        value: "All 50 states.",
      },
    ],
  },
];

export const privatePartyPageConfig: ProgramPageConfig = {
  slug: "private-party-tow-truck-financing",
  metadata: {
    title:
      "Private Party Tow Truck Financing \u2014 No Dealer Required | TowLoans",
    description:
      "Finance a tow truck from a private seller, auction, retiring operator, or another towing company. No dealer required. No age or mileage limits. Pre-approval in 30 seconds.",
    openGraph: {
      title:
        "Private Party Tow Truck Financing \u2014 No Dealer Required | TowLoans",
      description:
        "Finance a tow truck from a private seller, auction, retiring operator, or another towing company. No dealer required. No age or mileage limits. Pre-approval in 30 seconds.",
      type: "website",
    },
  },
  hero: {
    headline: "Buying a Tow Truck From a Private Seller? We'll Finance It.",
    subheadline:
      "Private party tow truck financing for operators who find their own deals \u2014 from other operators, auctions, retiring fleets, Facebook Marketplace. Same process as a dealer purchase, without the dealer markup.",
    cta: {
      label: "Get Pre-Approved",
      href: preApprovalEntryHash,
      preApprovalTrigger: createPrivatePartyTrigger(
        "hero-primary",
        "hero-main-cta",
        "hero",
      ),
    },
    phone: { display: "(888)\u00a0555-0199", href: "tel:+18885550199" },
    trustBadges: [
      { label: "Private Sellers \u00b7 Auctions \u00b7 Fleet Buyouts" },
      { label: "No Age or Mileage Limits" },
      { label: "$20,000 Minimum \u00b7 50 States" },
    ],
    heroImage: "/truck-7.jpg",
    heroImageAlt: "Tow truck being purchased from a private seller",
  },
  sidebarCta: {
    headline: "See your payment.",
    subhead: "Pre-approval in 30 seconds. No credit impact.",
    ctaLabel: "Get Pre-Approved",
    ctaHref: preApprovalEntryHash,
    preApprovalTrigger: createPrivatePartyTrigger(
      "sidebar-cta",
      "sidebar-main-cta",
      "section",
    ),
  },
  sections: [
    {
      kind: "intro",
      paragraphs: [
        "The best tow trucks aren't always on dealer lots. They're at auctions. On Facebook Marketplace. In the yard of a retiring operator two counties over. In the fleet of a towing company consolidating down the road.",
        "You know where to find them. Most lenders don't know what to do with them.",
        "A private-party deal means no dealer invoice, no invoice-to-invoice wire, and a title that has to move directly from seller to buyer with a lender's lien perfected along the way. Banks refuse. Most equipment lenders require a dealer in the middle. We run these deals every week.",
        [
          "The shape is the same as a dealer deal: you find the truck, we draft the paperwork, credit decision, sign, fund, drive. The only variable is the seller. ",
          strongText("Loop them in from the first conversation"),
          ", confirm they're ready for electronic docs, and the deal closes fast.",
        ],
      ],
    },
    {
      kind: "contentSection",
      id: "what-it-is",
      tocLabel: "What it is",
      eyebrow: "WHAT COUNTS AS PRIVATE PARTY",
      heading: "What Private Party Tow Truck Financing Covers",
      paragraphs: [
        "Private party tow truck financing covers any truck purchased directly from a person or business that isn't a dealer. That includes:",
      ],
      list: [
        {
          label: "Facebook Marketplace and Craigslist listings",
          body: "the truck you've been watching for weeks",
        },
        {
          label: "Auctions",
          body: "live or online, municipal or commercial",
        },
        {
          label: "Retiring operators",
          body: "owner selling the yard and the trucks together",
        },
        {
          label: "Fleet buyouts",
          body: "another towing company downsizing or consolidating",
        },
        {
          label: "Operator-to-operator deals",
          body: "the truck your buddy two towns over is selling",
        },
      ],
      closingParagraphs: [
        "If the truck isn't coming off a dealer lot with a dealer invoice, it's a private-party deal. That's the whole definition.",
      ],
    },
    {
      kind: "pullQuote",
      content:
        "We finance the truck, not the dealer relationship. The deal doesn't need a middleman \u2014 it needs a lender willing to do the work.",
    },
    {
      kind: "contentSection",
      id: "how-it-works",
      tocLabel: "How it works",
      heading: "How a Private-Party Deal Actually Runs",
      paragraphs: [
        "Seven steps, same shape as a dealer transaction. The only thing that moves differently is where the paperwork and the wire go.",
      ],
      list: [
        {
          label: "1. You find the truck",
          body:
            "Marketplace, auction, operator you know \u2014 wherever the right deal is.",
        },
        {
          label: "2. Send us the details",
          body:
            "Year, make, model, configuration, mileage, asking price, seller contact. We draft the bill of sale.",
        },
        {
          label: "3. Title copy verified",
          body:
            "The seller sends a photo of the front and back of the title, or an e-title copy \u2014 not the original. We use that copy to check ownership, verify any liens, and confirm the truck is clear to finance. The original title stays with the seller until after funding.",
        },
        {
          label: "4. Credit decision",
          body:
            "Same-day possible. The 30-second pre-approval gives you the number before you apply in full.",
        },
        {
          label: "5. Electronic docs",
          body:
            "You sign. The seller signs. Both sides done in under an hour.",
        },
        {
          label: "6. We wire the funds",
          body:
            "Directly to the seller, or to their lender first (if there's a lien) with the remaining equity to the seller.",
        },
        {
          label: "7. Seller ships the title, you take the truck",
          body:
            "Clean title transfer with our lien properly perfected.",
        },
      ],
    },
    {
      kind: "inlineCta",
      config: {
        eyebrow: "FOUND IT? LET'S FINANCE IT.",
        message: "See your payment on the deal you already found in 30 seconds.",
        ctaLabel: "Get Pre-Approved",
        ctaHref: preApprovalEntryHash,
        preApprovalTrigger: createPrivatePartyTrigger(
          "deal-found-inline-cta",
          "deal-found-inline-cta",
          "inline",
        ),
        iconSrc: "/brand-assets/benefit-icons/fast/fast-funding-light.svg",
        iconAlt: "",
      },
    },
    {
      kind: "contentSection",
      id: "seller-prep",
      tocLabel: "Set up the seller",
      heading: "Get the Seller on Board Early",
      paragraphs: [
        "Here's the one thing that makes a private-party deal move fast: the seller knowing up front that a lender is involved.",
        "Not after you've shaken hands. Not after you've agreed on price. From the first conversation. Most sellers are fine with it. A few want all cash today with no paperwork \u2014 and those deals are a tough fit for any lender, not just us.",
        "What we ask you to confirm with the seller before you submit:",
      ],
      list: [
        {
          label: "They know a lender is in the deal",
          body:
            "No surprises at closing. They understand there will be paperwork and a wire, not a check at the handshake.",
        },
        {
          label: "They're comfortable with electronic docs",
          body:
            "Most are. It's about 15 minutes of signing on their end.",
        },
        {
          label: "They'll ship the title through our process",
          body:
            "Once funds hit their account, they send the title to us and we handle the transfer to you.",
        },
        {
          label: "If there's a loan on the truck, they can pull a payoff letter",
          body:
            "A quick call to their lender. Standard document, 10\u201315 day validity.",
        },
      ],
      closingParagraphs: [
        "That's it. Set the seller up in the first call, and the rest of the deal is paperwork we run every week.",
      ],
    },
    {
      kind: "pullQuote",
      content:
        "Loop the seller in early. The rest is paperwork we've run a thousand times.",
    },
    {
      kind: "contentSection",
      id: "why-lenders-refuse",
      tocLabel: "Why lenders refuse",
      heading: "Why Most Lenders Won't Touch Private-Party Deals",
      paragraphs: [
        "Plenty of lenders will finance a tow truck. Most won't finance a private-party one. It's a pattern worth understanding \u2014 it tells you why the deal you found might be harder to finance than it should be.",
      ],
      list: [
        {
          label: "Title complexity",
          body:
            "Liens need real verification. No dealer buffer means more fraud risk to manage directly.",
        },
        {
          label: "Valuation work",
          body:
            "No dealer invoice means the lender has to pull comps and confirm the price manually.",
        },
        {
          label: "No dealer safety net",
          body:
            "No pre-delivery inspection, no warranty, no recourse if something's wrong after the sale.",
        },
        {
          label: "Manual processing",
          body:
            "Every private-party deal takes hands-on underwriting. Most lenders aren't staffed for it.",
        },
      ],
      closingParagraphs: [
        "None of that is a reason the deal shouldn't get done. It's just a reason most lenders say no. We built the process around doing that work.",
      ],
    },
    {
      kind: "contentSection",
      id: "liens",
      tocLabel: "Handling liens",
      heading: "When the Seller Still Owes Money on the Truck",
      paragraphs: [
        "Most private-party trucks that change hands have a lien on them. That's normal. It doesn't kill the deal \u2014 it just adds a step.",
      ],
      list: [
        {
          label: "10\u201315 day payoff letter",
          body:
            "The seller requests it from their lender. Standard document.",
        },
        {
          label: "We wire the payoff amount directly to their bank",
          body:
            "Cleanest path, smallest chance of a hiccup.",
        },
        {
          label: "Remaining equity goes to the seller",
          body:
            "Whatever's left after the payoff is wired on the same schedule.",
        },
        {
          label: "Title releases clean",
          body:
            "Their lender releases the title once their payoff clears. Our lien gets perfected on the back of that.",
        },
      ],
      closingParagraphs: [
        "The whole process runs in parallel with the rest of the deal. It adds a few days to the timeline. It doesn't change the outcome.",
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "contentSection",
      id: "requirements",
      tocLabel: "Requirements",
      heading: "What You Need. What the Seller Needs.",
      paragraphs: [
        "Straightforward on both sides.",
      ],
      list: [
        {
          label: "Established towing business",
          body:
            "Not a startup. Operating history is what we underwrite against.",
        },
        {
          label: "Qualifying credit",
          body:
            "We'll tell you where you stand in the 30-second pre-approval.",
        },
        {
          label: "$20,000 minimum deal size",
          body:
            "Below that, private-party financing isn't a fit \u2014 dealer financing usually is.",
        },
        {
          label: "No age or mileage limits on the truck",
          body:
            "Early 2000s, high-mileage workhorse, specialty equipment that's been earning for a decade. If it runs and makes business sense, we finance it.",
        },
        {
          label: "No fleet-size requirement",
          body:
            "We finance the second truck. We finance the tenth. The bar is the business, not the headcount.",
        },
      ],
      closingParagraphs: [
        [
          "From the seller's side: title or e-title in their name, willingness to sign electronic docs, and a ",
          strongText("payoff letter if there's a lien"),
          ". Nothing more.",
        ],
      ],
    },
    {
      kind: "comparisonTable",
      id: "vs-dealer",
      tocLabel: "Private party vs dealer",
      heading: "Private Party vs Dealer: The Honest Comparison",
      introParagraphs: [
        "Both paths work. They work differently. Here's what actually changes when you buy private-party instead of off a lot.",
      ],
      example:
        "Example: Same year, make, model, and configuration. One truck on a dealer lot, one from a private seller.",
      withDownLabel: "Dealer",
      zeroDownLabel: "Private Party",
      mobileWithDownLabel: "Dealer",
      mobileZeroDownLabel: "Private",
      rows: [
        {
          label: "Selection",
          withDown: "Limited to lot inventory",
          zeroDown: "Anywhere you find it",
        },
        {
          label: "Price",
          withDown: "Retail markup",
          zeroDown: "No dealer markup",
        },
        {
          label: "Lender options",
          withDown: "Most lenders work with dealers",
          zeroDown: "Need a lender who does private party",
        },
        {
          label: "Closing speed",
          withDown: "Usually straightforward",
          zeroDown: "Fast when the seller is prepped",
        },
        {
          label: "Warranty",
          withDown: "Sometimes available",
          zeroDown: "As-is",
        },
        {
          label: "Inspection",
          withDown: "Dealer prep",
          zeroDown: "Your own due diligence",
        },
      ],
      closingParagraphs: [
        "Private-party wins on selection and price. Dealer wins on warranty and prep work. On financing, the gap used to be huge. With us, it isn't.",
      ],
    },
    {
      kind: "inlineCta",
      config: {
        eyebrow: "NO DEALER REQUIRED.",
        message: "Get pre-approved on the private-party deal you already found.",
        ctaLabel: "Get Pre-Approved",
        ctaHref: preApprovalEntryHash,
        preApprovalTrigger: createPrivatePartyTrigger(
          "no-dealer-inline-cta",
          "no-dealer-inline-cta",
          "inline",
        ),
        iconSrc: "/brand-assets/benefit-icons/hook/hook-light.svg",
        iconAlt: "",
      },
    },
    {
      kind: "contentSection",
      id: "who-its-for",
      tocLabel: "Who it's for",
      heading: "Who This Program Fits",
      paragraphs: [
        "Private-party tow truck financing is built for one specific operator: the one who finds their own deals.",
      ],
      list: [
        {
          label: "Operators who already know the equipment",
          body:
            "You've bought trucks before. You know what to look for. You don't need a dealer to walk you through it.",
        },
        {
          label: "Any fleet size",
          body:
            "Second truck, fifth truck, tenth truck. The program doesn't care about the count.",
        },
        {
          label: "Buyers who found the truck first, the lender second",
          body:
            "You're not browsing. You're closing.",
        },
      ],
      closingParagraphs: [
        "This isn't the program for a first-truck buyer, a brand-new startup, or anyone looking for bad-credit financing. If that's where you're at, a different path makes more sense. If you're an established operator with a truck in mind, you're in the right place.",
      ],
    },
    {
      kind: "promoPanel",
      id: "calculator",
      tocLabel: "Run the numbers",
      heading: "Run the Numbers on the Truck You Found",
      paragraphs: [
        "Before you commit to the seller, see how the truck pencils out. Plug in the purchase price, your call volume, average rate per tow, insurance, and fuel. The calculator returns:",
      ],
      bullets: [
        {
          title: "Monthly cash flow",
          body: "after payment and operating costs",
        },
        {
          title: "Breakeven calls",
          body: "how many tows per month cover the truck",
        },
        {
          title: "Payback period",
          body: "when the truck earns back its purchase price",
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
      heading: "Stack It With the Right Terms",
      paragraphs: [
        "Private-party financing pairs with the rest of our programs. Shape the deal around the truck and the timing.",
      ],
      programs: [
        {
          title: "Zero down",
          body:
            "$0 down on nearly every approval. Keep working capital inside the business on day one \u2014 which matters more on a private-party deal where the seller wants to be funded fast.",
          linkLabel: "See details",
          href: "/zero-down-tow-truck-financing",
          iconSrc:
            "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
        },
        {
          title: "Deferred payments",
          body:
            "Take delivery today, pay $99/month for 60, 90, or 120 days. Let the truck find its rhythm on your routes before the real payment kicks in.",
          linkLabel: "See details",
          href: "/deferred-payment-tow-truck-financing",
          iconSrc:
            "/brand-assets/benefit-icons/deferment/deferment-90-dark.svg",
        },
        {
          title: "Fleet financing",
          body:
            "Adding your third, fifth, or tenth truck? Fleet operators get terms structured around operating history, not borrowing history.",
          linkLabel: "See details",
          href: "/fleet-financing",
          iconSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
        },
      ],
    },
  ],
  faqSection: {
    heading: "Private Party Financing FAQ",
    faqs: privatePartyFaqs,
  },
  closingCta: {
    iconSrc: "/brand-assets/benefit-icons/hook/hook-light.svg",
    iconAlt: "",
    eyebrow: "FOUND THE TRUCK?",
    headline: "Let's Get It Financed.",
    body: "Pre-approval takes 30 seconds and doesn't impact your credit. See what the payment looks like on the deal you already found \u2014 before you commit to the seller.",
    tiles: [
      {
        label: "Rollback",
        href: preApprovalEntryHash,
        iconSrc: "/brand-assets/truck-icons/rollback/rollback-green.svg",
        preApprovalTrigger: createPrivatePartyTrigger(
          "closing-cta-tiles",
          "closing-tile-rollback",
          "footer",
          { truckType: "rollback" },
        ),
      },
      {
        label: "Wrecker",
        href: preApprovalEntryHash,
        iconSrc: "/brand-assets/truck-icons/wrecker/wrecker-green.svg",
        preApprovalTrigger: createPrivatePartyTrigger(
          "closing-cta-tiles",
          "closing-tile-wrecker",
          "footer",
          { truckType: "wrecker" },
        ),
      },
      {
        label: "Heavy Wrecker",
        href: preApprovalEntryHash,
        iconSrc:
          "/brand-assets/truck-icons/heavywrecker/heavywrecker-green.svg",
        preApprovalTrigger: createPrivatePartyTrigger(
          "closing-cta-tiles",
          "closing-tile-heavy-wrecker",
          "footer",
          { truckType: "heavy-wrecker" },
        ),
      },
      {
        label: "Rotator",
        href: preApprovalEntryHash,
        iconSrc: "/brand-assets/truck-icons/rotator/rotator-green.svg",
        preApprovalTrigger: createPrivatePartyTrigger(
          "closing-cta-tiles",
          "closing-tile-rotator",
          "footer",
          { truckType: "rotator" },
        ),
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
            label: "I need zero down",
            href: "/zero-down-tow-truck-financing",
          },
          {
            label: "I need deferred payments",
            href: "/deferred-payment-tow-truck-financing",
          },
          {
            label: "I'm adding to my fleet",
            href: "/fleet-financing",
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
    faq: buildFaqSchema(privatePartyFaqs),
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Private Party Tow Truck Financing",
      description:
        "Private party tow truck financing for established towing operators buying from private sellers, auctions, retiring operators, and fleet buyouts. No dealer required. No age or mileage limits on the truck.",
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
          name: "Private Party Tow Truck Financing",
          item: "https://towloans.com/private-party-tow-truck-financing",
        },
      ],
    },
  },
};
