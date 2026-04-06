// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type {
  InlineCtaSection,
  PromoPanelSection,
} from "@/app/(marketing)/(programs)/_components/page-config-types";
import { fleetFinancingPageConfig } from "@/app/(marketing)/(programs)/fleet-financing/config";
import { HeroLeadGen } from "@/components/sections/heroes/hero-lead-gen/HeroLeadGen";
import { SidebarCta } from "../SidebarCta";
import { InlineCtaBlock } from "../blocks/InlineCtaBlock";
import { PromoPanelBlock } from "../blocks/PromoPanelBlock";
import { ProgramBottomLinks } from "../ProgramBottomLinks";

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

function findInlineCtaSection(sectionId: string): InlineCtaSection {
  const section = fleetFinancingPageConfig.sections.find(
    (candidate): candidate is InlineCtaSection =>
      candidate.kind === "inlineCta" &&
      candidate.config.preApprovalTrigger?.origin.sectionId === sectionId,
  );

  if (!section) {
    throw new Error(`Missing inline CTA section ${sectionId}`);
  }

  return section;
}

describe("program page pre-approval caller renderers", () => {
  it("renders the fleet hero CTA with canonical trigger attributes from the authored config", () => {
    render(<HeroLeadGen config={fleetFinancingPageConfig.hero} />);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get Pre-Approved" }),
      {
        href: "#get-pre-approved",
        pageId: "fleet-financing",
        sectionId: "hero-primary",
        ctaId: "hero-main-cta",
        placement: "hero",
      },
    );
  });

  it("renders the fleet sidebar CTA with canonical trigger attributes from the authored config", () => {
    render(<SidebarCta config={fleetFinancingPageConfig.sidebarCta} />);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get Pre-Approved" }),
      {
        href: "#get-pre-approved",
        pageId: "fleet-financing",
        sectionId: "sidebar-cta",
        ctaId: "sidebar-main-cta",
        placement: "section",
      },
    );
  });

  it("renders authored inline CTA bands with canonical trigger attributes", () => {
    render(<InlineCtaBlock section={findInlineCtaSection("growth-inline-cta")} />);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get Pre-Approved" }),
      {
        href: "#get-pre-approved",
        pageId: "fleet-financing",
        sectionId: "growth-inline-cta",
        ctaId: "growth-inline-cta",
        placement: "inline",
      },
    );
  });

  it("supports canonical promo-panel CTA wiring on the shared renderer", () => {
    const section: PromoPanelSection = {
      kind: "promoPanel",
      heading: "Run the numbers",
      paragraphs: ["Plug in the truck and see the structure."],
      cta: {
        href: "#get-pre-approved",
        label: "See my payment",
        preApprovalTrigger: {
          origin: {
            pageId: "fleet-financing",
            sectionId: "calculator-promo",
            ctaId: "promo-main-cta",
            placement: "section",
          },
          drawer: {
            title: "Estimate your fleet payment",
          },
        },
      },
    };

    render(<PromoPanelBlock section={section} />);

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "See my payment" }),
      {
        href: "#get-pre-approved",
        pageId: "fleet-financing",
        sectionId: "calculator-promo",
        ctaId: "promo-main-cta",
        placement: "section",
        title: "Estimate your fleet payment",
      },
    );
  });

  it("supports canonical bottom-link card wiring on the shared renderer", () => {
    render(
      <ProgramBottomLinks
        config={{
          groups: [
            {
              label: "Tools",
              links: [
                {
                  label: "Get pre-approved for another truck",
                  href: "#get-pre-approved",
                  preApprovalTrigger: {
                    origin: {
                      pageId: "fleet-financing",
                      sectionId: "bottom-links-tools",
                      ctaId: "bottom-links-pre-approval",
                      placement: "footer",
                    },
                  },
                },
              ],
            },
          ],
        }}
      />,
    );

    expectCanonicalTriggerAttributes(
      screen.getByRole("link", { name: "Get pre-approved for another truck" }),
      {
        href: "#get-pre-approved",
        pageId: "fleet-financing",
        sectionId: "bottom-links-tools",
        ctaId: "bottom-links-pre-approval",
        placement: "footer",
      },
    );
  });
});
