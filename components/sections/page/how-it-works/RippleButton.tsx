"use client";

import { useState, useCallback, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);

const tapSpring = { type: "spring" as const, stiffness: 600, damping: 30 };

interface Ripple {
  x: number;
  y: number;
  id: number;
}

let rippleId = 0;

export function RippleButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setRipples((prev) => [
        ...prev,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id: ++rippleId },
      ]);
    },
    [shouldReduceMotion]
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <MotionLink
      href={href}
      onClick={handleClick}
      whileTap={
        shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0.75 }
      }
      transition={tapSpring}
      className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-[#111111] px-6 py-4 text-base font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:rounded-full touch-action-manipulation"
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onAnimationComplete={() => removeRipple(ripple.id)}
          className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22C55E]/20"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </MotionLink>
  );
}
