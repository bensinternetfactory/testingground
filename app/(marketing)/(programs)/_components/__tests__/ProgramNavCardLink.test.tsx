// @vitest-environment happy-dom
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ProgramNavCardLink } from "../ProgramNavCardLink";

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

describe("ProgramNavCardLink", () => {
  beforeEach(() => {
    reduceMotion = false;
    triggerMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("preserves the canonical pre-approval schema and commits on click instead of touch-down", () => {
    render(
      <ProgramNavCardLink
        href="#get-pre-approved"
        label="Apply now"
        preApprovalTrigger={{
          origin: {
            pageId: "fleet-financing",
            sectionId: "program-nav-card",
            ctaId: "program-nav-card-apply-now",
            placement: "section",
          },
          drawer: {
            title: "Estimate your fleet payment",
          },
          handoff: {
            truckType: "rollback",
          },
        }}
      />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });
    setElementRect(link);

    fireEvent.touchStart(link, {
      touches: [{ clientX: 28, clientY: 42 }],
    });
    fireEvent.touchEnd(link, {
      changedTouches: [{ clientX: 28, clientY: 42 }],
    });

    expect(triggerMock).not.toHaveBeenCalled();
    expect(link.querySelector("span[aria-hidden='true']")).toBeNull();

    fireEvent.click(link, {
      detail: 1,
      clientX: 28,
      clientY: 42,
    });

    expect(triggerMock).toHaveBeenCalledTimes(1);
    expect(link.querySelector("span[aria-hidden='true']")).not.toBeNull();
    expect(link).toHaveAttribute("href", "#get-pre-approved");
    expect(link).toHaveAttribute("data-pre-approval-version", "2");
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "fleet-financing",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-section-id",
      "program-nav-card",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-cta-id",
      "program-nav-card-apply-now",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-placement",
      "section",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-drawer-title",
      "Estimate your fleet payment",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-handoff-truck-type",
      "rollback",
    );
    expect(link.hasAttribute("data-drawer-title")).toBe(false);
    expect(link.hasAttribute("data-drawer-source")).toBe(false);
    expect(link.hasAttribute("data-drawer-truck-type")).toBe(false);
  });

  it("suppresses the next click after touch drift exceeds the shared swipe threshold", () => {
    render(
      <ProgramNavCardLink href="#get-pre-approved" label="Apply now" />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });
    setElementRect(link);

    fireEvent.touchStart(link, {
      touches: [{ clientX: 20, clientY: 20 }],
    });
    fireEvent.touchEnd(link, {
      changedTouches: [{ clientX: 40, clientY: 20 }],
    });
    fireEvent.click(link, {
      detail: 1,
      clientX: 40,
      clientY: 20,
    });

    expect(triggerMock).not.toHaveBeenCalled();
    expect(link.querySelector("span[aria-hidden='true']")).toBeNull();
  });

  it("keeps keyboard activation semantic for the link path", () => {
    render(
      <ProgramNavCardLink href="#get-pre-approved" label="Apply now" />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });
    setElementRect(link);

    fireEvent.keyDown(link, { key: "Enter" });

    expect(triggerMock).not.toHaveBeenCalled();
    expect(link.querySelector("span[aria-hidden='true']")).toBeNull();

    fireEvent.click(link, {
      detail: 0,
    });

    expect(triggerMock).not.toHaveBeenCalled();
    expect(link.querySelector("span[aria-hidden='true']")).not.toBeNull();
  });
});
