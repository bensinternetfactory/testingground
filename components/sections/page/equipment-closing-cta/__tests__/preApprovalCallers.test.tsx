// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { rollbackFinancingPageConfig } from "@/app/(marketing)/(financing)/rollback-financing/config";
import { deferredPaymentPageConfig } from "@/app/(marketing)/(programs)/deferred-payment-tow-truck-financing/config";
import { EquipmentClosingCta } from "../EquipmentClosingCta";
import { EquipmentClosingCtaTrucks } from "../EquipmentClosingCtaTrucks";

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
    truckType?: string;
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

  if (expected.truckType) {
    expect(link).toHaveAttribute(
      "data-pre-approval-handoff-truck-type",
      expected.truckType,
    );
  } else {
    expect(link.hasAttribute("data-pre-approval-handoff-truck-type")).toBe(false);
  }
}

describe("equipment closing CTA pre-approval callers", () => {
  it("renders the rollback financing closing CTA with canonical trigger attributes", () => {
    render(<EquipmentClosingCta config={rollbackFinancingPageConfig.closingCta} />);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get Pre-Approved" }),
      {
        href: "#get-pre-approved",
        pageId: "rollback-financing",
        sectionId: "closing-cta-primary",
        ctaId: "closing-cta-primary",
        placement: "footer",
      },
    );
  });

  it("renders program closing tiles with canonical truck-type handoff attributes", () => {
    render(<EquipmentClosingCtaTrucks config={deferredPaymentPageConfig.closingCta} />);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get pre-approved for a rollback" }),
      {
        href: "#get-pre-approved",
        pageId: "deferred-payment-tow-truck-financing",
        sectionId: "closing-cta-tiles",
        ctaId: "closing-tile-rollback",
        placement: "footer",
        truckType: "rollback",
      },
    );

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get pre-approved for a wrecker" }),
      {
        href: "#get-pre-approved",
        pageId: "deferred-payment-tow-truck-financing",
        sectionId: "closing-cta-tiles",
        ctaId: "closing-tile-wrecker",
        placement: "footer",
        truckType: "wrecker",
      },
    );

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get pre-approved for a heavy wrecker" }),
      {
        href: "#get-pre-approved",
        pageId: "deferred-payment-tow-truck-financing",
        sectionId: "closing-cta-tiles",
        ctaId: "closing-tile-heavy-wrecker",
        placement: "footer",
        truckType: "heavy-wrecker",
      },
    );

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get pre-approved for a rotator" }),
      {
        href: "#get-pre-approved",
        pageId: "deferred-payment-tow-truck-financing",
        sectionId: "closing-cta-tiles",
        ctaId: "closing-tile-rotator",
        placement: "footer",
        truckType: "rotator",
      },
    );
  });
});
