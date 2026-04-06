"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { DRAWER_HASH } from "./config";
import type { PreApprovalCloseReason } from "@/features/pre-approval/contract";
import { createHashOpenPreApprovalTrigger } from "@/features/pre-approval/drawer/runtime/parser";

export function RouteResetListener({
  open,
  reset,
}: {
  open: (trigger?: ReturnType<typeof createHashOpenPreApprovalTrigger>) => void;
  reset: (reason?: PreApprovalCloseReason) => void;
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
      reset("route-change");
    }
  }, [pathname, open, reset]);

  return null;
}
