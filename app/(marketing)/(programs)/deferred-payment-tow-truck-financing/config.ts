import { createElement } from "react";
import type { ProgramPageConfig } from "../_components/page-config-types";
import {
  buildFaqSchema,
  type FaqItemData,
} from "@/components/sections/page/faq";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";

const strongText = (text: string) =>
  createElement("span", { className: "font-semibold text-[#111]" }, text);

const deferredPaymentFaqs: FaqItemData[] = [
  {
    id: "extra-interest",
    question: "Does deferring cost me more in interest overall?",
    answerText:
      "Marginally, yes. You're accruing carrying cost during the deferral window, and the remaining payments compress into fewer months. Over a 74-month term, most operators see a modest total interest increase. In exchange you keep several thousand dollars of working capital free during the ramp. Most operators take that trade.",
    answerContent: [
      {
        type: "text",
        value:
          "Marginally, yes. You're accruing carrying cost during the deferral window, and the remaining payments compress into fewer months. Over a 74-month term, most operators see a modest total interest increase. In exchange you keep several thousand dollars of working capital free during the ramp. Most operators take that trade.",
      },
    ],
  },
  {
    id: "rate-impact",
    question: "Does choosing deferred affect my interest rate?",
    answerText:
      "It can, slightly. The lender is taking a bit more risk by deferring real payments for 60, 90, or 120 days, and that can show up as a small rate bump. The difference is marginal and will be spelled out on your approval \u2014 you'll see the deferred and standard numbers side by side before you choose.",
    answerContent: [
      {
        type: "text",
        value:
          "It can, slightly. The lender is taking a bit more risk by deferring real payments for 60, 90, or 120 days, and that can show up as a small rate bump. The difference is marginal and will be spelled out on your approval \u2014 you'll see the deferred and standard numbers side by side before you choose.",
      },
    ],
  },
  {
    id: "touch-payment-credit",
    question: "Are touch payments real payments on my credit file?",
    answerText:
      "Yes. $99 hits on-time every month and reports as an on-time payment. Clean payment history before the real payment even starts. That matters when you come back for truck #2.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. $99 hits on-time every month and reports as an on-time payment. Clean payment history before the real payment even starts. That matters when you come back for truck #2.",
      },
    ],
  },
  {
    id: "credit-score",
    question: "What credit score do I need for deferred payments?",
    answerText:
      "640 is the baseline, same as our standard tow truck financing. The deferred option is available across our qualification range.",
    answerContent: [
      {
        type: "text",
        value:
          "640 is the baseline, same as our standard tow truck financing. The deferred option is available across our qualification range.",
      },
    ],
  },
  {
    id: "pair-with-zero-down",
    question: "Can I pair deferred payments with zero down?",
    answerText:
      "Yes. Zero down plus deferred payments is a common structure for operators adding a truck without gutting reserves during the ramp-up.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Zero down plus deferred payments is a common structure for operators adding a truck without gutting reserves during the ramp-up. See ",
      },
      {
        type: "link",
        value: "zero down tow truck financing",
        href: "/zero-down-tow-truck-financing",
      },
      {
        type: "text",
        value: " for how the zero-down side works.",
      },
    ],
  },
  {
    id: "approval-speed",
    question: "How fast can I get approved and take delivery?",
    answerText:
      "Pre-approval in 30 seconds. Full approval and funding typically closes within 2 hours of submitting the application, depending on time of day.",
    answerContent: [
      {
        type: "text",
        value:
          "Pre-approval in 30 seconds. Full approval and funding typically closes within 2 hours of submitting the application, depending on time of day.",
      },
    ],
  },
];

