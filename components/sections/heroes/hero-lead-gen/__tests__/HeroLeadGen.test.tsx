// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HeroLeadGen } from "../HeroLeadGen";
import type { HeroLeadGenConfig } from "../config";

const baseConfig: HeroLeadGenConfig = {
  headline: "Rotator Financing for Heavy Recovery.",
  subheadline: "See your payment structure before you commit to the unit.",
  cta: {
    label: "Get Pre-Approved",
    href: "#get-pre-approved",
  },
  phone: { display: "(888) 555-0199", href: "tel:+18885550199" },
  trustBadges: [{ label: "30-Second Pre-Approval" }],
  heroImage: "/truck-12.jpg",
  heroImageAlt: "Heavy-recovery rotator truck ready for financing",
};

afterEach(() => {
  cleanup();
});

describe("HeroLeadGen", () => {
  it("emits canonical pre-approval trigger attributes when configured", () => {
    render(
      <HeroLeadGen
        config={{
          ...baseConfig,
          cta: {
            ...baseConfig.cta,
            preApprovalTrigger: {
              origin: {
                pageId: "rotator-financing",
                sectionId: "hero-primary",
                ctaId: "hero-main-cta",
                placement: "hero",
              },
              handoff: {
                truckType: "rotator",
              },
            },
          },
        }}
      />,
    );

    const link = screen.getByRole("link", { name: "Get Pre-Approved" });

    expect(link).toHaveAttribute("data-pre-approval-version", "2");
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "rotator-financing",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-section-id",
      "hero-primary",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-cta-id",
      "hero-main-cta",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-placement",
      "hero",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-handoff-truck-type",
      "rotator",
    );
    expect(link.hasAttribute("data-drawer-source")).toBe(false);
  });

  it("keeps the legacy drawer compatibility path available", () => {
    render(
      <HeroLeadGen
        config={{
          ...baseConfig,
          cta: {
            ...baseConfig.cta,
            drawer: {
              source: "hero",
              truckType: "rotator",
            },
          },
        }}
      />,
    );

    const link = screen.getByRole("link", { name: "Get Pre-Approved" });

    expect(link).toHaveAttribute("data-drawer-source", "hero");
    expect(link).toHaveAttribute("data-drawer-truck-type", "rotator");
    expect(link.hasAttribute("data-pre-approval-version")).toBe(false);
  });
});
