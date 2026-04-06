"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  PressFeedbackRipple,
  tapSpring,
  usePressFeedback,
} from "@/lib/press-feedback";
import { useDrawer } from "./DrawerContext";
import { AmountSlider } from "./AmountSlider";
import { unlockBodyScroll, updateScrollableRef } from "./scroll-lock";
import { buildDrawerContinueHref } from "./triggers";

const PORTAL_ROOT_ID = "pre-approval-drawer-root";
const BACKDROP_Z_INDEX = "z-[200]";
const DIALOG_Z_INDEX = "z-[201]";
const MD_BREAKPOINT = "(min-width: 768px)";
const DRAG_DISMISS_VELOCITY = 500;
const DRAG_DISMISS_DISTANCE = 100;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetSpring = { type: "spring" as const, damping: 30, stiffness: 320 };

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

const modalSpring = { type: "spring" as const, damping: 25, stiffness: 300 };

const modalVariants = {
  hidden: { scale: 0.96, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.96, opacity: 0 },
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(MD_BREAKPOINT).matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MD_BREAKPOINT);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

function usePortalRoot(id: string) {
  if (typeof document === "undefined") {
    return null;
  }

  return document.getElementById(id);
}

function useDialogA11y({
  dialogRef,
  isOpen,
  close,
}: {
  dialogRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  close: () => void;
}) {
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousActiveElement.current = document.activeElement;

    const focusFrame = requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);

      if (
        previousActiveElement.current instanceof HTMLElement &&
        document.contains(previousActiveElement.current)
      ) {
        previousActiveElement.current.focus();
      }
    };
  }, [close, dialogRef, isOpen]);
}

export function PreApprovalDrawer() {
  const { amount, close, heroTruckType, isOpen, setAmount, source, title } =
    useDrawer();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  const portalRoot = usePortalRoot(PORTAL_ROOT_ID);
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const titleId = useId();
  const descriptionId = useId();

  // Update the scrollable ref in the imperative scroll-lock module once the
  // drawer content div has mounted. This lets the touchmove handler allow
  // touches inside the inner scrollable area.
  useEffect(() => {
    if (isOpen && contentRef.current) {
      updateScrollableRef(contentRef.current);
    }
  }, [isOpen]);

  // Safety net: if the drawer was open when the provider unmounted (route
  // change via MarketingDrawerProvider key={pathname}), ensure the scroll
  // lock is released.
  useEffect(() => {
    return () => {
      unlockBodyScroll();
    };
  }, []);

  const requestClose = useCallback(() => {
    close();
  }, [close]);

  useDialogA11y({ dialogRef, isOpen, close: requestClose });

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const sheetHeight = dialogRef.current?.offsetHeight ?? 480;
    const shouldDismiss =
      info.velocity.y >= DRAG_DISMISS_VELOCITY ||
      info.offset.y >= Math.min(DRAG_DISMISS_DISTANCE, sheetHeight * 0.25);

    if (shouldDismiss) {
      close();
    }
    // When not dismissed, framer-motion automatically snaps back to the
    // animate="visible" target (y: 0) using the sheet's transition spring.
  };

  const handleSheetPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (prefersReducedMotion || isDesktop) {
      return;
    }

    if (!event.isPrimary) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (target?.closest("[data-slider-root]")) {
      return;
    }
    if ((contentRef.current?.scrollTop ?? 0) > 0) {
      return;
    }

    dragControls.start(event);
  };

  const handleContinue = () => {
    const href = buildDrawerContinueHref({
      amount,
      heroTruckType,
      source,
    });

    close();
    startTransition(() => {
      router.push(href);
    });
  };

  if (typeof window === "undefined" || !portalRoot) {
    return null;
  }

  return createPortal(
    <AnimatePresence onExitComplete={unlockBodyScroll}>
      {isOpen ? (
        <>
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.18 }
            }
            onClick={requestClose}
            className={`fixed inset-0 ${BACKDROP_Z_INDEX} bg-black/35`}
            style={{ touchAction: "none" }}
            aria-hidden="true"
          />

          {isDesktop ? (
            <DesktopDrawerFrame
              dialogRef={dialogRef}
              descriptionId={descriptionId}
              prefersReducedMotion={prefersReducedMotion}
              titleId={titleId}
              onClose={requestClose}
              onContinue={handleContinue}
              amount={amount}
              onAmountChange={setAmount}
              title={title}
            />
          ) : (
            <MobileDrawerFrame
              contentRef={contentRef}
              dialogRef={dialogRef}
              descriptionId={descriptionId}
              dragControls={dragControls}
              prefersReducedMotion={prefersReducedMotion}
              titleId={titleId}
              onContinue={handleContinue}
              onDragEnd={handleDragEnd}
              onSheetPointerDown={handleSheetPointerDown}
              amount={amount}
              onAmountChange={setAmount}
              title={title}
            />
          )}
        </>
      ) : null}
    </AnimatePresence>,
    portalRoot,
  );
}

