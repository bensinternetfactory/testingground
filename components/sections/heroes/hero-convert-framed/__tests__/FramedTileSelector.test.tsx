// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FramedTileSelector } from "../FramedTileSelector";
import { USED_TOW_TRUCK_HERO_DRAWER } from "@/components/ui/pre-approval-drawer";
import { usedTowTruckHeroPreApprovalSelectionTrigger } from "@/features/pre-approval/selection";

afterEach(() => {
  cleanup();
});

describe("FramedTileSelector", () => {
  it("emits canonical trigger attributes for migrated tile-right callers", async () => {
    const user = userEvent.setup();

    render(
      <FramedTileSelector
        tiles={[
          { id: "rollback", label: "Rollback" },
          { id: "rotator", label: "Rotator" },
        ]}
        cta={{
          label: "Get Pre-Approved",
          href: "#get-pre-approved",
          preApprovalSelectionTrigger:
            usedTowTruckHeroPreApprovalSelectionTrigger,
        }}
        selectionPrompt="What used tow truck do you need financing?"
        selectionRequiredMessage="Select a truck type to continue."
      />,
    );

    await user.click(screen.getByRole("button", { name: "Rotator" }));

    const link = screen.getByRole("link", { name: "Get Pre-Approved" });

    expect(link).toHaveAttribute("data-pre-approval-version", "2");
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "used-tow-truck-financing",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-handoff-truck-type",
      "rotator",
    );
    expect(link.hasAttribute("data-drawer-source")).toBe(false);
  });

  it("keeps the legacy drawer selection path available for untouched callers", async () => {
    const user = userEvent.setup();

    render(
      <FramedTileSelector
        tiles={[
          { id: "rollback", label: "Rollback" },
          { id: "rotator", label: "Rotator" },
        ]}
        cta={{
          label: "Get Pre-Approved",
          href: "#get-pre-approved",
          drawer: USED_TOW_TRUCK_HERO_DRAWER,
        }}
        selectionPrompt="What used tow truck do you need financing?"
        selectionRequiredMessage="Select a truck type to continue."
      />,
    );

    await user.click(screen.getByRole("button", { name: "Rotator" }));

    const link = screen.getByRole("link", { name: "Get Pre-Approved" });

    expect(link).toHaveAttribute("data-drawer-source", "hero");
    expect(link).toHaveAttribute("data-drawer-truck-type", "rotator");
    expect(link.hasAttribute("data-pre-approval-version")).toBe(false);
  });
});
