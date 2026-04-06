// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { buildPreApprovalHref } from "@/features/pre-approval/routes";
import { HeroInput } from "../HeroInput";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

afterEach(() => {
  cleanup();
  mockPush.mockReset();
});

describe("HeroInput", () => {
  it("pushes the canonical pre-approval route contract href on submit", async () => {
    const user = userEvent.setup();

    render(
      <HeroInput
        placeholder="How much do you need?"
        ctaLabel="Get Pre-Approved"
        submitHref="/pre-approval"
      />,
    );

    await user.type(screen.getByLabelText("How much do you need?"), "155000");
    await user.click(screen.getByRole("button", { name: "Get Pre-Approved" }));

    expect(mockPush).toHaveBeenCalledWith(
      buildPreApprovalHref({ amount: "155000" }),
    );
  });

  it("prefers onSubmit over router navigation", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <HeroInput
        placeholder="How much do you need?"
        ctaLabel="Get Pre-Approved"
        submitHref="/pre-approval"
        onSubmit={onSubmit}
      />,
    );

    await user.type(screen.getByLabelText("How much do you need?"), "155000");
    await user.click(screen.getByRole("button", { name: "Get Pre-Approved" }));

    expect(onSubmit).toHaveBeenCalledWith("155000");
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("does not navigate when the amount is empty", async () => {
    const user = userEvent.setup();

    render(
      <HeroInput
        placeholder="How much do you need?"
        ctaLabel="Get Pre-Approved"
        submitHref="/pre-approval"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Get Pre-Approved" }));

    expect(mockPush).not.toHaveBeenCalled();
  });
});
