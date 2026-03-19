import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import truck3 from "@/public/truck-3.jpg";
import { HeroConvertFramed } from "@/components/sections/heroes/hero-convert-framed";
import type { HeroConvertConfig } from "@/components/sections/heroes/hero-convert-geico";
import {
  FaqSection,
  buildFaqSchema,
} from "@/components/sections/page/faq";
import type { FaqItemData, FaqSectionConfig } from "@/components/sections/page/faq";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { JsonLd } from "@/components/shared/JsonLd";
import { DrawerProvider, DRAWER_HASH } from "@/components/ui/pre-approval-drawer";
import { ProofBlock, PROOF_BLOCK_CONFIG } from "@/components/sections/page/proof-block";
import { BrandMarquee } from "@/components/sections/page/brand-marquee";
import { TrustBridge, TRUST_BRIDGE_CONFIG } from "@/components/sections/page/trust-bridge";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import { Footer, FOOTER_CONFIG } from "@/components/sections/page/footer";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "[Preview] Rollback Financing v2 | TowLoans",
  description:
    "Finance any rollback tow truck — used, private seller, or auction. Pre-approved in 30 seconds with no credit check. Deferred payments up to 180 days. $0 down available.",
  openGraph: {
    title: "[Preview] Rollback Financing v2 | TowLoans",
    description:
      "Used trucks, private sellers, auction units. Pre-approved in 30 seconds with no credit check.",
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

const heroConfig: HeroConvertConfig = {
  headline: "Need Rollback Financing?",
  bodyCopy:
    "We'll pre-approve you for your next truck in less then 30 seconds. Know your payment before you apply.",
  selectionPrompt: "What do you need financing on?",
  selectionRequiredMessage:
    "hello",
  tiles: [
    {
      id: "light-duty",
      label: "Light-Duty Rollback",
      icon: (
        <Image
          src="/brand-assets/truck-icons/rollback/rollback-light-green.svg"
          alt=""
          aria-hidden="true"
          width={150}
          height={43}
          className="h-8 w-auto sm:h-12"
        />
      ),
    },
    {
      id: "medium-heavy",
      label: "Medium / Heavy-Duty Rollback",
      icon: (
        <Image
          src="/brand-assets/truck-icons/rollback/rollback-green.svg"
          alt=""
          aria-hidden="true"
          width={150}
          height={43}
          className="h-8 w-auto sm:h-12"
        />
      ),
    },
  ],
  cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
  tertiaryLinks: [
    {
      label: "I found a rollback and need financing",
      href: "/tow-truck-calculator?type=rollback",
    },
    {
      label: "What's my buying power?",
      href: "/tow-truck-leasing",
    },
  ],
  microcopy:
    "No credit check for pre-approval. Full approval uses a soft Experian inquiry, so your score stays untouched.",
  disclaimer:
    "All financing is subject to credit review and approval. Terms vary by truck, seller, and business profile.",
  heroImage: truck3,
  heroImageAlt: "Rollback tow truck ready for financing",
};

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */

const faqItems: FaqItemData[] = [
  {
    id: "credit-score",
    question: "What credit score do I need for rollback financing?",
    answerText:
      "Pre-approval requires no credit check. Full approval uses a soft Experian inquiry. TowLoans works with a range of credit profiles.",
    answerContent: [
      {
        type: "text",
        value:
          "Pre-approval doesn\u2019t check your credit at all. When you move to full approval, we pull Experian as a soft inquiry \u2014 it won\u2019t affect your score. We work with a range of credit profiles, including operators who\u2019ve been turned down elsewhere.",
      },
    ],
  },
  {
    id: "private-party-auction",
    question: "Can I finance a rollback from a private seller or auction?",
    answerText:
      "Yes. TowLoans finances private-party and auction rollback deals when the truck details and transaction structure fit.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Private-party and auction rollback deals are common for us. Get the truck details and seller info in front of us early and you\u2019ll get a straight answer fast.",
      },
    ],
  },
  {
    id: "pre-approval-speed",
    question: "How fast can I get pre-approved for a rollback?",
    answerText:
      "Pre-approval takes approximately 30 seconds and returns a payment range with no hard credit pull.",
    answerContent: [
      {
        type: "text",
        value:
          "The pre-approval takes about 30 seconds. You\u2019ll see a payment range before you fill out a full application. No hard credit pull, no waiting for a callback.",
      },
    ],
  },
  {
    id: "down-payment",
    question: "How much down payment do I need for a rollback?",
    answerText:
      "Down payment depends on the truck, deal structure, and business profile. Some qualified operators can finance with zero down.",
    answerContent: [
      {
        type: "text",
        value:
          "It depends on the truck, deal structure, and your business profile. Some operators qualify for ",
      },
      {
        type: "link",
        value: "zero-down tow truck financing",
        href: "/zero-down-tow-truck-financing",
      },
      {
        type: "text",
        value:
          ". Others may need money down to make the payment work.",
      },
    ],
  },
  {
    id: "deferred-payment",
    question: "Can I defer my first payment on a rollback?",
    answerText:
      "Qualified buyers can defer their first rollback payment up to 180 days.",
    answerContent: [
      {
        type: "text",
        value:
          "Qualified buyers can defer their first payment up to 180 days. That gives you time to get the truck on the road and generating revenue before payments start.",
      },
    ],
  },
  {
    id: "used-rollback",
    question: "Do you finance used rollback tow trucks?",
    answerText:
      "Yes. TowLoans regularly finances used rollback trucks, including older inventory.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Used rollback deals are a big part of what we do. If you\u2019re buying smart instead of buying new, check our ",
      },
      {
        type: "link",
        value: "used tow truck financing",
        href: "/used-tow-truck-financing",
      },
      {
        type: "text",
        value: " page or start with pre-approval.",
      },
    ],
  },
  {
    id: "rollback-cost",
    question: "How much does a rollback tow truck cost?",
    answerText:
      "Light-duty rollbacks typically cost $40,000\u2013$120,000 and medium/heavy-duty rollbacks range $65,000\u2013$180,000+, depending on condition, chassis, and configuration.",
    answerContent: [
      {
        type: "text",
        value:
          "Light-duty rollbacks (Ford, Ram chassis) typically run $40,000\u2013$85,000 used, $70,000\u2013$120,000 new. Medium and heavy-duty (Hino, Kenworth, Peterbilt) range $65,000\u2013$180,000+ depending on age, bed, and configuration. Use our ",
      },
      {
        type: "link",
        value: "tow truck calculator",
        href: "/tow-truck-calculator?type=rollback",
      },
      {
        type: "text",
        value: " to see what the payment looks like.",
      },
    ],
  },
  {
    id: "lease-vs-buy",
    question: "Should I lease or buy a rollback?",
    answerText:
      "Leasing offers lower payments and potential tax advantages. Buying builds equity. The right choice depends on business structure and goals.",
    answerContent: [
      {
        type: "text",
        value:
          "Depends on how you run your business. Leasing keeps payments lower and can work better for taxes. Buying builds equity. Compare both paths in our ",
      },
      {
        type: "link",
        value: "tow truck lease vs. loan guide",
        href: "/resources/tow-truck-lease-vs-loan",
      },
      {
        type: "text",
        value: " or go straight to ",
      },
      {
        type: "link",
        value: "tow truck leasing",
        href: "/tow-truck-leasing",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  },
  {
    id: "rollback-vs-flatbed",
    question: "What is the difference between a rollback and a flatbed?",
    answerText:
      "Rollback and flatbed are interchangeable terms for a tow truck with a tilting flat carrier bed. TowLoans finances all variants.",
    answerContent: [
      {
        type: "text",
        value:
          'Same truck, different name. "Rollback" and "flatbed" both refer to a tow truck with a tilting flat bed that rolls back to load vehicles. The industry uses both terms. We finance them all.',
      },
    ],
  },
  {
    id: "section-179",
    question: "Can I write off my rollback truck with Section 179?",
    answerText:
      "Section 179 may allow full deduction of a rollback purchase price in the year of acquisition. Consult a tax professional for specific eligibility.",
    answerContent: [
      {
        type: "text",
        value:
          "In many cases, yes. Section 179 lets you deduct the full purchase price of qualifying equipment in the year you buy it. Read our ",
      },
      {
        type: "link",
        value: "Section 179 tow truck guide",
        href: "/resources/section-179-tow-truck",
      },
      {
        type: "text",
        value:
          " for details. Talk to your accountant for your specific situation.",
      },
    ],
  },
];

const faqSectionConfig: FaqSectionConfig = {
  eyebrow: "FAQ",
  heading: "Rollback financing questions, straight answers.",
  faqs: faqItems,
};

/* ------------------------------------------------------------------ */
/*  JSON-LD Schemas                                                   */
/* ------------------------------------------------------------------ */

const faqSchema = buildFaqSchema(faqItems);

const financialProductSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: "Rollback Tow Truck Financing",
  description:
    "Equipment financing for rollback and flatbed tow trucks. Used, private seller, and auction deals. Pre-approval with no credit check.",
  provider: {
    "@type": "Organization",
    name: "TowLoans",
    url: "https://towloans.com",
  },
  feesAndCommissionsSpecification:
    "Subject to credit review and approval. Terms vary by deal.",
};

