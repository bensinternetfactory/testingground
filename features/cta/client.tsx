"use client";

import type { ReactNode } from "react";
import {
  RippleCtaLink,
  type RippleCtaLinkAnalyticsPayload,
} from "@/components/ui/ripple-cta-link/RippleCtaLink";
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import type {
  CtaAnalyticsContext,
  CtaAppearance,
  CtaCopy,
} from "./contract";
import type { PreApprovalEntry } from "./lead-entry";

const toneToVariant = {
  primary: "filled",
  secondary: "outline",
  inverse: "outline-dark",
} as const;

const alignToJustify = {
  center: "center",
  between: "between",
} as const;

export interface CtaLinkProps {
  href: string;
  copy: CtaCopy;
  appearance?: CtaAppearance;
  analytics?: CtaAnalyticsContext;
  children?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  onAnalyticsEvent?: (payload: RippleCtaLinkAnalyticsPayload) => void;
  preApprovalTrigger?: PreApprovalTrigger;
  prefetch?: boolean;
}

export interface LeadCtaProps extends Omit<CtaLinkProps, "href" | "preApprovalTrigger"> {
  entry: PreApprovalEntry;
}

export function CtaLink({
  href,
  copy,
  appearance,
  analytics,
  children,
  disabled = false,
  icon,
  iconPosition = "end",
  onAnalyticsEvent,
  preApprovalTrigger,
  prefetch,
}: CtaLinkProps) {
  const className = appearance?.fullWidth
    ? `${appearance.className ? `${appearance.className} ` : ""}w-full`
    : appearance?.className;

  return (
    <RippleCtaLink
      href={href}
      label={copy.label}
      ariaLabel={copy.ariaLabel}
      icon={icon}
      iconPosition={iconPosition}
      size={appearance?.size ?? "md"}
      variant={toneToVariant[appearance?.tone ?? "primary"]}
      justify={alignToJustify[appearance?.align ?? "center"]}
      className={className}
      prefetch={prefetch}
      isPlaceholder={analytics?.isPlaceholder ?? false}
      onAnalyticsEvent={onAnalyticsEvent}
      section={analytics?.legacySection}
      cardId={analytics?.legacyCardId}
      disabled={disabled}
      preApprovalTrigger={preApprovalTrigger}
    >
      {children}
    </RippleCtaLink>
  );
}

export function LeadCta({ entry, ...props }: LeadCtaProps) {
  return (
    <CtaLink
      {...props}
      href={entry.href}
      preApprovalTrigger={entry.trigger}
    />
  );
}
