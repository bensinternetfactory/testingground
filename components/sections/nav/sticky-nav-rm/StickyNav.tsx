import "./sticky-nav.css";

import Image from "next/image";
import Link from "next/link";
import { NavClient } from "./NavClient";
import { NavDesktopMenu } from "./NavDesktopMenu";
import { NAV_SECTIONS } from "./nav-data";
import { PhoneIcon } from "./nav-icons";

export function StickyNav() {
  return (
    <div data-sticky-nav-root>
      <nav
        data-nav-shell
        className="fixed top-0 right-0 left-0 z-50 border-b border-[#E9E9E9] bg-white/95 pr-[var(--scrollbar-gutter,0px)] backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/">
              <Image
                src="/brand-assets/logo/towloans-green-hook.svg"
                alt="TowLoans"
                width={220}
                height={32}
                className="h-auto w-[190px] md:w-[205px] lg:w-[220px]"
                priority
              />
            </Link>

            <NavDesktopMenu sections={NAV_SECTIONS} />
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <a
              href="tel:+18885550199"
              className="hidden items-center gap-2 whitespace-nowrap text-sm font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 lg:flex xl:text-base"
              aria-label="Call us at (888) 555-0199"
            >
              {PhoneIcon}
              <span>(888)&nbsp;555-0199</span>
            </a>

            <NavClient sections={NAV_SECTIONS} />
          </div>
        </div>
      </nav>
    </div>
  );
}
