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
  animate,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useDrawer } from "./DrawerContext";
import { AmountSlider } from "./AmountSlider";
import { buildDrawerContinueHref } from "./triggers";

const PORTAL_ROOT_ID = "pre-approval-drawer-root";
const BACKDROP_Z_INDEX = "z-[80]";
const DIALOG_Z_INDEX = "z-[81]";
const MD_BREAKPOINT = "(min-width: 768px)";
const DRAG_DISMISS_VELOCITY = 900;
const DRAG_DISMISS_DISTANCE = 120;
const DRAG_DISMISS_EXIT_DURATION = 0.18;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetSpring = { type: "spring" as const, damping: 36, stiffness: 420 };

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

const modalSpring = { type: "spring" as const, damping: 28, stiffness: 340 };

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

  const existingRoot = document.getElementById(id);
  if (existingRoot) {
    return existingRoot;
  }

  const root = document.createElement("div");
  root.id = id;
  root.setAttribute("data-pre-approval-portal", "true");
  document.body.append(root);

  return root;
}

function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.paddingRight = previousBodyPaddingRight;
      window.scrollTo({ top: scrollY, behavior: "auto" });
    };
  }, [isOpen]);
}

function useDocumentInert(
  isOpen: boolean,
  portalRoot: HTMLElement | null,
) {
  useEffect(() => {
    if (!isOpen || !portalRoot) {
      return;
    }

    const siblings = Array.from(document.body.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== portalRoot,
    );
    const previousAriaHidden = new Map<HTMLElement, string | null>();

    for (const element of siblings) {
      previousAriaHidden.set(element, element.getAttribute("aria-hidden"));
      element.setAttribute("aria-hidden", "true");
      element.inert = true;
    }

    return () => {
      for (const element of siblings) {
        element.inert = false;
        const previousValue = previousAriaHidden.get(element);
        if (previousValue == null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", previousValue);
        }
      }
    };
  }, [isOpen, portalRoot]);
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

function useMobileSheetReset({
  isDesktop,
  isOpen,
  sheetY,
}: {
  isDesktop: boolean;
  isOpen: boolean;
  sheetY: ReturnType<typeof useMotionValue<number>>;
}) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (isDesktop) {
      sheetY.stop();
      sheetY.set(0);
      return;
    }

    const resetSheetPosition = () => {
      sheetY.stop();
      sheetY.set(0);
    };

    const visualViewport = window.visualViewport;

    resetSheetPosition();
    window.addEventListener("resize", resetSheetPosition, { passive: true });
    window.addEventListener("orientationchange", resetSheetPosition);
    visualViewport?.addEventListener("resize", resetSheetPosition);
    visualViewport?.addEventListener("scroll", resetSheetPosition);

    return () => {
      window.removeEventListener("resize", resetSheetPosition);
      window.removeEventListener("orientationchange", resetSheetPosition);
      visualViewport?.removeEventListener("resize", resetSheetPosition);
      visualViewport?.removeEventListener("scroll", resetSheetPosition);
    };
  }, [isDesktop, isOpen, sheetY]);
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
  const mobileCloseInFlightRef = useRef(false);
  const dragControls = useDragControls();
  const titleId = useId();
  const descriptionId = useId();
  const sheetY = useMotionValue(0);

  useBodyScrollLock(isOpen);
  useDocumentInert(isOpen, portalRoot);
  useMobileSheetReset({ isDesktop, isOpen, sheetY });

  useEffect(() => {
    if (isOpen) {
      mobileCloseInFlightRef.current = false;
    }
  }, [isOpen]);

  const requestClose = useCallback(() => {
    if (isDesktop) {
      close();
      return;
    }

    if (mobileCloseInFlightRef.current) {
      return;
    }

    mobileCloseInFlightRef.current = true;

    const sheetHeight = dialogRef.current?.offsetHeight ?? window.innerHeight;
    const exitTarget = Math.max(sheetHeight, window.innerHeight);

    sheetY.stop();

    if (prefersReducedMotion) {
      sheetY.set(exitTarget);
      mobileCloseInFlightRef.current = false;
      close();
      return;
    }

    animate(sheetY, exitTarget, {
      duration: DRAG_DISMISS_EXIT_DURATION,
      ease: "easeOut",
      onComplete: () => {
        mobileCloseInFlightRef.current = false;
        close();
      },
    });
  }, [close, isDesktop, prefersReducedMotion, sheetY]);

  useDialogA11y({ dialogRef, isOpen, close: requestClose });

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const sheetHeight = dialogRef.current?.offsetHeight ?? 480;
    const dragDistance = Math.max(info.offset.y, sheetY.get());
    const shouldDismiss =
      info.velocity.y >= DRAG_DISMISS_VELOCITY ||
      dragDistance >= Math.min(DRAG_DISMISS_DISTANCE, sheetHeight * 0.25);

    if (shouldDismiss) {
      requestClose();
      return;
    }

    if (prefersReducedMotion) {
      sheetY.set(0);
      return;
    }

    animate(sheetY, 0, sheetSpring);
  };

  const handleHandlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (prefersReducedMotion || isDesktop) {
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
            onClick={requestClose}
            className={`fixed inset-0 ${BACKDROP_Z_INDEX} bg-black/55`}
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
              sheetY={sheetY}
              titleId={titleId}
              onContinue={handleContinue}
              onDragEnd={handleDragEnd}
              onHandlePointerDown={handleHandlePointerDown}
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
        className="pointer-events-auto relative w-full max-w-[480px] rounded-3xl bg-white px-8 pt-8 pb-8 pr-20 shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full text-[#545454] transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
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
  onHandlePointerDown,
  prefersReducedMotion,
  sheetY,
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
  onHandlePointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  prefersReducedMotion: boolean;
  sheetY: ReturnType<typeof useMotionValue<number>>;
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
      dragElastic={{ top: 0, bottom: 0.18 }}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      className={`fixed inset-x-0 bottom-0 ${DIALOG_Z_INDEX} flex max-h-[calc(100dvh-0.75rem)] flex-col rounded-t-[2rem] bg-white shadow-2xl outline-none`}
      style={{ y: sheetY }}
    >
      <div className="shrink-0 px-6 pt-3">
        <div
          onPointerDown={onHandlePointerDown}
          className="mx-auto flex h-9 w-full cursor-grab touch-none select-none items-start justify-center active:cursor-grabbing"
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
