// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HeroGallery } from "@/components/sections/heroes/hero-gallery/HeroGallery";
import { HERO_GALLERY_CONFIG } from "@/components/sections/heroes/hero-gallery/config";
import { ClosingCta } from "@/components/sections/page/closing-cta/ClosingCta";
import { CLOSING_CTA_CONFIG } from "@/components/sections/page/closing-cta/config";
import { HowItWorks } from "@/components/sections/page/how-it-works/HowItWorks";
import { HOW_IT_WORKS_CONFIG } from "@/components/sections/page/how-it-works/config";

vi.mock("next/dynamic", () => ({
  default: () => function MockDynamicComponent() {
    return null;
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

afterEach(() => {
  cleanup();
});

function expectCanonicalTriggerAttributes(
  link: HTMLElement,
  expected: {
    href: string;
    pageId: string;
    sectionId: string;
    ctaId: string;
    placement: string;
    title?: string;
  },
) {
  expect(link).toHaveAttribute("href", expected.href);
  expect(link).toHaveAttribute("data-pre-approval-version", "2");
  expect(link).toHaveAttribute(
    "data-pre-approval-origin-page-id",
    expected.pageId,
  );
  expect(link).toHaveAttribute(
    "data-pre-approval-origin-section-id",
    expected.sectionId,
  );
  expect(link).toHaveAttribute(
    "data-pre-approval-origin-cta-id",
    expected.ctaId,
  );
  expect(link).toHaveAttribute(
    "data-pre-approval-origin-placement",
    expected.placement,
  );

  if (expected.title) {
    expect(link).toHaveAttribute("data-pre-approval-drawer-title", expected.title);
  } else {
    expect(link.hasAttribute("data-pre-approval-drawer-title")).toBe(false);
  }

  expect(link.hasAttribute("data-drawer-title")).toBe(false);
}

describe("homepage pre-approval caller configs", () => {
  it("renders the hero gallery mobile CTA and tertiary links with canonical trigger attributes", () => {
    render(<HeroGallery config={HERO_GALLERY_CONFIG} />);

    expect(document.querySelectorAll("a a")).toHaveLength(0);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get Pre-Approved" }),
      {
        href: "#get-pre-approved",
        pageId: "home",
        sectionId: "hero-mobile-primary",
        ctaId: "hero-mobile-primary",
        placement: "hero",
      },
    );

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Found a truck? Get financing" }),
      {
        href: "#get-pre-approved",
        pageId: "home",
        sectionId: "hero-tertiary-links",
        ctaId: "hero-tertiary-found-truck",
        placement: "hero",
        title: "How much is the tow truck you found?",
      },
    );

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "What’s my buying power?" }),
      {
        href: "#get-pre-approved",
        pageId: "home",
        sectionId: "hero-tertiary-links",
        ctaId: "hero-tertiary-buying-power",
        placement: "hero",
        title: "Estimate your buying power",
      },
    );
  });

  it("renders the how-it-works CTA with canonical trigger attributes", () => {
    render(<HowItWorks config={HOW_IT_WORKS_CONFIG} />);
    expect(document.querySelectorAll("a a")).toHaveLength(0);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "See Your Payment" }),
      {
        href: "#get-pre-approved",
        pageId: "home",
        sectionId: "how-it-works-primary",
        ctaId: "how-it-works-primary",
        placement: "section",
      },
    );
  });

  it("renders the closing CTA with canonical trigger attributes", () => {
    render(<ClosingCta config={CLOSING_CTA_CONFIG} />);

    expect(document.querySelectorAll("a a")).toHaveLength(0);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: /Get Pre-Approved.*30/ }),
      {
        href: "#get-pre-approved",
        pageId: "home",
        sectionId: "closing-cta-primary",
        ctaId: "closing-cta-primary",
        placement: "footer",
      },
    );
  });
});
