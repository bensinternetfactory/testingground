// @vitest-environment happy-dom
import { createRef } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NavHeaderActions } from "../NavHeaderActions";
import { NavMobileOverlay } from "../NavMobileOverlay";
import { buildStickyNavPreApprovalCtas } from "../preApprovalCta";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("buildStickyNavPreApprovalCtas", () => {
  it("builds canonical sticky-nav trigger metadata for the current route", () => {
    expect(buildStickyNavPreApprovalCtas("/rollback-financing")).toEqual({
      href: "#get-pre-approved",
      desktopTrigger: {
        origin: {
          pageId: "rollback-financing",
          sectionId: "sticky-nav-primary",
          ctaId: "sticky-nav-apply-now",
          placement: "sticky-nav",
        },
      },
      mobileTrigger: {
        origin: {
          pageId: "rollback-financing",
          sectionId: "sticky-nav-mobile-overlay",
          ctaId: "sticky-nav-mobile-get-pre-approved",
          placement: "sticky-nav",
        },
      },
    });
  });

  it("falls back to the marketing rollback entry when no pathname is available", () => {
    expect(buildStickyNavPreApprovalCtas(null).href).toBe(
      "/rollback-financing#get-pre-approved",
    );
    expect(buildStickyNavPreApprovalCtas(null).desktopTrigger.origin.pageId).toBe(
      "unknown-page",
    );
  });
});

describe("NavHeaderActions", () => {
  it("emits canonical trigger attributes for the desktop sticky-nav CTA", () => {
    const config = buildStickyNavPreApprovalCtas("/rollback-financing");

    const { container } = render(
      <NavHeaderActions
        dialogId="sticky-nav-dialog"
        mobileOpen={false}
        onToggleMobile={vi.fn()}
        primaryCtaHref={config.href}
        primaryCtaTrigger={config.desktopTrigger}
        toggleButtonRef={createRef<HTMLButtonElement>()}
      />,
    );

    const link = screen.getByRole("link", { name: /Apply Now/ });

    expect(container.querySelector("a a")).toBeNull();
    expect(link).toHaveAttribute("href", "#get-pre-approved");
    expect(link).toHaveAttribute("data-pre-approval-version", "2");
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "rollback-financing",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-section-id",
      "sticky-nav-primary",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-cta-id",
      "sticky-nav-apply-now",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-placement",
      "sticky-nav",
    );
  });

  it("emits the full canonical pre-approval schema without legacy drawer attributes", () => {
    render(
      <NavHeaderActions
        dialogId="sticky-nav-dialog"
        mobileOpen={false}
        onToggleMobile={vi.fn()}
        primaryCtaHref="#get-pre-approved"
        primaryCtaTrigger={{
          origin: {
            pageId: "rollback-financing",
            sectionId: "sticky-nav-primary",
            ctaId: "sticky-nav-apply-now",
            placement: "sticky-nav",
          },
          drawer: {
            title: "How much is the rollback you found?",
          },
          handoff: {
            truckType: "rollback",
          },
        }}
        toggleButtonRef={createRef<HTMLButtonElement>()}
      />,
    );

    const link = screen.getByRole("link", { name: /Apply Now/ });

    expect(link).toHaveAttribute("data-pre-approval-version", "2");
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "rollback-financing",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-section-id",
      "sticky-nav-primary",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-cta-id",
      "sticky-nav-apply-now",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-placement",
      "sticky-nav",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-drawer-title",
      "How much is the rollback you found?",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-handoff-truck-type",
      "rollback",
    );
    expect(link.hasAttribute("data-drawer-title")).toBe(false);
    expect(link.hasAttribute("data-drawer-source")).toBe(false);
    expect(link.hasAttribute("data-drawer-truck-type")).toBe(false);
  });
});

describe("NavMobileOverlay", () => {
  it("passes canonical trigger metadata through the mobile sticky-nav CTA", () => {
    const config = buildStickyNavPreApprovalCtas("/rollback-financing");
    const portalTarget = document.createElement("div");
    portalTarget.setAttribute("data-sticky-nav-root", "");
    document.body.appendChild(portalTarget);

    const { container } = render(
      <NavMobileOverlay
        dialogId="sticky-nav-dialog"
        onClose={vi.fn()}
        onToggleSection={vi.fn()}
        openSection={null}
        primaryCtaHref={config.href}
        primaryCtaTrigger={config.mobileTrigger}
        restoreFocusRef={createRef<HTMLButtonElement>()}
        sections={[]}
      />,
    );

    const link = screen.getByRole("link", { name: "Get Pre-Approved" });

    expect(container.querySelector("a a")).toBeNull();
    expect(link).toHaveAttribute("href", "#get-pre-approved");
    expect(link).toHaveAttribute("data-pre-approval-version", "2");
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-page-id",
      "rollback-financing",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-section-id",
      "sticky-nav-mobile-overlay",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-cta-id",
      "sticky-nav-mobile-get-pre-approved",
    );
    expect(link).toHaveAttribute(
      "data-pre-approval-origin-placement",
      "sticky-nav",
    );
  });
});
