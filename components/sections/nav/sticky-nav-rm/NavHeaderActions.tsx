"use client";

import type { RefObject } from "react";
import { NavPressable } from "./NavPressable";

export function NavHeaderActions({
  dialogId,
  mobileOpen,
  onToggleMobile,
  primaryCtaHref,
  toggleButtonRef,
}: {
  dialogId: string;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  primaryCtaHref: string;
  toggleButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <>
      <a
        href={primaryCtaHref}
        className="hidden h-12 items-center justify-center rounded-full bg-[#111111] px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 md:inline-flex xl:px-6 xl:text-base"
      >
        <span className="hidden lg:inline">Apply Now</span>
        <span className="lg:hidden">Apply Now</span>
      </a>

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
