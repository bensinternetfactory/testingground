export interface EquipmentCardData {
  id: string;
  title: string;
  description: string;
  iconId: "rollback" | "wrecker" | "rotator" | "used";
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
      iconId: "rollback",
      linkText: "See Rollback Financing",
      linkHref: "/rollback-financing",
    },
    {
      id: "wrecker",
      title: "Wrecker",
      description: "Light, medium & heavy",
      iconId: "wrecker",
      linkText: "See Wrecker Financing",
      linkHref: "/wrecker-financing",
    },
    {
      id: "rotator",
      title: "Rotator",
      description: "50-75 ton heavy recovery",
      iconId: "rotator",
      linkText: "See Rotator Financing",
      linkHref: "/rotator-financing",
    },
    {
      id: "used",
      title: "Used Tow Trucks",
      description: "Any age. Any milage. Any source.",
      iconId: "used",
      iconClassName: "!w-auto",
      linkText: "Used Tow Truck Financing",
      linkHref: "/used-tow-truck-financing",
    },
  ],
};
