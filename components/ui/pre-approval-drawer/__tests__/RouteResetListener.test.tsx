// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DrawerStateProvider, useDrawer } from "../DrawerContext";
import { RouteResetListener } from "../RouteResetListener";
import type { PreApprovalEvent } from "@/features/pre-approval/contract";
import {
  DRAWER_DEFAULT_TITLE,
  DRAWER_HASH,
  SLIDER_DEFAULT,
} from "../config";

// Mock next/navigation
let mockPathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

vi.mock("../scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
  updateScrollableRef: vi.fn(),
}));

function RouteSyncHarness() {
  const {
    amount,
    heroTruckType,
    isOpen,
    open,
    origin,
    reset,
    setAmount,
    source,
    title,
  } = useDrawer();

  return (
    <>
      <RouteResetListener open={open} reset={reset} />
      <span data-testid="isOpen">{String(isOpen)}</span>
      <span data-testid="title">{title}</span>
      <span data-testid="amount">{amount}</span>
      <span data-testid="originPageId">{origin.pageId}</span>
      <span data-testid="originSectionId">{origin.sectionId}</span>
      <span data-testid="originCtaId">{origin.ctaId}</span>
      <span data-testid="source">{source}</span>
      <span data-testid="heroTruckType">{heroTruckType ?? "none"}</span>
      <button
        onClick={() =>
          open({
            source: "hero",
            title: "Custom Title",
            truckType: "wrecker",
          })
        }
      >
        open-hero
      </button>
      <button onClick={() => setAmount(250_000)}>set-amount</button>
    </>
  );
}

function renderWithProvider(onEvent?: (event: PreApprovalEvent) => void) {
  return render(
    <DrawerStateProvider onEvent={onEvent}>
      <RouteSyncHarness />
    </DrawerStateProvider>,
  );
}

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

    expect(open).toHaveBeenCalledWith({
      schema: "hash",
      trigger: {
        origin: {
          ctaId: "direct-url",
          pageId: "rollback-financing",
          placement: "inline",
          sectionId: "hash-entry",
        },
      },
    });
    expect(reset).not.toHaveBeenCalled();
  });

  it("reopens with a fresh default session when a new pathname keeps the drawer hash", async () => {
    const user = userEvent.setup();
    const { rerender } = renderWithProvider();

    await user.click(screen.getByText("open-hero"));
    await user.click(screen.getByText("set-amount"));

    expect(screen.getByTestId("isOpen")).toHaveTextContent("true");
    expect(screen.getByTestId("title")).toHaveTextContent("Custom Title");
    expect(screen.getByTestId("amount")).toHaveTextContent("250000");
    expect(screen.getByTestId("source")).toHaveTextContent("hero");
    expect(screen.getByTestId("heroTruckType")).toHaveTextContent("wrecker");

    window.location.hash = DRAWER_HASH;
    mockPathname = "/rollback-financing";
    rerender(
      <DrawerStateProvider>
        <RouteSyncHarness />
      </DrawerStateProvider>,
    );

    expect(screen.getByTestId("isOpen")).toHaveTextContent("true");
    expect(screen.getByTestId("title")).toHaveTextContent(DRAWER_DEFAULT_TITLE);
    expect(screen.getByTestId("amount")).toHaveTextContent(String(SLIDER_DEFAULT));
    expect(screen.getByTestId("originPageId")).toHaveTextContent(
      "rollback-financing",
    );
    expect(screen.getByTestId("originSectionId")).toHaveTextContent(
      "hash-entry",
    );
    expect(screen.getByTestId("originCtaId")).toHaveTextContent("direct-url");
    expect(screen.getByTestId("source")).toHaveTextContent("standard");
    expect(screen.getByTestId("heroTruckType")).toHaveTextContent("none");
  });

  it("resets to the closed defaults when a new pathname drops the drawer hash", async () => {
    const user = userEvent.setup();
    const { rerender } = renderWithProvider();

    await user.click(screen.getByText("open-hero"));
    await user.click(screen.getByText("set-amount"));

    mockPathname = "/rollback-financing";
    rerender(
      <DrawerStateProvider>
        <RouteSyncHarness />
      </DrawerStateProvider>,
    );

    expect(screen.getByTestId("isOpen")).toHaveTextContent("false");
    expect(screen.getByTestId("title")).toHaveTextContent(DRAWER_DEFAULT_TITLE);
    expect(screen.getByTestId("amount")).toHaveTextContent(String(SLIDER_DEFAULT));
    expect(screen.getByTestId("originPageId")).toHaveTextContent("unknown-page");
    expect(screen.getByTestId("originSectionId")).toHaveTextContent(
      "legacy-section",
    );
    expect(screen.getByTestId("originCtaId")).toHaveTextContent("legacy-cta");
    expect(screen.getByTestId("source")).toHaveTextContent("standard");
    expect(screen.getByTestId("heroTruckType")).toHaveTextContent("none");
  });

  it("records the route-change close reason when route sync resets an open session", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    const { rerender } = renderWithProvider(onEvent);

    await user.click(screen.getByText("open-hero"));

    mockPathname = "/rollback-financing";
    rerender(
      <DrawerStateProvider onEvent={onEvent}>
        <RouteSyncHarness />
      </DrawerStateProvider>,
    );

    expect(onEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        reason: "route-change",
        type: "drawer_closed",
      }),
    );
  });
});
