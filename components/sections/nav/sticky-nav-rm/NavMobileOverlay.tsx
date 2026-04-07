import { useEffect, useId, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { LeadCta } from "@/features/cta/client";
import type { PreApprovalEntry } from "@/features/cta/lead-entry";
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import { NavPressable } from "./NavPressable";
import { NavItemVisual } from "./NavItemVisual";
import { PhoneIcon } from "./nav-icons";
import type { NavSection } from "./nav-data";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useMobileDialogA11y({
  dialogRef,
  isOpen,
  onClose,
  restoreFocusRef,
}: {
  dialogRef: RefObject<HTMLDivElement | null>;
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
      const firstFocusable =
        dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ??
        dialogRef.current;

      firstFocusable?.focus();
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
      const navShell = document.querySelector<HTMLElement>("[data-nav-shell]");
      if (!dialog) {
        return;
      }

      const navFocusable = navShell
        ? Array.from(navShell.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
            .filter((el) => !el.closest("[hidden]") && el.offsetParent !== null)
        : [];
      const dialogFocusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      const allFocusable = [...navFocusable, ...dialogFocusable];

      if (allFocusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = allFocusable[0];
      const last = allFocusable[allFocusable.length - 1];

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
  }, [dialogRef, isOpen, onClose, restoreFocusRef]);
}

function useInertBackground({
  isOpen,
}: {
  isOpen: boolean;
}) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const stickyNavRoot = document.querySelector<HTMLElement>(
      "[data-sticky-nav-root]",
    );
    const rootParent = stickyNavRoot?.parentElement;

    const inertTargets = new Set<HTMLElement>();

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
  }, [isOpen]);
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
  primaryCtaTrigger,
  restoreFocusRef,
  sections,
}: {
  dialogId: string;
  onClose: () => void;
  onToggleSection: (value: string) => void;
  openSection: string | null;
  primaryCtaHref: string;
  primaryCtaTrigger: PreApprovalTrigger;
  restoreFocusRef: RefObject<HTMLButtonElement | null>;
  sections: readonly NavSection[];
}) {
  const accordionIdBase = useId().replaceAll(":", "");
  const dialogRef = useRef<HTMLDivElement>(null);

  useMobileDialogA11y({
    dialogRef,
    isOpen: true,
    onClose,
    restoreFocusRef,
  });
  useInertBackground({ isOpen: true });

  const portalTarget =
    typeof document !== "undefined"
      ? document.querySelector<HTMLElement>("[data-sticky-nav-root]")
      : null;
  const primaryEntry: PreApprovalEntry = {
    kind: "pre-approval",
    href: primaryCtaHref,
    trigger: primaryCtaTrigger,
  };

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div
      id={dialogId}
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      tabIndex={-1}
      className="mobile-overlay fixed inset-0 z-[45] overflow-y-auto overscroll-contain bg-white outline-none md:hidden"
      style={{ top: "var(--nav-height)" }}
    >
      <div className="border-t border-[#E9E9E9] pb-[120px]">
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

        <div className="sticky bottom-0 space-y-4 border-t border-[#E9E9E9] bg-white px-6 py-8">
          <NavPressable
            href="tel:+18885550199"
            className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-base font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            {PhoneIcon}
            <span>(888)&nbsp;555-0199</span>
          </NavPressable>

          <LeadCta
            copy={{ label: "Get Pre-Approved" }}
            entry={primaryEntry}
            appearance={{ className: "w-full" }}
          />
        </div>
      </div>
    </div>,
    portalTarget,
  );
}
