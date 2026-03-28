"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  PressFeedbackRipple,
  tapSpring,
  usePressFeedback,
} from "@/lib/press-feedback";

const MotionLink = motion.create(Link);

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
  const { clearRipple, handlers, ripple, shouldReduceMotion } =
    usePressFeedback<PressableElement>({
      keyboardKeys: ["Enter", " "],
      onPress: () => onPress?.(),
    });

  const sharedClassName = `relative overflow-hidden touch-manipulation [-webkit-tap-highlight-color:transparent] ${className}`;
  const sharedMotionProps = {
    ...handlers,
    whileTap: shouldReduceMotion ? undefined : { scale: 0.98, opacity: 0.9 },
    transition: tapSpring,
    "aria-label": ariaLabel,
    className: sharedClassName,
  };

  const content = (
    <>
      {children}
      <PressFeedbackRipple
        ripple={ripple}
        scale={5}
        initialOpacity={0.35}
        onAnimationComplete={clearRipple}
        className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10"
      />
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
