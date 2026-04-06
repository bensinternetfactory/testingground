// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  preApprovalDefaultAmount,
  preApprovalDefaultTitle,
} from "@/features/pre-approval/contract";
import {
  DrawerStateProvider,
  useDrawer,
} from "@/features/pre-approval/drawer/runtime/context";

// Spy on scroll-lock to verify timing
vi.mock("@/features/pre-approval/drawer/runtime/scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
  updateScrollableRef: vi.fn(),
}));

import { lockBodyScroll } from "@/features/pre-approval/drawer/runtime/scroll-lock";

afterEach(cleanup);

// Test consumer that exposes context state and provides action buttons
function TestConsumer() {
  const { isOpen, title, amount, origin, truckType, open, close, reset, setAmount } =
    useDrawer();

  return (
    <div>
      <span data-testid="isOpen">{String(isOpen)}</span>
      <span data-testid="title">{title}</span>
      <span data-testid="amount">{amount}</span>
      <span data-testid="originPageId">{origin.pageId}</span>
      <span data-testid="originSectionId">{origin.sectionId}</span>
      <span data-testid="originCtaId">{origin.ctaId}</span>
      <span data-testid="truckType">{truckType ?? "none"}</span>
      <button onClick={() => open()}>open-default</button>
      <button
        onClick={() =>
          open({
            origin: {
              pageId: "wrecker-financing",
              sectionId: "hero-primary",
              ctaId: "hero-main-cta",
              placement: "hero",
            },
            drawer: { title: "Custom Title" },
            handoff: { truckType: "wrecker" },
          })
        }
      >
        open-hero
      </button>
      <button onClick={() => close()}>close</button>
      <button onClick={() => reset()}>reset</button>
      <button onClick={() => setAmount(250_000)}>set-amount</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <DrawerStateProvider>
      <TestConsumer />
    </DrawerStateProvider>,
  );
}

describe("DrawerStateProvider", () => {
  it("starts closed with default state", () => {
    renderWithProvider();

    expect(screen.getByTestId("isOpen")).toHaveTextContent("false");
    expect(screen.getByTestId("amount")).toHaveTextContent(
      String(preApprovalDefaultAmount),
    );
  });

  it("open() sets isOpen true with default session", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText("open-default"));

    expect(screen.getByTestId("isOpen")).toHaveTextContent("true");
    expect(screen.getByTestId("title")).toHaveTextContent(preApprovalDefaultTitle);
    expect(screen.getByTestId("originSectionId")).toHaveTextContent("hash-entry");
  });

  it("open(trigger) applies custom title, origin, and truckType", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText("open-hero"));

    expect(screen.getByTestId("isOpen")).toHaveTextContent("true");
    expect(screen.getByTestId("title")).toHaveTextContent("Custom Title");
    expect(screen.getByTestId("originPageId")).toHaveTextContent(
      "wrecker-financing",
    );
    expect(screen.getByTestId("truckType")).toHaveTextContent("wrecker");
  });

  it("close() sets isOpen false but preserves other state", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText("open-hero"));
    await user.click(screen.getByText("set-amount"));
    await user.click(screen.getByText("close"));

    expect(screen.getByTestId("isOpen")).toHaveTextContent("false");
    expect(screen.getByTestId("amount")).toHaveTextContent("250000");
    expect(screen.getByTestId("title")).toHaveTextContent("Custom Title");
  });

  it("reset() returns all state to closed defaults", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText("open-hero"));
    await user.click(screen.getByText("set-amount"));
    await user.click(screen.getByText("reset"));

    expect(screen.getByTestId("isOpen")).toHaveTextContent("false");
    expect(screen.getByTestId("amount")).toHaveTextContent(
      String(preApprovalDefaultAmount),
    );
    expect(screen.getByTestId("originSectionId")).toHaveTextContent("hash-entry");
  });

  it("setAmount() updates amount without changing other state", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText("open-default"));
    await user.click(screen.getByText("set-amount"));

    expect(screen.getByTestId("amount")).toHaveTextContent("250000");
    expect(screen.getByTestId("isOpen")).toHaveTextContent("true");
  });

  it("open() calls lockBodyScroll synchronously", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText("open-default"));

    expect(lockBodyScroll).toHaveBeenCalledWith(null);
  });
});

describe("useDrawer", () => {
  it("throws when used outside DrawerStateProvider", () => {
    // Suppress React error boundary console output
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestConsumer />)).toThrow(
      "useDrawer must be used within a <DrawerStateProvider>",
    );

    consoleSpy.mockRestore();
  });
});
