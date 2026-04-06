"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DrawerProvider } from "./DrawerProvider";

export function MarketingDrawerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return <DrawerProvider key={pathname}>{children}</DrawerProvider>;
}