const breadcrumbSchema = {
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
};

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function RollbackFinancingV2Page() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <JsonLd data={faqSchema} />
      <JsonLd data={financialProductSchema} />
      <JsonLd data={breadcrumbSchema} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <StickyNav />

      <DrawerProvider>
        <main id="main-content">
          <HeroConvertFramed config={heroConfig} />
          <ProofBlock config={PROOF_BLOCK_CONFIG} />
          <BrandMarquee />
          <TrustBridge config={TRUST_BRIDGE_CONFIG} />
          <FaqSection config={faqSectionConfig} />

          {/* Closing CTA — dark section */}
          <section className="bg-[#101820] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
            <div className="mx-auto max-w-5xl px-6 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#22C55E]">
                READY WHEN YOU ARE
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Ready to lock in your rollback?
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
                You don&apos;t need corporate runaround. You need to know
                whether the deal works and what the payment looks like.
              </p>

              <div className="mt-12">
                <RippleCtaLink
                  href={DRAWER_HASH}
                  label="Get Pre-Approved"
                  size="lg"
                  section="closing-cta"
                  className="!bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]"
                />
              </div>

              <p className="mt-8 text-sm text-white/60">
                Prefer to talk?{" "}
                <a
                  href="tel:+18885550199"
                  className="font-medium text-white underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
                >
                  (888)&nbsp;555-0199
                </a>
                <span className="ml-2 text-white/40">
                  Mon-Fri 8am-6pm CT
                </span>
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-white py-10 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#545454]">
                <Link
                  href="/wrecker-financing"
                  prefetch={false}
                  className="underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 rounded-sm"
                >
                  Need a wrecker instead?
                </Link>
                <Link
                  href="/rotator-financing"
                  prefetch={false}
                  className="underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 rounded-sm"
                >
                  Looking at rotators?
                </Link>
                <Link
                  href="/"
                  className="underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 rounded-sm"
                >
                  Tow truck financing
                </Link>
              </div>
            </div>
          </section>
        </main>
      </DrawerProvider>

      <Footer config={FOOTER_CONFIG} />
    </div>
  );
}
