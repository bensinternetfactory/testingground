"use client";

import "./sticky-nav.css";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveDrawerTriggerHref } from "@/components/ui/pre-approval-drawer/config";
import { NavDesktopMenu } from "./NavDesktopMenu";
import { NavHeaderActions } from "./NavHeaderActions";
import { NavMobileOverlay } from "./NavMobileOverlay";
import type { NavSection } from "./nav-data";
import { useMobileNavState } from "./useMobileNavState";

interface NavClientProps {
  sections: readonly NavSection[];
}

export function NavClient({ sections }: NavClientProps) {
  const pathname = usePathname();
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
      <nav
        className="fixed top-0 right-0 left-0 z-50 border-b border-[#E9E9E9] bg-white/95 backdrop-blur-md"
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

            <NavDesktopMenu sections={sections} />
          </div>

          <NavHeaderActions
            mobileOpen={mobileOpen}
            onToggleMobile={toggleMobile}
            primaryCtaHref={primaryCtaHref}
          />
        </div>
      </nav>

      {mobileOpen ? (
        <NavMobileOverlay
          sections={sections}
          openSection={openSection}
          onToggleSection={toggleSection}
          onClose={closeMobile}
          primaryCtaHref={primaryCtaHref}
        />
      ) : null}
    </>
  );
}
