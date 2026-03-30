import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/(marketing)/_components/MinimalNavPage";

export const metadata: Metadata = {
  title: "Zero Down Tow Truck Financing | TowLoans",
  description: "Zero down tow truck financing information from TowLoans.",
};

export default function ZeroDownTowTruckFinancingPage() {
  return <MinimalNavPage title="Zero Down Tow Truck Financing" />;
}
