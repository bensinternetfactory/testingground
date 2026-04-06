// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { RippleCtaLink } from "../RippleCtaLink";

afterEach(() => {
  cleanup();
});

describe("RippleCtaLink", () => {
  it("emits canonical pre-approval trigger attributes when provided", () => {
    render(
      <RippleCtaLink
        href="#get-pre-approved"
        label="Apply now"
        preApprovalTrigger={{
          origin: {
            pageId: "rollback-financing",
            sectionId: "hero-primary",
            ctaId: "hero-main-cta",
            placement: "hero",
          },
          drawer: {
            title: "How much is the rollback you found?",
          },
          handoff: {
            truckType: "rollback",
          },
        }}
      />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });

    expect(link.getAttribute("data-pre-approval-version")).toBe("2");
    expect(link.getAttribute("data-pre-approval-origin-page-id")).toBe(
      "rollback-financing",
    );
    expect(link.getAttribute("data-pre-approval-origin-section-id")).toBe(
      "hero-primary",
    );
    expect(link.getAttribute("data-pre-approval-origin-cta-id")).toBe(
      "hero-main-cta",
    );
    expect(link.getAttribute("data-pre-approval-origin-placement")).toBe(
      "hero",
    );
    expect(link.getAttribute("data-pre-approval-drawer-title")).toBe(
      "How much is the rollback you found?",
    );
    expect(link.getAttribute("data-pre-approval-handoff-truck-type")).toBe(
      "rollback",
    );
    expect(link.hasAttribute("data-drawer-title")).toBe(false);
  });

  it("preserves the legacy compatibility attributes when only legacy props are provided", () => {
    render(
      <RippleCtaLink
        href="#get-pre-approved"
        label="Apply now"
        drawer={{
          title: "Estimate your buying power",
          source: "hero",
          truckType: "wrecker",
        }}
      />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });

    expect(link.getAttribute("data-drawer-title")).toBe(
      "Estimate your buying power",
    );
    expect(link.getAttribute("data-drawer-source")).toBe("hero");
    expect(link.getAttribute("data-drawer-truck-type")).toBe("wrecker");
    expect(link.hasAttribute("data-pre-approval-version")).toBe(false);
  });

  it("treats drawerTitle as a legacy-only compatibility path", () => {
    render(
      <RippleCtaLink
        href="#get-pre-approved"
        label="Apply now"
        drawerTitle="Estimate your buying power"
      />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });

    expect(link.getAttribute("data-drawer-title")).toBe(
      "Estimate your buying power",
    );
    expect(link.hasAttribute("data-pre-approval-version")).toBe(false);
  });

  it("prefers canonical trigger attributes over legacy compatibility props", () => {
    render(
      <RippleCtaLink
        href="#get-pre-approved"
        label="Apply now"
        preApprovalTrigger={{
          origin: {
            pageId: "homepage",
            sectionId: "hero-primary",
            ctaId: "hero-main-cta",
            placement: "hero",
          },
          drawer: {
            title: "Estimate how much financing you need.",
          },
        }}
        drawer={{
          title: "Legacy title",
          source: "hero",
          truckType: "rollback",
        }}
        drawerTitle="Older legacy title"
      />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });

    expect(link.getAttribute("data-pre-approval-origin-page-id")).toBe(
      "homepage",
    );
    expect(link.getAttribute("data-pre-approval-drawer-title")).toBe(
      "Estimate how much financing you need.",
    );
    expect(link.hasAttribute("data-drawer-title")).toBe(false);
    expect(link.hasAttribute("data-drawer-source")).toBe(false);
    expect(link.hasAttribute("data-drawer-truck-type")).toBe(false);
  });
});
