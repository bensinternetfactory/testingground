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
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

const mockPush = vi.fn();
const triggerMock = vi.fn();
let reduceMotion = false;

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("web-haptics/react", () => ({
  useWebHaptics: () => ({
    trigger: triggerMock,
  }),
}));

vi.mock("framer-motion", () => {
  function createMotionComponent(tagOrComponent: React.ElementType) {
    const MotionComponent = React.forwardRef(function MockMotionComponent(
      props: Record<string, unknown>,
      ref: React.ForwardedRef<unknown>,
    ) {
      const domProps = { ...props };

      delete domProps.animate;
      delete domProps.drag;
      delete domProps.dragConstraints;
      delete domProps.dragControls;
      delete domProps.dragElastic;
      delete domProps.dragListener;
      delete domProps.exit;
      delete domProps.initial;
      delete domProps.onAnimationComplete;
      delete domProps.transition;
      delete domProps.variants;
      delete domProps.whileTap;

      return React.createElement(tagOrComponent, { ...domProps, ref });
    });

    MotionComponent.displayName =
      typeof tagOrComponent === "string"
        ? `motion.${tagOrComponent}`
        : `motion.${tagOrComponent.displayName ?? tagOrComponent.name ?? "component"}`;

    return MotionComponent;
  }

  const motionTarget = {
    create: (component: React.ElementType) => createMotionComponent(component),
  };

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion: new Proxy(motionTarget, {
      get: (target, prop: string) => {
        if (prop in target) {
          return target[prop as keyof typeof target];
        }

        return createMotionComponent(prop);
      },
    }),
    useDragControls: () => ({ start: vi.fn() }),
    useReducedMotion: () => reduceMotion,
  };
});

vi.mock("@/features/pre-approval/drawer/runtime/scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
  updateScrollableRef: vi.fn(),
}));

import {
  DrawerStateProvider,
  useDrawer,
} from "@/features/pre-approval/drawer/runtime/context";
import { PreApprovalDrawerView } from "@/features/pre-approval/drawer/ui/PreApprovalDrawerView";

function setElementRect(element: HTMLElement) {
  Object.defineProperty(element, "getBoundingClientRect", {
    configurable: true,
    value: () => ({
      x: 10,
      y: 20,
      top: 20,
      left: 10,
      right: 110,
      bottom: 60,
      width: 100,
      height: 40,
      toJSON: () => "",
    }),
  });
}

function OpenButton() {
  const { open } = useDrawer();

  return (
    <button type="button" onClick={() => open()}>
      open-drawer
    </button>
  );
}

function TestHarness() {
  return (
    <DrawerStateProvider>
      <OpenButton />
      <PreApprovalDrawerView />
    </DrawerStateProvider>
  );
}

describe("PreApprovalDrawerView press feedback", () => {
  let portalRoot: HTMLDivElement;

  beforeEach(() => {
    reduceMotion = false;
    mockPush.mockReset();
    triggerMock.mockReset();

    portalRoot = document.createElement("div");
    portalRoot.id = "pre-approval-drawer-root";
    document.body.appendChild(portalRoot);

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
  });

  afterEach(() => {
    cleanup();
    portalRoot?.remove();
    vi.restoreAllMocks();
  });

  it("continues only on click after a touch sequence", async () => {
    render(<TestHarness />);

    fireEvent.click(screen.getByRole("button", { name: "open-drawer" }));

    const continueButton = screen.getByRole("button", {
      name: "Continue to Pre-Approval",
    });
    setElementRect(continueButton);

    fireEvent.touchStart(continueButton, {
      touches: [{ clientX: 28, clientY: 42 }],
    });
    fireEvent.touchEnd(continueButton, {
      changedTouches: [{ clientX: 28, clientY: 42 }],
    });

    expect(mockPush).not.toHaveBeenCalled();
    expect(triggerMock).not.toHaveBeenCalled();
    expect(continueButton.querySelector("span[aria-hidden='true']")).toBeNull();

    fireEvent.click(continueButton, {
      detail: 1,
      clientX: 28,
      clientY: 42,
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/pre-approval?amount=100000");
    });
    expect(triggerMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(
        screen
          .getByRole("button", { name: "Continue to Pre-Approval" })
          .querySelector("span[aria-hidden='true']"),
      ).not.toBeNull();
    });
  });

  it("suppresses the next click after touch drift on the continue button", async () => {
    render(<TestHarness />);

    fireEvent.click(screen.getByRole("button", { name: "open-drawer" }));

    const continueButton = screen.getByRole("button", {
      name: "Continue to Pre-Approval",
    });
    setElementRect(continueButton);

    fireEvent.touchStart(continueButton, {
      touches: [{ clientX: 20, clientY: 20 }],
    });
    fireEvent.touchEnd(continueButton, {
      changedTouches: [{ clientX: 40, clientY: 20 }],
    });
    fireEvent.click(continueButton, {
      detail: 1,
      clientX: 40,
      clientY: 20,
    });

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
    expect(triggerMock).not.toHaveBeenCalled();
    expect(continueButton.querySelector("span[aria-hidden='true']")).toBeNull();
  });

  it("suppresses duplicate quick commits on the continue button", async () => {
    vi.spyOn(Date, "now")
      .mockReturnValueOnce(1_000)
      .mockReturnValueOnce(1_100);

    render(<TestHarness />);

    fireEvent.click(screen.getByRole("button", { name: "open-drawer" }));

    const continueButton = screen.getByRole("button", {
      name: "Continue to Pre-Approval",
    });
    setElementRect(continueButton);

    fireEvent.click(continueButton, {
      detail: 1,
      clientX: 24,
      clientY: 32,
    });
    fireEvent.click(continueButton, {
      detail: 1,
      clientX: 30,
      clientY: 32,
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1);
    });
    expect(triggerMock).toHaveBeenCalledTimes(1);
  });

  it("keeps continue semantics under reduced motion without rendering a ripple", async () => {
    reduceMotion = true;

    render(<TestHarness />);

    fireEvent.click(screen.getByRole("button", { name: "open-drawer" }));

    const continueButton = screen.getByRole("button", {
      name: "Continue to Pre-Approval",
    });
    setElementRect(continueButton);

    fireEvent.click(continueButton, {
      detail: 1,
      clientX: 18,
      clientY: 26,
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/pre-approval?amount=100000");
    });
    expect(triggerMock).toHaveBeenCalledWith(
      [{ duration: 35 }],
      expect.objectContaining({ intensity: 0.4 }),
    );
    expect(continueButton.querySelector("span[aria-hidden='true']")).toBeNull();
  });

  it("keeps keyboard activation semantic for the continue button path", async () => {
    render(<TestHarness />);

    fireEvent.click(screen.getByRole("button", { name: "open-drawer" }));

    const continueButton = screen.getByRole("button", {
      name: "Continue to Pre-Approval",
    });
    setElementRect(continueButton);

    fireEvent.keyDown(continueButton, { key: " " });

    expect(mockPush).not.toHaveBeenCalled();
    expect(triggerMock).not.toHaveBeenCalled();
    expect(continueButton.querySelector("span[aria-hidden='true']")).toBeNull();

    fireEvent.click(continueButton, {
      detail: 0,
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/pre-approval?amount=100000");
    });
    expect(triggerMock).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(
        screen
          .getByRole("button", { name: "Continue to Pre-Approval" })
          .querySelector("span[aria-hidden='true']"),
      ).not.toBeNull();
    });
  });
});
