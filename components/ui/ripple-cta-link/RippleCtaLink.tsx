"use client";

import {
  useCallback,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

let rippleId = 0;

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
  variant?: "filled" | "outline";
  justify?: "center" | "between";
  className?: string;
  prefetch?: boolean;
  isPlaceholder?: boolean;
  onAnalyticsEvent?: (payload: RippleCtaLinkAnalyticsPayload) => void;
  ariaLabel?: string;
  section?: string;
  cardId?: string;
  disabled?: boolean;
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
  drawerTitle,
}: RippleCtaLinkProps) {
  const [ripple, setRipple] = useState<Ripple | null>(null);

  const fireAnalytics = useCallback(
    (modality: "touch" | "mouse" | "keyboard") => {
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

  const removeRipple = useCallback(() => {
    setRipple(null);
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const nativeEvent = event.nativeEvent as MouseEvent & {
        pointerType?: string;
      };
      const modality =
        event.detail === 0
          ? "keyboard"
          : nativeEvent.pointerType === "touch"
            ? "touch"
            : "mouse";

      const rect = event.currentTarget.getBoundingClientRect();
      const x = modality === "keyboard" ? rect.width / 2 : event.clientX - rect.left;
      const y = modality === "keyboard" ? rect.height / 2 : event.clientY - rect.top;

      setRipple({ x, y, id: ++rippleId });
      fireAnalytics(modality);
      window.setTimeout(removeRipple, 250);
    },
    [fireAnalytics, removeRipple],
  );

  const iconElement = icon ? (
    <span
      className={`inline-flex transition-transform duration-200 ${iconNudgeClasses[iconPosition]}`}
      aria-hidden="true"
    >
      {icon}
    </span>
  ) : null;

  const isOutline = variant === "outline";
  const external = isExternalUrl(href);
  const justifyClass = justify === "between" ? "justify-between" : "justify-center";

  const sharedClassName = `group/cta relative inline-flex items-center ${justifyClass} overflow-hidden rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:rounded-full ${sizeClasses[size]} ${
    isOutline
      ? "border border-gray-400 bg-transparent text-[#111111] hover:border-gray-500 hover:bg-gray-100"
      : "bg-[#111111] text-white hover:bg-[#111111]/90"
  } ${className ?? ""}`;

  const disabledClassName = isOutline
    ? "cursor-not-allowed border-gray-300 bg-transparent text-gray-400 hover:border-gray-300 hover:bg-transparent"
    : "cursor-not-allowed bg-[#D1D5DB] text-white hover:bg-[#D1D5DB]";

  const content = (
    <>
      {iconPosition === "start" ? iconElement : null}
      {children ?? label}
      {iconPosition === "end" ? iconElement : null}
      {ripple ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full ${isOutline ? "bg-black/10" : "bg-[#22C55E]/20"}`}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ) : null}
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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={ariaLabel}
        className={sharedClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onClick={handleClick}
      aria-label={ariaLabel}
      data-drawer-title={drawerTitle}
      className={sharedClassName}
    >
      {content}
    </Link>
  );
}
