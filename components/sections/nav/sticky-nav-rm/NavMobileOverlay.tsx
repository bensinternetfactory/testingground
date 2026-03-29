import { useEffect, useId, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import { NavPressable } from "./NavPressable";
import { NavItemVisual } from "./NavItemVisual";
import { PhoneIcon } from "./nav-icons";
import type { NavSection } from "./nav-data";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useMobileDialogA11y({
  dialogRef,
  initialFocusRef,
  isOpen,
  onClose,
  restoreFocusRef,
}: {
  dialogRef: RefObject<HTMLDivElement | null>;
  initialFocusRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
  restoreFocusRef: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const restoreFocusTarget = restoreFocusRef.current;

    const focusFrame = requestAnimationFrame(() => {
      const nextFocusTarget =
        initialFocusRef.current ??
        dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ??
        dialogRef.current;

      nextFocusTarget?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
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
      requestAnimationFrame(() => {
        restoreFocusTarget?.focus();
      });
    };
  }, [dialogRef, initialFocusRef, isOpen, onClose, restoreFocusRef]);
}

function useInertBackground({
  dialogRef,
  isOpen,
}: {
  dialogRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
}) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const stickyNavRoot = document.querySelector<HTMLElement>(
      "[data-sticky-nav-root]",
    );
    const navShell = stickyNavRoot?.querySelector<HTMLElement>("[data-nav-shell]");
    const rootParent = stickyNavRoot?.parentElement;

    const inertTargets = new Set<HTMLElement>();

    if (navShell) {
      inertTargets.add(navShell);
    }

    if (stickyNavRoot && rootParent) {
      Array.from(rootParent.children).forEach((child) => {
        if (child instanceof HTMLElement && child !== stickyNavRoot) {
          inertTargets.add(child);
        }
      });
    }

    const previousStates = Array.from(inertTargets).map((element) => ({
      ariaHidden: element.getAttribute("aria-hidden"),
      element,
      inert: element.inert,
    }));

    previousStates.forEach(({ element }) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    return () => {
      previousStates.forEach(({ ariaHidden, element, inert }) => {
        element.inert = inert;

        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });
    };
  }, [dialogRef, isOpen]);
}

function MobileAccordionSection({
  idBase,
  isOpen,
  onLinkClick,
  onToggle,
  section,
}: {
  idBase: string;
  isOpen: boolean;
  onLinkClick: () => void;
  onToggle: () => void;
  section: NavSection;
}) {
  const triggerId = `${idBase}-${section.value}-trigger`;
  const panelId = `${idBase}-${section.value}-panel`;

  return (
    <div>
      <NavPressable
        id={triggerId}
        onPress={onToggle}
        ariaExpanded={isOpen}
        ariaControls={panelId}
        className="flex w-full items-center justify-between gap-4 border-b border-[#E9E9E9] px-6 py-4 text-left text-base font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-inset"
      >
        <span>{section.label}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-[#545454] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </NavPressable>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="accordion-content"
      >
        {isOpen
          ? section.items.map((item) => (
            <NavPressable
              key={item.title}
              href={item.href}
              onPress={onLinkClick}
              prefetch={false}
              className="flex w-full items-center gap-3 border-b border-[#E9E9E9] px-6 py-4 text-left text-sm font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-inset"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E9E9E9] bg-white">
                <NavItemVisual item={item} mobile />
              </span>
              <span>{item.title}</span>
            </NavPressable>
          ))
          : null}
      </div>
    </div>
  );
}

export function NavMobileOverlay({
  dialogId,
  onClose,
  onToggleSection,
  openSection,
  primaryCtaHref,
  restoreFocusRef,
  sections,
}: {
  dialogId: string;
  onClose: () => void;
  onToggleSection: (value: string) => void;
  openSection: string | null;
  primaryCtaHref: string;
  restoreFocusRef: RefObject<HTMLButtonElement | null>;
  sections: readonly NavSection[];
}) {
  const accordionIdBase = useId().replaceAll(":", "");
  const dialogTitleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useMobileDialogA11y({
    dialogRef,
    initialFocusRef: closeButtonRef,
    isOpen: true,
    onClose,
    restoreFocusRef,
  });
  useInertBackground({ dialogRef, isOpen: true });

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="mobile-overlay fixed inset-0 z-[60] flex h-dvh flex-col bg-white md:hidden">
      <div
        id={dialogId}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        tabIndex={-1}
        className="flex h-full min-h-0 flex-1 flex-col bg-white outline-none"
      >
        <div className="flex items-center justify-between border-b border-[#E9E9E9] px-6 pb-4 pt-[max(env(safe-area-inset-top),1rem)]">
          <h2
            id={dialogTitleId}
            className="text-base font-medium tracking-tight text-[#111111]"
          >
            Menu
          </h2>

          <button
            type="button"
            ref={closeButtonRef}
            autoFocus
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-md text-[#545454] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-[#E9E9E9]">
          {sections.map((section) => (
            <MobileAccordionSection
              key={section.value}
              idBase={accordionIdBase}
              section={section}
              isOpen={openSection === section.value}
              onToggle={() => onToggleSection(section.value)}
              onLinkClick={onClose}
            />
          ))}

          <NavPressable
            href="/about"
            onPress={onClose}
            prefetch={false}
            className="flex w-full items-center justify-between gap-4 border-b border-[#E9E9E9] px-6 py-4 text-left text-base font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-inset"
          >
            <span>About</span>
            <svg className="h-4 w-4 text-[#545454]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </NavPressable>
        </div>

        <div className="space-y-4 border-t border-[#E9E9E9] bg-white px-6 py-6">
          <NavPressable
            href="tel:+18885550199"
            className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-base font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            {PhoneIcon}
            <span>(888)&nbsp;555-0199</span>
          </NavPressable>

          <RippleCtaLink
            href={primaryCtaHref}
            label="Get Pre-Approved"
            className="w-full"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
