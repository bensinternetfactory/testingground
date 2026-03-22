export interface TermLookupEntry {
  minYear: number;
  maxYear: number;
  maxTermMonths: number;
}

export interface TermSliderConfig {
  headline: string;
  subheading: string;
  body: string;
  iconSrc: string;
  iconAlt: string;
  defaultYear: number;
  lookupTable: TermLookupEntry[];
}

export const ROLLBACK_TERM_LENGTH_SLIDER_CONFIG: TermSliderConfig = {
  headline: "Older truck? Still financeable.",
  subheading: "See your max term by model year",
  body:
    "Slide to any model year and see the longest term available. Newer rollbacks stretch further, but we finance trucks back to 2000.",
  iconSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
  iconAlt: "Term length icon",
  defaultYear: 2021,
  lookupTable: [
    { minYear: 2000, maxYear: 2009, maxTermMonths: 36 },
    { minYear: 2010, maxYear: 2014, maxTermMonths: 48 },
    { minYear: 2015, maxYear: 2018, maxTermMonths: 60 },
    { minYear: 2019, maxYear: 2022, maxTermMonths: 72 },
    { minYear: 2023, maxYear: 2099, maxTermMonths: 84 },
  ],
};
