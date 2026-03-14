"use client";

import {
  useState,
  useCallback,
  useRef,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
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
  className?: string;
  prefetch?: boolean;
  isPlaceholder?: boolean;
  onAnalyticsEvent?: (payload: RippleCtaLinkAnalyticsPayload) => void;
  ariaLabel?: string;
  /** Section identifier for analytics */
  section?: string;
  /** Card identifier for analytics */
  cardId?: string;
}

const sizeClasses = {
  // Keep minimum 44px hit area on mobile for accessibility.
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

// Movement threshold in pixels for swipe guard
const SWIPE_THRESHOLD = 10;

export function RippleCtaLink({
  href,
  label,
  children,
  icon,
  iconPosition = "end",
  size = "md",
  className,
  prefetch,
  isPlaceholder = false,
  onAnalyticsEvent,
  ariaLabel,
  section = "",
  cardId,
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
    [onAnalyticsEvent, section, cardId, href, label, isPlaceholder]
  );

  const spawnRipple = useCallback(
    (x: number, y: number) => {
      if (shouldReduceMotion) return;
      setRipple({ x, y, id: ++rippleId });
    },
    [shouldReduceMotion]
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (ignoreNextClickRef.current) {
        ignoreNextClickRef.current = false;
        pendingModalityRef.current = null;
        e.preventDefault();
        return;
      }

      const modality = pendingModalityRef.current ?? "mouse";
      pendingModalityRef.current = null;

      if (modality !== "keyboard") {
        // Double-tap guard for pointer/touch activations
        const now = Date.now();
        if (now - lastTapRef.current < 250) {
          e.preventDefault();
          return;
        }
        lastTapRef.current = now;

        // Haptics: lower intensity under reduced motion
        trigger(
          [{ duration: 35 }],
          { intensity: shouldReduceMotion ? 0.4 : 1 }
        );
      }

      if (!shouldReduceMotion) {
        const rect = e.currentTarget.getBoundingClientRect();
        if (modality === "keyboard") {
          spawnRipple(rect.width / 2, rect.height / 2);
        } else {
          spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
        }
      }

      fireAnalytics(modality);
    },
    [shouldReduceMotion, trigger, spawnRipple, fireAnalytics]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLAnchorElement>) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    },
    []
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLAnchorElement>) => {
      const start = touchStartRef.current;
      if (!start) return;
      const touch = e.changedTouches[0];
      const dx = Math.abs(touch.clientX - start.x);
      const dy = Math.abs(touch.clientY - start.y);
      if (dx > SWIPE_THRESHOLD || dy > SWIPE_THRESHOLD) {
        // Swiping, not tapping — suppress CTA effects
        ignoreNextClickRef.current = true;
        pendingModalityRef.current = null;
        e.preventDefault();
        touchStartRef.current = null;
        return;
      }
      touchStartRef.current = null;
      pendingModalityRef.current = "touch";
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLAnchorElement>) => {
      // Anchor activation is Enter only; Space should not emit activation effects.
      if (e.key === "Enter") {
        pendingModalityRef.current = "keyboard";
      }
    },
    []
  );

  const removeRipple = useCallback(() => {
    setRipple(null);
  }, []);

  const external = isExternalUrl(href);

  const iconElement = icon ? (
    <span
      className={`inline-flex transition-transform duration-200 ${iconNudgeClasses[iconPosition]}`}
      aria-hidden="true"
    >
      {icon}
    </span>
  ) : null;

  const sharedClassName = `group/cta relative inline-flex cursor-pointer items-center overflow-hidden rounded-full bg-[#111111] font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:rounded-full touch-action-manipulation [-webkit-tap-highlight-color:rgba(34,197,94,0.18)] ${sizeClasses[size]} ${className ?? ""}`;

  const content = (
    <>
      {iconPosition === "start" && iconElement}
      {children ?? label}
      {iconPosition === "end" && iconElement}
      {ripple && (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onAnimationComplete={removeRipple}
          className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22C55E]/20"
          style={{ left: ripple.x, top: ripple.y }}
        />
      )}
    </>
  );

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
        aria-label={ariaLabel}
        whileTap={
          shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0.75 }
        }
        transition={tapSpring}
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
      aria-label={ariaLabel}
      whileTap={
        shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0.75 }
      }
      transition={tapSpring}
      className={sharedClassName}
    >
      {content}
    </MotionLink>
  );
}
