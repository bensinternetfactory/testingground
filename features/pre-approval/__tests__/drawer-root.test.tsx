// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  PreApprovalDrawerRoot,
  useOpenPreApproval,
  usePreApprovalSession,
} from "@/features/pre-approval/drawer/client";

vi.mock("@/components/ui/pre-approval-drawer/DrawerHashListener", () => ({
  DrawerHashListener: () => null,
}));

vi.mock("@/components/ui/pre-approval-drawer/PreApprovalDrawer", () => ({
  PreApprovalDrawer: () => null,
}));

vi.mock("@/components/ui/pre-approval-drawer/RouteResetListener", () => ({
  RouteResetListener: () => null,
}));

vi.mock("@/components/ui/pre-approval-drawer/scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
  updateScrollableRef: vi.fn(),
}));

afterEach(cleanup);

function SessionHarness() {
  const open = useOpenPreApproval();
  const { amount, close, isOpen, origin, setAmount, title, truckType } =
    usePreApprovalSession();

  return (
    <div>
      <span data-testid="isOpen">{String(isOpen)}</span>
      <span data-testid="amount">{amount}</span>
      <span data-testid="title">{title}</span>
      <span data-testid="originCtaId">{origin?.ctaId ?? "none"}</span>
      <span data-testid="truckType">{truckType ?? "none"}</span>
      <button
        onClick={() =>
          open({
            origin: {
              ctaId: "standard-inline",
              pageId: "rollback-financing",
              placement: "inline",
              sectionId: "faq",
            },
          })
        }
      >
        open-standard
      </button>
      <button
        onClick={() =>
          open({
            drawer: {
              title: "How much is the truck you found?",
            },
            handoff: {
              truckType: "heavy-wrecker",
            },
            origin: {
              ctaId: "hero-main",
              pageId: "rollback-financing",
              placement: "hero",
              sectionId: "hero-primary",
            },
          })
        }
      >
        open-hero
      </button>
      <button onClick={() => setAmount(155_000)}>set-amount</button>
      <button onClick={() => close()}>close</button>
    </div>
  );
}

describe("PreApprovalDrawerRoot", () => {
  it("creates a fresh sessionId for every open and replaces an open session instead of merging it", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();

    render(
      <PreApprovalDrawerRoot onEvent={onEvent}>
        <SessionHarness />
      </PreApprovalDrawerRoot>,
    );

    await user.click(screen.getByText("open-standard"));
    await user.click(screen.getByText("set-amount"));
    await user.click(screen.getByText("open-hero"));

    const openedEvents = onEvent.mock.calls
      .map(([event]) => event)
      .filter((event) => event.type === "drawer_opened");

    expect(openedEvents).toHaveLength(2);
    expect(openedEvents[0].sessionId).not.toBe(openedEvents[1].sessionId);
    expect(screen.getByTestId("isOpen")).toHaveTextContent("true");
    expect(screen.getByTestId("amount")).toHaveTextContent("100000");
    expect(screen.getByTestId("title")).toHaveTextContent(
      "How much is the truck you found?",
    );
    expect(screen.getByTestId("originCtaId")).toHaveTextContent("hero-main");
    expect(screen.getByTestId("truckType")).toHaveTextContent(
      "heavy-wrecker",
    );
  });

  it("records programmatic close reasons and emits the documented event payload shape", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();

    render(
      <PreApprovalDrawerRoot onEvent={onEvent}>
        <SessionHarness />
      </PreApprovalDrawerRoot>,
    );

    await user.click(screen.getByText("open-hero"));
    await user.click(screen.getByText("set-amount"));
    await user.click(screen.getByText("close"));

    expect(onEvent).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        amount: 100000,
        origin: {
          ctaId: "hero-main",
          pageId: "rollback-financing",
          placement: "hero",
          sectionId: "hero-primary",
        },
        title: "How much is the truck you found?",
        truckType: "heavy-wrecker",
        type: "drawer_opened",
      }),
    );

    expect(onEvent).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        amount: 155000,
        origin: {
          ctaId: "hero-main",
          pageId: "rollback-financing",
          placement: "hero",
          sectionId: "hero-primary",
        },
        truckType: "heavy-wrecker",
        type: "amount_changed",
      }),
    );

    expect(onEvent).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        amount: 155000,
        origin: {
          ctaId: "hero-main",
          pageId: "rollback-financing",
          placement: "hero",
          sectionId: "hero-primary",
        },
        reason: "programmatic",
        truckType: "heavy-wrecker",
        type: "drawer_closed",
      }),
    );

    const openedSessionId = onEvent.mock.calls[0]?.[0]?.sessionId;
    const closedSessionId = onEvent.mock.calls[2]?.[0]?.sessionId;
    expect(closedSessionId).toBe(openedSessionId);
  });

  it("isolates onEvent failures so the drawer session still updates", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <PreApprovalDrawerRoot
        onEvent={() => {
          throw new Error("analytics failed");
        }}
      >
        <SessionHarness />
      </PreApprovalDrawerRoot>,
    );

    await user.click(screen.getByText("open-standard"));
    await user.click(screen.getByText("set-amount"));

    expect(screen.getByTestId("isOpen")).toHaveTextContent("true");
    expect(screen.getByTestId("amount")).toHaveTextContent("155000");
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
