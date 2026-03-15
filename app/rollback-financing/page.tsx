import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import truck3 from "@/public/truck-3.jpg";
import { HeroConvert } from "@/components/sections/heroes/hero-convert-geico";
import type { HeroConvertConfig } from "@/components/sections/heroes/hero-convert-geico";
import { HowItWorks } from "@/components/sections/page/how-it-works";
import {
  FAQ,
  buildFaqSchema,
} from "@/components/sections/page/faq";
import type { FaqItemData } from "@/components/sections/page/faq";
import type { HowItWorksConfig } from "@/components/sections/page/how-it-works";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Rollback & Flatbed Tow Truck Financing | TowLoans",
  description:
    "Finance a rollback or flatbed tow truck with fast pre-approval, used and private-party deal support, and terms built for towing operators.",
  openGraph: {
    title: "Rollback & Flatbed Tow Truck Financing | TowLoans",
    description:
      "Built for rollback deals: used trucks, private-party sellers, auctions, and fast pre-approval for tow operators.",
    type: "website",
  },
};

const heroConfig: HeroConvertConfig = {
  headline: "Rollback financing built for real tow deals.",
  bodyCopy:
    "You run a tow business. We finance rollback deals all day. Used trucks, private sellers, auction units, and straight answers on what fits your payment before you waste time chasing a truck.",
  tiles: [
    {
      id: "rollback",
      label: "Rollback",
      icon: (
        <Image
          src="/brand-assets/truck-icons/rollback/rollback-light-green.svg"
          alt=""
          aria-hidden="true"
          width={150}
          height={43}
          className="h-8 w-auto"
        />
      ),
    },
    {
      id: "flatbed",
      label: "Flatbed",
      icon: (
        <Image
          src="/brand-assets/truck-icons/rollback/rollback-green.svg"
          alt=""
          aria-hidden="true"
          width={150}
          height={43}
          className="h-8 w-auto"
        />
      ),
    },
  ],
  cta: { label: "Get Pre-Approved for a Rollback", href: "#pre-approve" },
  tertiaryLinks: [
    {
      label: "See Your Rollback Payment",
      href: "/tow-truck-calculator?type=rollback",
    },
    {
      label: "Explore rollback leasing options",
      href: "/tow-truck-leasing",
    },
  ],
  viewAllLink: { label: "Tow truck financing", href: "/" },
  microcopy:
    "Start with a soft pull and a straight answer on what your deal looks like.",
  disclaimer:
    "All financing is subject to credit review and approval. Terms vary by truck, seller, and business profile.",
  heroImage: truck3,
  heroImageAlt: "Rollback tow truck ready for financing",
};

const processConfig: HowItWorksConfig = {
  headline: "How rollback financing works",
  steps: [
    {
      number: "Step 01",
      title: "Start with the truck or the payment",
      description:
        "Tell us whether you already found the rollback or just need a payment range that fits your business.",
    },
    {
      number: "Step 02",
      title: "We review the real deal",
      description:
        "Dealer, private seller, auction unit, older truck. We look at the actual deal instead of forcing you into a bank template.",
    },
    {
      number: "Step 03",
      title: "Move when the truck is ready",
      description:
        "Once the deal makes sense, we line up the paperwork and funding so you can get the truck on the road.",
    },
  ],
  cta: {
    label: "Start Pre-Approval",
    href: "#pre-approve",
  },
};

