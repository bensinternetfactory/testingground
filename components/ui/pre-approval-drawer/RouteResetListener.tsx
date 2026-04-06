"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { DRAWER_HASH } from "./config";
import type { DrawerTriggerPayload } from "./triggers";

export function RouteResetListener({
  open,
  reset,
}: {
  open: (trigger?: DrawerTriggerPayload) => void;
  reset: () => void;
}) {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (pathname === previousPathnameRef.current) {
      return;
    }
    previousPathnameRef.current = pathname;

    if (window.location.hash === DRAWER_HASH) {
      // Navigated to a page with the drawer hash — open a fresh session.
      // If already open, lockBodyScroll is a no-op and createDrawerSession
      // refreshes the session state.
      open();
    } else {
      // Navigated without drawer hash — close and reset to defaults.
      // AnimatePresence will run the exit animation, then onExitComplete
      // calls unlockBodyScroll.
      reset();
    }
  }, [pathname, open, reset]);

  return null;
}
