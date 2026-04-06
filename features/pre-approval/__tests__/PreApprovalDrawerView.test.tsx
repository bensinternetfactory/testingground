// @vitest-environment happy-dom
import * as React from "react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { act, render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ── Mocks ─────────────────────────────────────────────────────────────

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/",
}));

vi.mock("@/lib/press-feedback", () => ({
  PressFeedbackRipple: () => null,
  tapSpring: { type: "spring", stiffness: 600, damping: 30 },
  usePressFeedback: ({ onPress }: { onPress: () => void }) => ({
    clearRipple: vi.fn(),
    handlers: { onClick: onPress },
    ripple: null,
    shouldReduceMotion: false,
  }),
}));

// Track onExitComplete so tests can trigger it
let capturedOnExitComplete: (() => void) | null = null;
let capturedSheetDragEnd:
  | ((_: unknown, info: PanInfoLike) => void)
  | null = null;

interface PanInfoLike {
  offset: { y: number };
  velocity: { y: number };
}

vi.mock("framer-motion", () => {
  function createMotionComponent(tag: string) {
    const MotionComponent = React.forwardRef(function MockMotionComponent(
      props: Record<string, unknown>,
      ref: React.ForwardedRef<unknown>,
    ) {
      const {
        variants,
        initial,
        animate,
        exit,
        transition,
        whileTap,
        drag,
        dragControls,
        dragConstraints,
        dragElastic,
        dragListener,
        onDragEnd,
        ...domProps
      } = props;

      if (
        tag === "div" &&
        domProps.role === "dialog" &&
        typeof onDragEnd === "function"
      ) {
        capturedSheetDragEnd = onDragEnd as (_: unknown, info: PanInfoLike) => void;
      }

      return React.createElement(tag, { ...domProps, ref });
    });

    MotionComponent.displayName = `motion.${tag}`;
    return MotionComponent;
  }

  const motion = new Proxy(
    {},
    { get: (_: object, tag: string) => createMotionComponent(tag) },
  );

  function AnimatePresence({
    children,
    onExitComplete,
  }: {
    children: React.ReactNode;
    onExitComplete?: () => void;
  }) {
    // Capture the callback so tests can invoke it
    capturedOnExitComplete = onExitComplete ?? null;
    return children;
  }

  return {
    motion,
    AnimatePresence,
    useDragControls: () => ({ start: vi.fn() }),
    useReducedMotion: () => false,
  };
});

// Mock scroll-lock
vi.mock("@/features/pre-approval/drawer/runtime/scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
  updateScrollableRef: vi.fn(),
}));

import {
  DrawerStateProvider,
  useDrawer,
} from "@/features/pre-approval/drawer/runtime/context";
import { unlockBodyScroll } from "@/features/pre-approval/drawer/runtime/scroll-lock";
import type { PreApprovalEvent } from "@/features/pre-approval/contract";
import { PreApprovalDrawerView } from "@/features/pre-approval/drawer/ui/PreApprovalDrawerView";

// ── Test Helpers ──────────────────────────────────────────────────────

function OpenButton() {
  const { open, setAmount } = useDrawer();
  return (
    <>
      <button onClick={() => open()}>open-drawer</button>
      <button
        onClick={() =>
          open({
            origin: {
              pageId: "wrecker-financing",
              sectionId: "hero-primary",
              ctaId: "hero-main-cta",
              placement: "hero",
            },
            drawer: {
              title: "How much is the truck you found?",
            },
            handoff: {
              truckType: "heavy-wrecker",
            },
          })
        }
      >
        open-hero-drawer
      </button>
      <button onClick={() => setAmount(155_000)}>set-amount-155000</button>
    </>
  );
}

function TestHarness({
  children,
  onEvent,
}: {
  children?: React.ReactNode;
  onEvent?: (event: PreApprovalEvent) => void;
}) {
  return (
    <DrawerStateProvider onEvent={onEvent}>
      <OpenButton />
      <PreApprovalDrawerView />
      {children}
    </DrawerStateProvider>
  );
}

let portalRoot: HTMLDivElement;

beforeEach(() => {
  portalRoot = document.createElement("div");
  portalRoot.id = "pre-approval-drawer-root";
  document.body.appendChild(portalRoot);

  // Mock matchMedia for useIsDesktop — default to desktop
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === "(min-width: 768px)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      media: query,
      onchange: null,
      dispatchEvent: vi.fn(),
    })),
  });

  capturedOnExitComplete = null;
  capturedSheetDragEnd = null;
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
  portalRoot?.remove();
});

// ── Tests ─────────────────────────────────────────────────────────────

