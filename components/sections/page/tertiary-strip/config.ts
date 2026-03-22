import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";

export interface TertiaryStripAction {
  eyebrow: string;
  label: string;
  href: string;
  drawerTitle?: string;
}

export interface TertiaryStripConfig {
  actions: TertiaryStripAction[];
}

export const ROLLBACK_TERTIARY_STRIP_CONFIG: TertiaryStripConfig = {
  actions: [
    {
      eyebrow: "Already have a truck in mind?",
      label: "I found a truck and need financing",
      href: DRAWER_HASH,
      drawerTitle: "How much is the rollback you found?",
    },
    {
      eyebrow: "Haven't found a truck?",
      label: "What's my buying power?",
      href: "/pre-approval",
    },
  ],
};
