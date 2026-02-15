"use client";

import { useState, useCallback, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import Link from "next/link";
import type { NavSection, NavCardItem } from "./nav-data";

/* ------------------------------------------------------------------ */
/*  Icons — lightweight inline SVGs for dropdown cards                 */
/* ------------------------------------------------------------------ */

const ICON_MAP: Record<NavCardItem["icon"], React.ReactNode> = {
  lightning: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  truck: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  chart: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  clock: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  shield: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  calculator: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  book: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  phone: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  star: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Dropdown card component (used in both desktop and mobile)          */
/* ------------------------------------------------------------------ */

function DropdownCard({ item }: { item: NavCardItem }) {
  return (
    <a
      href={item.href}
      className="flex items-start gap-3 rounded-2xl border border-[#E9E9E9] p-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] transition-[background-color] duration-150 ease-in-out hover:bg-[var(--card-tint)]"
      style={{ "--card-tint": item.tint ?? "#F5F5F5" } as React.CSSProperties}
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5F5F5] text-[#545454]">
        {ICON_MAP[item.icon]}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#111111]" style={{ textWrap: "balance" }}>
          {item.title}
        </p>
        <p className="mt-0.5 text-sm leading-snug text-[#545454] line-clamp-2">
          {item.description}
        </p>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile accordion section                                           */
/* ------------------------------------------------------------------ */

function MobileAccordion({
  section,
  isOpen,
  onToggle,
  onLinkClick,
}: {
  section: NavSection;
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}) {
  return (
    <div className="border-b border-[#E9E9E9]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-base font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
        style={{ touchAction: "manipulation" }}
        aria-expanded={isOpen}
      >
        {section.label}
        <svg
          className={`h-4 w-4 text-[#545454] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="accordion-content space-y-3 px-6 pb-4">
          {section.items.map((item) => (
            <div key={item.title} onClick={onLinkClick}>
              <DropdownCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NavClient — thin interactive shell                                 */
/* ------------------------------------------------------------------ */

interface NavClientProps {
  sections: readonly NavSection[];
}

export function NavClient({ sections }: NavClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setOpenAccordion(null);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
    if (mobileOpen) setOpenAccordion(null);
  }, [mobileOpen]);

  /* Close mobile overlay on Escape */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen, closeMobile]);

  return (
    <>
      <nav
        className="fixed top-0 right-0 left-0 z-50 border-b border-[#E9E9E9] bg-white/95 backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between px-6">
          {/* Left cluster: Logo + Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link href="/revenue-leak" className="text-xl font-medium text-[#DE3341]">
              TowCap
            </Link>

            {/* Desktop navigation — hover-triggered dropdowns */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-1">
                {sections.map((section) => (
                  <NavigationMenuItem key={section.value}>
                    <NavigationMenuTrigger className="bg-transparent text-base font-medium text-[#111111] hover:bg-transparent hover:text-[#111111]/70 focus:bg-transparent data-[state=open]:bg-transparent">
                      {section.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-0">
                      <div className="relative">
                        {/* CSS triangle caret */}
                        <div
                          className="absolute top-0 left-6 -translate-y-full"
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: "8px solid transparent",
                            borderRight: "8px solid transparent",
                            borderBottom: "8px solid white",
                          }}
                        />
                        <ul className="grid w-[340px] gap-3 p-4 md:w-[420px] md:grid-cols-1">
                          {section.items.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <DropdownCard item={item} />
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}

                {/* About — simple link, no dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuPrimitive.Link
                    href="#!"
                    className="inline-flex h-9 items-center justify-center px-4 py-2 text-base font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                    onClick={(e: React.MouseEvent) => e.preventDefault()}
                  >
                    About
                  </NavigationMenuPrimitive.Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side: Phone + CTA + Hamburger */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+18885550199"
              className="hidden items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 sm:flex"
              aria-label="Call us at (888) 555-0199"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <span>(888)&nbsp;555-0199</span>
            </a>
            <a
              href="#pre-approve"
              className="hidden h-12 items-center justify-center rounded-full bg-[#111111] px-6 text-base font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 sm:inline-flex"
            >
              <span className="hidden sm:inline">Get Pre-Approved</span>
              <span className="sm:hidden">Apply</span>
            </a>

            {/* Hamburger — Vercel-style two-bar toggle (below md) */}
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-md md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              onClick={toggleMobile}
              data-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{ touchAction: "manipulation" }}
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
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay — rendered OUTSIDE nav to avoid backdrop-filter containing block */}
      {mobileOpen && (
        <div
          className="mobile-overlay fixed inset-0 z-[45] overflow-y-auto overscroll-contain bg-white md:hidden"
          style={{ top: "var(--nav-height)" }}
        >
          <div className="flex flex-col">
            {/* Accordion sections */}
            {sections.map((section) => (
              <MobileAccordion
                key={section.value}
                section={section}
                isOpen={openAccordion === section.value}
                onToggle={() =>
                  setOpenAccordion((prev) =>
                    prev === section.value ? null : section.value
                  )
                }
                onLinkClick={closeMobile}
              />
            ))}

            {/* About — simple link */}
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                closeMobile();
              }}
              className="border-b border-[#E9E9E9] px-6 py-4 text-base font-medium text-[#111111]"
              style={{ touchAction: "manipulation" }}
            >
              About
            </a>

            {/* Mobile CTA section */}
            <div className="mt-auto space-y-4 px-6 py-8">
              <a
                href="tel:+18885550199"
                className="flex items-center justify-center gap-2 text-base font-medium text-[#111111]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (888)&nbsp;555-0199
              </a>
              <a
                href="#pre-approve"
                className="flex h-14 w-full items-center justify-center rounded-full bg-[#111111] text-base font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90"
              >
                Get Pre-Approved
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
