// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TileSelector } from "../TileSelector";
import { WRECKER_HERO_DRAWER } from "@/components/ui/pre-approval-drawer";
import { wreckerHeroPreApprovalSelectionTrigger } from "@/features/pre-approval/selection";

vi.mock("web-haptics/react", () => ({
  useWebHaptics: () => ({
    trigger: vi.fn(),
  }),
}));

afterEach(() => {
  cleanup();
});

describe("TileSelector", () => {
  it("prefers the canonical pre-approval selection trigger for migrated callers", async () => {
    const user = userEvent.setup();

    render(
      <TileSelector
        tiles={[
          { id: "light-duty", label: "Light-Duty Wrecker" },
          { id: "heavy-wrecker", label: "Heavy Wrecker" },
        ]}
        cta={{
          label: "Get Pre-Approved",
          href: "#get-pre-approved",
          preApprovalSelectionTrigger: wreckerHeroPreApprovalSelectionTrigger,
        }}
        selectionPrompt="What do you need financing on?"
        selectionRequiredMessage="Select a truck type to continue."
      />,
    );

    await user.click(screen.getByRole("button", { name: "Heavy Wrecker" }));

    const link = screen.getByRole("link", { name: "Get Pre-Approved" });

    expect(link).toHaveAttribute("data-pre-approval-version", "2");
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "wrecker-financing",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-handoff-truck-type",
      "heavy-wrecker",
    );
    expect(link.hasAttribute("data-drawer-source")).toBe(false);
  });

  it("keeps the legacy drawer compatibility path for untouched callers", async () => {
    const user = userEvent.setup();

    render(
      <TileSelector
        tiles={[
          { id: "light-duty", label: "Light-Duty Wrecker" },
          { id: "heavy-wrecker", label: "Heavy Wrecker" },
        ]}
        cta={{
          label: "Get Pre-Approved",
          href: "#get-pre-approved",
          drawer: WRECKER_HERO_DRAWER,
        }}
        selectionPrompt="What do you need financing on?"
        selectionRequiredMessage="Select a truck type to continue."
      />,
    );

    await user.click(screen.getByRole("button", { name: "Heavy Wrecker" }));

    const link = screen.getByRole("link", { name: "Get Pre-Approved" });

    expect(link).toHaveAttribute("data-drawer-source", "hero");
    expect(link).toHaveAttribute("data-drawer-truck-type", "heavy-wrecker");
    expect(link.hasAttribute("data-pre-approval-version")).toBe(false);
  });
});
