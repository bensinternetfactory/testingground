"use client";

import { useCallback, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import {
  PressFeedbackRipple,
  tapSpring,
  usePressFeedback,
  type PressModality,
} from "@/lib/press-feedback";
import type {
  CtaAnalyticsContext,
  CtaAppearance,
  CtaCopy,
} from "./contract";
import {
  getPreApprovalEntryAttributes,
  type PreApprovalEntry,
} from "./lead-entry";

const sizeClasses = {
  sm: "px-4 py-3 text-sm gap-1.5",
  md: "px-6 py-4 text-base gap-2",
  lg: "px-8 py-5 text-lg gap-2.5",
} as const;

const iconNudgeClasses = {
  start: "group-hover/cta:-translate-x-0.5 group-focus-visible/cta:-translate-x-0.5",
  end: "group-hover/cta:translate-x-0.5 group-focus-visible/cta:translate-x-0.5",
} as const;

const toneClasses = {
  primary: {
    disabled:
      "cursor-not-allowed bg-[#D1D5DB] text-white hover:bg-[#D1D5DB]",
    focusRing: "focus-visible:ring-[#111111]",
    interactive: "bg-[#111111] text-white hover:bg-[#111111]/90",
    ripple: "bg-black/10",
  },
  secondary: {
    disabled:
      "cursor-not-allowed border-gray-300 bg-transparent text-gray-400 hover:border-gray-300 hover:bg-transparent",
    focusRing: "focus-visible:ring-[#111111]",
    interactive:
      "border border-gray-400 bg-transparent text-[#111111] hover:border-gray-500 hover:bg-gray-100",
    ripple: "bg-black/10",
  },
  inverse: {
    disabled:
      "cursor-not-allowed border-white/10 bg-transparent text-white/30 hover:border-white/10 hover:bg-transparent",
    focusRing: "focus-visible:ring-white",
    interactive:
      "border border-white/20 bg-transparent text-white hover:border-white/30 hover:bg-white/10",
    ripple: "bg-white/15",
  },
} as const;

export interface RippleCtaLinkAnalyticsPayload {
  component: "RippleCtaLink";
  section: string;
  cardId?: string;
  href: string;
  label: string;
  isPlaceholder: boolean;
  inputModality: "touch" | "mouse" | "keyboard";
  timestamp: number;
}

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

export interface LeadCtaProps
  extends Omit<CtaLinkProps, "href" | "preApprovalTrigger"> {
  entry: PreApprovalEntry;
}

function isExternalUrl(href: string): boolean {
  return /^https?:\/\//.test(href);
}

function buildClassName(appearance?: CtaAppearance): string {
  const tone = appearance?.tone ?? "primary";
  const size = appearance?.size ?? "md";
  const align = appearance?.align ?? "center";
  const widthClass = appearance?.fullWidth ? "w-full" : "";
  const justifyClass = align === "between" ? "justify-between" : "justify-center";
  const extraClassName = appearance?.className ?? "";

  return `group/cta relative inline-flex cursor-pointer items-center ${justifyClass} overflow-hidden rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ${toneClasses[tone].focusRing} focus-visible:ring-offset-2 focus-visible:rounded-full touch-action-manipulation [-webkit-tap-highlight-color:transparent] ${sizeClasses[size]} ${toneClasses[tone].interactive} ${widthClass} ${extraClassName}`.trim();
}

function buildLegacyAnalyticsPayload({
  analytics,
  href,
  label,
  modality,
}: {
  analytics?: CtaAnalyticsContext;
  href: string;
  label: string;
  modality: PressModality;
}): RippleCtaLinkAnalyticsPayload {
  return {
    component: "RippleCtaLink",
    section: analytics?.legacySection ?? "",
    cardId: analytics?.legacyCardId,
    href,
    label,
    isPlaceholder: analytics?.isPlaceholder ?? false,
    inputModality: modality,
    timestamp: Date.now(),
  };
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
  const tone = appearance?.tone ?? "primary";
  const external = isExternalUrl(href);
  const sharedClassName = buildClassName(appearance);

  const fireAnalytics = useCallback(
    (modality: PressModality) => {
      if (!onAnalyticsEvent) {
        return;
      }

      try {
        onAnalyticsEvent(
          buildLegacyAnalyticsPayload({
            analytics,
            href,
            label: copy.label,
            modality,
          }),
        );
      } catch {
        // Analytics must remain fire-and-forget so CTA commits still complete.
      }
    },
    [analytics, copy.label, href, onAnalyticsEvent],
  );

  const { clearRipple, handlers, ripple, shouldReduceMotion } =
    usePressFeedback<HTMLAnchorElement>({
      keyboardKeys: ["Enter"],
      onPress: (modality) => fireAnalytics(modality),
    });

  const iconElement = icon ? (
    <span
      className={`inline-flex transition-transform duration-200 ${iconNudgeClasses[iconPosition]}`}
      aria-hidden="true"
    >
      {icon}
    </span>
  ) : null;

  const content = (
    <>
      {iconPosition === "start" ? iconElement : null}
      {children ?? copy.label}
      {iconPosition === "end" ? iconElement : null}
      <PressFeedbackRipple
        ripple={ripple}
        scale={4}
        initialOpacity={0.4}
        onAnimationComplete={clearRipple}
        className={`pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full ${toneClasses[tone].ripple}`}
      />
    </>
  );

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-label={copy.ariaLabel}
        className={`${sharedClassName} ${toneClasses[tone].disabled}`.trim()}
      >
        {content}
      </button>
    );
  }

  const sharedMotionProps = {
    ...handlers,
    whileTap: shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0.75 },
    transition: tapSpring,
    "aria-label": copy.ariaLabel,
    className: sharedClassName,
  };

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...sharedMotionProps}
      >
        {content}
      </motion.a>
    );
  }

  const preApprovalAttributes = preApprovalTrigger
    ? getPreApprovalEntryAttributes({ trigger: preApprovalTrigger })
    : undefined;

  return (
    <Link
      href={href}
      prefetch={prefetch}
      {...handlers}
      aria-label={copy.ariaLabel}
      className={sharedClassName}
      {...preApprovalAttributes}
    >
      {content}
    </Link>
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
