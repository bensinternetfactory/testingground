"use client";

import type { RefObject } from "react";
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import { LeadCta } from "@/features/cta/client";
import type { PreApprovalEntry } from "@/features/cta/lead-entry";
import { NavPressable } from "./NavPressable";

export function NavHeaderActions({
  dialogId,
  mobileOpen,
  onToggleMobile,
  primaryCtaHref,
  primaryCtaTrigger,
  toggleButtonRef,
}: {
  dialogId: string;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  primaryCtaHref: string;
  primaryCtaTrigger: PreApprovalTrigger;
  toggleButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const primaryEntry: PreApprovalEntry = {
    kind: "pre-approval",
    href: primaryCtaHref,
    trigger: primaryCtaTrigger,
  };

  return (
    <>
      <LeadCta
        copy={{ label: "Apply Now" }}
        entry={primaryEntry}
        appearance={{
          className:
            "!hidden h-12 items-center justify-center bg-[#111111] px-4 text-sm font-medium text-white hover:bg-[#111111]/90 focus-visible:ring-[#111111] md:!inline-flex xl:px-6 xl:text-base",
        }}
      />

      <NavPressable
        ref={toggleButtonRef}
        onPress={onToggleMobile}
        ariaLabel={mobileOpen ? "Close menu" : "Open menu"}
        ariaControls={dialogId}
        ariaExpanded={mobileOpen}
        ariaHaspopup="dialog"
        className={`relative flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 md:hidden ${mobileOpen ? "bg-[#F5F5F5]" : ""}`}
      >
        <span
          className="hamburger-bar absolute left-2 h-[2px] w-6 bg-[#545454] transition-transform duration-200"
          style={{
            transform: mobileOpen
              ? "translateY(0) rotate(45deg)"
              : "translateY(-4px)",
          }}
        />
        <span
          className="hamburger-bar absolute left-2 h-[2px] w-6 bg-[#545454] transition-transform duration-200"
          style={{
            transform: mobileOpen
              ? "translateY(0) rotate(-45deg)"
              : "translateY(4px)",
          }}
        />
      </NavPressable>
    </>
  );
}
