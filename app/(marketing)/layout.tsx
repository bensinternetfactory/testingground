import { MarketingDrawerProvider } from "@/components/ui/pre-approval-drawer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingDrawerProvider>{children}</MarketingDrawerProvider>;
}
