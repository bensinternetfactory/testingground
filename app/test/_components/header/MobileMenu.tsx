"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { HEADER_NAV, PHONE_DISPLAY, PHONE_TEL } from "../../_lib/content";
import { CtaButton } from "../primitives/CtaButton";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-[var(--t-bg-soft)]"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute left-0 right-0 top-16 z-40 bg-white border-b border-[var(--t-divider)] shadow-sm"
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
            {HEADER_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-md text-[15px] font-medium text-[var(--t-ink)] hover:bg-[var(--t-bg-soft)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-[var(--t-divider)] mt-2 pt-3 flex flex-col gap-2">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 px-3 py-3 rounded-md text-[15px] font-medium text-[var(--t-blue-ink)] hover:bg-[var(--t-bg-soft)]"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
              <CtaButton href="/pre-approval" size="md" className="w-full">
                Get Pre-Qualified
              </CtaButton>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
