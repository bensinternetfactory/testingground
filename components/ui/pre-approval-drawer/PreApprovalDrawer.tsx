"use client";

import {
  startTransition,
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useDrawer } from "./DrawerContext";
import { AmountSlider } from "./AmountSlider";

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

const DRAG_DISMISS_VELOCITY = 500;
const DRAG_DISMISS_FRACTION = 0.5;
const MD_BREAKPOINT = "(min-width: 768px)";

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

function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [isOpen]);
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
    if (!isOpen) return;

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
      if (!dialog) return;

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

      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [close, dialogRef, isOpen]);
}

export function PreApprovalDrawer() {
  const { isOpen, close } = useDrawer();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useBodyScrollLock(isOpen);
  useDialogA11y({ dialogRef, isOpen, close });

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const sheetHeight = dialogRef.current?.offsetHeight ?? 400;
    const shouldDismiss =
      info.velocity.y > DRAG_DISMISS_VELOCITY ||
      info.offset.y > sheetHeight * DRAG_DISMISS_FRACTION;

    if (shouldDismiss) {
      close();
    }
  };

  const handleContinue = () => {
    close();
    startTransition(() => {
      router.push("/pre-approval");
    });
  };

  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
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
            onClick={close}
            className="fixed inset-0 z-[200] bg-black/50"
            aria-hidden="true"
          />

          {isDesktop ? (
            <DesktopDrawerFrame
              dialogRef={dialogRef}
              descriptionId={descriptionId}
              prefersReducedMotion={prefersReducedMotion}
              titleId={titleId}
              onClose={close}
              onContinue={handleContinue}
            />
          ) : (
            <MobileDrawerFrame
              dialogRef={dialogRef}
              descriptionId={descriptionId}
              prefersReducedMotion={prefersReducedMotion}
              titleId={titleId}
              onContinue={handleContinue}
              onDragEnd={handleDragEnd}
            />
          )}
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function DesktopDrawerFrame({
  dialogRef,
  descriptionId,
  prefersReducedMotion,
  titleId,
  onClose,
  onContinue,
}: {
  dialogRef: RefObject<HTMLDivElement | null>;
  descriptionId: string;
  prefersReducedMotion: boolean;
  titleId: string;
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6">
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
            aria-hidden="true"
          >
            <path d="M15 5L5 15M5 5l10 10" />
          </svg>
        </button>

        <DrawerContent
          descriptionId={descriptionId}
          titleId={titleId}
          onContinue={onContinue}
        />
      </motion.div>
    </div>
  );
}

function MobileDrawerFrame({
  dialogRef,
  descriptionId,
  prefersReducedMotion,
  titleId,
  onContinue,
  onDragEnd,
}: {
  dialogRef: RefObject<HTMLDivElement | null>;
  descriptionId: string;
  prefersReducedMotion: boolean;
  titleId: string;
  onContinue: () => void;
  onDragEnd: (_: unknown, info: PanInfo) => void;
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
      dragConstraints={{ top: 0 }}
      dragElastic={{ top: 0, bottom: 0.28 }}
      onDragEnd={onDragEnd}
      className="fixed inset-x-0 bottom-0 z-[201] flex max-h-[calc(100dvh-0.75rem)] flex-col overflow-y-auto overscroll-contain rounded-t-[2rem] bg-white px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+2rem)] shadow-2xl outline-none"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="mx-auto mb-6 h-1.5 w-10 shrink-0 rounded-full bg-[#D1D5DB]" />

      <DrawerContent
        descriptionId={descriptionId}
        titleId={titleId}
        onContinue={onContinue}
      />
    </motion.div>
  );
}

function DrawerContent({
  descriptionId,
  titleId,
  onContinue,
}: {
  descriptionId: string;
  titleId: string;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <h2
        id={titleId}
        className="text-center text-2xl font-semibold tracking-tight text-[#101820]"
      >
        Estimate how much financing you need.
      </h2>

      <div className="mt-8 w-full">
        <AmountSlider />
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#111111] text-lg font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
      >
        Continue to Pre-Approval
      </button>

      <p id={descriptionId} className="mt-4 text-center text-xs text-[#999]">
        No credit check. See your estimated payment range.
      </p>
    </div>
  );
}