const faqItems: FaqItemData[] = [
  {
    id: "used-rollback",
    question: "Can you finance a used rollback tow truck?",
    answerText:
      "Yes. We regularly finance used rollback trucks, including older inventory when the deal and business profile make sense.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Used rollback deals are a big part of what we do. If you're looking at an older truck or trying to buy smart instead of buying new, start with our ",
      },
      {
        type: "link",
        value: "used tow truck financing",
        href: "/used-tow-truck-financing",
      },
      {
        type: "text",
        value: " page, then we can look at the actual truck and seller.",
      },
    ],
  },
  {
    id: "private-party-auction",
    question: "Can you finance a rollback from a private seller or auction?",
    answerText:
      "Yes. Private-party and auction rollback deals are common here. The key is getting the right truck details, seller information, and transaction structure in front of us early so you get a straight answer fast.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. Private-party and auction rollback deals are common here. The key is getting the right truck details, seller information, and transaction structure in front of us early so you get a straight answer fast.",
      },
    ],
  },
  {
    id: "down-payment",
    question: "How much down do you need for a rollback?",
    answerText:
      "Down payment depends on the truck, deal structure, and business profile. Some qualified operators can get zero-down financing.",
    answerContent: [
      {
        type: "text",
        value:
          "It depends on the truck, the deal, and your business profile. Some operators qualify for ",
      },
      {
        type: "link",
        value: "zero-down tow truck financing",
        href: "/zero-down-tow-truck-financing",
      },
      {
        type: "text",
        value:
          ". Others may need money down to make the payment or structure work.",
      },
    ],
  },
  {
    id: "leasing",
    question: "Can you lease a rollback tow truck?",
    answerText:
      "Yes. Leasing can be a better fit when lower payments or tax treatment matter more than ownership on day one.",
    answerContent: [
      {
        type: "text",
        value:
          "Yes. For some operators, leasing keeps the payment lower or fits their tax strategy better. Compare both paths in our ",
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
    id: "fit-payment",
    question: "How do I know what payment fits my business?",
    answerText:
      "Start with a rollback payment estimate, then compare the payment to your actual cash flow, call volume, and tax position before finalizing the deal.",
    answerContent: [
      {
        type: "text",
        value: "Start with the ",
      },
      {
        type: "link",
        value: "rollback payment calculator",
        href: "/tow-truck-calculator?type=rollback",
      },
      {
        type: "text",
        value: ", then look at whether a deduction like ",
      },
      {
        type: "link",
        value: "Section 179",
        href: "/resources/section-179-tow-truck",
      },
      {
        type: "text",
        value:
          " changes the picture. We can help you pressure-test the payment against how your business actually runs.",
      },
    ],
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Rollback & Flatbed Tow Truck Financing",
  description:
    "Rollback financing built for tow operators buying used trucks, private-party units, or auction inventory.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://towloans.com/rollback-financing",
  },
  author: {
    "@type": "Organization",
    name: "TowLoans",
  },
  publisher: {
    "@type": "Organization",
    name: "TowLoans",
  },
};

const faqSchema = buildFaqSchema(faqItems);

export default function RollbackFinancingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <StickyNav />

      <main>
        <HeroConvert config={heroConfig} />

        <section className="bg-[#F5F5F5] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
                Why Operators Use Us
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
                Rollback deals don&apos;t fit a generic truck loan script.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#545454]">
                Banks want clean, dealer-paper deals. Tow operators buy where
                the right truck shows up. That&apos;s why we built this around
                rollback reality instead of a generic equipment page.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Used rollback deals",
                  body: "Buying smart matters. We regularly review used rollback trucks, including older inventory when the business is solid.",
                },
                {
                  title: "Private-party sellers",
                  body: "If the right truck is coming from a private seller instead of a dealer, that does not kill the conversation here.",
                },
                {
                  title: "Auction and marketplace units",
                  body: "We understand auction, online marketplace, and off-lot inventory moves where speed and clarity matter.",
                },
                {
                  title: "Practical deal structure",
                  body: "Zero down for qualified buyers, deferred starts when available, and terms built around real cash flow.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9]"
                >
                  <h3 className="text-xl font-medium text-[#101820]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#545454]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link
                href="/used-tow-truck-financing"
                className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
              >
                Financing a used rollback
              </Link>
              <Link
                href="/zero-down-tow-truck-financing"
                className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
              >
                Zero down rollback financing
              </Link>
            </div>
          </div>
        </section>

        <HowItWorks config={processConfig} />

        <section className="bg-[#F0FDF4] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
                Payment Confidence
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
                Know the payment before you chase the truck.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#545454]">
                If you already know the truck you want, great. If you don&apos;t,
                start with the payment. That keeps you from burning time on a
                rollback that never made sense for your business in the first
                place.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/tow-truck-calculator?type=rollback"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#101820] px-8 text-lg font-medium text-white transition-colors duration-200 hover:bg-[#101820]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2"
                >
                  See Your Rollback Payment
                </Link>
                <Link
                  href="#pre-approve"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-[#101820] px-8 text-lg font-medium text-[#101820] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2"
                >
                  Get a Straight Answer
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <Link
                  href="/resources/how-much-does-a-tow-truck-cost"
                  className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
                >
                  How much does a rollback cost?
                </Link>
                <Link
                  href="/resources/tow-truck-lease-vs-loan"
                  className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
                >
                  Should you lease or finance your rollback?
                </Link>
                <Link
                  href="/resources/section-179-tow-truck"
                  className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
                >
                  Write off your rollback this year
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] bg-white p-8 shadow-[inset_0_0_0_1px_#D9F99D]">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
                Deal Fit
              </p>
              <ul className="mt-6 space-y-5 text-base leading-relaxed text-[#545454]">
                <li>
                  Used rollback on your radar? We can look at the actual unit.
                </li>
                <li>
                  Private seller or auction buy? Get the details in front of us
                  early and we&apos;ll tell you if the structure works.
                </li>
                <li>
                  Need room upfront? Ask about zero down for qualified buyers
                  and deferred-payment availability.
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section
          id="faq"
          className="bg-[#F5F5F5] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200"
        >
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
                Rollback financing questions, answered straight.
              </h2>
            </div>
            <FAQ faqs={faqItems} />
          </div>
        </section>

        <section
          id="pre-approve"
          className="bg-[#101820] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200"
        >
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#22C55E]">
              Ready When You Are
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Ready to add a rollback to your fleet?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              You don&apos;t need corporate runaround. You need to know whether
              the deal works, what the payment looks like, and how fast you can
              move when the right truck shows up.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                "Tow-truck-only financing focus",
                "Used, private-party, and auction rollback deal support",
                "Fast pre-approval with straight answers",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a
                href="tel:+18885550199"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#22C55E] px-10 text-lg font-medium text-[#101820] transition-colors duration-200 hover:bg-[#86EFAC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
              >
                Call (888) 555-0199
              </a>
              <p className="mt-5 text-sm text-white/60">
                Mon-Fri 8am-6pm CT | Tow truck financing specialists
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-10 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#545454]">
              <Link
                href="/wrecker-financing"
                className="underline underline-offset-4 transition-colors hover:text-[#22C55E]"
              >
                Need a wrecker instead?
              </Link>
              <Link
                href="/rotator-financing"
                className="underline underline-offset-4 transition-colors hover:text-[#22C55E]"
              >
                Looking at rotators?
              </Link>
              <Link
                href="/"
                className="underline underline-offset-4 transition-colors hover:text-[#22C55E]"
              >
                Tow truck financing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#101820] pt-16 pb-8 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <Link href="/">
              <Image
                src="/brand-assets/logo/towloans-light-logo.svg"
                alt="TowLoans"
                width={191}
                height={28}
              />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-medium text-white">Financing</h3>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Rollback", href: "/rollback-financing" },
                  { label: "Wrecker", href: "/wrecker-financing" },
                  { label: "Rotator", href: "/rotator-financing" },
                  {
                    label: "Used Trucks",
                    href: "/used-tow-truck-financing",
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white">Leasing</h3>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Tow Truck Leasing", href: "/tow-truck-leasing" },
                  {
                    label: "Lease vs Loan",
                    href: "/resources/tow-truck-lease-vs-loan",
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white">Programs</h3>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Fleet Expansion", href: "/fleet-financing" },
                  {
                    label: "Zero Down",
                    href: "/zero-down-tow-truck-financing",
                  },
                  {
                    label: "Deferred Pay",
                    href: "/deferred-payment-tow-truck-financing",
                  },
                  {
                    label: "Private Party",
                    href: "/private-party-tow-truck-financing",
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white">Resources</h3>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Calculator", href: "/tow-truck-calculator" },
                  {
                    label: "Cost Guide",
                    href: "/resources/how-much-does-a-tow-truck-cost",
                  },
                  {
                    label: "Lease vs Loan",
                    href: "/resources/tow-truck-lease-vs-loan",
                  },
                  {
                    label: "Section 179",
                    href: "/resources/section-179-tow-truck",
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-8">
            {["BBB Accredited", "SSL Secured", "Built for tow operators"].map(
              (badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/60"
                >
                  {badge}
                </span>
              ),
            )}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
            <p>&copy; 2026 TowLoans. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+18885550199"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
              >
                (888)&nbsp;555-0199
              </a>
              <a
                href="mailto:info@towloans.com"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
              >
                info@towloans.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
