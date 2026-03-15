"use client";

import {
  createContext,
  use,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { DRAWER_HASH } from "./config";
import { PreApprovalDrawer } from "./PreApprovalDrawer";

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface DrawerContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawer(): DrawerContextValue {
  const ctx = use(DrawerContext);
  if (!ctx) {
    throw new Error("useDrawer must be used within a <DrawerProvider>");
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Hash listener                                                      */
/* ------------------------------------------------------------------ */

function DrawerHashListener({ open }: { open: () => void }) {
  useEffect(() => {
    // Open on initial load if hash is present
    if (window.location.hash === DRAWER_HASH) {
      open();
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    function handleHashChange() {
      if (window.location.hash === DRAWER_HASH) {
        open();
        // Clear the hash so back button goes to previous page, not drawer-open state
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [open]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <DrawerContext value={{ isOpen, open, close }}>
      <DrawerHashListener open={open} />
      {children}
      <PreApprovalDrawer />
    </DrawerContext>
  );
}
