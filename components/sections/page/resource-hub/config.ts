export interface ResourceHubCardData {
  id: string;
  title: string;
  description: string;
  titleHref: string;
  linkText: string;
  linkHref: string;
  iconId: "magnify-dark" | "cost-dark" | "trophy-green" | "terms-pencil";
}

export interface ResourceHubInlineLinkData {
  id: string;
  prefixText: string;
  linkText: string;
  linkHref: string;
  suffixText?: string;
}

export interface ResourceHubConfig {
  headline: string;
  subtitle: string;
  cards: ResourceHubCardData[];
  inlineLinks: ResourceHubInlineLinkData[];
}

export const RESOURCE_HUB_CONFIG: ResourceHubConfig = {
  headline: "Tow Truck Financing Resources",
  subtitle:
    "Decision guides for established operators financing the next truck.",
  cards: [
    {
      id: "cost-guide",
      title: "How Much Does a Tow Truck Cost?",
      description: "New, used, by type. Real price ranges.",
      titleHref: "/resources/how-much-does-a-tow-truck-cost",
      linkText: "Read the Guide",
      linkHref: "/resources/how-much-does-a-tow-truck-cost",
      iconId: "magnify-dark",
    },
    {
      id: "roi-calculator",
      title: "Tow Truck Payment + ROI Calculator",
      description: "Run monthly payment and payback math in one tool.",
      titleHref: "/tow-truck-calculator?angle=roi",
      linkText: "Run the Calculator",
      linkHref: "/tow-truck-calculator?angle=roi",
      iconId: "cost-dark",
    },
    {
      id: "financing-companies",
      title: "Tow Truck Financing Companies",
      description: "Compare lender options, terms, speed, and program fit.",
      titleHref: "/resources/tow-truck-financing-companies",
      linkText: "Compare Companies",
      linkHref: "/resources/tow-truck-financing-companies",
      iconId: "trophy-green",
    },
    {
      id: "lease-vs-loan",
      title: "Lease vs. Loan: Which Is Right for You?",
      description: "Side-by-side comparison guide.",
      titleHref: "/resources/tow-truck-lease-vs-loan",
      linkText: "Compare Options",
      linkHref: "/resources/tow-truck-lease-vs-loan",
      iconId: "terms-pencil",
    },
  ],
  inlineLinks: [
    {
      id: "leasing",
      prefixText: "Prefer to lease instead of buy?",
      linkText: "Explore tow truck leasing options.",
      linkHref: "/tow-truck-leasing",
    },
    {
      id: "add-next-truck",
      prefixText: "Planning your next truck addition?",
      linkText: "See when to add your next truck.",
      linkHref: "/resources/when-to-add-next-truck",
    },
    {
      id: "section-179",
      prefixText: "Buying before year-end?",
      linkText: "Learn about Section 179 tax deductions.",
      linkHref: "/resources/section-179-tow-truck",
    },
  ],
};
