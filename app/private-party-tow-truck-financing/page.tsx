import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { HeroSection } from "@/components/sections/HeroSection";
import { DefinitionSection } from "@/components/sections/DefinitionSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ExampleSection } from "@/components/sections/ExampleSection";
import { WhyBanksRefuse } from "@/components/sections/WhyBanksRefuse";
import { RequirementsSection } from "@/components/sections/RequirementsSection";
import { DealKillersSection } from "@/components/sections/DealKillersSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FAQSection, faqSchema } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Private Party Tow Truck Financing | Tow Loans",
  description:
    "Finance a tow truck from a private seller, auction, or retiring operator. No dealer required. See your payment in 30 seconds. We handle bank payoffs.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Private Party Tow Truck Financing",
  description:
    "Finance a tow truck from a private seller, auction, or retiring operator. No dealer required. See your payment in 30 seconds. We handle bank payoffs.",
  author: {
    "@type": "Organization",
    name: "Tow Loans",
  },
};

export default function PrivatePartyTowTruckFinancing() {
  return (
    <div className="min-h-screen bg-white font-sans dark:bg-black">
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />
      <main>
        <HeroSection />
        <DefinitionSection />
        <ProcessSection />
        <ExampleSection />
        <WhyBanksRefuse />
        <RequirementsSection />
        <DealKillersSection />
        <ComparisonTable />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
}
