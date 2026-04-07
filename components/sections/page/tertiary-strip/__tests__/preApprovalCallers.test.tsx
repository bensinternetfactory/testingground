// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { rollbackFinancingPageConfig } from "@/app/(marketing)/(financing)/rollback-financing/config";
import { rotatorFinancingPageConfig } from "@/app/(marketing)/(financing)/rotator-financing/config";
import { TertiaryActionsStrip } from "../TertiaryActionsStrip";

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

describe("financing tertiary-strip pre-approval callers", () => {
  it("renders the rollback tertiary-strip CTA with canonical trigger attributes", () => {
    if (!rollbackFinancingPageConfig.tertiaryStrip) {
      throw new Error("Expected rollback financing to define a tertiary strip");
    }

    render(<TertiaryActionsStrip config={rollbackFinancingPageConfig.tertiaryStrip} />);
    expect(document.querySelectorAll("a a")).toHaveLength(0);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", {
        name: /Already have a truck in mind\?.*I found a truck and need financing/,
      }),
      {
        href: "#get-pre-approved",
        pageId: "rollback-financing",
        sectionId: "tertiary-strip-primary",
        ctaId: "found-truck-cta",
        placement: "section",
        title: "How much is the rollback you found?",
      },
    );
  });

  it("renders the rotator purchase-and-terms tertiary-strip CTAs with canonical trigger attributes", () => {
    if (!rotatorFinancingPageConfig.purchaseTermsTertiaryStrip) {
      throw new Error(
        "Expected rotator financing to define a purchase-and-terms tertiary strip",
      );
    }

    render(
      <TertiaryActionsStrip
        config={rotatorFinancingPageConfig.purchaseTermsTertiaryStrip}
      />,
    );
    expect(document.querySelectorAll("a a")).toHaveLength(0);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", {
        name: /Buying from another operator\?.*Operator-to-operator rotator financing/,
      }),
      {
        href: "#get-pre-approved",
        pageId: "rotator-financing",
        sectionId: "purchase-terms-tertiary-strip",
        ctaId: "operator-to-operator-cta",
        placement: "section",
        title: "How much is the rotator you’re looking at?",
      },
    );

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", {
        name: /Looking at an older rotator\?.*See if your truck year qualifies/,
      }),
      {
        href: "#get-pre-approved",
        pageId: "rotator-financing",
        sectionId: "purchase-terms-tertiary-strip",
        ctaId: "truck-year-qualifier-cta",
        placement: "section",
        title: "How much is the rotator you’re looking at?",
      },
    );
  });
});
