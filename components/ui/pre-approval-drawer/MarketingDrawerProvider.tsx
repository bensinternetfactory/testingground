"use client";

import type { ReactNode } from "react";
import { useDrawer } from "./DrawerContext";
import { DrawerProvider } from "./DrawerProvider";
import { RouteResetListener } from "./RouteResetListener";

function MarketingRouteSync() {
  const { open, reset } = useDrawer();
  return <RouteResetListener open={open} reset={reset} />;
}

export function MarketingDrawerProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DrawerProvider>
      <MarketingRouteSync />
      {children}
    </DrawerProvider>
  );
}
