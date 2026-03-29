"use client";

import { useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { resolveDrawerTriggerHref } from "@/components/ui/pre-approval-drawer/config";
import { NavHeaderActions } from "./NavHeaderActions";
import { NavMobileOverlay } from "./NavMobileOverlay";
import type { NavSection } from "./nav-data";
import { useMobileNavState } from "./useMobileNavState";

interface NavClientProps {
  sections: readonly NavSection[];
}

export function NavClient({ sections }: NavClientProps) {
  const pathname = usePathname();
  const dialogId = useId();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const {
    closeMobile,
    mobileOpen,
    openSection,
    toggleMobile,
    toggleSection,
  } = useMobileNavState();
  const primaryCtaHref = resolveDrawerTriggerHref(pathname);

  return (
    <>
      <NavHeaderActions
        dialogId={dialogId}
        mobileOpen={mobileOpen}
        onToggleMobile={toggleMobile}
        primaryCtaHref={primaryCtaHref}
        toggleButtonRef={toggleButtonRef}
      />

      {mobileOpen ? (
        <NavMobileOverlay
          dialogId={dialogId}
          sections={sections}
          openSection={openSection}
          onToggleSection={toggleSection}
          onClose={closeMobile}
          primaryCtaHref={primaryCtaHref}
          restoreFocusRef={toggleButtonRef}
        />
      ) : null}
    </>
  );
}
