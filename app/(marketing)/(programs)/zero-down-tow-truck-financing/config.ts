import { createElement } from "react";
import type { ProgramPageConfig } from "../_components/page-config-types";
import {
  buildFaqSchema,
  type FaqItemData,
} from "@/components/sections/page/faq";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";

const strongText = (text: string) =>
  createElement("span", { className: "font-semibold text-[#111]" }, text);

const zeroDownFaqs: FaqItemData[] = [
  {
    id: "higher-rates",
    question: "Does zero down mean higher interest rates?",
    answerText:
      "No. Your rate is based on your credit profile and business history, not your down payment amount. $0 down doesn't mean you pay a premium \u2014 the rate is the same whether you put money down or not.",
    answerContent: [
      {
        type: "text",
        value:
          "No. Your rate is based on your credit profile and business history, not your down payment amount. $0 down doesn't mean you pay a premium \u2014 the rate is the same whether you put money down or not.",
      },
    ],
  },
  {
    id: "put-money-down",
    question: "Can I still put money down if I want to?",
    answerText:
      "Yes. Some operators prefer a lower monthly payment and choose to put 10-20% down. The option is yours. We don't require it.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Some operators prefer a lower monthly payment and choose to put 10-20% down. The option is yours. We don't require it.",
      },
    ],
  },
  {
    id: "credit-score",
    question: "What credit score do I actually need?",
    answerText:
      "640 is the baseline for both qualification paths. If you're close but not quite there, apply anyway \u2014 we look at the full picture, not just the number.",
    answerContent: [
      {
        type: "text",
        value:
          "640 is the baseline for both qualification paths. If you're close but not quite there, apply anyway \u2014 we look at the full picture, not just the number.",
      },
    ],
  },
  {
    id: "approval-speed",
    question: "How fast is the approval process?",
    answerText:
      "Pre-approval takes less than 30 seconds and does not impact your credit score. Full approval and funding typically takes 2 hours after you submit your application depending on the time of day.",
    answerContent: [
      {
        type: "text",
        value:
          "Pre-approval takes less than 30 seconds and does not impact your credit score. Full approval and funding typically takes 2 hours after you submit your application depending on the time of day.",
      },
    ],
  },
  {
    id: "private-sellers",
    question: "Do you finance trucks from private sellers?",
    answerText:
      "Yes. Dealer, private party, auction \u2014 the source doesn't matter. Same terms, same zero-down availability regardless of where the truck comes from.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Dealer, private party, auction \u2014 the source doesn't matter. Same terms, same zero-down availability regardless of where the truck comes from. See ",
      },
      {
        type: "link",
        value: "private-party tow truck financing",
        href: "/private-party-tow-truck-financing",
      },
      {
        type: "text",
        value: " for how private deals work.",
      },
    ],
  },
  {
    id: "comparable-debt",
    question: "What's \u201Ccomparable debt\u201D exactly?",
    answerText:
      "It means you've made at least 12 on-time payments on an auto loan or installment loan worth at least half of what you're looking to borrow. If you're borrowing $80,000, we want to see 12 payments on a $40,000+ loan. It's proof you can manage the payment.",
    answerContent: [
      {
        type: "text",
        value:
          "It means you've made at least 12 on-time payments on an auto loan or installment loan worth at least half of what you're looking to borrow. If you're borrowing $80,000, we want to see 12 payments on a $40,000+ loan. It's proof you can manage the payment.",
      },
    ],
  },
  {
    id: "max-loan-amount",
    question: "Is there a maximum loan amount with zero down?",
    answerText:
      "We finance tow trucks from $25,000 to $3,000,000+. Zero down is available across the full range for qualified operators.",
    answerContent: [
      {
        type: "text",
        value:
          "We finance tow trucks from $25,000 to $3,000,000+. Zero down is available across the full range for qualified operators.",
      },
    ],
  },
];

