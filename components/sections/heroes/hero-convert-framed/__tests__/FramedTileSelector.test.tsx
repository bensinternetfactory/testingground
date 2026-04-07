// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FramedTileSelector } from "../FramedTileSelector";
import { usedTowTruckHeroPreApprovalSelectionTrigger } from "@/features/pre-approval/selection";

afterEach(() => {
  cleanup();
});

describe("FramedTileSelector", () => {
  it("keeps the disabled compatibility path and emits canonical trigger attributes after selection", async () => {
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

    const disabledButton = screen.getByRole("button", {
      name: "Get Pre-Approved",
    });

    expect(disabledButton).toBeDisabled();
    expect(disabledButton).not.toHaveAttribute("data-pre-approval-version");

    await user.click(screen.getByRole("button", { name: "Rotator" }));

    expect(document.querySelectorAll("a a")).toHaveLength(0);

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
});
