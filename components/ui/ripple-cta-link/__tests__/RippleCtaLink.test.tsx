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
  function createMotionComponent(tagOrComponent: React.ElementType) {
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

import { RippleCtaLink } from "../RippleCtaLink";

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

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  reduceMotion = false;
  triggerMock.mockReset();
});

describe("RippleCtaLink", () => {
  it("renders internal CTAs as a single anchor without nested anchor usage", () => {
    const { container } = render(
      <RippleCtaLink href="/apply" label="Apply now" />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });

    expect(link).toHaveAttribute("href", "/apply");
    expect(container.querySelectorAll("a")).toHaveLength(1);
    expect(container.querySelector("a a")).toBeNull();
  });

  it("emits canonical pre-approval trigger attributes when provided", () => {
    render(
      <RippleCtaLink
        href="#get-pre-approved"
        label="Apply now"
        preApprovalTrigger={{
          origin: {
            pageId: "rollback-financing",
            sectionId: "hero-primary",
            ctaId: "hero-main-cta",
            placement: "hero",
          },
          drawer: {
            title: "How much is the rollback you found?",
          },
          handoff: {
            truckType: "rollback",
          },
        }}
      />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });

    expect(link).toHaveAttribute("href", "#get-pre-approved");
    expect(link.getAttribute("data-pre-approval-version")).toBe("2");
    expect(link.getAttribute("data-pre-approval-origin-page-id")).toBe(
      "rollback-financing",
    );
    expect(link.getAttribute("data-pre-approval-origin-section-id")).toBe(
      "hero-primary",
    );
    expect(link.getAttribute("data-pre-approval-origin-cta-id")).toBe(
      "hero-main-cta",
    );
    expect(link.getAttribute("data-pre-approval-origin-placement")).toBe(
      "hero",
    );
    expect(link.getAttribute("data-pre-approval-drawer-title")).toBe(
      "How much is the rollback you found?",
    );
    expect(link.getAttribute("data-pre-approval-handoff-truck-type")).toBe(
      "rollback",
    );
    expect(link.hasAttribute("data-drawer-title")).toBe(false);
  });

  it("stays free of pre-approval attributes when no trigger is provided", () => {
    render(<RippleCtaLink href="#get-pre-approved" label="Apply now" />);

    const link = screen.getByRole("link", { name: "Apply now" });

    expect(link.hasAttribute("data-pre-approval-version")).toBe(false);
    expect(link.hasAttribute("data-drawer-title")).toBe(false);
    expect(link.hasAttribute("data-drawer-source")).toBe(false);
    expect(link.hasAttribute("data-drawer-truck-type")).toBe(false);
  });

  it("renders disabled CTAs as non-interactive buttons", () => {
    render(
      <RippleCtaLink
        href="#get-pre-approved"
        label="Apply now"
        disabled
        preApprovalTrigger={{
          origin: {
            pageId: "rollback-financing",
            sectionId: "hero-primary",
            ctaId: "hero-main-cta",
            placement: "hero",
          },
        }}
      />,
    );

    const button = screen.getByRole("button", { name: "Apply now" });

    expect(button).toBeDisabled();
    expect(screen.queryByRole("link", { name: "Apply now" })).toBeNull();
    expect(button.hasAttribute("data-pre-approval-version")).toBe(false);
  });

  it("renders external CTAs as safe outbound links", () => {
    render(
      <RippleCtaLink href="https://example.com" label="Visit partner site" />,
    );

    const link = screen.getByRole("link", { name: "Visit partner site" });

    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not let analytics observer failures block click commits", () => {
    const onAnalyticsEvent = vi.fn(() => {
      throw new Error("analytics offline");
    });

    render(
      <RippleCtaLink
        href="https://example.com"
        label="Apply now"
        section="hero"
        onAnalyticsEvent={onAnalyticsEvent}
      />,
    );

    const link = screen.getByRole("link", { name: "Apply now" });
    let nativeClickSeen = false;

    setElementRect(link);
    link.addEventListener("click", () => {
      nativeClickSeen = true;
    });

    expect(() =>
      fireEvent.click(link, {
        detail: 1,
        clientX: 24,
        clientY: 12,
      }),
    ).not.toThrow();
    expect(onAnalyticsEvent).toHaveBeenCalledTimes(1);
    expect(nativeClickSeen).toBe(true);
  });

  it("preserves analytics identity from label even when children override the visible content", () => {
    const onAnalyticsEvent = vi.fn();

    render(
      <RippleCtaLink
        href="https://example.com"
        label="Apply now"
        section="hero"
        cardId="hero-main-cta"
        onAnalyticsEvent={onAnalyticsEvent}
      >
        <span>Visible override</span>
      </RippleCtaLink>,
    );

    const link = screen.getByRole("link", { name: "Visible override" });
    setElementRect(link);
    link.addEventListener("click", (event) => event.preventDefault());

    fireEvent.keyDown(link, { key: "Enter" });
    fireEvent.click(link, { detail: 0, clientX: 24, clientY: 12 });

    expect(onAnalyticsEvent).toHaveBeenCalledTimes(1);
    expect(onAnalyticsEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        component: "RippleCtaLink",
        section: "hero",
        cardId: "hero-main-cta",
        href: "https://example.com",
        label: "Apply now",
        isPlaceholder: false,
        inputModality: "keyboard",
      }),
    );
  });
});
