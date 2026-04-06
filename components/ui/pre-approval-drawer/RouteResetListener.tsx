"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { DRAWER_HASH } from "./config";
import { createHashOpenPreApprovalTrigger } from "@/features/pre-approval/drawer/runtime/parser";

export function RouteResetListener({
  open,
  reset,
}: {
  open: (trigger?: ReturnType<typeof createHashOpenPreApprovalTrigger>) => void;
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
      open(createHashOpenPreApprovalTrigger(pathname));
    } else {
      // Navigated without drawer hash — close and reset to defaults.
      // AnimatePresence will run the exit animation, then onExitComplete
      // calls unlockBodyScroll.
      reset();
    }
  }, [pathname, open, reset]);

  return null;
}
