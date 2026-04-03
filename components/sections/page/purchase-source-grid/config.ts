export interface PurchaseSourceGridItem {
  sourceName: string;
  descriptor: string;
}

export interface PurchaseSourceGridConfig {
  headline: string;
  body: string;
  iconSrc: string;
  iconAlt: string;
}

export const PURCHASE_SOURCE_GRID_ITEMS: PurchaseSourceGridItem[] = [
  {
    sourceName: "Dealerships",
    descriptor: "Any franchise or independent dealer",
  },
  {
    sourceName: "Private Sellers",
    descriptor: "Direct owner-to-owner",
  },
  {
    sourceName: "Auctions",
    descriptor: "eBay, Ritchie Brothers",
  },
  {
    sourceName: "Online Classifieds",
    descriptor: "Facebook Marketplace, Craigslist",
  },
];
