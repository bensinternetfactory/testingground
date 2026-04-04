"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  PressFeedbackRipple,
  tapSpring,
  usePressFeedback,
} from "@/lib/press-feedback";

const MotionLink = motion.create(Link);

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 flex-none text-[#15803D] transition-transform duration-200 group-hover/nav-card:translate-x-0.5 group-focus-visible/nav-card:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ProgramNavCardLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const { clearRipple, handlers, ripple, shouldReduceMotion } =
    usePressFeedback<HTMLAnchorElement>({
      keyboardKeys: ["Enter"],
    });

  return (
    <MotionLink
      href={href}
      {...handlers}
      whileTap={
        shouldReduceMotion ? undefined : { scale: 0.98, opacity: 0.85 }
      }
      transition={tapSpring}
      className="group/nav-card relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-[#D4D4D4] bg-white p-4 transition-colors duration-200 hover:border-[#22C55E] hover:bg-[#F0FDF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 touch-action-manipulation [-webkit-tap-highlight-color:transparent]"
    >
      <span className="text-sm font-medium text-[#111]">{label}</span>
      <ArrowIcon />
      <PressFeedbackRipple
        ripple={ripple}
        scale={6}
        initialOpacity={0.35}
        onAnimationComplete={clearRipple}
        className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22C55E]/20"
      />
    </MotionLink>
  );
}
