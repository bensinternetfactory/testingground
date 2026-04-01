import type { PurchaseSourceStackConfig } from "@/components/sections/page/purchase-source-stack/config";
import type { TermSliderConfig } from "@/components/sections/page/term-length-slider/config";

export interface PurchaseAndTermsSectionHeading {
  eyebrow?: string;
  heading: string;
  intro?: string;
}

export interface PurchaseAndTermsConfig {
  sectionHeading?: PurchaseAndTermsSectionHeading;
  purchaseStack: PurchaseSourceStackConfig;
  termSlider: TermSliderConfig;
}
