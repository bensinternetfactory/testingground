"use client";

import {
  memo,
  useCallback,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
import { cn } from "@/lib/utils";

const tapSpring = { type: "spring" as const, stiffness: 600, damping: 30 };

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let rippleId = 0;

export interface SelectionTileProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const SelectionTile = memo(function SelectionTile({
  id,
  label,
  icon,
  selected,
  onSelect,
}: SelectionTileProps) {
  const shouldReduceMotion = useReducedMotion();
  const { trigger } = useWebHaptics();
  const [ripple, setRipple] = useState<Ripple | null>(null);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (shouldReduceMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      setRipple({
        id: ++rippleId,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    },
    [shouldReduceMotion],
  );

  const handleClick = useCallback(() => {
    trigger([{ duration: 30 }], {
      intensity: shouldReduceMotion ? 0.4 : 1,
    });
    onSelect(id);
  }, [id, onSelect, shouldReduceMotion, trigger]);

  const clearRipple = useCallback(() => {
    setRipple(null);
  }, []);

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      transition={tapSpring}
      style={{ touchAction: "manipulation" }}
      className={cn(
        "relative flex min-h-[4rem] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 p-3 text-center transition-[border-color,background-color] duration-200 sm:min-h-24 sm:p-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2",
        selected
          ? "border-[#22C55E] bg-[#F2FBF5]"
          : "border-[#D8E4DC] bg-white hover:border-[#86D7A3] hover:bg-[#F7FCF8]",
      )}
    >
      {icon ? (
        <span className="pointer-events-none shrink-0" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="sr-only">{label}</span>
      {ripple ? (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0.28 }}
          animate={{ scale: 3.8, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onAnimationComplete={clearRipple}
          className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22C55E]/20"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ) : null}
    </motion.button>
  );
});
