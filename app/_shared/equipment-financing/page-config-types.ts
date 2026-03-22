import type { Metadata } from "next";
import type { HeroConvertFramedConfig } from "@/components/sections/heroes/hero-convert-framed/HeroConvertFramed";
import type { HeroConvertFramedOutlineConfig } from "@/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline";
import type { HeroConvertFramedPrimaryOnlyConfig } from "@/components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly";
import type { EquipmentDealsSectionConfig } from "@/components/sections/page/equipment-deals";
import type { EquipmentClosingCtaConfig } from "@/components/sections/page/equipment-closing-cta/config";
import {
  buildFaqSchema,
  type FaqSectionConfig,
} from "@/components/sections/page/faq/config";
import type { FinancingFootnotesConfig } from "@/components/sections/page/financing-footnotes/config";
import type { FinancingOffersSplitConfig } from "@/components/sections/page/financing-offers-split/config";
import type { ProgramCardsConfig } from "@/components/sections/page/program-cards/config";
import type { PurchaseAndTermsConfig } from "@/components/sections/page/purchase-and-terms/config";
import type { RelatedLinksStripConfig } from "@/components/sections/page/related-links-strip/config";
import type { TertiaryStripConfig } from "@/components/sections/page/tertiary-strip/config";
import type { TrustBridgeConfig } from "@/components/sections/page/trust-bridge/config";

export interface FramedEquipmentHeroConfig {
  kind: "framed";
  config: HeroConvertFramedConfig;
}

export interface PrimaryOnlyEquipmentHeroConfig {
  kind: "primary-only";
  config: HeroConvertFramedPrimaryOnlyConfig;
}

export interface FramedOutlineEquipmentHeroConfig {
  kind: "framed-outline";
  config: HeroConvertFramedOutlineConfig;
}

export type EquipmentHeroConfig =
  | FramedEquipmentHeroConfig
  | FramedOutlineEquipmentHeroConfig
  | PrimaryOnlyEquipmentHeroConfig;

export interface EquipmentFinancingPageConfig {
  slug: "rollback-financing" | "wrecker-financing" | "rotator-financing";
  metadata: Metadata;
  hero: EquipmentHeroConfig;
  programs?: ProgramCardsConfig;
  trustBridge?: TrustBridgeConfig;
  dealsSection?: EquipmentDealsSectionConfig;
  tertiaryStrip?: TertiaryStripConfig;
  financingOffers?: FinancingOffersSplitConfig;
  purchaseAndTerms?: PurchaseAndTermsConfig;
  purchaseTermsTertiaryStrip?: TertiaryStripConfig;
  faqSection: FaqSectionConfig;
  faqSchema: ReturnType<typeof buildFaqSchema>;
  financialProductSchema: Record<string, unknown>;
  breadcrumbSchema: Record<string, unknown>;
  footnotes: FinancingFootnotesConfig;
  closingCta: EquipmentClosingCtaConfig;
  relatedLinks: RelatedLinksStripConfig;
}
