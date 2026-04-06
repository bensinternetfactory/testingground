"use client";

import { useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  type PreApprovalTrigger,
} from "@/features/pre-approval/contract";
import { buildPreApprovalTriggerAttributes } from "@/features/pre-approval/drawer/server";
import {
  buildDrawerTriggerDataAttributes,
  type DrawerTriggerPayload,
} from "@/components/ui/pre-approval-drawer/triggers";
import {
  PressFeedbackRipple,
  tapSpring,
  usePressFeedback,
  type PressModality,
} from "@/lib/press-feedback";

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
  /** @deprecated Compatibility-only legacy trigger payload. Prefer `preApprovalTrigger`. */
  drawer?: DrawerTriggerPayload;
  /** @deprecated Compatibility-only legacy title override. Prefer `preApprovalTrigger.drawer.title`. */
  drawerTitle?: string;
}

const sizeClasses = {
  sm: "px-4 py-3 text-sm gap-1.5",
  md: "px-6 py-4 text-base gap-2",
  lg: "px-8 py-5 text-lg gap-2.5",
} as const;

const iconNudgeClasses = {
  start: "group-hover/cta:-translate-x-0.5 group-focus-visible/cta:-translate-x-0.5",
  end: "group-hover/cta:translate-x-0.5 group-focus-visible/cta:translate-x-0.5",
} as const;

function isExternalUrl(href: string): boolean {
  return /^https?:\/\//.test(href);
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
  drawer,
  drawerTitle,
}: RippleCtaLinkProps) {
  const fireAnalytics = useCallback(
    (modality: PressModality) => {
      onAnalyticsEvent?.({
        component: "RippleCtaLink",
        section,
        cardId,
        href,
        label,
        isPlaceholder,
        inputModality: modality,
        timestamp: Date.now(),
      });
    },
    [cardId, href, isPlaceholder, label, onAnalyticsEvent, section],
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

  const isOutline = variant === "outline" || variant === "outline-dark";
  const external = isExternalUrl(href);
  const justifyClass = justify === "between" ? "justify-between" : "justify-center";

  const variantClasses =
    variant === "outline-dark"
      ? "border border-white/20 bg-transparent text-white hover:border-white/30 hover:bg-white/10"
      : variant === "outline"
        ? "border border-gray-400 bg-transparent text-[#111111] hover:border-gray-500 hover:bg-gray-100"
        : "bg-[#111111] text-white hover:bg-[#111111]/90";

  const focusRingClass =
    variant === "outline-dark"
      ? "focus-visible:ring-white"
      : "focus-visible:ring-[#111111]";

  const sharedClassName = `group/cta relative inline-flex cursor-pointer items-center ${justifyClass} overflow-hidden rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ${focusRingClass} focus-visible:ring-offset-2 focus-visible:rounded-full touch-action-manipulation [-webkit-tap-highlight-color:transparent] ${sizeClasses[size]} ${variantClasses} ${className ?? ""}`;

  const disabledClassName =
    variant === "outline-dark"
      ? "cursor-not-allowed border-white/10 bg-transparent text-white/30 hover:border-white/10 hover:bg-transparent"
      : isOutline
        ? "cursor-not-allowed border-gray-300 bg-transparent text-gray-400 hover:border-gray-300 hover:bg-transparent"
        : "cursor-not-allowed bg-[#D1D5DB] text-white hover:bg-[#D1D5DB]";

  const content = (
    <>
      {iconPosition === "start" ? iconElement : null}
      {children ?? label}
      {iconPosition === "end" ? iconElement : null}
      <PressFeedbackRipple
        ripple={ripple}
        scale={4}
        initialOpacity={0.4}
        onAnimationComplete={clearRipple}
        className={`pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full ${variant === "outline-dark" ? "bg-white/15" : "bg-black/10"}`}
      />
    </>
  );

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-label={ariaLabel}
        className={`${sharedClassName} ${disabledClassName}`}
      >
        {content}
      </button>
    );
  }

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...handlers}
        whileTap={
          shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0.75 }
        }
        transition={tapSpring}
        aria-label={ariaLabel}
        className={sharedClassName}
      >
        {content}
      </motion.a>
    );
  }

  const drawerAttributes = preApprovalTrigger
    ? buildPreApprovalTriggerAttributes(preApprovalTrigger)
    : buildDrawerTriggerDataAttributes(
        drawer ?? (drawerTitle ? { title: drawerTitle } : undefined),
      );

  return (
    <Link href={href} prefetch={prefetch} legacyBehavior passHref>
      <motion.a
        {...handlers}
        whileTap={
          shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0.75 }
        }
        transition={tapSpring}
        aria-label={ariaLabel}
        {...drawerAttributes}
        className={sharedClassName}
      >
        {content}
      </motion.a>
    </Link>
  );
}
