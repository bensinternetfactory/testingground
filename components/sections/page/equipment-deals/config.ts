export interface EquipmentDealCard {
  title: string;
  description: string;
}

export interface EquipmentDealsSectionConfig {
  eyebrow?: string;
  heading: string;
  intro?: string;
  items: EquipmentDealCard[];
}
