// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import { preApprovalEntryHash } from "@/features/pre-approval/drawer/server";
import { DrawerHashListener } from "../DrawerHashListener";

afterEach(() => {
  cleanup();
  window.location.hash = "";
});

function renderListener(open = vi.fn()) {
  render(<DrawerHashListener open={open} />);
  return open;
}

function setPathname(pathname: string) {
  history.replaceState(null, "", pathname);
}

describe("DrawerHashListener", () => {
  describe("initial mount", () => {
    it("calls open() and clears hash when mounted with the entry hash", () => {
      const replaceStateSpy = vi.spyOn(history, "replaceState");
      setPathname(`/rollback-financing${preApprovalEntryHash}`);

      const open = renderListener();

      expect(open).toHaveBeenCalledWith({
        schema: "hash",
        trigger: {
          origin: {
            ctaId: "direct-url",
            pageId: "rollback-financing",
            placement: "inline",
            sectionId: "hash-entry",
          },
        },
      });
      expect(replaceStateSpy).toHaveBeenCalled();
      replaceStateSpy.mockRestore();
    });

    it("does not call open when mounted without the entry hash", () => {
      window.location.hash = "";
      const open = renderListener();
      expect(open).not.toHaveBeenCalled();
    });
  });

  describe("hashchange event", () => {
    it("calls open() when hash changes to the entry hash", () => {
      setPathname("/rollback-financing");
      const open = renderListener();

      act(() => {
        window.location.hash = preApprovalEntryHash;
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      });

      expect(open).toHaveBeenCalledWith({
        schema: "hash",
        trigger: {
          origin: {
            ctaId: "direct-url",
            pageId: "rollback-financing",
            placement: "inline",
            sectionId: "hash-entry",
          },
        },
      });
    });

    it("does not call open for other hashes", () => {
      const open = renderListener();

      act(() => {
        window.location.hash = "#something-else";
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      });

      expect(open).not.toHaveBeenCalled();
    });
  });

  describe("click interception", () => {
    function createAnchor(href: string, attrs: Record<string, string> = {}) {
      const anchor = document.createElement("a");
      anchor.href = href;
      for (const [key, value] of Object.entries(attrs)) {
        anchor.setAttribute(key, value);
      }
      document.body.appendChild(anchor);
      return anchor;
    }

    afterEach(() => {
      document.querySelectorAll("a").forEach((a) => a.remove());
    });

    it("intercepts click on a same-page entry-hash anchor", () => {
      const open = renderListener();
      const anchor = createAnchor(
        `${window.location.pathname}${preApprovalEntryHash}`,
      );

      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        button: 0,
      });
      anchor.dispatchEvent(event);

      expect(open).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(true);
    });

    it("passes canonical trigger data to open()", () => {
      setPathname("/rollback-financing");
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${preApprovalEntryHash}`, {
        "data-pre-approval-version": "2",
        "data-pre-approval-origin-page-id": "rollback-financing",
        "data-pre-approval-origin-section-id": "hero-primary",
        "data-pre-approval-origin-cta-id": "hero-main-cta",
        "data-pre-approval-origin-placement": "hero",
        "data-pre-approval-drawer-title": "Pick your truck",
        "data-pre-approval-handoff-truck-type": "rotator",
      });

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).toHaveBeenCalledWith({
        schema: "production",
        trigger: {
          drawer: {
            title: "Pick your truck",
          },
          handoff: {
            truckType: "rotator",
          },
          origin: {
            ctaId: "hero-main-cta",
            pageId: "rollback-financing",
            placement: "hero",
            sectionId: "hero-primary",
          },
        },
      });
    });

    it("falls back to a hash-open trigger when an anchor has no canonical dataset", () => {
      setPathname("/rollback-financing");
      const open = renderListener();
      const anchor = createAnchor(
        `${window.location.pathname}${preApprovalEntryHash}`,
      );

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).toHaveBeenCalledWith({
        schema: "hash",
        trigger: {
          origin: {
            ctaId: "direct-url",
            pageId: "rollback-financing",
            placement: "inline",
            sectionId: "hash-entry",
          },
        },
      });
    });

    it("does not intercept clicks with meta key", () => {
      const open = renderListener();
      const anchor = createAnchor(
        `${window.location.pathname}${preApprovalEntryHash}`,
      );

      anchor.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          button: 0,
          metaKey: true,
        }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept clicks with ctrl key", () => {
      const open = renderListener();
      const anchor = createAnchor(
        `${window.location.pathname}${preApprovalEntryHash}`,
      );

      anchor.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          button: 0,
          ctrlKey: true,
        }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept clicks with shift key", () => {
      const open = renderListener();
      const anchor = createAnchor(
        `${window.location.pathname}${preApprovalEntryHash}`,
      );

      anchor.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          button: 0,
          shiftKey: true,
        }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept clicks with alt key", () => {
      const open = renderListener();
      const anchor = createAnchor(
        `${window.location.pathname}${preApprovalEntryHash}`,
      );

      anchor.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          button: 0,
          altKey: true,
        }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept right clicks", () => {
      const open = renderListener();
      const anchor = createAnchor(
        `${window.location.pathname}${preApprovalEntryHash}`,
      );

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 2 }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept anchors with target=_blank", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${preApprovalEntryHash}`, {
        target: "_blank",
      });

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept anchors with download attribute", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${preApprovalEntryHash}`, {
        download: "",
      });

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept anchors to different pathnames", () => {
      const open = renderListener();
      const anchor = createAnchor(`/different-page${preApprovalEntryHash}`);

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept anchors with non-entry hashes", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}#other-hash`);

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).not.toHaveBeenCalled();
    });
  });
});
