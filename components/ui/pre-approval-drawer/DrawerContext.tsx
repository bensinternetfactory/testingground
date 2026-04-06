"use client";

import {
  createContext,
  useEffect,
  use,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { preApprovalEntryHash } from "@/features/pre-approval/drawer/server";
import {
  createClosedPreApprovalDrawerSession,
  createPreApprovalDrawerSession,
  type PreApprovalDrawerOpenTrigger,
  type PreApprovalDrawerSessionState,
} from "@/features/pre-approval/drawer/runtime/session";
import type {
  PreApprovalCloseReason,
  PreApprovalEvent,
} from "@/features/pre-approval/contract";
import { lockBodyScroll } from "./scroll-lock";

interface DrawerActions {
  open: (trigger?: PreApprovalDrawerOpenTrigger) => void;
  close: (reason?: PreApprovalCloseReason) => void;
  continueTo: (href: string) => void;
  reset: (reason?: PreApprovalCloseReason) => void;
  setAmount: (amount: number) => void;
}

interface DrawerMeta {
  triggerHash: string;
}

interface DrawerContextValue {
  state: PreApprovalDrawerSessionState;
  actions: DrawerActions;
  meta: DrawerMeta;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function getEventBase(state: PreApprovalDrawerSessionState) {
  if (!state.sessionId) {
    return null;
  }

  return {
    amount: state.amount,
    origin: state.origin,
    sessionId: state.sessionId,
    truckType: state.truckType,
  };
}

export function useDrawer() {
  const ctx = use(DrawerContext);
  if (!ctx) {
    throw new Error("useDrawer must be used within a <DrawerStateProvider>");
  }

  return {
    isOpen: ctx.state.isOpen,
    openedAt: ctx.state.openedAt,
    sessionId: ctx.state.sessionId,
    title: ctx.state.title,
    amount: ctx.state.amount,
    origin: ctx.state.origin,
    truckType: ctx.state.truckType,
    open: ctx.actions.open,
    close: ctx.actions.close,
    continueTo: ctx.actions.continueTo,
    reset: ctx.actions.reset,
    setAmount: ctx.actions.setAmount,
  };
}

export function DrawerStateProvider({
  children,
  onEvent,
}: {
  children: ReactNode;
  onEvent?: (event: PreApprovalEvent) => void;
}) {
  const [state, setState] = useState<PreApprovalDrawerSessionState>(
    createClosedPreApprovalDrawerSession,
  );
  const onEventRef = useRef(onEvent);
  const stateRef = useRef(state);

  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const emitEvent = useCallback((event: PreApprovalEvent) => {
    try {
      onEventRef.current?.(event);
    } catch (error) {
      console.error("PreApprovalDrawer onEvent handler failed", error);
    }
  }, []);

  const open = useCallback(
    (trigger?: PreApprovalDrawerOpenTrigger) => {
      lockBodyScroll(null);
      const nextState = createPreApprovalDrawerSession(trigger, {
        pathname:
          typeof window !== "undefined" ? window.location.pathname : undefined,
      });

      stateRef.current = nextState;
      setState(nextState);

      const base = getEventBase(nextState);
      if (base) {
        emitEvent({
          ...base,
          title: nextState.title,
          type: "drawer_opened",
        });
      }
    },
    [emitEvent],
  );

  const close = useCallback(
    (reason: PreApprovalCloseReason = "programmatic") => {
      const current = stateRef.current;
      if (!current.isOpen) {
        return;
      }

      const base = getEventBase(current);
      if (base) {
        emitEvent({
          ...base,
          reason,
          type: "drawer_closed",
        });
      }

      const nextState = { ...current, isOpen: false };
      stateRef.current = nextState;
      setState(nextState);
    },
    [emitEvent],
  );

  const continueTo = useCallback(
    (href: string) => {
      const current = stateRef.current;
      if (!current.isOpen) {
        return;
      }

      const base = getEventBase(current);
      if (base) {
        emitEvent({
          ...base,
          href,
          type: "drawer_continued",
        });
      }
    },
    [emitEvent],
  );

  const reset = useCallback(
    (reason: PreApprovalCloseReason = "programmatic") => {
      const current = stateRef.current;
      if (current.isOpen) {
        const base = getEventBase(current);
        if (base) {
          emitEvent({
            ...base,
            reason,
            type: "drawer_closed",
          });
        }
      }

      const nextState = createClosedPreApprovalDrawerSession();
      stateRef.current = nextState;
      setState(nextState);
    },
    [emitEvent],
  );

  const setAmount = useCallback(
    (amount: number) => {
      const current = stateRef.current;
      if (current.amount === amount) {
        return;
      }

      const nextState = { ...current, amount };
      stateRef.current = nextState;
      setState(nextState);

      const base = getEventBase(nextState);
      if (base && current.isOpen) {
        emitEvent({
          ...base,
          type: "amount_changed",
        });
      }
    },
    [emitEvent],
  );

  const contextValue = useMemo<DrawerContextValue>(
    () => ({
      state,
      actions: { open, close, continueTo, reset, setAmount },
      meta: { triggerHash: preApprovalEntryHash },
    }),
    [close, continueTo, open, reset, setAmount, state],
  );

  return (
    <DrawerContext value={contextValue}>
      {children}
    </DrawerContext>
  );
}