function DesktopDrawerFrame({
  amount,
  dialogRef,
  descriptionId,
  onAmountChange,
  prefersReducedMotion,
  title,
  titleId,
  onClose,
  onContinue,
}: {
  amount: number;
  dialogRef: RefObject<HTMLDivElement | null>;
  descriptionId: string;
  onAmountChange: (amount: number) => void;
  prefersReducedMotion: boolean;
  title: string;
  titleId: string;
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 ${DIALOG_Z_INDEX} flex items-center justify-center p-4 sm:p-6`}
    >
      <motion.div
        key="modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        variants={prefersReducedMotion ? undefined : modalVariants}
        initial={prefersReducedMotion ? { opacity: 0 } : "hidden"}
        animate={prefersReducedMotion ? { opacity: 1 } : "visible"}
        exit={prefersReducedMotion ? { opacity: 0 } : "exit"}
        transition={prefersReducedMotion ? { duration: 0 } : modalSpring}
        className="pointer-events-auto relative w-full max-w-[480px] rounded-3xl bg-white p-8 shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[#545454] transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
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
            aria-hidden="true"
          >
            <path d="M15 5L5 15M5 5l10 10" />
          </svg>
        </button>

        <DrawerContent
          amount={amount}
          descriptionId={descriptionId}
          onAmountChange={onAmountChange}
          onContinue={onContinue}
          title={title}
          titleId={titleId}
        />
      </motion.div>
    </div>
  );
}

function MobileDrawerFrame({
  amount,
  contentRef,
  dialogRef,
  descriptionId,
  dragControls,
  onAmountChange,
  onContinue,
  onDragEnd,
  onSheetPointerDown,
  prefersReducedMotion,
  title,
  titleId,
}: {
  amount: number;
  contentRef: RefObject<HTMLDivElement | null>;
  dialogRef: RefObject<HTMLDivElement | null>;
  descriptionId: string;
  dragControls: ReturnType<typeof useDragControls>;
  onAmountChange: (amount: number) => void;
  onContinue: () => void;
  onDragEnd: (_: unknown, info: PanInfo) => void;
  onSheetPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  prefersReducedMotion: boolean;
  title: string;
  titleId: string;
}) {
  return (
    <motion.div
      key="sheet"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      variants={prefersReducedMotion ? undefined : sheetVariants}
      initial={prefersReducedMotion ? { opacity: 0 } : "hidden"}
      animate={prefersReducedMotion ? { opacity: 1 } : "visible"}
      exit={prefersReducedMotion ? { opacity: 0 } : "exit"}
      transition={prefersReducedMotion ? { duration: 0 } : sheetSpring}
      drag={prefersReducedMotion ? false : "y"}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.1, bottom: 0.28 }}
      onPointerDown={onSheetPointerDown}
      onDragEnd={onDragEnd}
      className={`fixed inset-x-0 bottom-0 ${DIALOG_Z_INDEX} flex max-h-[calc(100dvh-0.75rem)] flex-col rounded-t-[2rem] bg-white shadow-2xl outline-none`}
      style={{ touchAction: "none" }}
    >
      <div className="shrink-0 px-6 pt-3">
        <div
          className="mx-auto flex h-9 w-full items-start justify-center"
          aria-hidden="true"
        >
          <div className="h-1.5 w-10 rounded-full bg-[#D1D5DB]" />
        </div>
      </div>

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto overscroll-contain px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <DrawerContent
          amount={amount}
          descriptionId={descriptionId}
          onAmountChange={onAmountChange}
          onContinue={onContinue}
          title={title}
          titleId={titleId}
        />
      </div>
    </motion.div>
  );
}

function DrawerContent({
  amount,
  descriptionId,
  onAmountChange,
  onContinue,
  title,
  titleId,
}: {
  amount: number;
  descriptionId: string;
  onAmountChange: (amount: number) => void;
  onContinue: () => void;
  title: string;
  titleId: string;
}) {
  const { clearRipple, handlers, ripple, shouldReduceMotion } =
    usePressFeedback<HTMLButtonElement>({
      keyboardKeys: ["Enter", " "],
      onPress: () => onContinue(),
    });

  return (
    <div className="flex flex-col items-center pt-2">
      <h2
        id={titleId}
        className="max-w-[22rem] text-center text-2xl font-semibold tracking-tight text-[#101820]"
      >
        {title}
      </h2>

      <div className="mt-8 w-full">
        <AmountSlider value={amount} onChange={onAmountChange} />
      </div>

      <motion.button
        type="button"
        {...handlers}
        whileTap={
          shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0.75 }
        }
        transition={tapSpring}
        className="relative mt-8 inline-flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#111111] text-lg font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 touch-manipulation [-webkit-tap-highlight-color:transparent]"
      >
        Continue to Pre-Approval
        <PressFeedbackRipple
          ripple={ripple}
          scale={4}
          initialOpacity={0.4}
          onAnimationComplete={clearRipple}
          className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20"
        />
      </motion.button>

      <p id={descriptionId} className="mt-4 text-center text-xs text-[#999]">
        No credit check. See your estimated payment range.
      </p>
    </div>
  );
}
