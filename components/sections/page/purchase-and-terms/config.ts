import {
  ROLLBACK_PURCHASE_SOURCE_STACK_CONFIG,
  type PurchaseSourceStackConfig,
} from "@/components/sections/page/purchase-source-stack/config";
import {
  ROLLBACK_TERM_LENGTH_SLIDER_CONFIG,
  type TermSliderConfig,
} from "@/components/sections/page/term-length-slider/config";

export interface PurchaseAndTermsConfig {
  purchaseStack: PurchaseSourceStackConfig;
  termSlider: TermSliderConfig;
}

export const ROLLBACK_PURCHASE_AND_TERMS_CONFIG: PurchaseAndTermsConfig = {
  purchaseStack: ROLLBACK_PURCHASE_SOURCE_STACK_CONFIG,
  termSlider: ROLLBACK_TERM_LENGTH_SLIDER_CONFIG,
};
