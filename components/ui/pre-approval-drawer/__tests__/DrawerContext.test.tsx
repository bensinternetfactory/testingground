// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DrawerStateProvider, useDrawer } from "../DrawerContext";
import { SLIDER_DEFAULT, DRAWER_DEFAULT_TITLE } from "../config";

// Spy on scroll-lock to verify timing
vi.mock("../scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
  updateScrollableRef: vi.fn(),
}));

import { lockBodyScroll } from "../scroll-lock";

afterEach(cleanup);

// Test consumer that exposes context state and provides action buttons
function TestConsumer() {
  const { isOpen, title, amount, source, heroTruckType, open, close, reset, setAmount } =
    useDrawer();

  return (
    <div>
      <span data-testid="isOpen">{String(isOpen)}</span>
      <span data-testid="title">{title}</span>
      <span data-testid="amount">{amount}</span>
      <span data-testid="source">{source}</span>
      <span data-testid="heroTruckType">{heroTruckType ?? "none"}</span>
      <button onClick={() => open()}>open-default</button>
      <button onClick={() => open({ source: "hero", title: "Custom Title", truckType: "wrecker" })}>
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
    expect(screen.getByTestId("amount")).toHaveTextContent(String(SLIDER_DEFAULT));
  });

  it("open() sets isOpen true with default session", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText("open-default"));

    expect(screen.getByTestId("isOpen")).toHaveTextContent("true");
    expect(screen.getByTestId("title")).toHaveTextContent(DRAWER_DEFAULT_TITLE);
    expect(screen.getByTestId("source")).toHaveTextContent("standard");
  });

  it("open(trigger) applies custom title, source, heroTruckType", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText("open-hero"));

    expect(screen.getByTestId("isOpen")).toHaveTextContent("true");
    expect(screen.getByTestId("title")).toHaveTextContent("Custom Title");
    expect(screen.getByTestId("source")).toHaveTextContent("hero");
    expect(screen.getByTestId("heroTruckType")).toHaveTextContent("wrecker");
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
    expect(screen.getByTestId("amount")).toHaveTextContent(String(SLIDER_DEFAULT));
    expect(screen.getByTestId("source")).toHaveTextContent("standard");
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
