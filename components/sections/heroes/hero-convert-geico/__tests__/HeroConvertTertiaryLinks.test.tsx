// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HeroConvert } from "../HeroConvert";

const heroImage = {
  src: "/test-truck.jpg",
  height: 900,
  width: 1440,
  blurDataURL: "data:image/gif;base64,R0lGODlhAQABAAAAACw=",
};

afterEach(() => {
  cleanup();
});

describe("HeroConvert tertiary links", () => {
  it("prefers canonical trigger attributes but preserves the legacy drawer fallback", () => {
    render(
      <HeroConvert
        config={{
          headline: "Tow truck financing built for your business",
          bodyCopy: "See what you may qualify for before you commit.",
          selectionPrompt: "Choose the equipment you want to finance first.",
          selectionRequiredMessage: "Select a truck type to continue.",
          tiles: [
            { id: "rollback", label: "Rollback" },
            { id: "wrecker", label: "Wrecker" },
          ],
          cta: { label: "Check Your Options", href: "#get-pre-approved" },
          tertiaryLinks: [
            {
              label: "Estimate your buying power",
              href: "#get-pre-approved",
              preApprovalTrigger: {
                origin: {
                  pageId: "rotator-financing",
                  sectionId: "hero-tertiary-links",
                  ctaId: "hero-buying-power",
                  placement: "hero",
                },
                drawer: {
                  title: "Estimate your buying power",
                },
              },
            },
            {
              label: "Legacy fallback link",
              href: "#get-pre-approved",
              drawer: {
                title: "Legacy title",
                source: "hero",
              },
            },
          ],
          microcopy: "Checking will not affect your credit score.",
          disclaimer:
            "Subject to credit review. All financing is subject to approval.",
          heroImage,
          heroImageAlt: "Tow truck ready for financing",
        }}
      />,
    );

    const canonicalLink = screen.getByRole("link", {
      name: "Estimate your buying power",
    });
    expect(canonicalLink).toHaveAttribute("data-pre-approval-version", "2");
    expect(canonicalLink).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "rotator-financing",
    );
    expect(canonicalLink).toHaveAttribute(
      "data-pre-approval-drawer-title",
      "Estimate your buying power",
    );
    expect(canonicalLink.hasAttribute("data-drawer-title")).toBe(false);

    const legacyLink = screen.getByRole("link", { name: "Legacy fallback link" });
    expect(legacyLink).toHaveAttribute("data-drawer-title", "Legacy title");
    expect(legacyLink).toHaveAttribute("data-drawer-source", "hero");
    expect(legacyLink.hasAttribute("data-pre-approval-version")).toBe(false);
  });
});
