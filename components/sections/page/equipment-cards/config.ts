import { ReactNode } from "react";

export interface EquipmentCardData {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconClassName?: string;
  linkText: string;
  linkHref: string;
}

export interface EquipmentCardsConfig {
  headline: string;
  subtitle: string;
  cards: EquipmentCardData[];
}

export const EQUIPMENT_CARDS_CONFIG: EquipmentCardsConfig = {
  headline: "Finance Any Tow Truck. From Rollbacks to Rotators.",
  subtitle: "Pick your equipment. We\u2019ll handle the rest.",
  cards: [
    {
      id: "rollback",
      title: "Rollback / Flatbed",
      description: "Most popular first truck",
      icon: null,
      linkText: "See Rollback Financing",
      linkHref: "/rollback-financing",
    },
    {
      id: "wrecker",
      title: "Wrecker",
      description: "Light, medium & heavy",
      icon: null,
      linkText: "See Wrecker Financing",
      linkHref: "/wrecker-financing",
    },
    {
      id: "rotator",
      title: "Rotator",
      description: "50-75 ton heavy recovery",
      icon: null,
      linkText: "See Rotator Financing",
      linkHref: "/rotator-financing",
    },
    {
      id: "used",
      title: "Used Tow Trucks",
      description: "New & used. Any source.",
      icon: null,
      linkText: "Used Truck Financing",
      linkHref: "/used-tow-truck-financing",
    },
  ],
};