export const zeroDownPageConfig: ProgramPageConfig = {
  slug: "zero-down-tow-truck-financing",
  metadata: {
    title: "Zero Down Tow Truck Financing \u2014 Any Truck, Any Age | TowLoans",
    description:
      "Zero down tow truck financing on any truck age, any mileage, any seller. Keep your cash in the business and let the truck earn. Pre-approved in 30 seconds.",
    openGraph: {
      title: "Zero Down Tow Truck Financing \u2014 Any Truck, Any Age | TowLoans",
      description:
        "Zero down tow truck financing on any truck age, any mileage, any seller. Keep your cash in the business and let the truck earn. Pre-approved in 30 seconds.",
      type: "website",
    },
  },
  hero: {
    headline: "Keep Your Cash. Add a Truck. Let It Earn.",
    subheadline:
      "$0 down on nearly every approval. Any truck age. Any mileage. Any seller. Your working capital stays in the business while the truck starts earning on day one.",
    cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
    phone: { display: "(888)\u00a0555-0199", href: "tel:+18885550199" },
    trustBadges: [
      { label: "30-Second Pre-Approval" },
      { label: "No Credit Impact" },
      { label: "Any Truck. Any Age." },
    ],
    heroImage: "/truck-6.jpg",
    heroImageAlt: "Tow truck financed with zero down",
  },
  sidebarCta: {
    headline: "Ready to move?",
    subhead: "Pre-approval in 30 seconds. No credit impact.",
    ctaLabel: "Get Pre-Approved",
    ctaHref: DRAWER_HASH,
  },
  sections: [
    {
      kind: "intro",
      paragraphs: [
        "A $15,000 down payment doesn't make you a better operator. It just makes you a cash-poor one.",
        "Zero down tow truck financing means that money stays in your business \u2014 covering payroll, insurance, fuel, and the next opportunity \u2014 while the truck you just financed starts pulling revenue on day one.",
        "We offer $0 down on nearly every approval we issue. Not as an exception. Not buried in fine print. It's how we structure deals because we understand how towing actually works: the truck pays for itself if your cash flow isn't gutted before you even make the first tow.",
        "Any truck age. Any mileage. Dealer, auction, private seller. The down payment requirement that's been holding up your next truck? We removed it.",
      ],
    },
    {
      kind: "contentSection",
      id: "business-case",
      tocLabel: "The business case",
      heading: "Why Zero Down Is a Business Decision, Not a Handout",
      paragraphs: [
        "Most lenders treat a down payment like a trust exercise. Put skin in the game, prove you're serious. That logic makes sense for consumer auto loans. It falls apart in towing.",
        "Here's the math operators already know:",
      ],
    },
    {
      kind: "pullQuote",
      content:
        "A single tow truck averaging 2\u20133 calls per day at $200+ per tow generates $12,000\u2013$18,000/month in gross revenue. A typical monthly payment on a financed truck runs $1,500\u2013$1,600. The truck covers its own payment within the first week of the month.",
    },
    {
      kind: "contentSection",
      paragraphs: [
        "So why would you drain $10,000\u2013$25,000 in working capital for a down payment when the truck starts earning before the first bill hits?",
        "That cash has better places to be:",
      ],
      list: [
        {
          label: "Operating reserves",
          body:
            "one insurance renewal or major repair bill and you're scrambling",
        },
        {
          label: "Growth capital",
          body:
            "the next truck, the next contract, the next opportunity that shows up on a Tuesday with no warning",
        },
        {
          label: "Payroll",
          body: "drivers don't wait for your cash flow to catch up",
        },
        {
          label: "Equipment",
          body:
            "new bed, new wheel lift, GPS, lighting \u2014 the stuff that keeps trucks road-ready",
        },
      ],
      closingParagraphs: [
        "Zero down isn't about qualifying for less. It's about deploying capital where it works hardest.",
      ],
    },
    {
      kind: "inlineCta",
      config: {
        eyebrow: "STOP SAVING. START EARNING.",
        message: "Know your $0-down payment in 30 seconds.",
        ctaLabel: "Get Pre-Approved",
        ctaHref: DRAWER_HASH,
        iconSrc:
          "/brand-assets/benefit-icons/zero-down/no-money-down-light.svg",
        iconAlt: "",
      },
    },
    {
      kind: "qualificationPaths",
      id: "how-to-qualify",
      tocLabel: "How to qualify",
      heading: "How to Qualify for $0 Down",
      paragraphs: [
        "No guesswork. There are two paths. You probably already fit one of them.",
      ],
      paths: [
        {
          label: "PATH A",
          title: "Credit and Comparable Debt",
          items: [
            {
              label: "640+ credit score",
              body: "Not perfect credit. Not 700. Just 640.",
            },
            {
              label: "2 years in business",
              body: "You've survived the hardest part. That matters.",
            },
            {
              label: "Comparable debt",
              body:
                "At least 12 payments on an auto or installment loan worth half the amount you're borrowing.",
            },
          ],
          explanation:
            "That last one trips people up, so here's what it means in plain terms: if you're financing a $100,000 truck, we want to see that you've made 12 consecutive payments on a loan of $50,000 or more. Could be a truck you already own. Could be equipment. Could be a personal vehicle loan. It proves you can handle the payment \u2014 and that's what lets us drop the down payment to zero.",
        },
        {
          label: "PATH B",
          title: "Fleet Operator",
          items: [
            { label: "640+ credit score", body: "Same bar." },
            { label: "2 years in business", body: "Same bar." },
            {
              label: "3+ tow trucks in your fleet",
              body:
                "You're already running an operation. The fleet itself is the proof.",
            },
          ],
          explanation:
            "If you're running three trucks, you know how to manage payments, insurance, maintenance, and drivers. That track record replaces the need for comparable debt.",
        },
      ],
      closingNote: [
        strongText("Don't fit either path exactly?"),
        " Apply anyway. These are the two fastest routes to $0 down, but we structure every deal individually. Your situation might qualify through a different combination.",
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "featureGrid",
      id: "any-truck",
      tocLabel: "Any truck, any age",
      heading: "Any Truck. Any Age. Any Seller.",
      introParagraphs: [
        "This is where most \u201Czero down\u201D offers fall apart with other lenders. The asterisks start piling up: new trucks only. Dealer purchases only. Under 100,000 miles only.",
        "We don't do that.",
      ],
      items: [
        {
          title: "Truck type",
          body:
            "Rollbacks, flatbeds, wreckers, heavy wreckers, rotators, integrated carriers. Light duty through heavy recovery.",
        },
        {
          title: "Truck age",
          body:
            "New off the lot or 20+ years old. If it's mechanically sound and makes business sense, we'll finance it.",
        },
        {
          title: "Mileage",
          body: "No cap. The odometer is not a disqualifier.",
        },
        {
          title: "Seller",
          body:
            "Dealer, private party, auction, Facebook Marketplace, the operator down the road who's retiring.",
        },
      ],
      closingParagraphs: [
        "The truck needs to make sense for your business. That's the bar. Not an arbitrary checklist designed to protect the lender at the operator's expense.",
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "comparisonTable",
      id: "the-math",
      tocLabel: "The math",
      heading: "What $0 Down Looks Like in Practice",
      introParagraphs: [
        "Forget the abstract. Here's what this means for a real deal:",
      ],
      example: "Example: Used rollback, $75,000 purchase price, 60-month term.",
      withDownLabel: "With $7,500\u2013$15,000 Down",
      zeroDownLabel: "With $0 Down",
      mobileWithDownLabel: "With down",
      mobileZeroDownLabel: "With $0 down",
      rows: [
        {
          label: "Down payment",
          withDown: "$7,500\u2013$15,000",
          zeroDown: "$0",
        },
        {
          label: "Amount financed",
          withDown: "$60,000\u2013$67,500",
          zeroDown: "$75,000",
        },
        {
          label: "Monthly payment",
          withDown: "$1,230\u2013$1,450/mo",
          zeroDown: "$1,540\u2013$1,610/mo",
        },
        {
          label: "Cash left in your business",
          withDown: "Down by $7,500\u2013$15,000",
          zeroDown: "Untouched",
        },
        {
          label: "Time to first tow",
          withDown: "After months of saving + approval",
          zeroDown: "Days",
        },
      ],
      closingParagraphs: [
        "Look at those two columns. Same truck. Same term. Same seller. The only thing that moves between them is whether $15,000 leaves your business account.",
        "Here's what that $15,000 actually buys you: roughly $200 off your monthly payment. Over the 60-month term, that's about $12,000 in \u201Csavings.\u201D",
        [
          "Do the arithmetic. ",
          strongText("You paid $15,000 to save $12,000."),
          " That's not a discount. It's a prepayment \u2014 and a losing one. You're lending yourself your own working capital, and getting back less than you put in.",
        ],
        "The left column isn't the \u201Cresponsible\u201D choice. It's an operator who sent $15,000 to a lender that didn't need it, to avoid payments they could cover out of tow revenue anyway.",
      ],
    },
    {
      kind: "inlineCta",
      config: {
        eyebrow: "KNOW YOUR PAYMENT. ZERO DOWN.",
        message: "See your payment before you commit to a truck.",
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
      heading: "Run the Numbers on Your Truck",
      paragraphs: [
        "Gut feel says the truck will cash flow. But you should know exactly how much before you commit.",
        "Our tow truck ROI calculator lets you plug in the real numbers \u2014 purchase price, your tow volume, average rate per call, insurance, fuel \u2014 and see what comes back:",
      ],
      bullets: [
        {
          title: "Monthly cash flow",
          body: "after the payment, insurance, and operating costs",
        },
        {
          title: "Breakeven calls",
          body: "how many tows per month before the truck pays for itself",
        },
        {
          title: "Payback period",
          body: "when the truck has fully earned back its cost",
        },
        {
          title: "Profit per tow",
          body: "what you actually keep after expenses on every call",
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
        "Zero down is one piece. We built programs around how towing operators actually buy and run trucks.",
      ],
      programs: [
        {
          title: "Deferred payments",
          body:
            "No payments for up to 180 days. Get the truck on the road, build the revenue stream, then start paying. Combined with $0 down, you add a truck with zero upfront cost and six months of breathing room.",
          linkLabel: "See details",
          href: "/deferred-payment-tow-truck-financing",
          iconSrc:
            "/brand-assets/benefit-icons/deferment/deferment-180-dark.svg",
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
    heading: "Zero Down Financing FAQ",
    faqs: zeroDownFaqs,
  },
  closingCta: {
    iconSrc: "/brand-assets/benefit-icons/zero-down/no-money-down-light.svg",
    iconAlt: "",
    eyebrow: "STOP SAVING. START EARNING.",
    headline: "Every month you wait, the truck doesn't earn.",
    body: "Pre-approval takes 30 seconds and does not impact your credit. Pick the truck you're eyeing and see your payment.",
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
    faq: buildFaqSchema(zeroDownFaqs),
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Zero Down Tow Truck Financing",
      description:
        "Zero down tow truck financing on any truck age, mileage, and seller. $0 down available on nearly every approval.",
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
          name: "Zero Down Tow Truck Financing",
          item: "https://towloans.com/zero-down-tow-truck-financing",
        },
      ],
    },
  },
};