describe("PreApprovalDrawerView", () => {
  it("does not render a dialog when closed", () => {
    render(<TestHarness />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a dialog with aria-modal when open", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText("open-drawer"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("renders inside the portal root", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText("open-drawer"));

    const dialog = screen.getByRole("dialog");
    expect(portalRoot.contains(dialog)).toBe(true);
  });

  it("has aria-labelledby pointing to the title", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText("open-drawer"));

    const dialog = screen.getByRole("dialog");
    const labelledBy = dialog.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();

    const title = document.getElementById(labelledBy!);
    expect(title).toBeInTheDocument();
    expect(title?.tagName).toBe("H2");
  });

  it("has aria-describedby pointing to the description", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText("open-drawer"));

    const dialog = screen.getByRole("dialog");
    const describedBy = dialog.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const description = document.getElementById(describedBy!);
    expect(description).toBeInTheDocument();
    expect(description?.textContent).toContain("No credit check");
  });

  it("closes on backdrop click", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    render(<TestHarness onEvent={onEvent} />);

    await user.click(screen.getByText("open-drawer"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // The backdrop is the div with aria-hidden="true" and bg-black/35
    const backdrop = portalRoot.querySelector("[aria-hidden='true']") as HTMLElement;
    expect(backdrop).toBeTruthy();

    await user.click(backdrop);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        reason: "backdrop",
        type: "drawer_closed",
      }),
    );
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    render(<TestHarness onEvent={onEvent} />);

    await user.click(screen.getByText("open-drawer"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        reason: "escape",
        type: "drawer_closed",
      }),
    );
  });

  it("closes on close button click (desktop)", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    render(<TestHarness onEvent={onEvent} />);

    await user.click(screen.getByText("open-drawer"));

    const closeButton = screen.getByLabelText("Close");
    await user.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        reason: "close-button",
        type: "drawer_closed",
      }),
    );
  });

  it("closes on drag dismiss (mobile) and records the drag-dismiss reason", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        media: query,
        onchange: null,
        dispatchEvent: vi.fn(),
      })),
    });

    render(<TestHarness onEvent={onEvent} />);

    await user.click(screen.getByText("open-drawer"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(capturedSheetDragEnd).toBeTruthy();

    act(() => {
      capturedSheetDragEnd?.(
        {},
        {
          offset: { y: 140 },
          velocity: { y: 640 },
        },
      );
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        reason: "drag-dismiss",
        type: "drawer_closed",
      }),
    );
  });

  it("navigates with the baseline amount-only continue href", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText("open-drawer"));
    await user.click(screen.getByText("set-amount-155000"));

    const continueBtn = screen.getByText("Continue to Pre-Approval");
    await user.click(continueBtn);

    expect(mockPush).toHaveBeenCalledWith("/pre-approval?amount=155000");
  });

  it("preserves the hero trucktype in the continue href", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText("open-hero-drawer"));
    await user.click(screen.getByText("set-amount-155000"));
    await user.click(screen.getByText("Continue to Pre-Approval"));

    expect(mockPush).toHaveBeenCalledWith(
      "/pre-approval?amount=155000&trucktype=heavy-wrecker",
    );
  });

  it("calls unlockBodyScroll on Continue (no close animation)", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    render(<TestHarness onEvent={onEvent} />);

    await user.click(screen.getByText("open-drawer"));
    await user.click(screen.getByText("Continue to Pre-Approval"));

    expect(unlockBodyScroll).toHaveBeenCalled();
    expect(onEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        href: "/pre-approval?amount=100000",
        type: "drawer_continued",
      }),
    );
  });

  it("calls unlockBodyScroll on unmount (safety net)", () => {
    const { unmount } = render(<TestHarness />);
    unmount();

    expect(unlockBodyScroll).toHaveBeenCalled();
  });

  it("passes onExitComplete=unlockBodyScroll to AnimatePresence", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText("open-drawer"));

    // Our mock captures the onExitComplete callback
    expect(capturedOnExitComplete).toBe(unlockBodyScroll);
  });
});

describe("focus management", () => {
  it("moves focus to the dialog on open", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<TestHarness />);
    await user.click(screen.getByText("open-drawer"));

    // Flush the requestAnimationFrame that focuses the dialog
    vi.advanceTimersByTime(16);

    const dialog = screen.getByRole("dialog");
    expect(document.activeElement).toBe(dialog);

    vi.useRealTimers();
  });

  it("traps Tab at the end of focusable elements", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<TestHarness />);
    await user.click(screen.getByText("open-drawer"));
    vi.advanceTimersByTime(16);

    // Get all focusable elements in the dialog
    const dialog = screen.getByRole("dialog");
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    expect(focusables.length).toBeGreaterThan(0);

    // Focus the last element
    const last = focusables[focusables.length - 1];
    last.focus();
    expect(document.activeElement).toBe(last);

    // Tab should wrap to the first
    await user.tab();
    expect(document.activeElement).toBe(focusables[0]);

    vi.useRealTimers();
  });

  it("traps Shift+Tab at the start of focusable elements", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<TestHarness />);
    await user.click(screen.getByText("open-drawer"));
    vi.advanceTimersByTime(16);

    const dialog = screen.getByRole("dialog");
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    // Focus the first element
    focusables[0].focus();
    expect(document.activeElement).toBe(focusables[0]);

    // Shift+Tab should wrap to the last
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(focusables[focusables.length - 1]);

    vi.useRealTimers();
  });

  it("restores focus to the trigger element on close", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<TestHarness />);

    const openBtn = screen.getByText("open-drawer");
    await user.click(openBtn);
    vi.advanceTimersByTime(16);

    await user.keyboard("{Escape}");

    // Focus should return to the button that triggered the open
    expect(document.activeElement).toBe(openBtn);

    vi.useRealTimers();
  });
});
