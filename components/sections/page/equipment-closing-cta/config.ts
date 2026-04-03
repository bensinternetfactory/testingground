export interface EquipmentClosingCtaConfig {
  iconSrc?: string;
  iconAlt?: string;
  eyebrow: string;
  headline: string;
  body: string;
  cta: {
    href: string;
    label: string;
  };
  contactBlock?: {
    prompt: string;
    phoneLabel: string;
    phoneHref: string;
    supportText: string;
  };
}
