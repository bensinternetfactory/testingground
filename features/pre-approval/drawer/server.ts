import type {
  PreApprovalPlacement,
  PreApprovalTrigger,
  PreApprovalTruckType,
} from "../contract";

export const preApprovalEntryHash = "#get-pre-approved";
export const preApprovalFallbackEntryHref =
  `/rollback-financing${preApprovalEntryHash}`;

export interface PreApprovalTriggerAttributes {
  "data-pre-approval-version": "2";
  "data-pre-approval-origin-page-id": string;
  "data-pre-approval-origin-section-id": string;
  "data-pre-approval-origin-cta-id": string;
  "data-pre-approval-origin-placement": PreApprovalPlacement;
  "data-pre-approval-drawer-title"?: string;
  "data-pre-approval-handoff-truck-type"?: PreApprovalTruckType;
}

export function buildPreApprovalEntryHref(pathname: string | null): string {
  return pathname ? preApprovalEntryHash : preApprovalFallbackEntryHref;
}

export function buildPreApprovalTriggerAttributes(
  trigger: PreApprovalTrigger,
): PreApprovalTriggerAttributes {
  const attributes: PreApprovalTriggerAttributes = {
    "data-pre-approval-version": "2",
    "data-pre-approval-origin-page-id": trigger.origin.pageId,
    "data-pre-approval-origin-section-id": trigger.origin.sectionId,
    "data-pre-approval-origin-cta-id": trigger.origin.ctaId,
    "data-pre-approval-origin-placement": trigger.origin.placement,
  };

  if (trigger.drawer?.title) {
    attributes["data-pre-approval-drawer-title"] = trigger.drawer.title;
  }

  if (trigger.handoff?.truckType) {
    attributes["data-pre-approval-handoff-truck-type"] =
      trigger.handoff.truckType;
  }

  return attributes;
}