export const deferredPaymentPageConfig: ProgramPageConfig = {
  slug: "deferred-payment-tow-truck-financing",
  metadata: {
    title:
      "Deferred Payment Tow Truck Financing \u2014 $99/mo Until It Earns | TowLoans",
    description:
      "Take delivery today, pay $99/mo touch payments for 60, 90, or 120 days, then the real payment starts. Give the truck time to earn before it starts billing.",
    openGraph: {
      title:
        "Deferred Payment Tow Truck Financing \u2014 $99/mo Until It Earns | TowLoans",
      description:
        "Take delivery today, pay $99/mo touch payments for 60, 90, or 120 days, then the real payment starts. Give the truck time to earn before it starts billing.",
      type: "website",
    },
  },
  hero: {
    headline: "Take the Truck Today. Real Payments Start Later.",
    subheadline:
      "Finance the truck, take delivery, and make $99 touch payments for 60, 90, or 120 days while it gets on the road. When the real payment kicks in, the revenue is already there to meet it.",
    cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
    phone: { display: "(888)\u00a0555-0199", href: "tel:+18885550199" },
    trustBadges: [
      { label: "60, 90, or 120 Day Options" },
      { label: "$99 Touch Payments" },
      { label: "Any Qualified Operator" },
    ],
    heroImage: "/truck-11.jpg",
    heroImageAlt: "Tow truck financed with deferred payments",
  },
  sidebarCta: {
    headline: "See your deferred payment.",
    subhead: "Pre-approval in 30 seconds. No credit impact.",
    ctaLabel: "Get Pre-Approved",
    ctaHref: DRAWER_HASH,
  },
  sections: [
    {
      kind: "intro",
      paragraphs: [
        "A new truck doesn't earn on day one.",
        "You take delivery on a Tuesday. The driver doesn't start rolling until the following Monday. First week is slow \u2014 the truck's new to the routes, the dispatchers are learning it's available, the contracts haven't fully rotated it into the lineup yet. Real revenue doesn't show up until week three or four.",
        "And the first full monthly payment? That's due about the time the truck is finally hitting its stride.",
        [
          "Deferred payment financing fixes the timing problem. You take delivery today. You pay ",
          strongText("$99/month"),
          " for 60, 90, or 120 days \u2014 enough to keep the account active and build your payment history \u2014 and the real monthly payment doesn't start until the truck has had time to find its rhythm.",
        ],
        "This isn't a promotional rate. It isn't a credit-tier giveaway. It's open to any operator who qualifies for our financing.",
      ],
    },
    {
      kind: "contentSection",
      id: "timing-problem",
      tocLabel: "The timing problem",
      eyebrow: "THE TIMING PROBLEM",
      heading: "Why the First 90 Days Matter More Than You Think",
      paragraphs: [
        "A tow truck payment doesn't care that the truck is new to the fleet. The first invoice lands on the same schedule whether the truck did 40 tows that month or 4.",
        "Here's what actually happens in the first 90 days of a new truck:",
      ],
      list: [
        {
          label: "Weeks 1\u20132",
          body: "Upfit, registration, permits, insurance, driver onboarding.",
        },
        {
          label: "Weeks 3\u20134",
          body: "Soft launch, building into dispatch rotation, learning new routes.",
        },
        {
          label: "Weeks 5\u20138",
          body: "Hitting normal volume, but still catching up on 30\u201345 day receivables.",
        },
        {
          label: "Weeks 9\u201312",
          body: "Cash from early tows finally lands. Truck is now self-funding.",
        },
      ],
      closingParagraphs: [
        "That's the real curve. Every operator who's added a truck has lived it.",
      ],
    },
    {
      kind: "pullQuote",
      content:
        "The payment calendar and the revenue calendar don't match. Deferred payments align them.",
    },
    {
      kind: "contentSection",
      paragraphs: [
        "The first real payment lands in month four or later \u2014 right around the time cash from the truck's earliest work is hitting the bank.",
      ],
    },
    {
      kind: "inlineCta",
      config: {
        eyebrow: "TIME IT RIGHT.",
        message: "See your deferred payment in 30 seconds.",
        ctaLabel: "Get Pre-Approved",
        ctaHref: DRAWER_HASH,
        iconSrc:
          "/brand-assets/benefit-icons/deferment/deferment-90-light.svg",
        iconAlt: "",
      },
    },
    {
      kind: "contentSection",
      id: "who-uses-it",
      tocLabel: "Who uses it",
      heading: "Who Uses Deferred Payments (And Why)",
      paragraphs: [
        "This isn't a first-truck program. It's a timing program. It's built for operators who are already qualified \u2014 who already know how towing works \u2014 and want the payment schedule to line up with actual cash flow.",
      ],
      list: [
        {
          label: "Operators adding capacity",
          body: "You're running 3 trucks and adding a 4th. Give the new truck time to earn its spot in the rotation before the real payment starts.",
        },
        {
          label: "Seasonal ramps",
          body: "Winter recovery, summer highway work, storm response. Pay $99 through the slow months. Real payments start when the work starts.",
        },
        {
          label: "New market expansion",
          body: "New service area or new motor club relationship. Contracts take time to rotate the new truck into calls. Deferred payments carry you through the ramp.",
        },
        {
          label: "Replacing a truck still on payments",
          body: "Old truck has 4 months left on its note. Don't pay two full payments at once \u2014 defer the new one until the old one falls off.",
        },
      ],
    },
    {
      kind: "pullQuote",
      content:
        "Anyone who qualifies for our financing qualifies for deferred payments. There's no separate bar. If you're approved, it's on the table.",
    },
    {
      kind: "divider",
    },
    {
      kind: "contentSection",
      id: "how-it-works",
      tocLabel: "How it works",
      heading: "Three Options. Same Qualification. Straight Math.",
      paragraphs: [
        "When you're approved, you choose the deferral window that matches your situation:",
      ],
      list: [
        {
          label: "60 days",
          body: "Tightest window. Smallest adjustment to the remaining payments.",
        },
        {
          label: "90 days",
          body: "The middle option. Most operators land here.",
        },
        {
          label: "120 days",
          body: "Longest runway. Slightly higher adjustment on the remaining payments.",
        },
      ],
      closingParagraphs: [
        "During the deferral window, you pay $99/month in touch payments. Not a skipped month. A real payment that keeps the account active, logs on-time history with the lender, and shows the paper trail of a performing borrower.",
        "When the deferral ends, your real monthly payment starts.",
      ],
    },
    {
      kind: "comparisonTable",
      id: "the-math",
      tocLabel: "The math",
      heading: "What the Deferral Actually Costs You",
      introParagraphs: [
        "Here's the part most lenders skip over. We'll put it on the table.",
        "Deferring doesn't erase payments. It compresses them.",
        [
          "Take a 74-month term. Use the longest deferral. You pay ",
          strongText("$99 for the first 6 months"),
          ", then make ",
          strongText("68 real payments"),
          " covering the same amount financed.",
        ],
      ],
      example: "Example: $95,000 financed truck, 74-month term, longest deferral window.",
      withDownLabel: "Standard",
      zeroDownLabel: "Deferred",
      mobileWithDownLabel: "Standard",
      mobileZeroDownLabel: "Deferred",
      rows: [
        {
          label: "Touch payments at $99",
          withDown: "0 months",
          zeroDown: "6 months",
        },
        {
          label: "Real monthly payment",
          withDown: "~$1,520/mo (mo 1\u201374)",
          zeroDown: "~$1,660/mo (mo 7\u201374)",
        },
        {
          label: "Total real payments",
          withDown: "74",
          zeroDown: "68",
        },
        {
          label: "Cash freed in first 6 months",
          withDown: "$0",
          zeroDown: "~$8,500",
        },
      ],
      closingParagraphs: [
        "The difference is roughly $140/month on the remaining term. In exchange, you get ~$8,500 of cash flow back in the first six months \u2014 when the truck is ramping and that cash is doing the most work.",
        "Six months of breathing room for about $140/month more on the back half. That's the trade.",
        "Most operators run the math and take it.",
        [
          strongText("One honest note on rate:"),
          " your rate may come in slightly higher on a deferred structure than a standard one \u2014 the lender is carrying a little more risk by waiting months for real payments to start. The difference is marginal, and it's reflected in the numbers you see on your approval. No guessing.",
        ],
      ],
    },
    {
      kind: "inlineCta",
      config: {
        eyebrow: "SEE THE NUMBERS ON YOUR DEAL.",
        message: "Deferred and standard payments, side by side in 30 seconds.",
        ctaLabel: "Get Pre-Approved",
        ctaHref: DRAWER_HASH,
        iconSrc:
          "/brand-assets/benefit-icons/fast/fast-funding-light.svg",
        iconAlt: "",
      },
    },
    {
      kind: "contentSection",
      id: "touch-payments",
      tocLabel: "Touch payments",
      heading: "Touch Payments Aren't Skipped Payments",
      paragraphs: [
        "A skipped payment shows up on your credit report as a skipped payment. It dings your history with the lender. It makes the next loan harder.",
        "A touch payment is a real, on-time payment. $99 hits the account every month during the deferral window. The lender sees on-time payments. Your account is in good standing from day one.",
      ],
      closingParagraphs: [
        "That matters when you come back for truck #2, truck #5, the wrecker, the rotator. The file the underwriter pulls shows a clean payment record \u2014 not a gap.",
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "contentSection",
      id: "qualification",
      tocLabel: "Qualification",
      heading: "Same Bar. No Extra Hoops.",
      paragraphs: [
        "There is no separate credit tier for deferred payments. If you qualify to finance the truck, you qualify for the deferral.",
      ],
      list: [
        {
          label: "Credit baseline",
          body: "640, same as all our tow truck financing.",
        },
        {
          label: "Business requirement",
          body: "Same as standard \u2014 active towing operation or comparable experience.",
        },
        {
          label: "Paperwork",
          body: "Same as standard. Nothing extra for the deferred option.",
        },
        {
          label: "Truck eligibility",
          body: "Any truck we finance. New, used, dealer, private seller, auction.",
        },
      ],
      closingParagraphs: [
        "You tell us 60, 90, or 120 at application. The structure is in the offer from the first approval.",
      ],
    },
    {
      kind: "promoPanel",
      id: "calculator",
      tocLabel: "Run the numbers",
      heading: "Run the Numbers Before You Commit",
      paragraphs: [
        "Gut feel says the deferral will fit. But you should know exactly how the cash flow reshapes before you sign.",
        "Our tow truck ROI calculator lets you plug in purchase price, tow volume, rate per call, insurance, and fuel \u2014 and see what comes back:",
      ],
      bullets: [
        {
          title: "Monthly cash flow",
          body: "during the touch-payment window vs. after real payments start",
        },
        {
          title: "Breakeven calls",
          body: "how many tows per month the truck needs to cover the real payment",
        },
        {
          title: "Ramp-up runway",
          body: "how much working capital stays in the business during the deferral",
        },
      ],
      closingParagraphs: [
        "No signup. No email required. Just your numbers and the answer.",
      ],
      cta: {
        href: "/tow-truck-calculator",
        label: "Run the Calculator",
      },
    },
    {
      kind: "relatedPrograms",
      heading: "Pair It With What Works for You",
      paragraphs: [
        "Deferred payments is one piece. We built programs around how towing operators actually buy and run trucks.",
      ],
      programs: [
        {
          title: "Zero down",
          body:
            "$0 down on nearly every approval. Keep the working capital in your business on day one, then pair with deferred payments for maximum cash preservation through the ramp.",
          linkLabel: "See details",
          href: "/zero-down-tow-truck-financing",
          iconSrc:
            "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
        },
        {
          title: "Fleet financing",
          body:
            "Adding your third, fifth, or tenth truck? Fleet operators get streamlined approvals and terms that reflect the business you've already built.",
          linkLabel: "See details",
          href: "/fleet-financing",
          iconSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
        },
        {
          title: "Private-party financing",
          body:
            "Found the right truck from another operator? We finance private-party deals with the same terms as dealer purchases. No markup, no middleman.",
          linkLabel: "See details",
          href: "/private-party-tow-truck-financing",
          iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
        },
      ],
    },
  ],
  faqSection: {
    heading: "Deferred Payment Financing FAQ",
    faqs: deferredPaymentFaqs,
  },
  closingCta: {
    iconSrc: "/brand-assets/benefit-icons/deferment/deferment-180-light.svg",
    iconAlt: "",
    eyebrow: "LET THE TRUCK START EARNING.",
    headline: "Take delivery today. Pay $99 while it finds its rhythm.",
    body: "Pre-approval takes 30 seconds and shows you the deferred structure alongside the standard one. No credit impact. No commitment.",
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
            label: "I need zero down",
            href: "/zero-down-tow-truck-financing",
          },
          {
            label: "I need to finance a used tow truck",
            href: "/used-tow-truck-financing",
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
  schemas: {
    faq: buildFaqSchema(deferredPaymentFaqs),
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Deferred Payment Tow Truck Financing",
      description:
        "Deferred payment tow truck financing with $99 touch payments for 60, 90, or 120 days. Take delivery today and let the truck start earning before real payments begin.",
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
          name: "Deferred Payment Tow Truck Financing",
          item: "https://towloans.com/deferred-payment-tow-truck-financing",
        },
      ],
    },
  },
};
