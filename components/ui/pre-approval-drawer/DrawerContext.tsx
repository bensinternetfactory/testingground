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
import { DRAWER_HASH } from "./config";
import { PreApprovalDrawer } from "./PreApprovalDrawer";
import {
  createDrawerSession,
  getClosedDrawerSession,
  parseDrawerTriggerDataAttributes,
  type DrawerSessionState,
  type DrawerTriggerPayload,
} from "./triggers";

interface DrawerActions {
  open: (trigger?: DrawerTriggerPayload) => void;
  close: () => void;
  setAmount: (amount: number) => void;
}

interface DrawerMeta {
  triggerHash: string;
}

interface DrawerContextValue {
  state: DrawerSessionState;
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
    amount: ctx.state.amount,
    source: ctx.state.source,
    heroTruckType: ctx.state.heroTruckType,
    open: ctx.actions.open,
    close: ctx.actions.close,
    setAmount: ctx.actions.setAmount,
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

function DrawerHashListener({
  open,
}: {
  open: (trigger?: DrawerTriggerPayload) => void;
}) {
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
    open(parseDrawerTriggerDataAttributes(anchor.dataset));
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
  const [state, setState] = useState<DrawerSessionState>(getClosedDrawerSession);

  const open = useCallback((trigger?: DrawerTriggerPayload) => {
    setState(createDrawerSession(trigger));
  }, []);

  const close = useCallback(() => {
    setState((current) => ({ ...current, isOpen: false }));
  }, []);

  const setAmount = useCallback((amount: number) => {
    setState((current) =>
      current.amount === amount ? current : { ...current, amount },
    );
  }, []);

  const contextValue = useMemo<DrawerContextValue>(
    () => ({
      state,
      actions: { open, close, setAmount },
      meta: { triggerHash: DRAWER_HASH },
    }),
    [close, open, setAmount, state],
  );

  return (
    <DrawerContext value={contextValue}>
      <DrawerHashListener open={open} />
      {children}
      <PreApprovalDrawer />
    </DrawerContext>
  );
}
