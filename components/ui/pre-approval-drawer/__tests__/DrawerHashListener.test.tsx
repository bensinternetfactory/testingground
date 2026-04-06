// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, cleanup, act } from "@testing-library/react";
import { DrawerHashListener } from "../DrawerHashListener";
import { DRAWER_HASH } from "../config";

afterEach(() => {
  cleanup();
  // Reset hash
  window.location.hash = "";
});

function renderListener(open = vi.fn()) {
  render(<DrawerHashListener open={open} />);
  return open;
}

describe("DrawerHashListener", () => {
  describe("initial mount", () => {
    it("calls open() and clears hash when mounted with drawer hash", () => {
      const replaceStateSpy = vi.spyOn(history, "replaceState");
      window.location.hash = DRAWER_HASH;

      const open = renderListener();

      expect(open).toHaveBeenCalledTimes(1);
      expect(replaceStateSpy).toHaveBeenCalled();
      replaceStateSpy.mockRestore();
    });

    it("does not call open when mounted without drawer hash", () => {
      window.location.hash = "";
      const open = renderListener();
      expect(open).not.toHaveBeenCalled();
    });
  });

  describe("hashchange event", () => {
    it("calls open() when hash changes to drawer hash", () => {
      const open = renderListener();

      act(() => {
        window.location.hash = DRAWER_HASH;
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      });

      expect(open).toHaveBeenCalledTimes(1);
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

    it("intercepts click on same-page drawer-target anchor", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${DRAWER_HASH}`);

      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        button: 0,
      });
      anchor.dispatchEvent(event);

      expect(open).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(true);
    });

    it("passes parsed data attributes to open()", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${DRAWER_HASH}`, {
        "data-drawer-source": "hero",
        "data-drawer-title": "Pick your truck",
        "data-drawer-truck-type": "rotator",
      });

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).toHaveBeenCalledWith(
        expect.objectContaining({
          source: "hero",
          title: "Pick your truck",
          truckType: "rotator",
        }),
      );
    });

    it("does not intercept clicks with meta key", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${DRAWER_HASH}`);

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0, metaKey: true }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept clicks with ctrl key", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${DRAWER_HASH}`);

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0, ctrlKey: true }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept clicks with shift key", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${DRAWER_HASH}`);

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0, shiftKey: true }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept clicks with alt key", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${DRAWER_HASH}`);

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0, altKey: true }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept right clicks", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${DRAWER_HASH}`);

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 2 }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept anchors with target=_blank", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${DRAWER_HASH}`, {
        target: "_blank",
      });

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept anchors with download attribute", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}${DRAWER_HASH}`, {
        download: "",
      });

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept anchors to different pathnames", () => {
      const open = renderListener();
      const anchor = createAnchor(`/different-page${DRAWER_HASH}`);

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).not.toHaveBeenCalled();
    });

    it("does not intercept anchors with non-drawer hash", () => {
      const open = renderListener();
      const anchor = createAnchor(`${window.location.pathname}#other-hash`);

      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );

      expect(open).not.toHaveBeenCalled();
    });
  });
});
