"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useDrawer } from "./DrawerContext";
import { AmountSlider } from "./AmountSlider";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetSpring = { type: "spring" as const, damping: 30, stiffness: 300 };

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

const modalSpring = { type: "spring" as const, damping: 25, stiffness: 300 };

const modalVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
};

/* ------------------------------------------------------------------ */
/*  Dismiss threshold                                                  */
/* ------------------------------------------------------------------ */

const DRAG_DISMISS_VELOCITY = 500;
const DRAG_DISMISS_FRACTION = 0.5;

/* ------------------------------------------------------------------ */
/*  Viewport hook                                                      */
/* ------------------------------------------------------------------ */

const MD_BREAKPOINT = "(min-width: 768px)";

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(MD_BREAKPOINT).matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(MD_BREAKPOINT);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PreApprovalDrawer() {
  const { isOpen, close } = useDrawer();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  /* ---- Body scroll lock ---- */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  /* ---- Focus trap & restore ---- */
  useEffect(() => {
    if (!isOpen) return;
    previousActiveElement.current = document.activeElement;

    requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    return () => {
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  /* ---- Escape key ---- */
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  /* ---- Focus trap ---- */
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = dialog!.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  /* ---- Drag-to-dismiss (mobile sheet) ---- */
  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const sheetHeight = dialogRef.current?.offsetHeight ?? 400;
      const shouldDismiss =
        info.velocity.y > DRAG_DISMISS_VELOCITY ||
        info.offset.y > sheetHeight * DRAG_DISMISS_FRACTION;

      if (shouldDismiss) {
        close();
      }
    },
    [close],
  );

  /* ---- Navigate to pre-approval ---- */
  const handleContinue = useCallback(() => {
    close();
    window.location.href = "/pre-approval";
  }, [close]);

  /* ---- Render ---- */
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }
            }
            onClick={close}
            className="fixed inset-0 z-[200] bg-black/50"
            aria-hidden="true"
          />

          {/* Single dialog — sheet on mobile, modal on desktop */}
          {isDesktop ? (
            <motion.div
              key="modal"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Pre-approval amount"
              tabIndex={-1}
              variants={prefersReducedMotion ? undefined : modalVariants}
              initial={prefersReducedMotion ? { opacity: 0 } : "hidden"}
              animate={prefersReducedMotion ? { opacity: 1 } : "visible"}
              exit={prefersReducedMotion ? { opacity: 0 } : "exit"}
              transition={
                prefersReducedMotion ? { duration: 0 } : modalSpring
              }
              className="fixed inset-0 z-[201] m-auto h-fit w-full max-w-[480px] rounded-3xl bg-white p-8 shadow-2xl outline-none"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-[#545454] transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M15 5L5 15M5 5l10 10" />
                </svg>
              </button>

              <DrawerContent onContinue={handleContinue} />
            </motion.div>
          ) : (
            <motion.div
              key="sheet"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Pre-approval amount"
              tabIndex={-1}
              variants={prefersReducedMotion ? undefined : sheetVariants}
              initial={prefersReducedMotion ? { opacity: 0 } : "hidden"}
              animate={prefersReducedMotion ? { opacity: 1 } : "visible"}
              exit={prefersReducedMotion ? { opacity: 0 } : "exit"}
              transition={
                prefersReducedMotion ? { duration: 0 } : sheetSpring
              }
              drag={prefersReducedMotion ? false : "y"}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.3 }}
              onDragEnd={handleDragEnd}
              className="fixed inset-x-0 bottom-0 z-[201] flex flex-col rounded-t-3xl bg-white px-6 pt-3 pb-8 shadow-2xl outline-none"
            >
              {/* Drag handle */}
              <div className="mx-auto mb-6 h-1.5 w-10 shrink-0 rounded-full bg-[#D1D5DB]" />

              <DrawerContent onContinue={handleContinue} />
            </motion.div>
          )}
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/*  Shared drawer content                                              */
/* ------------------------------------------------------------------ */

function DrawerContent({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold tracking-tight text-[#101820]">
        How much financing do you need?
      </h2>

      <div className="mt-8 w-full">
        <AmountSlider />
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#111111] text-lg font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
      >
        Continue
      </button>

      <p className="mt-4 text-center text-xs text-[#999]">
        No credit check. See your estimated payment range.
      </p>
    </div>
  );
}
