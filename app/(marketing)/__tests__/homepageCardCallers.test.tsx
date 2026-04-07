// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { EquipmentCards } from "@/components/sections/page/equipment-cards/EquipmentCards";
import { EQUIPMENT_CARDS_CONFIG } from "@/components/sections/page/equipment-cards/config";
import { ProgramCards } from "@/components/sections/page/program-cards/ProgramCards";
import { PROGRAM_CARDS_CONFIG } from "@/components/sections/page/program-cards/config";
import { ResourceHub } from "@/components/sections/page/resource-hub/ResourceHub";
import { RESOURCE_HUB_CONFIG } from "@/components/sections/page/resource-hub/config";

afterEach(() => {
  cleanup();
});

function expectNormalCtaLink(link: HTMLElement, href: string) {
  expect(link).toHaveAttribute("href", href);
  expect(link.hasAttribute("data-pre-approval-version")).toBe(false);
  expect(link.hasAttribute("data-drawer-title")).toBe(false);
}

describe("homepage card CTA callers", () => {
  it("renders the program-card CTA buttons as canonical internal links", () => {
    render(<ProgramCards config={PROGRAM_CARDS_CONFIG} />);

    expect(document.querySelectorAll("a a")).toHaveLength(0);

    expectNormalCtaLink(
      screen.getByRole("link", { name: "See Zero Down" }),
      "/zero-down-tow-truck-financing",
    );
    expectNormalCtaLink(
      screen.getByRole("link", { name: "Fleet Programs" }),
      "/fleet-financing",
    );
  });

  it("renders the equipment-card CTA buttons as canonical internal links", () => {
    render(<EquipmentCards config={EQUIPMENT_CARDS_CONFIG} />);

    expect(document.querySelectorAll("a a")).toHaveLength(0);

    expectNormalCtaLink(
      screen.getByRole("link", { name: "See Rollback Financing" }),
      "/rollback-financing",
    );
    expectNormalCtaLink(
      screen.getByRole("link", { name: "See Rotator Financing" }),
      "/rotator-financing",
    );
  });

  it("renders the resource CTA buttons as canonical internal links beside the title links", () => {
    render(<ResourceHub config={RESOURCE_HUB_CONFIG} />);

    expect(document.querySelectorAll("a a")).toHaveLength(0);

    expectNormalCtaLink(
      screen.getByRole("link", { name: "Read the Guide" }),
      "/resources/how-much-does-a-tow-truck-cost",
    );
    expectNormalCtaLink(
      screen.getByRole("link", { name: "Run the Calculator" }),
      "/tow-truck-calculator?angle=roi",
    );
    expect(
      screen.getByRole("link", { name: "How Much Does a Tow Truck Cost?" }),
    ).toHaveAttribute("href", "/resources/how-much-does-a-tow-truck-cost");
  });
});
