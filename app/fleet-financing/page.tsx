import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/_shared/minimal-nav-page/MinimalNavPage";

export const metadata: Metadata = {
  title: "Fleet Financing | TowLoans",
  description: "Fleet financing information from TowLoans.",
};

export default function FleetFinancingPage() {
  return <MinimalNavPage title="Fleet Financing" />;
}
