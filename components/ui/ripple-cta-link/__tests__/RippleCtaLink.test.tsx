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

  it("stays free of pre-approval attributes when no trigger is provided", () => {
    render(<RippleCtaLink href="#get-pre-approved" label="Apply now" />);

    const link = screen.getByRole("link", { name: "Apply now" });

    expect(link.hasAttribute("data-pre-approval-version")).toBe(false);
    expect(link.hasAttribute("data-drawer-title")).toBe(false);
    expect(link.hasAttribute("data-drawer-source")).toBe(false);
    expect(link.hasAttribute("data-drawer-truck-type")).toBe(false);
  });
});
