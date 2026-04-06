"use client";

import type { ReactNode } from "react";
import {
  CtaLink,
  type RippleCtaLinkAnalyticsPayload,
} from "@/features/cta/client";
import { type PreApprovalTrigger } from "@/features/pre-approval/contract";

export type { RippleCtaLinkAnalyticsPayload } from "@/features/cta/client";

const variantToTone = {
  filled: "primary",
  outline: "secondary",
  "outline-dark": "inverse",
} as const;

const justifyToAlign = {
  center: "center",
  between: "between",
} as const;

export interface RippleCtaLinkProps {
  href: string;
  label: string;
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outline" | "outline-dark";
  justify?: "center" | "between";
  className?: string;
  prefetch?: boolean;
  isPlaceholder?: boolean;
  onAnalyticsEvent?: (payload: RippleCtaLinkAnalyticsPayload) => void;
  ariaLabel?: string;
  section?: string;
  cardId?: string;
  disabled?: boolean;
  preApprovalTrigger?: PreApprovalTrigger;
}

export function RippleCtaLink({
  href,
  label,
  children,
  icon,
  iconPosition = "end",
  size = "md",
  variant = "filled",
  justify = "center",
  className,
  prefetch,
  isPlaceholder = false,
  onAnalyticsEvent,
  ariaLabel,
  section = "",
  cardId,
  disabled = false,
  preApprovalTrigger,
}: RippleCtaLinkProps) {
  return (
    <CtaLink
      href={href}
      copy={{ label, ariaLabel }}
      appearance={{
        tone: variantToTone[variant],
        size,
        align: justifyToAlign[justify],
        className,
      }}
      analytics={{
        legacySection: section,
        legacyCardId: cardId,
        isPlaceholder,
      }}
      disabled={disabled}
      icon={icon}
      iconPosition={iconPosition}
      onAnalyticsEvent={onAnalyticsEvent}
      preApprovalTrigger={preApprovalTrigger}
      prefetch={prefetch}
    >
      {children}
    </CtaLink>
  );
}
