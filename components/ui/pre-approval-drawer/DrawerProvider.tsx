"use client";

import type { ReactNode } from "react";
import {
  DrawerStateProvider,
  useDrawer,
} from "@/features/pre-approval/drawer/runtime/context";
import { DrawerHashListener } from "@/features/pre-approval/drawer/runtime/hash-listener";
import { PreApprovalDrawer } from "./PreApprovalDrawer";

function DrawerProviderInner({ children }: { children: ReactNode }) {
  const { open } = useDrawer();
  return (
    <>
      <DrawerHashListener open={open} />
      {children}
      <PreApprovalDrawer />
    </>
  );
}

export function DrawerProvider({ children }: { children: ReactNode }) {
  return (
    <DrawerStateProvider>
      <DrawerProviderInner>{children}</DrawerProviderInner>
    </DrawerStateProvider>
  );
}
