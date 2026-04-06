// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

vi.mock("@/features/pre-approval/drawer/runtime/hash-listener", () => ({
  DrawerHashListener: () => {
    throw new Error("drawer hash listener crashed");
  },
}));

vi.mock("@/features/pre-approval/drawer/ui/PreApprovalDrawerView", () => ({
  PreApprovalDrawerView: () => null,
}));

vi.mock("@/features/pre-approval/drawer/runtime/route-sync", () => ({
  RouteResetListener: () => null,
}));

vi.mock("@/features/pre-approval/drawer/runtime/scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
  updateScrollableRef: vi.fn(),
}));

import { PreApprovalDrawerRoot } from "@/features/pre-approval/drawer/client";

afterEach(cleanup);

describe("PreApprovalDrawerRoot runtime boundary", () => {
  it("keeps the marketing page shell rendered when the internal runtime throws", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <PreApprovalDrawerRoot>
        <div>marketing shell</div>
      </PreApprovalDrawerRoot>,
    );

    expect(screen.getByText("marketing shell")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
