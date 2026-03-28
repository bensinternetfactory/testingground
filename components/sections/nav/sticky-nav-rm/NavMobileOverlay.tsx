import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import { NavPressable } from "./NavPressable";
import { NavItemVisual } from "./NavItemVisual";
import { PhoneIcon } from "./nav-icons";
import type { NavSection } from "./nav-data";

function MobileAccordionSection({
  isOpen,
  onLinkClick,
  onToggle,
  section,
}: {
  isOpen: boolean;
  onLinkClick: () => void;
  onToggle: () => void;
  section: NavSection;
}) {
  return (
    <div>
      <NavPressable
        onPress={onToggle}
        ariaExpanded={isOpen}
        className="flex w-full items-center justify-between gap-4 border-b border-[#E9E9E9] px-6 py-4 text-left text-base font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-inset"
      >
        <span>{section.label}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-[#545454] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </NavPressable>

      {isOpen ? (
        <div className="accordion-content">
          {section.items.map((item) => (
            <NavPressable
              key={item.title}
              href={item.href}
              onPress={onLinkClick}
              prefetch={false}
              className="flex w-full items-center gap-3 border-b border-[#E9E9E9] px-6 py-4 text-left text-sm font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-inset"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E9E9E9] bg-white">
                <NavItemVisual item={item} mobile />
              </span>
              <span>{item.title}</span>
            </NavPressable>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function NavMobileOverlay({
  onClose,
  onToggleSection,
  openSection,
  sections,
}: {
  onClose: () => void;
  onToggleSection: (value: string) => void;
  openSection: string | null;
  sections: readonly NavSection[];
}) {
  return (
    <div
      className="mobile-overlay fixed inset-0 z-[45] overflow-y-auto overscroll-contain bg-white md:hidden"
      style={{ top: "var(--nav-height)" }}
    >
      <div className="border-t border-[#E9E9E9] pb-[120px]">
        {sections.map((section) => (
          <MobileAccordionSection
            key={section.value}
            section={section}
            isOpen={openSection === section.value}
            onToggle={() => onToggleSection(section.value)}
            onLinkClick={onClose}
          />
        ))}

        <NavPressable
          href="/about"
          onPress={onClose}
          prefetch={false}
          className="flex w-full items-center justify-between gap-4 border-b border-[#E9E9E9] px-6 py-4 text-left text-base font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-inset"
        >
          <span>About</span>
          <svg className="h-4 w-4 text-[#545454]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </NavPressable>

        <div className="sticky bottom-0 space-y-4 border-t border-[#E9E9E9] bg-white px-6 py-8">
          <NavPressable
            href="tel:+18885550199"
            className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-base font-medium text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            {PhoneIcon}
            <span>(888)&nbsp;555-0199</span>
          </NavPressable>

          <RippleCtaLink
            href={DRAWER_HASH}
            label="Get Pre-Approved"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
