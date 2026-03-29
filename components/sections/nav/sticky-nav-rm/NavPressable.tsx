"use client";

import Link from "next/link";
import { forwardRef, type ReactNode, type Ref } from "react";
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
  id?: string;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaHaspopup?: "dialog" | "menu";
  prefetch?: boolean;
  type?: "button" | "submit" | "reset";
}

type PressableElement = HTMLAnchorElement | HTMLButtonElement;

function isExternalLike(href: string): boolean {
  return /^(https?:\/\/|tel:|mailto:)/.test(href);
}

export const NavPressable = forwardRef<PressableElement, NavPressableProps>(
  function NavPressable(
    {
      href,
      onPress,
      className,
      children,
      id,
      ariaLabel,
      ariaExpanded,
      ariaControls,
      ariaHaspopup,
      prefetch,
      type = "button",
    },
    ref,
  ) {
    const { clearRipple, handlers, ripple, shouldReduceMotion } =
      usePressFeedback<PressableElement>({
        keyboardKeys: ["Enter", " "],
        onPress: () => onPress?.(),
      });

    const sharedClassName = `relative overflow-hidden touch-manipulation [-webkit-tap-highlight-color:transparent] ${className}`;
    const sharedMotionProps = {
      ...handlers,
      id,
      whileTap: shouldReduceMotion ? undefined : { scale: 0.98, opacity: 0.9 },
      transition: tapSpring,
      "aria-label": ariaLabel,
      "aria-controls": ariaControls,
      "aria-haspopup": ariaHaspopup,
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
          <motion.a href={href} ref={ref as Ref<HTMLAnchorElement>} {...sharedMotionProps}>
            {content}
          </motion.a>
        );
      }

      return (
        <MotionLink
          href={href}
          prefetch={prefetch}
          ref={ref as Ref<HTMLAnchorElement>}
          {...sharedMotionProps}
        >
          {content}
        </MotionLink>
      );
    }

    return (
      <motion.button
        type={type}
        ref={ref as Ref<HTMLButtonElement>}
        aria-expanded={ariaExpanded}
        {...sharedMotionProps}
      >
        {content}
      </motion.button>
    );
  },
);
