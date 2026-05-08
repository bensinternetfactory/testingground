import Link from "next/link";
import { Phone } from "lucide-react";
import { HEADER_NAV, PHONE_DISPLAY, PHONE_TEL } from "../../_lib/content";
import { CtaButton } from "../primitives/CtaButton";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const navLinks = HEADER_NAV.filter((item) => item.label !== "Apply Now");

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[var(--t-divider)]">
      <div className="2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <Link href="/test" className="flex items-center font-extrabold text-lg tracking-tight text-[var(--t-ink)]">
            <span className="text-[var(--t-blue)]">Tow</span>
            <span>Loans</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-[14px] font-medium text-[var(--t-ink)] hover:bg-[var(--t-bg-soft)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--t-blue-ink)] hover:underline"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <CtaButton href="/pre-approval" size="md">
              Get Pre-Qualified
            </CtaButton>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
