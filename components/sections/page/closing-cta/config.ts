import {
  DRAWER_HASH,
  type DrawerTriggerPayload,
} from "@/components/ui/pre-approval-drawer";

interface BaseClosingCtaBenefitIcon {
  src: string;
  width: number;
  height: number;
}

interface DecorativeClosingCtaBenefitIcon extends BaseClosingCtaBenefitIcon {
  decorative: true;
  alt?: never;
}

interface InformativeClosingCtaBenefitIcon extends BaseClosingCtaBenefitIcon {
  decorative?: false;
  alt: string;
}

export type ClosingCtaBenefitIcon =
  | DecorativeClosingCtaBenefitIcon
  | InformativeClosingCtaBenefitIcon;

export interface ClosingCtaBenefit {
  id: string;
  label: string;
  icon: ClosingCtaBenefitIcon;
}

export interface ClosingCtaConfig {
  headline: string;
  benefits: [ClosingCtaBenefit, ...ClosingCtaBenefit[]];
  primaryCta: {
    label: string;
    shortLabel: string;
    href: string;
    drawer?: DrawerTriggerPayload;
  };
  contactBlock?: {
    phone: { label: string; href: string };
    supportText: string;
  };
}

export const CLOSING_CTA_CONFIG: ClosingCtaConfig = {
  headline: "Ready to Add Revenue to Your Fleet?",
  benefits: [
    {
      id: "fast",
      label: "Pre-Approved in 30 Seconds",
      icon: {
        src: "/brand-assets/benefit-icons/fast/fast-funding-watch-dark.svg",
        decorative: true,
        width: 60,
        height: 60,
      },
    },
    {
      id: "inquiry",
      label: "No Hard Credit Pull",
      icon: {
        src: "/brand-assets/benefit-icons/inquiry/credit-inquiry-dark.svg",
        decorative: true,
        width: 60,
        height: 60,
      },
    },
    {
      id: "hook",
      label: "New, Used & Any Equipment Type",
      icon: {
        src: "/brand-assets/benefit-icons/hook/hook-dark.svg",
        decorative: true,
        width: 60,
        height: 60,
      },
    },
  ],
  primaryCta: {
    label: "Get Pre-Approved \u2014 It Takes 30\u00a0Seconds",
    shortLabel: "Get Pre-Approved",
    href: DRAWER_HASH,
  },
  contactBlock: {
    phone: { label: "(888)\u00a0555-0199", href: "tel:+18885550199" },
    supportText: "Mon-Fri 8am-6pm CT | Tow truck financing specialists",
  },
};
