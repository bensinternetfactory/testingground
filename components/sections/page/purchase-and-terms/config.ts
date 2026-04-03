import type { PurchaseSourceGridConfig } from "@/components/sections/page/purchase-source-grid/config";
import type { TermSliderConfig } from "@/components/sections/page/term-length-slider/config";

export interface PurchaseAndTermsSectionHeading {
  eyebrow?: string;
  heading: string;
  intro?: string;
}

export interface PurchaseAndTermsConfig {
  sectionHeading?: PurchaseAndTermsSectionHeading;
  purchaseStack: PurchaseSourceGridConfig;
  termSlider: TermSliderConfig;
}
