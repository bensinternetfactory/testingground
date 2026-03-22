export interface CountdownConfig {
  /** ISO date string anchor for the countdown, e.g. "2026-04-01" */
  anchorDate: string;
  /** Number of days for the initial countdown window */
  initialWindowDays: number;
  /** If true, restart in 30-day cycles after the initial window expires */
  autoReset: boolean;
}

export interface LearnMoreLink {
  text: string;
  href: string;
}

interface BaseOfferIcon {
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
}

export interface FinancingOfferHalf extends BaseOfferIcon {
  headline: string;
  body: string;
  countdown?: CountdownConfig;
  learnMoreLink?: LearnMoreLink;
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
    countdown: {
      anchorDate: "2026-03-22",
      initialWindowDays: 30,
      autoReset: true,
    },
    learnMoreLink: {
      text: "How deferred payments work",
      href: "/deferred-payment-tow-truck-financing",
    },
  },
};
