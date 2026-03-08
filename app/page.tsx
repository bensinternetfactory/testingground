import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { HeroLeadGen, HERO_LEAD_GEN_CONFIG } from "@/components/sections/heroes/hero-lead-gen";
import { EquipmentCards, EQUIPMENT_CARDS_CONFIG } from "@/components/sections/page/equipment-cards";
import { HowItWorks, HOW_IT_WORKS_CONFIG } from "@/components/sections/page/how-it-works";
import { MiniROI, MINI_ROI_CONFIG } from "@/components/sections/page/mini-roi";
import {
  TRUCK_GALLERY_CONFIG,
  TRUCK_GALLERY_CONFIG_ALT,
} from "@/components/sections/page/truck-gallery/config";
import {
  TruckGalleryHeroLeft,
  TruckGalleryHeroRight,
} from "@/components/sections/page/truck-gallery/TruckGallery";
import { ProgramCards, PROGRAM_CARDS_CONFIG } from "@/components/sections/page/program-cards";
import { ResourceHub, RESOURCE_HUB_CONFIG } from "@/components/sections/page/resource-hub";
import { BrandMarquee } from "@/components/sections/page/brand-marquee";
import { TestimonialMarquee } from "@/components/sections/page/testimonial-marquee";
import { FAQ } from "@/app/FAQ";

/* ------------------------------------------------------------------ */
/*  Equipment card icons (injected at page level)                      */
/* ------------------------------------------------------------------ */

const CARD_ICONS: Record<string, React.ReactNode> = {
  rollback: (
    <Image
      src="/brand-assets/truck-icons/rollback/rollback-green.svg"
      alt="Rollback truck"
      width={150}
      height={43}
      className="h-6 sm:h-10 w-auto"
    />
  ),
  wrecker: (
    <Image
      src="/brand-assets/truck-icons/wrecker/wrecker-green.svg"
      alt="Wrecker truck"
      width={150}
      height={43}
      className="h-6 sm:h-10 w-auto"
    />
  ),
  rotator: (
    <Image
      src="/brand-assets/truck-icons/rotator/rotator-green.svg"
      alt="Rotator truck"
      width={150}
      height={43}
      className="h-6 sm:h-10 w-auto"
    />
  ),
  used: (
    <Image
      src="/brand-assets/benefit-icons/miles/miles-dark.svg"
      alt="Used tow truck"
      width={60}
      height={81}
      className="h-6 sm:h-10 w-auto"
    />
  ),
};

const CARD_ICON_CLASSES: Record<string, string> = {
  used: "!w-auto",
};

const equipmentConfig = {
  ...EQUIPMENT_CARDS_CONFIG,
  cards: EQUIPMENT_CARDS_CONFIG.cards.map((card) => ({
    ...card,
    icon: CARD_ICONS[card.id],
    iconClassName: CARD_ICON_CLASSES[card.id],
  })),
};

/* ------------------------------------------------------------------ */
/*  Program card icons (injected at page level)                        */
/* ------------------------------------------------------------------ */

const PROGRAM_ICONS: Record<string, React.ReactNode> = {
  "zero-down": (
    <Image
      src="/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg"
      alt="$0 down financing"
      width={60}
      height={60}
      className="h-10 sm:h-12 w-auto"
    />
  ),
  fleet: (
    <Image
      src="/brand-assets/benefit-icons/terms/terms-dark.svg"
      alt="Fleet upgrade"
      width={60}
      height={60}
      className="h-10 sm:h-12 w-auto"
    />
  ),
  deferred: (
    <Image
      src="/brand-assets/benefit-icons/deferment/deferment-180-dark.svg"
      alt="Deferred payment"
      width={60}
      height={60}
      className="h-10 sm:h-12 w-auto"
    />
  ),
  "private-party": (
    <Image
      src="/brand-assets/benefit-icons/hook/hook-dark.svg"
      alt="Private party sales"
      width={60}
      height={60}
      className="h-10 sm:h-12 w-auto"
    />
  ),
};

const programCardsConfig = {
  ...PROGRAM_CARDS_CONFIG,
  cards: PROGRAM_CARDS_CONFIG.cards.map((card) => ({
    ...card,
    icon: PROGRAM_ICONS[card.id],
  })),
};

