"use client";

import { useState } from "react";

const navLinks = [
  { label: "Tow Truck Financing", href: "#hero" },
  { label: "Truck Types", href: "#truck-types" },
  { label: "Programs", href: "#programs" },
  { label: "Calculator", href: "#calculator" },
  { label: "Reviews", href: "#reviews" },
];

function PhoneIcon() {
  return (
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
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function StickyNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="/insider"
          className="text-xl font-bold tracking-tight text-white"
        >
          Tow<span className="text-amber-400">Loans</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Phone + CTA — always visible */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+18005550199"
            className="flex items-center gap-2 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-label="Call us at (800) 555-0199"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">(800)&nbsp;555-0199</span>
          </a>

          <a
            href="#pre-approve"
            className="hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:inline-flex"
          >
            Get Pre-Approved in 30s
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950 lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 px-6 py-4">
            <a
              href="#pre-approve"
              className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-bold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Get Pre-Approved in 30 Seconds
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
