import { NavPressable } from "./NavPressable";
import { PhoneIcon } from "./nav-icons";

export function NavHeaderActions({
  mobileOpen,
  onToggleMobile,
  primaryCtaHref,
}: {
  mobileOpen: boolean;
  onToggleMobile: () => void;
  primaryCtaHref: string;
}) {
  return (
    <div className="flex items-center gap-4 lg:gap-6">
      <a
        href="tel:+18885550199"
        className="hidden items-center gap-2 whitespace-nowrap text-sm font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 lg:flex xl:text-base"
        aria-label="Call us at (888) 555-0199"
      >
        {PhoneIcon}
        <span>(888)&nbsp;555-0199</span>
      </a>

      <a
        href={primaryCtaHref}
        className="hidden h-12 items-center justify-center rounded-full bg-[#111111] px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 md:inline-flex xl:px-6 xl:text-base"
      >
        <span className="hidden lg:inline">Get Pre-Approved</span>
        <span className="lg:hidden">Apply</span>
      </a>

      <NavPressable
        onPress={onToggleMobile}
        ariaLabel={mobileOpen ? "Close menu" : "Open menu"}
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
    </div>
  );
}
