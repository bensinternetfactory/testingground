export interface PurchaseSourceCard {
  id: string;
  sourceName: string;
  sourceSubtitle: string;
  iconSrc: string;
  iconAlt: string;
  badgeLabel: string;
  sampleListing: string;
  samplePrice: string;
}

export interface PurchaseSourceStackConfig {
  headline: string;
  body: string;
  iconSrc: string;
  iconAlt: string;
  cards: PurchaseSourceCard[];
  rotationIntervalMs: number;
}

