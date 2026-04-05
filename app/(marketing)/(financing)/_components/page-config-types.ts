import type { HeroConvertFramedConfig } from "@/components/sections/heroes/hero-convert-framed/HeroConvertFramed";
import type { HeroConvertFramedOutlineConfig } from "@/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline";
import type { HeroConvertFramedPrimaryOnlyConfig } from "@/components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly";
import type { HeroConvertFramedTileRightConfig } from "@/components/sections/heroes/hero-convert-framed/HeroConvertFramedTileRight";
import type { HeroLeadGenConfig } from "@/components/sections/heroes/hero-lead-gen/config";
import type { EquipmentClosingCtaConfig } from "@/components/sections/page/equipment-closing-cta/config";
import {
  buildFaqSchema,
  type FaqSectionConfig,
} from "@/components/sections/page/faq/config";
import type { FinancingFootnotesConfig } from "@/components/sections/page/financing-footnotes/config";
import type { FinancingOffersSplitConfig } from "@/components/sections/page/financing-offers-split/config";
import type { PurchaseAndTermsConfig } from "@/components/sections/page/purchase-and-terms/config";
import type { RelatedLinksStripConfig } from "@/components/sections/page/related-links-strip/config";
import type { TertiaryStripConfig } from "@/components/sections/page/tertiary-strip/config";
import type { ContentImageSplitConfig } from "@/components/sections/page/content-image-split/config";

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

export interface TileRightEquipmentHeroConfig {
  kind: "tile-right";
  config: HeroConvertFramedTileRightConfig;
}

export interface LeadGenEquipmentHeroConfig {
  kind: "lead-gen";
  config: HeroLeadGenConfig;
}

export type EquipmentHeroConfig =
  | FramedEquipmentHeroConfig
  | FramedOutlineEquipmentHeroConfig
  | PrimaryOnlyEquipmentHeroConfig
  | TileRightEquipmentHeroConfig
  | LeadGenEquipmentHeroConfig;

// Page config objects should be authored in rendered page order; only extract content that is reused.
export interface EquipmentFinancingPageConfig {
  /* ── Page identity & metadata ──────────────────────────── */
  slug: "rollback-financing" | "wrecker-financing" | "rotator-financing" | "used-tow-truck-financing";

  /* ── Visual sections — top to bottom ───────────────────── */
  hero: EquipmentHeroConfig;
  tertiaryStrip?: TertiaryStripConfig;
  financingOffers?: FinancingOffersSplitConfig;
  financingOffersSecondary?: FinancingOffersSplitConfig;
  purchaseAndTerms?: PurchaseAndTermsConfig;
  purchaseTermsTertiaryStrip?: TertiaryStripConfig;
  contentImageSplit?: ContentImageSplitConfig;
  purchaseAndTermsSecondary?: PurchaseAndTermsConfig;
  faqSection: FaqSectionConfig;
  footnotes: FinancingFootnotesConfig;
  closingCta: EquipmentClosingCtaConfig;
  relatedLinks: RelatedLinksStripConfig;

  /* ── Structured data (invisible JsonLd) ────────────────── */
  faqSchema: ReturnType<typeof buildFaqSchema>;
  financialProductSchema: Record<string, unknown>;
  breadcrumbSchema: Record<string, unknown>;
}
