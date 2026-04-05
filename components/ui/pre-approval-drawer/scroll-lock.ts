/**
 * Imperative body-scroll lock for iOS Safari.
 *
 * Called synchronously from DrawerContext open()/close() — BEFORE setState —
 * so the lock is in place before React paints the next frame. This eliminates
 * the 1-frame timing gap that useEffect-based locks suffer from, which lets
 * iOS commit to a scroll gesture before the lock engages.
 *
 * Uses `position: fixed + top: -scrollY` because it's the only technique
 * that reliably prevents iOS Safari touch-driven scrolling. Applied
 * synchronously, the visual offset matches the scroll position exactly,
 * so there is zero pixel jump.
 */

let locked = false;
let savedScrollY = 0;
let savedStyles = {
  htmlOverflow: "",
  bodyOverflow: "",
  bodyPosition: "",
  bodyTop: "",
  bodyWidth: "",
  bodyPaddingRight: "",
};

let scrollableEl: HTMLElement | null = null;
let touchMoveHandler: ((e: TouchEvent) => void) | null = null;

export function lockBodyScroll(scrollable: HTMLElement | null) {
  if (locked) {
    return;
  }

  locked = true;
  scrollableEl = scrollable;
  savedScrollY = window.scrollY;

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  savedStyles = {
    htmlOverflow: document.documentElement.style.overflow,
    bodyOverflow: document.body.style.overflow,
    bodyPosition: document.body.style.position,
    bodyTop: document.body.style.top,
    bodyWidth: document.body.style.width,
    bodyPaddingRight: document.body.style.paddingRight,
  };

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.width = "100%";

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    // Expose scrollbar width to position:fixed elements (e.g. navbar) via CSS
    // variable so they can compensate for the viewport widening.
    document.documentElement.style.setProperty(
      "--scrollbar-gutter",
      `${scrollbarWidth}px`,
    );
  }

  // Belt-and-suspenders: block touchmove on anything outside the drawer's
  // scrollable content. Framer Motion uses Pointer Events for drag, so this
  // does not interfere with sheet gestures.
  touchMoveHandler = (event: TouchEvent) => {
    const target = event.target as Node | null;
    if (scrollableEl && target && scrollableEl.contains(target)) {
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
  };

  document.addEventListener("touchmove", touchMoveHandler, { passive: false });
}

export function unlockBodyScroll() {
  if (!locked) {
    return;
  }

  locked = false;

  document.documentElement.style.overflow = savedStyles.htmlOverflow;
  document.body.style.overflow = savedStyles.bodyOverflow;
  document.body.style.position = savedStyles.bodyPosition;
  document.body.style.top = savedStyles.bodyTop;
  document.body.style.width = savedStyles.bodyWidth;
  document.body.style.paddingRight = savedStyles.bodyPaddingRight;
  document.documentElement.style.removeProperty("--scrollbar-gutter");

  window.scrollTo(0, savedScrollY);

  if (touchMoveHandler) {
    document.removeEventListener("touchmove", touchMoveHandler);
    touchMoveHandler = null;
  }

  scrollableEl = null;
}

/**
 * Update the scrollable ref after the drawer content mounts. This lets the
 * touchmove handler allow touches inside the inner scrollable area.
 */
export function updateScrollableRef(el: HTMLElement | null) {
  scrollableEl = el;
}
