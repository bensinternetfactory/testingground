"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DRAWER_DEFAULT_TITLE, DRAWER_HASH } from "./config";
import { PreApprovalDrawer } from "./PreApprovalDrawer";

interface DrawerState {
  isOpen: boolean;
  title: string;
}

interface DrawerActions {
  open: (title?: string) => void;
  close: () => void;
}

interface DrawerMeta {
  triggerHash: string;
}

interface DrawerContextValue {
  state: DrawerState;
  actions: DrawerActions;
  meta: DrawerMeta;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawer() {
  const ctx = use(DrawerContext);
  if (!ctx) {
    throw new Error("useDrawer must be used within a <DrawerProvider>");
  }

  return {
    isOpen: ctx.state.isOpen,
    title: ctx.state.title,
    open: ctx.actions.open,
    close: ctx.actions.close,
  };
}

function clearDrawerHash() {
  const { pathname, search } = window.location;
  history.replaceState(null, "", `${pathname}${search}`);
}

function isDrawerTarget(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const targetUrl = new URL(anchor.href, window.location.href);
  const currentUrl = new URL(window.location.href);

  return (
    targetUrl.origin === currentUrl.origin &&
    targetUrl.pathname === currentUrl.pathname &&
    targetUrl.hash === DRAWER_HASH
  );
}

function DrawerHashListener({ open }: { open: (title?: string) => void }) {
  const openFromHash = useEffectEvent(() => {
    open();
    clearDrawerHash();
  });

  const handleHashChange = useEffectEvent(() => {
    if (window.location.hash === DRAWER_HASH) {
      openFromHash();
    }
  });

  const handleDocumentClick = useEffectEvent((event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[href]",
    );

    if (!anchor || !isDrawerTarget(anchor)) {
      return;
    }

    event.preventDefault();
    open(anchor.dataset.drawerTitle);
  });

  useEffect(() => {
    handleHashChange();

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(DRAWER_DEFAULT_TITLE);

  const open = useCallback((customTitle?: string) => {
    setTitle(customTitle ?? DRAWER_DEFAULT_TITLE);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const contextValue = useMemo<DrawerContextValue>(
    () => ({
      state: { isOpen, title },
      actions: { open, close },
      meta: { triggerHash: DRAWER_HASH },
    }),
    [close, isOpen, open, title],
  );

  return (
    <DrawerContext value={contextValue}>
      <DrawerHashListener open={open} />
      {children}
      <PreApprovalDrawer />
    </DrawerContext>
  );
}
