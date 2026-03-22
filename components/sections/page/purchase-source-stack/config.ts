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

export const ROLLBACK_PURCHASE_SOURCE_STACK_CONFIG: PurchaseSourceStackConfig = {
  headline: "Buy from anyone. We'll finance it.",
  body:
    "Dealership, private seller, auction house, or another towing operator. We finance the truck, not the source.",
  iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
  iconAlt: "Hook icon",
  rotationIntervalMs: 4500,
  cards: [
    {
      id: "dealer",
      sourceName: "Authorized Retailers",
      sourceSubtitle: "Dealer Inventory",
      iconSrc: "/brand-assets/source-icons/placeholder-dealer.svg",
      iconAlt: "Dealer icon",
      badgeLabel: "For Sale",
      sampleListing: "2024 Kenworth T270 Rollback",
      samplePrice: "$87,500",
    },
    {
      id: "fbmp",
      sourceName: "Facebook Marketplace",
      sourceSubtitle: "Private Seller Listings",
      iconSrc: "/brand-assets/source-icons/placeholder-fbmp.svg",
      iconAlt: "Facebook Marketplace icon",
      badgeLabel: "For Sale",
      sampleListing: "2019 Hino 258 Rollback",
      samplePrice: "$62,500",
    },
    {
      id: "auction",
      sourceName: "Ritchie Brothers",
      sourceSubtitle: "Auction Listings",
      iconSrc: "/brand-assets/source-icons/placeholder-auction.svg",
      iconAlt: "Auction house icon",
      badgeLabel: "For Sale",
      sampleListing: "2021 Freightliner M2 Rollback",
      samplePrice: "$74,000",
    },
    {
      id: "private",
      sourceName: "Private Sellers",
      sourceSubtitle: "Operator-to-Operator",
      iconSrc: "/brand-assets/source-icons/placeholder-private.svg",
      iconAlt: "Private seller icon",
      badgeLabel: "For Sale",
      sampleListing: "2017 International 4300 Rollback",
      samplePrice: "$51,000",
    },
  ],
};
