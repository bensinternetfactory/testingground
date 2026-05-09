import type {
  CarouselSlide,
  EquipmentChoice,
  FooterColumn,
  NavItem,
  Program,
  ProgramCard,
  ProofItem,
} from "./types";

export const PHONE_DISPLAY = "(888) 555-0199";
export const PHONE_TEL = "tel:+18885550199";

export const PROMO_STRIP = {
  copy: "Know your truck payment in less than 30 seconds before applying. No credit check required.",
  ctaLabel: "Find out now",
  ctaHref: "/tow-truck-calculator",
} as const;

export const HEADER_NAV: NavItem[] = [
  { label: "Programs", href: "/programs" },
  { label: "Equipment Types", href: "/equipment" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Resources", href: "/resources" },
  { label: "Apply Now", href: "/pre-approval" },
];

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    eyebrow: "Limited-time program",
    headline: "$0 down on rollback financing",
    body: "Pre-approved offers in 30 seconds. Funding in as little as 24 hours.",
    ctaLabel: "Get Pre-Qualified",
    ctaHref: "/pre-approval",
    imageSrc: "/truck-3.jpg",
    imageAlt: "Rollback flatbed tow truck on the road",
    bg: "var(--t-bg-tint)",
  },
  {
    eyebrow: "Built for owner-operators",
    headline: "Approvals on credit scores from 600+",
    body: "We work with new operators and credit-challenged buyers other lenders turn away.",
    ctaLabel: "See if you qualify",
    ctaHref: "/pre-approval",
    imageSrc: "/truck-7.jpg",
    imageAlt: "Heavy-duty wrecker on a worksite",
    bg: "#eef3f8",
  },
  {
    eyebrow: "Up to $750,000",
    headline: "Heavy wrecker and rotator financing",
    body: "Flexible terms up to 84 months on Class 8 wreckers and rotators.",
    ctaLabel: "Explore heavy-duty",
    ctaHref: "/heavy-wrecker-financing",
    imageSrc: "/truck-11.jpg",
    imageAlt: "Heavy wrecker recovery vehicle",
    bg: "#fff5d8",
  },
  {
    eyebrow: "Refinance & save",
    headline: "Lower your tow truck payment",
    body: "Roll old equipment loans into one payment with better terms.",
    ctaLabel: "See refinance options",
    ctaHref: "/refinancing",
    imageSrc: "/truck-9.jpg",
    imageAlt: "Tow truck ready for service",
    bg: "var(--t-bg-soft)",
  },
];

export const EQUIPMENT_CHOICES: EquipmentChoice[] = [
  { label: "Rollback", href: "/rollback-financing", iconKind: "rollback" },
  { label: "Wrecker", href: "/wrecker-financing", iconKind: "wrecker" },
  { label: "Heavy Wrecker", href: "/heavy-wrecker-financing", iconKind: "heavy-wrecker" },
  { label: "Rotator", href: "/rotator-financing", iconKind: "rotator" },
];

export const FEATURED_BANNER = {
  eyebrow: "New operators welcome",
  headline: "Starting a tow business? We finance day-one buyers.",
  body: "No business history required. Pre-qualify with personal credit and get matched to startup-friendly lenders.",
  ctaLabel: "Start your application",
  ctaHref: "/startup-financing",
  imageSrc: "/truck-10.jpg",
  imageAlt: "Owner-operator standing next to a new tow truck",
};

export const PROGRAMS: Program[] = [
  { label: "Startup", description: "First-time owner-operators", href: "/startup-financing" },
  { label: "Bad Credit", description: "Approvals from 580+", href: "/bad-credit" },
  { label: "No-Doc", description: "Skip the tax returns", href: "/no-doc-financing" },
  { label: "Refinancing", description: "Lower your payment", href: "/refinancing" },
  { label: "Used Equipment", description: "Up to 15 years old", href: "/used-equipment-financing" },
  { label: "Owner-Operator", description: "Built for solo drivers", href: "/owner-operator-financing" },
];

export const SPOTLIGHT = {
  eyebrow: "Featured financing program",
  headline: "Rollback financing built for working operators",
  body: "From 22-foot single-car rollbacks to multi-car carriers, get pre-qualified offers from lenders who actually fund tow operators. Same-day decisions, no obligation.",
  ctaLabel: "See Rollback Financing",
  ctaHref: "/rollback-financing",
  imageSrc: "/truck-12.jpg",
  imageAlt: "Rollback carrier loaded with a vehicle",
};

export const WHY_TOWLOANS = [
  { icon: "ShieldCheck", title: "Soft credit check", body: "We pre-qualify you with a soft pull. Your score doesn't move." },
  { icon: "Zap", title: "30-second pre-approval", body: "Real offers from real lenders, not a lead form." },
  { icon: "BadgeCheck", title: "Tow-specific lenders", body: "Underwriters who understand rollback, wrecker, and rotator value." },
  { icon: "Phone", title: "Specialists, not call centers", body: "One person guides you from quote to keys." },
];

