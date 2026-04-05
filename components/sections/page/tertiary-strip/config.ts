import type { DrawerTriggerPayload } from "@/components/ui/pre-approval-drawer";

export interface TertiaryStripAction {
  eyebrow: string;
  label: string;
  href: string;
  drawer?: DrawerTriggerPayload;
}

export interface TertiaryStripConfig {
  actions: TertiaryStripAction[];
}
