import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import type { DrawerTriggerPayload } from "@/components/ui/pre-approval-drawer";

export interface TertiaryStripAction {
  eyebrow: string;
  label: string;
  href: string;
  preApprovalTrigger?: PreApprovalTrigger;
  drawer?: DrawerTriggerPayload;
}

export interface TertiaryStripConfig {
  actions: TertiaryStripAction[];
}
