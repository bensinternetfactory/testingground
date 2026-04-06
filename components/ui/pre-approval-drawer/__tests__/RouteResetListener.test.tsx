// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { RouteResetListener } from "../RouteResetListener";
import { DRAWER_HASH } from "../config";

// Mock next/navigation
let mockPathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

afterEach(() => {
  cleanup();
  mockPathname = "/";
  window.location.hash = "";
});

describe("RouteResetListener", () => {
  it("does nothing on initial render (same pathname)", () => {
    const open = vi.fn();
    const reset = vi.fn();

    render(<RouteResetListener open={open} reset={reset} />);

    expect(open).not.toHaveBeenCalled();
    expect(reset).not.toHaveBeenCalled();
  });

  it("calls reset() when pathname changes without drawer hash", () => {
    const open = vi.fn();
    const reset = vi.fn();

    const { rerender } = render(<RouteResetListener open={open} reset={reset} />);

    mockPathname = "/rollback-financing";
    rerender(<RouteResetListener open={open} reset={reset} />);

    expect(reset).toHaveBeenCalledTimes(1);
    expect(open).not.toHaveBeenCalled();
  });

  it("calls open() when pathname changes with drawer hash present", () => {
    const open = vi.fn();
    const reset = vi.fn();

    const { rerender } = render(<RouteResetListener open={open} reset={reset} />);

    window.location.hash = DRAWER_HASH;
    mockPathname = "/rollback-financing";
    rerender(<RouteResetListener open={open} reset={reset} />);

    expect(open).toHaveBeenCalledTimes(1);
    expect(reset).not.toHaveBeenCalled();
  });
});
