// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  lockBodyScroll,
  unlockBodyScroll,
  updateScrollableRef,
} from "@/features/pre-approval/drawer/runtime/scroll-lock";

// Reset module state and body styles between tests
afterEach(() => {
  unlockBodyScroll();
  document.body.removeAttribute("style");
  document.documentElement.removeAttribute("style");
});

describe("lockBodyScroll", () => {
  it("sets body to position:fixed with negative top offset", () => {
    Object.defineProperty(window, "scrollY", { value: 200, writable: true });

    lockBodyScroll(null);

    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.top).toBe("-200px");
    expect(document.body.style.width).toBe("100%");
  });

  it("sets overflow:hidden on body and html", () => {
    lockBodyScroll(null);

    expect(document.body.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overflow).toBe("hidden");
  });

  it("is a no-op when already locked", () => {
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    lockBodyScroll(null);

    Object.defineProperty(window, "scrollY", { value: 999, writable: true });
    lockBodyScroll(null);

    // Should still reflect the original scroll position, not 999
    expect(document.body.style.top).toBe("-100px");
  });
});

describe("unlockBodyScroll", () => {
  it("restores body styles after lock", () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.overflow = "";

    lockBodyScroll(null);
    unlockBodyScroll();

    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
    expect(document.body.style.overflow).toBe("");
  });

  it("calls window.scrollTo to restore position", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    Object.defineProperty(window, "scrollY", { value: 350, writable: true });

    lockBodyScroll(null);
    unlockBodyScroll();

    expect(scrollToSpy).toHaveBeenCalledWith(0, 350);
    scrollToSpy.mockRestore();
  });

  it("is a no-op when not locked", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    unlockBodyScroll();

    expect(scrollToSpy).not.toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it("removes the touchmove listener", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");
    lockBodyScroll(null);
    unlockBodyScroll();

    expect(removeSpy).toHaveBeenCalledWith(
      "touchmove",
      expect.any(Function),
    );
    removeSpy.mockRestore();
  });
});

describe("scrollbar compensation", () => {
  it("adds padding-right when scrollbar is present", () => {
    Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
    Object.defineProperty(document.documentElement, "clientWidth", {
      value: 1009,
      writable: true,
      configurable: true,
    });

    lockBodyScroll(null);

    expect(document.body.style.paddingRight).toBe("15px");
    expect(
      document.documentElement.style.getPropertyValue("--scrollbar-gutter"),
    ).toBe("15px");
  });

  it("removes --scrollbar-gutter on unlock", () => {
    Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
    Object.defineProperty(document.documentElement, "clientWidth", {
      value: 1009,
      writable: true,
      configurable: true,
    });

    lockBodyScroll(null);
    unlockBodyScroll();

    expect(
      document.documentElement.style.getPropertyValue("--scrollbar-gutter"),
    ).toBe("");
  });
});

describe("touchmove prevention", () => {
  it("prevents touchmove outside the scrollable element", () => {
    const scrollable = document.createElement("div");
    document.body.appendChild(scrollable);

    lockBodyScroll(scrollable);

    const outsideTarget = document.createElement("div");
    document.body.appendChild(outsideTarget);

    const event = new Event("touchmove", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "target", { value: outsideTarget });
    const prevented = !document.dispatchEvent(event);

    expect(prevented).toBe(true);

    document.body.removeChild(scrollable);
    document.body.removeChild(outsideTarget);
  });

  it("allows touchmove inside the scrollable element", () => {
    const scrollable = document.createElement("div");
    const inner = document.createElement("span");
    scrollable.appendChild(inner);
    document.body.appendChild(scrollable);

    lockBodyScroll(scrollable);

    const event = new Event("touchmove", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "target", { value: inner });
    const prevented = !document.dispatchEvent(event);

    expect(prevented).toBe(false);

    document.body.removeChild(scrollable);
  });

  it("uses updateScrollableRef to change the scrollable element", () => {
    const original = document.createElement("div");
    const replacement = document.createElement("div");
    const outside = document.createElement("div");
    document.body.appendChild(original);
    document.body.appendChild(replacement);
    document.body.appendChild(outside);

    lockBodyScroll(original);
    updateScrollableRef(replacement);

    // Touchmove inside original should now be blocked (it's no longer the scrollable)
    const event1 = new Event("touchmove", { bubbles: true, cancelable: true });
    Object.defineProperty(event1, "target", { value: original });
    const prevented1 = !document.dispatchEvent(event1);
    expect(prevented1).toBe(true);

    // Touchmove inside replacement should be allowed
    const event2 = new Event("touchmove", { bubbles: true, cancelable: true });
    Object.defineProperty(event2, "target", { value: replacement });
    const prevented2 = !document.dispatchEvent(event2);
    expect(prevented2).toBe(false);

    document.body.removeChild(original);
    document.body.removeChild(replacement);
    document.body.removeChild(outside);
  });
});

describe("frozen elements", () => {
  let freezeEl: HTMLElement;

  beforeEach(() => {
    freezeEl = document.createElement("div");
    freezeEl.setAttribute("data-freeze-on-lock", "");
    freezeEl.style.position = "sticky";
    freezeEl.style.top = "0px";
    freezeEl.style.width = "";
    document.body.appendChild(freezeEl);

    // Mock getBoundingClientRect
    freezeEl.getBoundingClientRect = () => ({
      top: 60,
      left: 0,
      right: 1024,
      bottom: 120,
      width: 1024,
      height: 60,
      x: 0,
      y: 60,
      toJSON: () => {},
    });
  });

  afterEach(() => {
    document.body.removeChild(freezeEl);
  });

  it("pins freeze-on-lock elements at viewport position on lock", () => {
    lockBodyScroll(null);

    expect(freezeEl.style.position).toBe("fixed");
    expect(freezeEl.style.top).toBe("60px");
    expect(freezeEl.style.width).toBe("1024px");
  });

  it("restores freeze-on-lock elements on unlock", () => {
    lockBodyScroll(null);
    unlockBodyScroll();

    expect(freezeEl.style.position).toBe("sticky");
    expect(freezeEl.style.top).toBe("0px");
    expect(freezeEl.style.width).toBe("");
  });
});
