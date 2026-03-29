import type { Metadata } from "next";
import { Suspense } from "react";
import { Calculator } from "@/components/sections/calculator/Calculator";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm/StickyNav";
import { Footer, FOOTER_CONFIG } from "@/components/sections/page/footer";

export const metadata: Metadata = {
  title: "Tow Truck ROI Calculator — Will This Truck Cash Flow? | TowLoans",
  description:
    "Free tow truck ROI calculator for operators. Enter your numbers and instantly see monthly cash flow, breakeven calls, payback period, and profit per tow. No signup required.",
  openGraph: {
    title: "Tow Truck ROI Calculator — Will This Truck Cash Flow?",
    description:
      "Free tow truck ROI calculator. See monthly cash flow, breakeven calls, and profit per tow instantly.",
    type: "website",
  },
};

export default function TowTruckCalculatorPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <StickyNav />

      <main id="main-content">
        {/* Dark Hero */}
        <section className="bg-[#101820] pb-12 pt-[calc(var(--nav-height)+3rem)] md:pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <h1 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-5xl">
              Will this truck{" "}
              <span className="text-[#22C55E]">cash flow?</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              Plug in the numbers for the truck you&rsquo;re looking at. The
              calculator shows your monthly cash flow, breakeven point, and ROI
              &mdash;&nbsp;so you can buy with confidence, not guesswork.
            </p>
            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {["Real-time results", "Shareable link", "No signup required"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/60"
                  >
                    {badge}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="calculator-grid-bg py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Suspense>
              <Calculator />
            </Suspense>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-[#101820] py-8">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-xs leading-relaxed text-white/40">
              This calculator provides estimates for informational purposes only
              and does not constitute financial advice, a loan offer, or a
              guarantee of terms. Actual rates, payments, and returns will vary
              based on creditworthiness, lender terms, market conditions, and
              individual circumstances. Consult a qualified financial professional
              before making purchase or financing decisions.
            </p>
          </div>
        </section>
      </main>

      <Footer config={FOOTER_CONFIG} />
    </div>
  );
}
