"use client";

import type { ReactNode } from "react";
import { PreApprovalDrawerRoot } from "@/features/pre-approval/drawer/client";

export function MarketingDrawerProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <PreApprovalDrawerRoot>{children}</PreApprovalDrawerRoot>;
}
