import type { Metadata } from "next";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { FAQ } from "./FAQ";

/* ------------------------------------------------------------------ */
/*  SEO metadata                                                       */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Tow Truck Financing | Pre-Approved in 30 Seconds | TowLoans",
  description:
    "Get pre-approved for tow truck financing in 30 seconds. No credit check. New & used. Rollbacks, wreckers, rotators. $0 down available. (888) 555-0199",
};

/* ------------------------------------------------------------------ */
/*  FAQ data + JSON-LD schema                                          */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: "How long can you finance a tow truck?",
    answer: (
      <>
        Financing terms range from 24 to 84 months depending on the equipment
        type, age, and your business profile. Longer terms mean lower monthly
        payments. Use our{" "}
        <a
          href="/tow-truck-calculator"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          tow truck calculator
        </a>{" "}
        to see what your payment would look like at different terms.
      </>
    ),
  },
  {
    question: "What credit score is needed for truck financing?",
    answer:
      "There\u2019s no hard minimum. We look at the full picture\u00a0\u2014 time in business, revenue, call volume, and how you run your operation. Most of our operators didn\u2019t start with perfect credit.",
  },
  {
    question: "Does owning a tow truck make money?",
    answer: (
      <>
        Yes. Typical operators report covering their monthly truck payment
        within the first week of calls, depending on market and call volume. See
        the full breakdown in our{" "}
        <a
          href="/resources/tow-truck-roi"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          tow truck ROI guide
        </a>
        .
      </>
    ),
  },
  {
    question: "Do tow trucks have payment plans?",
    answer:
      "Yes. Tow truck financing is essentially a payment plan\u00a0\u2014 you make fixed monthly payments over 24\u201384 months until the truck is paid off. We offer multiple structures including deferred payments and $0 down options.",
  },
  {
    question: "What happens if you can\u2019t afford a tow truck?",
    answer: (
      <>
        That\u2019s exactly what financing solves. With{" "}
        <a
          href="/zero-down-tow-truck-financing"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          zero down financing
        </a>{" "}
        and{" "}
        <a
          href="/deferred-payment-tow-truck-financing"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          deferred payment programs
        </a>
        , you can start earning revenue before your first full payment is due.
      </>
    ),
  },
  {
    question: "How much money do I need to start a tow truck business?",
    answer: (
      <>
        Startup costs vary, but financing dramatically reduces the upfront
        capital needed. Read our complete{" "}
        <a
          href="/resources/how-to-start-a-towing-business"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          guide to starting a towing business
        </a>{" "}
        for a detailed cost breakdown.
      </>
    ),
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: typeof faq.answer === "string" ? faq.answer : faq.question,
    },
  })),
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Homepage01() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Organization + FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#DE3341] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      {/* §0 — StickyNav */}
      <StickyNav />

      <main>
        {/* ============================================================ */}
        {/* §1 — HERO                                          bg: white */}
        {/* ============================================================ */}
        <section id="hero" className="bg-white pt-[var(--nav-height)]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-5 lg:py-20">
            {/* Left column (60%) */}
            <div className="flex flex-col gap-6 lg:col-span-3">
              <p className="text-sm font-medium tracking-wide text-[#DE3341] uppercase">
                Tow Truck Financing Companies
              </p>

              <h1
                className="text-[2.5rem] font-medium leading-[1.1] text-[#111111] md:text-5xl lg:text-[3.5rem]"
                style={{ textWrap: "balance" }}
              >
                Get Your Tow Truck Financed. Start Earning Tomorrow.
              </h1>

              <p className="text-lg text-[#545454]">
                Pre-approved in 30 seconds. No credit check. New&nbsp;&amp;
                used. $0&nbsp;down available.
              </p>

              {/* Primary CTA */}
              <a
                href="#pre-approve"
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#111111] text-lg font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 sm:w-auto sm:px-10"
              >
                Get Pre-Approved
              </a>

              <p className="text-sm text-[#545454]">
                Or call us:{" "}
                <a
                  href="tel:+18885550199"
                  className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
                >
                  (888)&nbsp;555-0199
                </a>
              </p>

              {/* Trust bar */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#E9E9E9] pt-6">
                <div className="text-center">
                  <p className="text-xl font-medium text-[#111111]">$2.8M+</p>
                  <p className="text-xs text-[#545454]">Financed</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-medium text-[#111111]">340+</p>
                  <p className="text-xs text-[#545454]">Operators</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-medium text-[#111111]">24hr</p>
                  <p className="text-xs text-[#545454]">Approval</p>
                </div>
              </div>
            </div>

            {/* Right column (40%) — hero image */}
            <div className="hidden items-center justify-center rounded-3xl bg-[#F7F7F7] lg:col-span-2 lg:flex">
              <div className="p-12 text-center">
                <svg
                  className="mx-auto h-32 w-32 text-[#111111]/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <p className="mt-4 text-sm text-[#545454]">
                  Hero image placeholder
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* §2 — EQUIPMENT CARDS (Intent Router)              bg: #F7F7F7 */}
        {/* ============================================================ */}
        <section id="equipment" className="bg-[#F7F7F7] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                Finance Any Tow Truck.{" "}
                <span className="text-[#DE3341]">
                  From Rollbacks to Rotators.
                </span>
              </h2>
              <p className="mt-4 text-lg text-[#545454]">
                Pick your equipment. We&rsquo;ll handle the rest.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Rollback */}
              <div className="group relative flex flex-col rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <span className="absolute top-4 right-4 rounded-full bg-[#DE3341] px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F7F7]">
                  <svg
                    className="h-8 w-8 text-[#111111]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-medium text-[#111111]">
                  Rollback / Flatbed
                </h3>
                <p className="mt-2 text-sm text-[#545454]">
                  Most popular first truck
                </p>
                <p className="mt-4 text-lg font-medium text-[#111111]">
                  From $650/mo
                </p>
                <a
                  href="/rollback-financing"
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  See Rollback Financing
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Wrecker */}
              <div className="group flex flex-col rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F7F7]">
                  <svg
                    className="h-8 w-8 text-[#111111]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-medium text-[#111111]">
                  Wrecker
                </h3>
                <p className="mt-2 text-sm text-[#545454]">
                  Light, medium &amp; heavy
                </p>
                <p className="mt-4 text-lg font-medium text-[#111111]">
                  From $850/mo
                </p>
                <a
                  href="/wrecker-financing"
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  See Wrecker Financing
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Rotator */}
              <div className="group flex flex-col rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F7F7]">
                  <svg
                    className="h-8 w-8 text-[#111111]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-medium text-[#111111]">
                  Rotator
                </h3>
                <p className="mt-2 text-sm text-[#545454]">
                  50-75 ton heavy recovery
                </p>
                <p className="mt-4 text-lg font-medium text-[#111111]">
                  From $3,200/mo
                </p>
                <a
                  href="/rotator-financing"
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  See Rotator Financing
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Used Tow Trucks */}
              <div className="group flex flex-col rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F7F7]">
                  <svg
                    className="h-8 w-8 text-[#111111]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-medium text-[#111111]">
                  Used Tow Trucks
                </h3>
                <p className="mt-2 text-sm text-[#545454]">
                  New &amp; used. Any source.
                </p>
                <p className="mt-4 text-lg font-medium text-[#111111]">
                  From $450/mo
                </p>
                <a
                  href="/used-tow-truck-financing"
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  Used Truck Financing
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* §3 — HOW IT WORKS (Process)                        bg: white */}
        {/* ============================================================ */}
        <section id="how-it-works" className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                From Application to Keys in{" "}
                <span className="text-[#DE3341]">3&nbsp;Steps</span>
              </h2>
            </div>

            <ol className="mt-16 grid gap-6 md:grid-cols-3">
              <li className="flex flex-col rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <span className="text-sm font-medium text-[#DE3341]">
                  Step 01
                </span>
                <h3 className="mt-3 text-xl font-medium text-[#111111]">
                  Tell Us What You Need
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                  Pick your truck type, new or used, and your budget. Takes
                  30&nbsp;seconds.
                </p>
              </li>

              <li className="flex flex-col rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <span className="text-sm font-medium text-[#DE3341]">
                  Step 02
                </span>
                <h3 className="mt-3 text-xl font-medium text-[#111111]">
                  Get Your Payment Range
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                  Pre-approved in 30 seconds. No credit check. See real
                  payments.
                </p>
              </li>

              <li className="flex flex-col rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <span className="text-sm font-medium text-[#DE3341]">
                  Step 03
                </span>
                <h3 className="mt-3 text-xl font-medium text-[#111111]">
                  Drive Your Truck Home
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                  We fund the dealer direct. You pick up your truck.
                </p>
              </li>
            </ol>

            <div className="mt-12 text-center">
              <a
                href="/tow-truck-calculator"
                className="inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                See Your Payment First
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* §4 — REVENUE PROOF (The Money Section)           bg: #FBF0F6 */}
        {/* ============================================================ */}
        <section id="revenue" className="bg-[#FBF0F6] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                Your Tow Truck{" "}
                <span className="text-[#DE3341]">Pays for Itself.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#545454]">
                Typical operators report covering their monthly payment within
                the first week of calls, depending on market and call volume.
              </p>
            </div>

            {/* Revenue visual */}
            <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[inset_0_0_0_1px_#E9E9E9]">
              <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
                <div className="text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-[#111111]/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                  <p className="mt-4 text-lg font-medium text-[#111111]">
                    A few calls covers your monthly payment.
                  </p>
                </div>
                <div className="text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-[#0B5E36]/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <p className="mt-4 text-lg font-medium text-[#111111]">
                    The rest of the month? That&rsquo;s revenue in your pocket.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-[#545454]">
              Results vary by market, call volume, and equipment type.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <a
                href="/tow-truck-calculator"
                className="inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                Calculate YOUR Payment
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/resources/tow-truck-roi"
                className="inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                See Full ROI Breakdown
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* §5 — PROGRAMS (Differentiation Cards)              bg: white */}
        {/* ============================================================ */}
        <section id="programs" className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                Programs Built for How Towing Operators{" "}
                <span className="text-[#DE3341]">Actually Buy Trucks</span>
              </h2>
            </div>

            <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* $0 Down Financing */}
              <li className="group flex flex-col overflow-hidden rounded-3xl shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <div className="flex h-32 items-center justify-center bg-[#F3EEE7]">
                  <svg
                    className="h-12 w-12 text-[#111111]/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col bg-white p-8">
                  <h3 className="text-xl font-medium text-[#111111]">
                    $0 Down Financing
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                    Keep your cash. Start earning from day one. Qualify with
                    strong business history.
                  </p>
                  <a
                    href="/zero-down-tow-truck-financing"
                    className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                  >
                    See Zero Down
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </li>

              {/* Fleet Upgrade */}
              <li className="group flex flex-col overflow-hidden rounded-3xl shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <div className="flex h-32 items-center justify-center bg-[#EDF1FF]">
                  <svg
                    className="h-12 w-12 text-[#111111]/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col bg-white p-8">
                  <h3 className="text-xl font-medium text-[#111111]">
                    Fleet Upgrade
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                    Special rates when you&rsquo;re adding truck #2, #3, or #10
                    to your fleet.
                  </p>
                  <a
                    href="/fleet-financing"
                    className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                  >
                    Fleet Programs
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </li>

              {/* Deferred Payment */}
              <li className="group flex flex-col overflow-hidden rounded-3xl shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <div className="flex h-32 items-center justify-center bg-[#FBF0F6]">
                  <svg
                    className="h-12 w-12 text-[#111111]/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col bg-white p-8">
                  <h3 className="text-xl font-medium text-[#111111]">
                    Deferred Payment
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                    $99 touch payments for up to 180 days while your truck ramps
                    up.
                  </p>
                  <a
                    href="/deferred-payment-tow-truck-financing"
                    className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                  >
                    See Deferred Options
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </li>

              {/* Private Party Sales */}
              <li className="group flex flex-col overflow-hidden rounded-3xl shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <div className="flex h-32 items-center justify-center bg-[#F7F7F7]">
                  <svg
                    className="h-12 w-12 text-[#111111]/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col bg-white p-8">
                  <h3 className="text-xl font-medium text-[#111111]">
                    Private Party Sales
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                    Finance trucks from Facebook Marketplace, auctions, or
                    private sellers.
                  </p>
                  <a
                    href="/private-party-tow-truck-financing"
                    className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                  >
                    Private Party Financing
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* ============================================================ */}
        {/* §6 — REQUIREMENTS (Objection Killer)             bg: #F7F7F7 */}
        {/* ============================================================ */}
        <section id="requirements" className="bg-[#F7F7F7] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                What You Need.{" "}
                <span className="text-[#DE3341]">
                  And What You Don&rsquo;t.
                </span>
              </h2>
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
              {/* What we look at */}
              <div className="rounded-3xl bg-[#EFF7F3] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <h3 className="text-lg font-medium text-[#0B5E36]">
                  What We Look At
                </h3>
                <ul className="mt-6 space-y-4">
                  {[
                    "1+ year in business",
                    "$10K+ monthly revenue",
                    "Valid business license",
                    "Equipment identified",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0B5E36]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-base text-[#111111]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What you DON'T need */}
              <div className="rounded-3xl bg-[#FBF0F6] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <h3 className="text-lg font-medium text-[#DE3341]">
                  What You DON&rsquo;T Need
                </h3>
                <ul className="mt-6 space-y-4">
                  {[
                    "Perfect credit",
                    "Large down payment",
                    "Years of financials",
                    "Collateral beyond truck",
                    "SBA-style paperwork",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#DE3341]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-base text-[#545454]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-10 text-center text-lg font-medium text-[#111111]">
              We pre-approve most operators in 30 seconds with NO hard credit
              pull.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <a
                href="#pre-approve"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#111111] px-8 text-base font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                Check If You Qualify
              </a>
              <a
                href="/resources/how-to-qualify"
                className="inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                See Full Requirements
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* §7 — SOCIAL PROOF (Testimonials + Stats)           bg: white */}
        {/* ============================================================ */}
        <section id="testimonials" className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                Trusted by Towing Operators{" "}
                <span className="text-[#DE3341]">Across the Country</span>
              </h2>
            </div>

            {/* Stats bar */}
            <ul className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "$2.8M+", label: "Financed" },
                { value: "340+", label: "Operators Funded" },
                { value: "24 hrs", label: "Average Approval" },
                { value: "4.9/5", label: "Rating" },
              ].map((stat) => (
                <li key={stat.label} className="text-center">
                  <p className="text-3xl font-medium text-[#111111] [font-variant-numeric:tabular-nums]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-[#545454]">{stat.label}</p>
                </li>
              ))}
            </ul>

            {/* Testimonials */}
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "Got approved on Friday, had the truck Monday. Already booked 4 calls.",
                  name: "Mike R.",
                  detail: "3-truck fleet, TX",
                },
                {
                  quote:
                    "Other lenders wanted 3 years of tax returns. TL approved me in a day.",
                  name: "Carlos D.",
                  detail: "First truck, FL",
                },
                {
                  quote:
                    "The deferred payment let me earn for 90 days before my first bill.",
                  name: "James W.",
                  detail: "2-truck fleet, GA",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]"
                >
                  <div
                    className="font-serif text-5xl leading-none text-[#DE3341]/20"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="mt-2 text-lg font-medium leading-relaxed text-[#111111]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-6 flex items-center gap-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-sm font-medium text-white"
                      aria-hidden="true"
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic text-base font-medium text-[#111111]">
                        {t.name}
                      </cite>
                      <p className="text-sm text-[#545454]">{t.detail}</p>
                    </div>
                  </footer>
                </div>
              ))}
            </div>

            {/* Partner logos */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
              {["Jerr-Dan", "Miller", "Century", "Chevron", "Dynamic"].map(
                (brand) => (
                  <span
                    key={brand}
                    className="rounded-full border border-[#E9E9E9] px-6 py-3 text-sm font-medium text-[#545454]"
                  >
                    {brand}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* §8 — CALCULATOR TEASER                           bg: #F3EEE7 */}
        {/* ============================================================ */}
        <section id="calculator" className="bg-[#F3EEE7] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Left: copy */}
              <div>
                <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                  See Your Payment{" "}
                  <span className="text-[#DE3341]">Before You Apply</span>
                </h2>

                <p className="mt-6 text-lg leading-relaxed text-[#545454]">
                  Know exactly what you&rsquo;ll pay before any commitment. Our
                  calculator shows your monthly payment AND how many tow calls
                  cover it.
                </p>

                <div className="mt-8">
                  <a
                    href="/tow-truck-calculator"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#111111] px-8 text-base font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                  >
                    Calculate Your Payment
                  </a>
                </div>
              </div>

              {/* Right: calculator preview mock */}
              <div className="rounded-2xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <p className="mb-6 text-sm font-medium tracking-wide text-[#545454] uppercase">
                  Calculator Preview
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E9E9E9] pb-4">
                    <span className="text-sm text-[#545454]">Equipment</span>
                    <span className="font-medium text-[#111111]">
                      Rollback
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#E9E9E9] pb-4">
                    <span className="text-sm text-[#545454]">Amount</span>
                    <span className="font-medium text-[#111111]">$65,000</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#E9E9E9] pb-4">
                    <span className="text-sm text-[#545454]">
                      Est. Payment
                    </span>
                    <span className="text-xl font-medium text-[#DE3341]">
                      $1,050/mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#545454]">
                      Tow calls to cover
                    </span>
                    <span className="font-medium text-[#0B5E36]">
                      ~5 calls
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* §9 — RESOURCE HUB (Content Links for SEO)          bg: white */}
        {/* ============================================================ */}
        <section id="resources" className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                Tow Truck Financing{" "}
                <span className="text-[#DE3341]">Resources</span>
              </h2>
              <p className="mt-4 text-lg text-[#545454]">
                Everything you need to make a smart decision.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Cost Guide */}
              <div className="flex flex-col rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <svg
                  className="h-8 w-8 text-[#111111]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <h3 className="mt-6 text-lg font-medium text-[#111111]">
                  How Much Does a Tow Truck Cost? (2026 Guide)
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#545454]">
                  New, used, by type. Real price ranges.
                </p>
                <a
                  href="/resources/how-much-does-a-tow-truck-cost"
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  Read the Guide
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* ROI Guide */}
              <div className="flex flex-col rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <svg
                  className="h-8 w-8 text-[#111111]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <h3 className="mt-6 text-lg font-medium text-[#111111]">
                  Tow Truck ROI: How Fast Does It Pay for Itself?
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#545454]">
                  Revenue math by equipment type.
                </p>
                <a
                  href="/resources/tow-truck-roi"
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  See the Math
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* How to Qualify */}
              <div className="flex flex-col rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <svg
                  className="h-8 w-8 text-[#111111]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h3 className="mt-6 text-lg font-medium text-[#111111]">
                  How to Qualify for Tow Truck Financing
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#545454]">
                  Requirements, docs needed, credit ranges.
                </p>
                <a
                  href="/resources/how-to-qualify"
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  Check Requirements
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Lease vs Loan */}
              <div className="flex flex-col rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
                <svg
                  className="h-8 w-8 text-[#111111]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
                <h3 className="mt-6 text-lg font-medium text-[#111111]">
                  Lease vs. Loan: Which Is Right for You?
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#545454]">
                  Side-by-side comparison guide.
                </p>
                <a
                  href="/resources/tow-truck-lease-vs-loan"
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  Compare Options
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Inline links */}
            <div className="mt-12 space-y-3 text-center text-base text-[#545454]">
              <p>
                Prefer to lease instead of buy?{" "}
                <a
                  href="/tow-truck-leasing"
                  className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
                >
                  Explore tow truck leasing options.
                </a>
              </p>
              <p>
                Planning to start a towing business?{" "}
                <a
                  href="/resources/how-to-start-a-towing-business"
                  className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
                >
                  Read our startup guide.
                </a>
              </p>
              <p>
                Buying before year-end?{" "}
                <a
                  href="/resources/section-179-tow-truck"
                  className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
                >
                  Learn about Section 179 tax deductions.
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* §10 — FAQ (SEO + Objection Cleanup)              bg: #F7F7F7 */}
        {/* ============================================================ */}
        <section id="faq" className="bg-[#F7F7F7] py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                Tow Truck Financing{" "}
                <span className="text-[#DE3341]">FAQ</span>
              </h2>
            </div>
            <FAQ faqs={faqs} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* §11 — FINAL CTA (Value Recap + Close)            bg: #FBF0F6 */}
        {/* ============================================================ */}
        <section id="final-cta" className="bg-[#FBF0F6] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                Ready to Add Revenue to{" "}
                <span className="text-[#DE3341]">Your Fleet?</span>
              </h2>
            </div>

            {/* Value props */}
            <ul className="mt-16 grid gap-8 md:grid-cols-3">
              <li className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#111111] shadow-[inset_0_0_0_1px_#E9E9E9]">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-medium text-[#111111]">
                  Pre-approved in 30 secs
                </h3>
              </li>
              <li className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#111111] shadow-[inset_0_0_0_1px_#E9E9E9]">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-medium text-[#111111]">
                  No hard credit pull required
                </h3>
              </li>
              <li className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#111111] shadow-[inset_0_0_0_1px_#E9E9E9]">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-medium text-[#111111]">
                  New, used, any equipment type
                </h3>
              </li>
            </ul>

            {/* Final CTA */}
            <div className="mt-16 text-center">
              <a
                href="#pre-approve"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#111111] px-10 text-lg font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                Get Pre-Approved &mdash; It Takes 30&nbsp;Seconds
              </a>
              <p className="mt-6 text-sm text-[#545454]">
                Or call us now:{" "}
                <a
                  href="tel:+18885550199"
                  className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
                >
                  (888)&nbsp;555-0199
                </a>
              </p>
              <p className="mt-2 text-xs text-[#545454]">
                Mon-Fri 8am-6pm CT | Tow truck financing specialists
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* §12 — FOOTER                                      bg: #111111 */}
      {/* ============================================================ */}
      <footer className="bg-[#111111] pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-6">
          {/* Logo */}
          <div className="mb-12">
            <a href="/" className="text-xl font-medium text-white">
              TowLoans
            </a>
          </div>

          {/* Columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Financing */}
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
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Leasing */}
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
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
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
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-medium text-white">Resources</h3>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Calculator", href: "/tow-truck-calculator" },
                  {
                    label: "Cost Guide",
                    href: "/resources/how-much-does-a-tow-truck-cost",
                  },
                  { label: "ROI Guide", href: "/resources/tow-truck-roi" },
                  {
                    label: "How to Qualify",
                    href: "/resources/how-to-qualify",
                  },
                  {
                    label: "Start a Towing Business",
                    href: "/resources/how-to-start-a-towing-business",
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-8">
            {["BBB Accredited", "SSL Secured", "Trusted by 340+ Operators"].map(
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

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
            <p>&copy; 2026 TowLoans. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+18885550199"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              >
                (888)&nbsp;555-0199
              </a>
              <a
                href="mailto:info@towloans.com"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              >
                info@towloans.com
              </a>
            </div>
          </div>

          {/* Legal links */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Privacy", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-white/40 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
