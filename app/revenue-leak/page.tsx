import type { Metadata } from "next";
import {
  StickyNav,
  HeroSection,
  FinancingCards,
  GuideBuilder,
  FeaturedPrograms,
  CalculatorCTA,
  TestimonialsSection,
  FinalCTA,
  LegalSection,
  FooterSection,
} from "@/components/sections/revenue-leak";

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
        <HeroSection />
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
