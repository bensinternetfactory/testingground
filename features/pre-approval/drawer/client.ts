"use client";

import { createElement, type ReactNode } from "react";
import { DrawerProvider } from "@/components/ui/pre-approval-drawer/DrawerProvider";
import { useDrawer } from "@/components/ui/pre-approval-drawer/DrawerContext";
import { MarketingDrawerProvider } from "@/components/ui/pre-approval-drawer/MarketingDrawerProvider";
import type { PreApprovalEvent } from "../contract";

export function PreApprovalDrawerRoot({
  children,
}: {
  children: ReactNode;
  onEvent?: (event: PreApprovalEvent) => void;
}) {
  return createElement(MarketingDrawerProvider, null, children);
}

export { DrawerProvider, MarketingDrawerProvider, useDrawer };