export const PROGRAM_CARDS: ProgramCard[] = [
  {
    title: "Startup Financing",
    description: "Day-one tow operators get matched to lenders who underwrite the buyer, not the business.",
    qualifyingNote: "No business history required",
    ctaLabel: "See startup options",
    ctaHref: "/startup-financing",
    imageSrc: "/truck-13.jpg",
    imageAlt: "New rollback tow truck",
  },
  {
    title: "Bad Credit Financing",
    description: "Credit-challenged operators with 580+ FICO get real, fundable offers.",
    qualifyingNote: "Scores from 580+",
    ctaLabel: "See bad credit options",
    ctaHref: "/bad-credit",
    imageSrc: "/truck-14.jpg",
    imageAlt: "Wrecker on the lot",
  },
  {
    title: "No-Doc Financing",
    description: "Skip the tax returns and bank statements on qualifying loan amounts.",
    qualifyingNote: "Up to $250,000 with no docs",
    ctaLabel: "See no-doc options",
    ctaHref: "/no-doc-financing",
    imageSrc: "/truck-15.jpg",
    imageAlt: "Tow truck on a roadside job",
  },
  {
    title: "Refinancing",
    description: "Lower your monthly payment or roll multiple equipment loans into one.",
    qualifyingNote: "Cut payments up to 30%",
    ctaLabel: "See refinance options",
    ctaHref: "/refinancing",
    imageSrc: "/truck-2.jpg",
    imageAlt: "Tow truck parked at a yard",
  },
  {
    title: "Used Equipment",
    description: "Finance equipment up to 15 years old with terms most banks won't offer.",
    qualifyingNote: "Up to 84-month terms",
    ctaLabel: "See used options",
    ctaHref: "/used-equipment-financing",
    imageSrc: "/truck-6.jpg",
    imageAlt: "Used rollback for sale",
  },
  {
    title: "Owner-Operator",
    description: "Solo-operator programs with flexible underwriting and personal-credit approvals.",
    qualifyingNote: "Built for one-truck shops",
    ctaLabel: "See owner-op options",
    ctaHref: "/owner-operator-financing",
    imageSrc: "/truck-8.jpg",
    imageAlt: "Owner-operator and tow truck",
  },
];

export const PROOF_ITEMS: ProofItem[] = [
  {
    kind: "testimonial",
    title: "“Approved in an hour, funded the next day.”",
    subtitle: "Carlos M., Houston TX",
    body: "Two banks turned me down. TowLoans matched me with a lender who actually finances startup tow ops.",
    attribution: "Owner-operator, 2024 rollback",
  },
  {
    kind: "funded",
    title: "$148,000 funded",
    subtitle: "Heavy wrecker, 72-month term",
    body: "Bad credit, rebuilding from a prior business. Approved with a 612 FICO and 10% down.",
    meta: "Atlanta, GA · Mar 2025",
  },
  {
    kind: "approval",
    title: "Approved in 27 seconds",
    subtitle: "Pre-qualified offer to Jen K.",
    body: "First-time owner-operator, no business history. Two competing lender offers at submission.",
    meta: "Boise, ID · Apr 2025",
  },
];

export const HOW_IT_WORKS_STEPS = [
  { n: 1, title: "Tell us what you need", body: "Equipment type, ballpark price, and a few details about you. 30 seconds." },
  { n: 2, title: "Get matched to lenders", body: "Soft credit check pre-qualifies you with multiple tow-specific lenders." },
  { n: 3, title: "Pick your offer and sign", body: "Compare terms, choose the best offer, and sign electronically. Funding in as little as 24 hours." },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Programs",
    links: [
      { label: "Startup", href: "/startup-financing" },
      { label: "Bad Credit", href: "/bad-credit" },
      { label: "No-Doc", href: "/no-doc-financing" },
      { label: "Refinancing", href: "/refinancing" },
      { label: "Used Equipment", href: "/used-equipment-financing" },
      { label: "Owner-Operator", href: "/owner-operator-financing" },
    ],
  },
  {
    heading: "Equipment Types",
    links: [
      { label: "Rollback", href: "/rollback-financing" },
      { label: "Wrecker", href: "/wrecker-financing" },
      { label: "Heavy Wrecker", href: "/heavy-wrecker-financing" },
      { label: "Rotator", href: "/rotator-financing" },
      { label: "DTU", href: "/dtu-financing" },
      { label: "Lowboy", href: "/lowboy-financing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Payment Calculator", href: "/payment-calculator" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "FAQ", href: "/faq" },
      { label: "Tow Truck Buying Guide", href: "/tow-truck-buying-guide" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: PHONE_DISPLAY, href: PHONE_TEL },
      { label: "Email Support", href: "mailto:hello@towloans.com" },
      { label: "Get Pre-Approved", href: "/pre-approval" },
    ],
  },
];
