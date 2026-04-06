import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import {
  buildPreApprovalEntryHref,
  buildPreApprovalTriggerAttributes,
  type PreApprovalTriggerAttributes,
} from "@/features/pre-approval/drawer/server";

export interface PreApprovalEntry {
  kind: "pre-approval";
  href: string;
  trigger: PreApprovalTrigger;
}

export function createPreApprovalEntry({
  pathname,
  trigger,
}: {
  pathname: string | null;
  trigger: PreApprovalTrigger;
}): PreApprovalEntry {
  return {
    kind: "pre-approval",
    href: buildPreApprovalEntryHref(pathname),
    trigger,
  };
}

export function getPreApprovalEntryAttributes(
  entry: Pick<PreApprovalEntry, "trigger">,
): PreApprovalTriggerAttributes {
  return buildPreApprovalTriggerAttributes(entry.trigger);
}
