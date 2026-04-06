// @vitest-environment happy-dom
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const triggerMock = vi.fn();
let reduceMotion = false;

vi.mock("web-haptics/react", () => ({
  useWebHaptics: () => ({
    trigger: triggerMock,
  }),
}));

vi.mock("framer-motion", () => {
  function createMotionComponent(tag: string) {
    const MotionComponent = React.forwardRef(function MockMotionComponent(
      props: Record<string, unknown>,
      ref: React.ForwardedRef<unknown>,
    ) {
      const domProps = { ...props };

      delete domProps.animate;
      delete domProps.exit;
      delete domProps.initial;
      delete domProps.onAnimationComplete;
      delete domProps.transition;
      delete domProps.variants;
      delete domProps.whileTap;

      return React.createElement(tag, { ...domProps, ref });
    });

    MotionComponent.displayName = `motion.${tag}`;
    return MotionComponent;
  }

  return {
    motion: new Proxy(
      {},
      { get: (_target: object, tag: string) => createMotionComponent(tag) },
    ),
    useReducedMotion: () => reduceMotion,
  };
});

import {
  PressFeedbackRipple,
  usePressFeedback,
} from "@/lib/press-feedback";

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

function PressHarness({
  onPress = vi.fn(),
}: {
  onPress?: (modality: string) => void;
}) {
  const { clearRipple, handlers, ripple, shouldReduceMotion } =
    usePressFeedback<HTMLButtonElement>({
      keyboardKeys: ["Enter"],
      onPress: (modality) => onPress(modality),
    });

  return (
    <button
      type="button"
      {...handlers}
      data-testid="press-target"
      data-reduce-motion={String(shouldReduceMotion)}
      data-ripple-id={ripple?.id ?? ""}
    >
      Press me
      <PressFeedbackRipple
        ripple={ripple}
        scale={4}
        initialOpacity={0.4}
        onAnimationComplete={clearRipple}
        className="ripple"
      />
    </button>
  );
}

describe("usePressFeedback", () => {
  beforeEach(() => {
    reduceMotion = false;
    triggerMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("commits touch interactions on click instead of touch-down", () => {
    const onPress = vi.fn();

    render(<PressHarness onPress={onPress} />);

    const button = screen.getByTestId("press-target");
    setElementRect(button);

    fireEvent.touchStart(button, {
      touches: [{ clientX: 28, clientY: 42 }],
    });
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toHaveAttribute("data-ripple-id", "");

    fireEvent.touchEnd(button, {
      changedTouches: [{ clientX: 28, clientY: 42 }],
    });
    expect(onPress).not.toHaveBeenCalled();

    fireEvent.click(button, {
      detail: 1,
      clientX: 28,
      clientY: 42,
    });

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress.mock.calls[0][0]).toBe("touch");
    expect(triggerMock).toHaveBeenCalledTimes(1);
    expect(button.getAttribute("data-ripple-id")).not.toBe("");
  });

  it("does not let haptics failures block click commits", () => {
    const onPress = vi.fn();

    triggerMock.mockImplementation(() => {
      throw new Error("no haptics");
    });

    render(<PressHarness onPress={onPress} />);

    const button = screen.getByTestId("press-target");
    setElementRect(button);

    expect(() =>
      fireEvent.click(button, {
        detail: 1,
        clientX: 28,
        clientY: 42,
      }),
    ).not.toThrow();
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress.mock.calls[0][0]).toBe("mouse");
    expect(button.getAttribute("data-ripple-id")).not.toBe("");
  });

  it("suppresses the next click after a swipe cancel", () => {
    const onPress = vi.fn();

    render(<PressHarness onPress={onPress} />);

    const button = screen.getByTestId("press-target");
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
  });

  it("suppresses duplicate non-keyboard commits inside the guard window", () => {
    const onPress = vi.fn();

    vi.spyOn(Date, "now")
      .mockReturnValueOnce(1_000)
      .mockReturnValueOnce(1_100);

    render(<PressHarness onPress={onPress} />);

    const button = screen.getByTestId("press-target");
    setElementRect(button);

    fireEvent.click(button, {
      detail: 1,
      clientX: 24,
      clientY: 32,
    });
    fireEvent.click(button, {
      detail: 1,
      clientX: 30,
      clientY: 32,
    });

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress.mock.calls[0][0]).toBe("mouse");
    expect(triggerMock).toHaveBeenCalledTimes(1);
  });

  it("skips ripple creation when reduced motion is enabled", () => {
    reduceMotion = true;
    const onPress = vi.fn();

    render(<PressHarness onPress={onPress} />);

    const button = screen.getByTestId("press-target");
    setElementRect(button);

    fireEvent.click(button, {
      detail: 1,
      clientX: 18,
      clientY: 26,
    });

    expect(button).toHaveAttribute("data-reduce-motion", "true");
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(triggerMock).toHaveBeenCalledWith(
      [{ duration: 35 }],
      expect.objectContaining({ intensity: 0.4 }),
    );
    expect(button).toHaveAttribute("data-ripple-id", "");
  });
});
