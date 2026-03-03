"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
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

const instantVariants = {
  collapsed: { height: 0, opacity: 0, transition: { duration: 0 } },
  expanded: {
    height: "auto" as const,
    opacity: 1,
    transition: { duration: 0 },
  },
};

const tapSpring = { type: "spring" as const, stiffness: 600, damping: 30 };

export function HowItWorksAccordion({ steps }: { steps: HowItWorksStep[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { trigger } = useWebHaptics();

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
              onClick={() => {
                trigger([{ duration: 35 }], { intensity: 1 });
                setOpenIndex(isOpen ? null : i);
              }}
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : { scale: 0.97, opacity: 0.7 }
              }
              transition={tapSpring}
              className="flex w-full items-center gap-3 p-5 text-left touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2 focus-visible:rounded-xl"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-sm font-semibold text-white">
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
                  variants={
                    shouldReduceMotion ? instantVariants : contentVariants
                  }
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
