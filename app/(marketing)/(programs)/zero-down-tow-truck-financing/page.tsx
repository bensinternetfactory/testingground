import { HeroLeadGen } from "@/components/sections/heroes/hero-lead-gen/HeroLeadGen";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { EquipmentClosingCtaTrucks } from "@/components/sections/page/equipment-closing-cta";
import { FaqSection } from "@/components/sections/page/faq";
import { Footer } from "@/components/sections/page/footer/Footer";
import { FOOTER_CONFIG } from "@/components/sections/page/footer/config";
import { JsonLd } from "@/components/shared/JsonLd";
import { ArticleIntro } from "./_components/ArticleIntro";
import { ArticleSidebar } from "./_components/ArticleSidebar";
import { BlogLayout } from "./_components/BlogLayout";
import { BottomLinkCards } from "./_components/BottomLinkCards";
import { BusinessCaseSection } from "./_components/BusinessCaseSection";
import { CalculatorPromoSection } from "./_components/CalculatorPromoSection";
import { InlineCtaBand } from "./_components/InlineCtaBand";
import { MobileTocCard } from "./_components/MobileTocCard";
import { PaymentComparisonSection } from "./_components/PaymentComparisonSection";
import { QualificationPathsSection } from "./_components/QualificationPathsSection";
import { RelatedProgramsSection } from "./_components/RelatedProgramsSection";
import { SectionDivider } from "./_components/SectionDivider";
import { TruckFlexibilitySection } from "./_components/TruckFlexibilitySection";
import { zeroDownPageConfig } from "./config";

export const metadata = zeroDownPageConfig.metadata;

export default function ZeroDownTowTruckFinancingPage() {
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
        <HeroLeadGen config={zeroDownPageConfig.hero} />

        <BlogLayout>
          <article className="min-w-0 max-w-[720px] px-6 py-20 md:px-8 md:py-28 lg:pr-12">
            <MobileTocCard items={zeroDownPageConfig.toc} />
            <ArticleIntro />
            <BusinessCaseSection />
            <InlineCtaBand config={zeroDownPageConfig.ctaBand1} />
            <QualificationPathsSection />
            <SectionDivider />
            <TruckFlexibilitySection />
            <SectionDivider />
            <PaymentComparisonSection />
            <InlineCtaBand config={zeroDownPageConfig.ctaBand2} />
            <CalculatorPromoSection />
            <RelatedProgramsSection />
          </article>

          <ArticleSidebar
            toc={zeroDownPageConfig.toc}
            cta={zeroDownPageConfig.sidebarCta}
          />
        </BlogLayout>

        <FaqSection config={zeroDownPageConfig.faqSection} />
        <EquipmentClosingCtaTrucks config={zeroDownPageConfig.closingCta} />
        <BottomLinkCards config={zeroDownPageConfig.bottomLinks} />
        <JsonLd data={zeroDownPageConfig.faqSchema} />
        <JsonLd data={zeroDownPageConfig.serviceSchema} />
        <JsonLd data={zeroDownPageConfig.breadcrumbSchema} />
      </main>

      <Footer config={FOOTER_CONFIG} />
    </div>
  );
}
