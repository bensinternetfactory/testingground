import type { DrawerTriggerPayload } from "@/components/ui/pre-approval-drawer";

export interface EquipmentClosingTile {
  label: string;
  href: string;
  iconSrc: string;
  iconAlt?: string;
}

export interface EquipmentClosingCtaConfig {
  iconSrc?: string;
  iconAlt?: string;
  eyebrow: string;
  headline: string;
  body: string;
  cta?: {
    href: string;
    label: string;
    drawer?: DrawerTriggerPayload;
  };
  contactBlock?: {
    prompt: string;
    phoneLabel: string;
    phoneHref: string;
    supportText: string;
  };
  tiles?: EquipmentClosingTile[];
}
