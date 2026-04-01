import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { JsonLd } from "@/components/shared/JsonLd";

import { BrandMarquee } from "@/components/sections/page/brand-marquee";
import { TrustBridge } from "@/components/sections/page/trust-bridge";
import { ProgramCards } from "@/components/sections/page/program-cards/ProgramCards";
import { EquipmentDealsSection } from "@/components/sections/page/equipment-deals";
import { FaqSection } from "@/components/sections/page/faq";
import { Footer, FOOTER_CONFIG } from "@/components/sections/page/footer";
import {
  HeroConvertFramed,
  HeroConvertFramedOutline,
  HeroConvertFramedPrimaryOnly,
  HeroConvertFramedTileRight,
} from "@/components/sections/heroes/hero-convert-framed";
import { FinancingFootnotes } from "@/components/sections/page/financing-footnotes";
import { EquipmentClosingCta } from "@/components/sections/page/equipment-closing-cta";
import { TertiaryActionsStrip } from "@/components/sections/page/tertiary-strip";
import { FinancingOffersSplit } from "@/components/sections/page/financing-offers-split";
import { PurchaseAndTermsSection } from "@/components/sections/page/purchase-and-terms";
import { RelatedLinksStrip } from "@/components/sections/page/related-links-strip";
import type { EquipmentFinancingPageConfig } from "./page-config-types";

export function EquipmentFinancingPageShell({
  config,
}: {
  config: EquipmentFinancingPageConfig;
}) {
  return (
    <div className="min-h-screen bg-white font-sans">
      <JsonLd data={config.faqSchema} />
      <JsonLd data={config.financialProductSchema} />
      <JsonLd data={config.breadcrumbSchema} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <StickyNav />

        <main id="main-content">
          {config.hero.kind === "tile-right" ? (
            <HeroConvertFramedTileRight config={config.hero.config} />
          ) : config.hero.kind === "primary-only" ? (
            <HeroConvertFramedPrimaryOnly config={config.hero.config} />
          ) : config.hero.kind === "framed-outline" ? (
            <HeroConvertFramedOutline config={config.hero.config} />
          ) : (
            <HeroConvertFramed config={config.hero.config} />
          )}
          {config.tertiaryStrip ? (
            <TertiaryActionsStrip config={config.tertiaryStrip} />
          ) : null}
          {config.financingOffers ? (
            <FinancingOffersSplit config={config.financingOffers} />
          ) : null}
          {config.programs ? <ProgramCards config={config.programs} /> : null}
          <BrandMarquee />
          {config.financingOffersSecondary ? (
            <FinancingOffersSplit config={config.financingOffersSecondary} />
          ) : null}
          {config.purchaseAndTerms ? (
            <PurchaseAndTermsSection config={config.purchaseAndTerms} />
          ) : null}
          {config.purchaseTermsTertiaryStrip ? (
            <TertiaryActionsStrip config={config.purchaseTermsTertiaryStrip} />
          ) : null}
          {config.trustBridge ? (
            <TrustBridge config={config.trustBridge} />
          ) : null}
          {config.purchaseAndTermsSecondary ? (
            <PurchaseAndTermsSection config={config.purchaseAndTermsSecondary} />
          ) : null}
          {config.dealsSection ? (
            <EquipmentDealsSection config={config.dealsSection} />
          ) : null}
          <FaqSection config={config.faqSection} />
          <FinancingFootnotes config={config.footnotes} />
          <EquipmentClosingCta config={config.closingCta} />
          <RelatedLinksStrip config={config.relatedLinks} />
        </main>

      <Footer config={FOOTER_CONFIG} />
    </div>
  );
}
