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

