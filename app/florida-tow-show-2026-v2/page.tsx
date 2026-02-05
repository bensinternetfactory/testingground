import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  HeroSection,
  ProblemSection,
  OfferSection,
  EquipmentSection,
  ComparisonSection,
  WhySection,
  TestimonialsSection,
  FAQSection,
  faqSchema,
  CTASection,
} from "@/components/sections/florida-tow-show-v2";

export const metadata: Metadata = {
  title: "Florida Tow Show 2026 Financing | $0 Down, 180 Days Deferred",
  description:
    "Get pre-approved for tow truck financing before the Florida Tow Show (April 9-11, 2026). $0 down, 180 days deferred. Dealer, auction, or private party.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Florida Tow Show 2026 Financing",
  description:
    "Get pre-approved for tow truck financing before the Florida Tow Show (April 9-11, 2026). $0 down, 180 days deferred. Dealer, auction, or private party.",
};

export default function FloridaTowShow2026V2() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <main>
        <HeroSection />
        <ProblemSection />
        <OfferSection />
        <EquipmentSection />
        <ComparisonSection />
        <WhySection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
}
