import { PreApprovalDrawerRoot } from "@/features/pre-approval/drawer/client";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PreApprovalDrawerRoot>{children}</PreApprovalDrawerRoot>;
}
