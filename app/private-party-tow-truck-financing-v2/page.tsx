import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { HeroSectionV2 } from "@/components/sections/v2/HeroSectionV2";
import { DefinitionSectionV2 } from "@/components/sections/v2/DefinitionSectionV2";
import { ProcessSectionV2 } from "@/components/sections/v2/ProcessSectionV2";
import { ExampleSectionV2 } from "@/components/sections/v2/ExampleSectionV2";
import { WhyBanksRefuseV2 } from "@/components/sections/v2/WhyBanksRefuseV2";
import { RequirementsSectionV2 } from "@/components/sections/v2/RequirementsSectionV2";
import { DealKillersSectionV2 } from "@/components/sections/v2/DealKillersSectionV2";
import { ComparisonTableV2 } from "@/components/sections/v2/ComparisonTableV2";
import { FAQSectionV2 } from "@/components/sections/v2/FAQSectionV2";
import { faqSchemaV2 } from "@/components/sections/v2/faqData";
import { CTASectionV2 } from "@/components/sections/v2/CTASectionV2";

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

export default function PrivatePartyTowTruckFinancingV2() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <JsonLd data={faqSchemaV2} />
      <JsonLd data={articleSchema} />
      <main>
        <HeroSectionV2 />
        <DefinitionSectionV2 />
        <ProcessSectionV2 />
        <ExampleSectionV2 />
        <WhyBanksRefuseV2 />
        <RequirementsSectionV2 />
        <DealKillersSectionV2 />
        <ComparisonTableV2 />
        <FAQSectionV2 />
        <CTASectionV2 />
      </main>
    </div>
  );
}
