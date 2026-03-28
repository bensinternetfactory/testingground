"use client";

import Link from "next/link";
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
import { useWebHaptics } from "web-haptics/react";

const MotionLink = motion.create(Link);

const tapSpring = { type: "spring" as const, stiffness: 600, damping: 30 };
const SWIPE_THRESHOLD = 10;

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface NavPressableProps {
  href?: string;
  onPress?: () => void;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  prefetch?: boolean;
  type?: "button" | "submit" | "reset";
}

type PressableElement = HTMLAnchorElement | HTMLButtonElement;

let rippleId = 0;

function isExternalLike(href: string): boolean {
  return /^(https?:\/\/|tel:|mailto:)/.test(href);
}

export function NavPressable({
  href,
  onPress,
  className,
  children,
  ariaLabel,
  ariaExpanded,
  prefetch,
  type = "button",
}: NavPressableProps) {
  const [ripple, setRipple] = useState<Ripple | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { trigger } = useWebHaptics();
  const lastTapRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const pendingModalityRef = useRef<"touch" | "keyboard" | null>(null);
  const ignoreNextClickRef = useRef(false);

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
    (event: MouseEvent<PressableElement>) => {
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

      onPress?.();
    },
    [onPress, shouldReduceMotion, spawnRipple, trigger],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent<PressableElement>) => {
      const touch = event.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    },
    [],
  );

  const handleTouchEnd = useCallback((event: TouchEvent<PressableElement>) => {
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

  const handleKeyDown = useCallback((event: KeyboardEvent<PressableElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      pendingModalityRef.current = "keyboard";
    }
  }, []);

  const sharedClassName = `relative overflow-hidden touch-manipulation [-webkit-tap-highlight-color:transparent] ${className}`;
  const sharedMotionProps = {
    onClick: handleClick,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onKeyDown: handleKeyDown,
    whileTap: shouldReduceMotion ? undefined : { scale: 0.98, opacity: 0.9 },
    transition: tapSpring,
    "aria-label": ariaLabel,
    className: sharedClassName,
  };

  const content = (
    <>
      {children}
      {ripple ? (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onAnimationComplete={removeRipple}
          className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ) : null}
    </>
  );

  if (href) {
    if (isExternalLike(href)) {
      return (
        <motion.a href={href} {...sharedMotionProps}>
          {content}
        </motion.a>
      );
    }

    return (
      <MotionLink href={href} prefetch={prefetch} {...sharedMotionProps}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      aria-expanded={ariaExpanded}
      {...sharedMotionProps}
    >
      {content}
    </motion.button>
  );
}
