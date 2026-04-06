import type { PreApprovalTrigger } from "@/features/pre-approval/contract";

export interface EquipmentClosingTile {
  label: string;
  href: string;
  iconSrc: string;
  iconAlt?: string;
  preApprovalTrigger?: PreApprovalTrigger;
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
    preApprovalTrigger?: PreApprovalTrigger;
  };
  contactBlock?: {
    prompt: string;
    phoneLabel: string;
    phoneHref: string;
    supportText: string;
  };
  tiles?: EquipmentClosingTile[];
}
