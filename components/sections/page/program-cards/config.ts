import { ReactNode } from "react";

export interface ProgramCardData {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconClassName?: string;
  linkText: string;
  linkHref: string;
}

export interface ProgramCardsConfig {
  headline: string;
  subtitle?: string;
  cards: ProgramCardData[];
}

export const PROGRAM_CARDS_CONFIG: ProgramCardsConfig = {
  headline:
    "Programs Built for How Towing Operators Actually Buy Trucks",
  cards: [
    {
      id: "zero-down",
      title: "$0 Down Financing",
      description:
        "Keep your cash. Start earning from day one. Qualify with strong business history.",
      icon: null,
      linkText: "See Zero Down",
      linkHref: "/zero-down-tow-truck-financing",
    },
    {
      id: "fleet",
      title: "Fleet Upgrade",
      description:
        "Special rates when you\u2019re adding truck #2, #3, or #10 to your fleet.",
      icon: null,
      linkText: "Fleet Programs",
      linkHref: "/fleet-financing",
    },
    {
      id: "deferred",
      title: "Deferred Payment",
      description:
        "$99 touch payments for up to 180 days while your truck ramps up.",
      icon: null,
      linkText: "See Deferred Options",
      linkHref: "/deferred-payment-tow-truck-financing",
    },
    {
      id: "private-party",
      title: "Private Party Sales",
      description:
        "Finance trucks from Facebook Marketplace, auctions, or private sellers.",
      icon: null,
      linkText: "Private Party Financing",
      linkHref: "/private-party-tow-truck-financing",
    },
  ],
};
