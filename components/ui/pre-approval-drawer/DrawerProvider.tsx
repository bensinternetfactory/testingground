"use client";

import type { ReactNode } from "react";
import { DrawerStateProvider, useDrawer } from "./DrawerContext";
import { DrawerHashListener } from "./DrawerHashListener";
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
