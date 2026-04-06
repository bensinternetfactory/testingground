"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DRAWER_HASH } from "./config";
import { lockBodyScroll } from "./scroll-lock";
import {
  createDrawerSession,
  getClosedDrawerSession,
  type DrawerSessionState,
  type DrawerTriggerPayload,
} from "./triggers";

interface DrawerActions {
  open: (trigger?: DrawerTriggerPayload) => void;
  close: () => void;
  reset: () => void;
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
    throw new Error("useDrawer must be used within a <DrawerStateProvider>");
  }

  return {
    isOpen: ctx.state.isOpen,
    title: ctx.state.title,
    amount: ctx.state.amount,
    source: ctx.state.source,
    heroTruckType: ctx.state.heroTruckType,
    open: ctx.actions.open,
    close: ctx.actions.close,
    reset: ctx.actions.reset,
    setAmount: ctx.actions.setAmount,
  };
}

export function DrawerStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DrawerSessionState>(getClosedDrawerSession);

  const open = useCallback((trigger?: DrawerTriggerPayload) => {
    lockBodyScroll(null);
    setState(createDrawerSession(trigger));
  }, []);

  const close = useCallback(() => {
    // Scroll unlock is deferred to AnimatePresence.onExitComplete in
    // PreApprovalDrawer so the scrollbar doesn't reappear mid-exit-animation
    // (which shifts the centered modal by half the scrollbar width).
    // Safety-net: PreApprovalDrawer's unmount cleanup also calls unlock.
    setState((current) => ({ ...current, isOpen: false }));
  }, []);

  const reset = useCallback(() => {
    setState(getClosedDrawerSession);
  }, []);

  const setAmount = useCallback((amount: number) => {
    setState((current) =>
      current.amount === amount ? current : { ...current, amount },
    );
  }, []);

  const contextValue = useMemo<DrawerContextValue>(
    () => ({
      state,
      actions: { open, close, reset, setAmount },
      meta: { triggerHash: DRAWER_HASH },
    }),
    [close, open, reset, setAmount, state],
  );

  return (
    <DrawerContext value={contextValue}>
      {children}
    </DrawerContext>
  );
}
