import type { Metadata } from "next";
import {
  StickyNav,
  HeroSection,
  QuickNavCards,
  FinancingCards,
  GuideBuilder,
  FeaturedPrograms,
  CalculatorCTA,
  TestimonialsSection,
  FinalCTA,
  LegalSection,
  FooterSection,
} from "@/components/sections/insider";

export const metadata: Metadata = {
  title: "Tow Truck Financing | Get Pre-Approved in 30 Seconds | Tow Loans",
  description:
    "Tow truck financing from people who know the business. Flatbeds, rollbacks, wreckers, and rotators. Pre-approved in 30 seconds. No credit check. Tow Loans.",
};

export default function InsiderPage() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <StickyNav />
      <main>
        <HeroSection />
        <QuickNavCards />
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
