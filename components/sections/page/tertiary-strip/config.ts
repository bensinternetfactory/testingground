import type { PreApprovalTrigger } from "@/features/pre-approval/contract";

export interface TertiaryStripAction {
  eyebrow: string;
  label: string;
  href: string;
  preApprovalTrigger?: PreApprovalTrigger;
}

export interface TertiaryStripConfig {
  actions: TertiaryStripAction[];
}
