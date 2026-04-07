// @vitest-environment happy-dom
import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MiniROI } from "../MiniROI";
import { MINI_ROI_CONFIG } from "../config";

vi.mock("framer-motion", () => {
  function createMotionComponent(tag: string) {
    const MotionComponent = React.forwardRef(function MockMotionComponent(
      props: Record<string, unknown>,
      ref: React.ForwardedRef<unknown>,
    ) {
      const domProps = { ...props };

      delete domProps.animate;
      delete domProps.drag;
      delete domProps.dragConstraints;
      delete domProps.dragElastic;
      delete domProps.dragMomentum;
      delete domProps.initial;
      delete domProps.onDrag;
      delete domProps.onDragEnd;
      delete domProps.transition;
      delete domProps.whileTap;

      return React.createElement(tag, { ...domProps, ref });
    });

    MotionComponent.displayName = `motion.${tag}`;
    return MotionComponent;
  }

  return {
    motion: new Proxy(
      {},
      {
        get: (_target: object, prop: string) => {
          if (prop === "create") {
            return () => createMotionComponent("a");
          }
          return createMotionComponent(prop);
        },
      },
    ),
    useMotionValue: (initialValue: number) => {
      let value = initialValue;

      return {
        get: () => value,
        set: (nextValue: number) => {
          value = nextValue;
        },
      };
    },
    useReducedMotion: () => false,
  };
});

afterEach(() => {
  cleanup();
});

describe("MiniROI", () => {
  it("builds the calculator CTA href with the canonical boolean query encoding", () => {
    render(<MiniROI config={MINI_ROI_CONFIG} />);

    expect(document.querySelectorAll("a a")).toHaveLength(0);

    const link = screen.getByRole("link", {
      name: "Build Your Full Profit Plan",
    });

    expect(link).toHaveAttribute(
      "href",
      "/tow-truck-calculator?rev=200&pmt=1200&known=1",
    );
    expect(link.hasAttribute("data-pre-approval-version")).toBe(false);
  });
});
