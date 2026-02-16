import type { Metadata } from "next";
import { StickyNav } from "@/components/sections/revenue-leak/StickyNav";
import {
  FinancingCards,
  GuideBuilder,
  FeaturedPrograms,
  CalculatorCTA,
  TestimonialsSection,
  FinalCTA,
  LegalSection,
  FooterSection,
} from "@/components/sections/revenue-leak";
import { HeroQuoteStart } from "@/components/sections/revenue-leak/HeroQuoteStart";
import { HERO_QUOTE_START_CONFIG } from "@/components/sections/revenue-leak/hero-quote-start-config";

export const metadata: Metadata = {
  title: "Tow Truck Financing | Stop Turning Down Calls | TowCap",
  description:
    "Every call you can\u2019t cover is cash driving to your competitor. Get pre-approved for tow truck financing in 30 seconds. No hard credit pull. No obligation.",
};

export default function RevenueLeakPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#DE3341] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <StickyNav />
      <main>
        <HeroQuoteStart config={HERO_QUOTE_START_CONFIG} />
        <FinancingCards />
        <GuideBuilder />
        <FeaturedPrograms />
        <CalculatorCTA />
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <LegalSection />
      <FooterSection />
    </div>
  );
}
