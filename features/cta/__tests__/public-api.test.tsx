// @vitest-environment happy-dom
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { buildPreApprovalTriggerAttributes } from "@/features/pre-approval/drawer/server";
import { CtaLink, LeadCta } from "@/features/cta/client";
import {
  createPreApprovalEntry,
  getPreApprovalEntryAttributes,
} from "@/features/cta/lead-entry";

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

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  reduceMotion = false;
  triggerMock.mockReset();
});

describe("CTA public API", () => {
  const trigger = {
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
  } as const;

  it("reuses the canonical pre-approval entry and trigger builders", () => {
    const entry = createPreApprovalEntry({
      pathname: "/rollback-financing",
      trigger,
    });

    expect(entry).toEqual({
      kind: "pre-approval",
      href: "#get-pre-approved",
      trigger,
    });
    expect(getPreApprovalEntryAttributes(entry)).toEqual(
      buildPreApprovalTriggerAttributes(trigger),
    );
  });

  it("renders canonical CtaLink and LeadCta surfaces through the canonical CTA runtime", () => {
    const entry = createPreApprovalEntry({
      pathname: "/rollback-financing",
      trigger,
    });

    const { container } = render(
      <>
        <CtaLink
          href="/contact"
          copy={{ eyebrow: "Questions about terms?", label: "Talk to lending" }}
          appearance={{ tone: "primary" }}
        />
        <CtaLink
          href="https://example.com"
          copy={{ label: "Visit partner site" }}
          appearance={{ tone: "secondary", fullWidth: true }}
        />
        <LeadCta
          entry={entry}
          copy={{ label: "Apply now" }}
          appearance={{ tone: "primary" }}
        />
      </>,
    );

    const internalLink = screen.getByRole("link", {
      name: "Questions about terms? Talk to lending",
    });
    const externalLink = screen.getByRole("link", { name: "Visit partner site" });
    const leadLink = screen.getByRole("link", { name: "Apply now" });

    expect(internalLink).toHaveAttribute("href", "/contact");
    expect(internalLink).toHaveTextContent("Questions about terms?");
    expect(container.querySelector("a a")).toBeNull();
    expect(externalLink).toHaveAttribute("href", "https://example.com");
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink.className).toContain("w-full");

    expect(leadLink).toHaveAttribute("href", "#get-pre-approved");
    expect(leadLink).toHaveAttribute("data-pre-approval-version", "2");
    expect(leadLink).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "rollback-financing",
    );
    expect(leadLink).toHaveAttribute(
      "data-pre-approval-origin-section-id",
      "hero-primary",
    );
    expect(leadLink).toHaveAttribute(
      "data-pre-approval-origin-cta-id",
      "hero-main-cta",
    );
    expect(leadLink).toHaveAttribute(
      "data-pre-approval-origin-placement",
      "hero",
    );
    expect(leadLink).toHaveAttribute(
      "data-pre-approval-drawer-title",
      "How much is the rollback you found?",
    );
    expect(leadLink).toHaveAttribute(
      "data-pre-approval-handoff-truck-type",
      "rollback",
    );
  });
});
