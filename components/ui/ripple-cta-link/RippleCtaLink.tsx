"use client";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";

const MotionLink = motion.create(Link);

const tapSpring = { type: "spring" as const, stiffness: 600, damping: 30 };

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

const SWIPE_THRESHOLD = 10;

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
  const shouldReduceMotion = useReducedMotion();
  const { trigger } = useWebHaptics();
  const lastTapRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const pendingModalityRef = useRef<"touch" | "keyboard" | null>(null);
  const ignoreNextClickRef = useRef(false);

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

  const spawnRipple = useCallback(
    (x: number, y: number) => {
      if (shouldReduceMotion) return;
      setRipple({ x, y, id: ++rippleId });
    },
    [shouldReduceMotion],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (ignoreNextClickRef.current) {
        ignoreNextClickRef.current = false;
        pendingModalityRef.current = null;
        event.preventDefault();
        return;
      }

      const nativeEvent = event.nativeEvent as unknown as {
        pointerType?: string;
      };
      const modality =
        pendingModalityRef.current ??
        (event.detail === 0
          ? "keyboard"
          : nativeEvent.pointerType === "touch"
            ? "touch"
            : "mouse");
      pendingModalityRef.current = null;

      if (modality !== "keyboard") {
        const now = Date.now();
        if (now - lastTapRef.current < 250) {
          event.preventDefault();
          return;
        }
        lastTapRef.current = now;

        trigger([{ duration: 35 }], {
          intensity: shouldReduceMotion ? 0.4 : 1,
        });
      }

      const rect = event.currentTarget.getBoundingClientRect();
      if (modality === "keyboard") {
        spawnRipple(rect.width / 2, rect.height / 2);
      } else {
        spawnRipple(event.clientX - rect.left, event.clientY - rect.top);
      }

      fireAnalytics(modality);
    },
    [fireAnalytics, shouldReduceMotion, spawnRipple, trigger],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent<HTMLAnchorElement>) => {
      const touch = event.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    },
    [],
  );

  const handleTouchEnd = useCallback((event: TouchEvent<HTMLAnchorElement>) => {
    const start = touchStartRef.current;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = Math.abs(touch.clientX - start.x);
    const dy = Math.abs(touch.clientY - start.y);

    if (dx > SWIPE_THRESHOLD || dy > SWIPE_THRESHOLD) {
      ignoreNextClickRef.current = true;
      pendingModalityRef.current = null;
      event.preventDefault();
      touchStartRef.current = null;
      return;
    }

    touchStartRef.current = null;
    pendingModalityRef.current = "touch";
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "Enter") {
      pendingModalityRef.current = "keyboard";
    }
  }, []);

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

  const sharedClassName = `group/cta relative inline-flex cursor-pointer items-center ${justifyClass} overflow-hidden rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ${focusRingClass} focus-visible:ring-offset-2 focus-visible:rounded-full touch-action-manipulation [-webkit-tap-highlight-color:rgba(34,197,94,0.18)] ${sizeClasses[size]} ${variantClasses} ${className ?? ""}`;

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
      {ripple ? (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onAnimationComplete={removeRipple}
          className={`pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full ${variant === "outline-dark" ? "bg-white/15" : isOutline ? "bg-black/10" : "bg-[#22C55E]/20"}`}
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
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
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

  return (
    <MotionLink
      href={href}
      prefetch={prefetch}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      whileTap={
        shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0.75 }
      }
      transition={tapSpring}
      aria-label={ariaLabel}
      data-drawer-title={drawerTitle}
      className={sharedClassName}
    >
      {content}
    </MotionLink>
  );
}
