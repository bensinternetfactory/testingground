"use client";

import {
  Component,
  useCallback,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { DrawerHashListener } from "@/components/ui/pre-approval-drawer/DrawerHashListener";
import {
  DrawerStateProvider,
  useDrawer,
} from "@/components/ui/pre-approval-drawer/DrawerContext";
import { PreApprovalDrawer } from "@/components/ui/pre-approval-drawer/PreApprovalDrawer";
import { RouteResetListener } from "@/components/ui/pre-approval-drawer/RouteResetListener";
import type {
  PreApprovalCloseReason,
  PreApprovalEvent,
  PreApprovalTrigger,
} from "../contract";

class PreApprovalDrawerRuntimeBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  override state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("PreApprovalDrawer runtime failed", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

function PreApprovalDrawerRuntime() {
  const { open, reset } = useDrawer();

  return (
    <>
      <DrawerHashListener open={open} />
      <RouteResetListener open={open} reset={reset} />
      <PreApprovalDrawer />
    </>
  );
}

export function PreApprovalDrawerRoot({
  children,
  onEvent,
}: {
  children: ReactNode;
  onEvent?: (event: PreApprovalEvent) => void;
}) {
  return (
    <DrawerStateProvider onEvent={onEvent}>
      <PreApprovalDrawerRuntimeBoundary>
        <PreApprovalDrawerRuntime />
      </PreApprovalDrawerRuntimeBoundary>
      {children}
    </DrawerStateProvider>
  );
}

export function useOpenPreApproval() {
  const { open } = useDrawer();

  return useCallback(
    (trigger: PreApprovalTrigger) => {
      open(trigger);
    },
    [open],
  );
}

export function usePreApprovalSession(): {
  amount: number;
  close: (reason?: PreApprovalCloseReason) => void;
  isOpen: boolean;
  origin: ReturnType<typeof useDrawer>["origin"] | null;
  setAmount: (amount: number) => void;
  title: string;
  truckType?: ReturnType<typeof useDrawer>["truckType"];
} {
  const { amount, close, isOpen, origin, setAmount, title, truckType } =
    useDrawer();

  return {
    amount,
    close,
    isOpen,
    origin: isOpen ? origin : null,
    setAmount,
    title,
    truckType,
  };
}
