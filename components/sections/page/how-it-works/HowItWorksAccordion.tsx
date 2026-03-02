"use client";

import { useState, useCallback, type ReactNode, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HowItWorksStep } from "./config";

const contentVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: { duration: 0.1 },
      height: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  },
  expanded: {
    height: "auto" as const,
    opacity: 1,
    transition: {
      height: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
      opacity: { duration: 0.1, delay: 0.05 },
    },
  },
};

const tapSpring = { type: "spring" as const, stiffness: 600, damping: 30 };

export function HowItWorksAccordion({ steps }: { steps: HowItWorksStep[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ol className="mt-16 flex flex-col gap-3 md:hidden">
      {steps.map((step, i) => {
        const isOpen = openIndex === i;

        return (
          <li
            key={step.number}
            className="rounded-xl bg-[#F5F5F5] shadow-[inset_0_0_0_1px_#E9E9E9]"
          >
            <motion.button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              whileTap={{ scale: 0.97, opacity: 0.7 }}
              transition={tapSpring}
              className="flex w-full items-center gap-3 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2 focus-visible:rounded-xl"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="flex-1 text-xs font-medium text-[#101820] min-[375px]:text-lg">
                {step.title}
              </h3>
              <svg
                className={`h-5 w-5 shrink-0 text-[#545454] transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={contentVariants}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-base leading-relaxed text-[#545454]">
                    {step.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/*  RippleButton — CTA with touch-point ripple effect                 */
/* ------------------------------------------------------------------ */

interface Ripple {
  x: number;
  y: number;
  id: number;
}

let rippleId = 0;

export function RippleButton({ children }: { children: ReactNode }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => [
      ...prev,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id: ++rippleId },
    ]);
  }, []);

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.96, opacity: 0.75 }}
      transition={tapSpring}
      className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-[#111111] px-6 py-4 text-base font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
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
    </motion.button>
  );
}
