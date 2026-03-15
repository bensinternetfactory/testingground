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
    // Open on initial load if hash is present (direct URL access)
    if (window.location.hash === DRAWER_HASH) {
      open();
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    // Fallback: native hashchange (browser back/forward, plain <a> tags)
    function handleHashChange() {
      if (window.location.hash === DRAWER_HASH) {
        open();
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }

    // Primary: intercept clicks on any link targeting DRAWER_HASH
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href === DRAWER_HASH || href.endsWith(DRAWER_HASH)) {
        e.preventDefault();
        open();
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleClick);
    };
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
