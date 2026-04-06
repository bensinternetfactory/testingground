// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HeroConvertFramed } from "../HeroConvertFramed";
import { HeroConvertFramedOutline } from "../HeroConvertFramedOutline";

const heroImage = {
  src: "/test-truck.jpg",
  height: 900,
  width: 1440,
  blurDataURL: "data:image/gif;base64,R0lGODlhAQABAAAAACw=",
};

afterEach(() => {
  cleanup();
});

describe("HeroConvertFramed tertiary actions", () => {
  it("prefers canonical trigger attributes but preserves the legacy fallback link", () => {
    render(
      <HeroConvertFramed
        config={{
          headline: "Need rollback financing?",
          bodyCopy: "See your payment before the deal slows down.",
          selectionPrompt: "Choose your rollback type",
          selectionRequiredMessage: "Choose a truck type to continue.",
          tiles: [{ id: "rollback", label: "Rollback" }],
          cta: { label: "Get Pre-Approved", href: "#get-pre-approved" },
          tertiaryLinks: [
            {
              label: "Estimate your buying power",
              href: "#get-pre-approved",
              preApprovalTrigger: {
                origin: {
                  pageId: "rollback-financing",
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
          heroImage,
          heroImageAlt: "Rollback tow truck",
        }}
      />,
    );

    const canonicalLink = screen.getByRole("link", {
      name: "Estimate your buying power",
    });
    expect(canonicalLink).toHaveAttribute("data-pre-approval-version", "2");
    expect(canonicalLink).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "rollback-financing",
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

describe("HeroConvertFramedOutline tertiary actions", () => {
  it("passes canonical and legacy tertiary action wiring through RippleCtaLink", () => {
    render(
      <HeroConvertFramedOutline
        config={{
          headline: "Need wrecker financing?",
          bodyCopy: "See the structure before you lock in the deal.",
          selectionPrompt: "Choose your wrecker type",
          selectionRequiredMessage: "Choose a truck type to continue.",
          tiles: [{ id: "wrecker", label: "Wrecker" }],
          cta: { label: "Get Pre-Approved", href: "#get-pre-approved" },
          tertiaryActions: [
            {
              eyebrow: "Already found a truck?",
              label: "Estimate your buying power",
              href: "#get-pre-approved",
              preApprovalTrigger: {
                origin: {
                  pageId: "wrecker-financing",
                  sectionId: "hero-tertiary-actions",
                  ctaId: "hero-buying-power",
                  placement: "hero",
                },
                drawer: {
                  title: "Estimate your buying power",
                },
              },
            },
            {
              eyebrow: "Compatibility path",
              label: "Legacy fallback action",
              href: "#get-pre-approved",
              drawer: {
                title: "Legacy title",
                source: "hero",
              },
            },
          ],
          heroImage,
          heroImageAlt: "Wrecker tow truck",
        }}
      />,
    );

    const canonicalLink = screen.getByRole("link", {
      name: "Estimate your buying power",
    });
    expect(canonicalLink).toHaveAttribute("data-pre-approval-version", "2");
    expect(canonicalLink).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "wrecker-financing",
    );
    expect(canonicalLink).toHaveAttribute(
      "data-pre-approval-drawer-title",
      "Estimate your buying power",
    );
    expect(canonicalLink.hasAttribute("data-drawer-title")).toBe(false);

    const legacyLink = screen.getByRole("link", { name: "Legacy fallback action" });
    expect(legacyLink).toHaveAttribute("data-drawer-title", "Legacy title");
    expect(legacyLink).toHaveAttribute("data-drawer-source", "hero");
    expect(legacyLink.hasAttribute("data-pre-approval-version")).toBe(false);
  });
});
