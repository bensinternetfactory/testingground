interface BaseOfferIcon {
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
}

export interface FinancingOfferHalf extends BaseOfferIcon {
  headline: string;
  body: string;
}

export interface FinancingOffersSplitConfig {
  left: FinancingOfferHalf;
  right: FinancingOfferHalf;
}

export const ROLLBACK_FINANCING_OFFERS_SPLIT_CONFIG: FinancingOffersSplitConfig = {
  left: {
    headline: "Zero Down Rollback Financing",
    body:
      "Keep your cash in the business. Qualified operators can finance a rollback with nothing down when the deal, truck, and operating profile support it.",
    iconSrc: "/brand-assets/benefit-icons/zero-down/no-money-down-dark.svg",
    iconAlt: "Zero down payment icon",
    iconWidth: 64,
    iconHeight: 64,
  },
  right: {
    headline: "No Payments for Up to 180 Days",
    body:
      "Put the rollback on the road and start producing revenue before full payments begin. Deferred first-payment options give you runway.",
    iconSrc: "/brand-assets/benefit-icons/deferment/deferment-180-dark.svg",
    iconAlt: "180-day payment deferment icon",
    iconWidth: 64,
    iconHeight: 64,
  },
};
