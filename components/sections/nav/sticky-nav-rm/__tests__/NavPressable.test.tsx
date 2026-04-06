// @vitest-environment happy-dom
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

const triggerMock = vi.fn();
let reduceMotion = false;

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
    motion: new Proxy(motionTarget, {
      get: (target, prop: string) => {
        if (prop in target) {
          return target[prop as keyof typeof target];
        }

        return createMotionComponent(prop);
      },
    }),
    useReducedMotion: () => reduceMotion,
  };
});

import { NavPressable } from "../NavPressable";

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

describe("NavPressable", () => {
  beforeEach(() => {
    reduceMotion = false;
    triggerMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("commits on click instead of touch-down for button pressables", async () => {
    const onPress = vi.fn();

    render(
      <NavPressable
        onPress={onPress}
        ariaLabel="Open menu"
        className="h-10 w-10"
      >
        Menu
      </NavPressable>,
    );

    const button = screen.getByRole("button", { name: "Open menu" });
    setElementRect(button);

    fireEvent.touchStart(button, {
      touches: [{ clientX: 28, clientY: 42 }],
    });
    fireEvent.touchEnd(button, {
      changedTouches: [{ clientX: 28, clientY: 42 }],
    });

    expect(onPress).not.toHaveBeenCalled();
    expect(triggerMock).not.toHaveBeenCalled();
    expect(button.querySelector("span[aria-hidden='true']")).toBeNull();

    fireEvent.click(button, {
      detail: 1,
      clientX: 28,
      clientY: 42,
    });

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(triggerMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(
        screen
          .getByRole("button", { name: "Open menu" })
          .querySelector("span[aria-hidden='true']"),
      ).not.toBeNull();
    });
  });

  it("suppresses the next click after touch drift exceeds the swipe threshold", () => {
    const onPress = vi.fn();

    render(
      <NavPressable
        onPress={onPress}
        ariaLabel="Open menu"
        className="h-10 w-10"
      >
        Menu
      </NavPressable>,
    );

    const button = screen.getByRole("button", { name: "Open menu" });
    setElementRect(button);

    fireEvent.touchStart(button, {
      touches: [{ clientX: 20, clientY: 20 }],
    });
    fireEvent.touchEnd(button, {
      changedTouches: [{ clientX: 40, clientY: 20 }],
    });
    fireEvent.click(button, {
      detail: 1,
      clientX: 40,
      clientY: 20,
    });

    expect(onPress).not.toHaveBeenCalled();
    expect(triggerMock).not.toHaveBeenCalled();
    expect(button.querySelector("span[aria-hidden='true']")).toBeNull();
  });

  it("keeps commit semantics under reduced motion without rendering a ripple", () => {
    reduceMotion = true;
    const onPress = vi.fn();

    render(
      <NavPressable
        onPress={onPress}
        ariaLabel="Open menu"
        className="h-10 w-10"
      >
        Menu
      </NavPressable>,
    );

    const button = screen.getByRole("button", { name: "Open menu" });
    setElementRect(button);

    fireEvent.click(button, {
      detail: 1,
      clientX: 18,
      clientY: 26,
    });

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(triggerMock).toHaveBeenCalledWith(
      [{ duration: 35 }],
      expect.objectContaining({ intensity: 0.4 }),
    );
    expect(button.querySelector("span[aria-hidden='true']")).toBeNull();
  });
});