const resourceHubConfig = {
  ...RESOURCE_HUB_CONFIG,
};

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
          className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
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
          className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
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
          className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
        >
          zero down financing
        </a>{" "}
        and{" "}
        <a
          href="/deferred-payment-tow-truck-financing"
          className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
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
          className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      {/* §0 — StickyNav */}
      <StickyNav />

      <main>
        {/* ============================================================ */}
        {/* §1 — HERO                                          bg: white */}
        {/* ============================================================ */}
        <HeroLeadGen config={HERO_LEAD_GEN_CONFIG} />

        {/* ============================================================ */}
        {/* §2 — EQUIPMENT CARDS (Intent Router)              bg: #F5F5F5 */}
        {/* ============================================================ */}
        <EquipmentCards config={equipmentConfig} />

        {/* ============================================================ */}
        {/* §2b — TRUCK GALLERY (mobile-only visual break)               */}
        {/* ============================================================ */}
        <TruckGalleryHeroLeft
          config={TRUCK_GALLERY_CONFIG}
          sectionId="truck-gallery-top"
        />

        {/* ============================================================ */}
        {/* §5 — PROGRAMS (Differentiation Cards)              bg: white */}
        {/* ============================================================ */}
        <ProgramCards config={programCardsConfig} />

        {/* ============================================================ */}
        {/* §5b — BRAND MARQUEE (Trust strip)              bg: #F5F5F5   */}
        {/* ============================================================ */}
        <BrandMarquee />

        {/* ============================================================ */}
        {/* §3 — HOW IT WORKS (Process)                        bg: white */}
        {/* ============================================================ */}
        <HowItWorks config={HOW_IT_WORKS_CONFIG} />

        {/* ============================================================ */}
        {/* §7 — SOCIAL PROOF (Testimonial Marquee)          bg: gray-50 */}
        {/* ============================================================ */}
        <TestimonialMarquee />

        {/* ============================================================ */}
        {/* §4 — REVENUE PROOF (Mini ROI Calculator)         bg: #F0FDF4 */}
        {/* ============================================================ */}
        <MiniROI config={MINI_ROI_CONFIG} />

        {/* ============================================================ */}
        {/* §4b — TRUCK GALLERY (mobile-only visual break)               */}
        {/* ============================================================ */}
        <TruckGalleryHeroRight
          config={TRUCK_GALLERY_CONFIG_ALT}
          sectionId="truck-gallery-after-miniroi"
        />

        {/* ============================================================ */}
        {/* §9 — RESOURCE HUB (Content Links for SEO)          bg: white */}
        {/* ============================================================ */}
        <ResourceHub config={resourceHubConfig} />

        {/* ============================================================ */}
        {/* §10 — FAQ (SEO + Objection Cleanup)              bg: #F5F5F5 */}
        {/* ============================================================ */}
        <section id="faq" className="bg-[#F5F5F5] py-20 md:py-28 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
                Tow Truck Financing{" "}
                <span className="text-[#22C55E]">FAQ</span>
              </h2>
            </div>
            <FAQ faqs={faqs} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* §11 — FINAL CTA (Value Recap + Close)            bg: #F0FDF4 */}
        {/* ============================================================ */}
        <section id="final-cta" className="bg-[#F0FDF4] py-20 md:py-28 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
                Ready to Add Revenue to{" "}
                <span className="text-[#22C55E]">Your Fleet?</span>
              </h2>
            </div>

            {/* Value props */}
            <ul className="mt-16 grid gap-8 md:grid-cols-3">
              <li className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#101820] shadow-[inset_0_0_0_1px_#E9E9E9]">
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
                <h3 className="mt-6 text-xl font-medium text-[#101820]">
                  Pre-approved in 30 secs
                </h3>
              </li>
              <li className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#101820] shadow-[inset_0_0_0_1px_#E9E9E9]">
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
                <h3 className="mt-6 text-xl font-medium text-[#101820]">
                  No hard credit pull required
                </h3>
              </li>
              <li className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#101820] shadow-[inset_0_0_0_1px_#E9E9E9]">
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
                <h3 className="mt-6 text-xl font-medium text-[#101820]">
                  New, used, any equipment type
                </h3>
              </li>
            </ul>

            {/* Final CTA */}
            <div className="mt-16 text-center">
              <a
                href="#pre-approve"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#101820] px-10 text-lg font-medium text-white transition-colors duration-200 hover:bg-[#101820]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2"
              >
                Get Pre-Approved &mdash; It Takes 30&nbsp;Seconds
              </a>
              <p className="mt-6 text-sm text-[#545454]">
                Or call us now:{" "}
                <a
                  href="tel:+18885550199"
                  className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
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
      {/* §12 — FOOTER                                      bg: #101820 */}
      {/* ============================================================ */}
      <footer className="bg-[#101820] pt-16 pb-8 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          {/* Logo */}
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
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
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
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
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
                    href: "/",
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
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
                  {
                    label: "ROI + Payment Calculator",
                    href: "/tow-truck-calculator?angle=roi",
                  },
                  {
                    label: "Lease vs Loan",
                    href: "/resources/tow-truck-lease-vs-loan",
                  },
                  {
                    label: "Financing Companies",
                    href: "/resources/tow-truck-financing-companies",
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
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

          {/* Legal links */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Privacy", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-white/40 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
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
