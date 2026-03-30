import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/(marketing)/_components/MinimalNavPage";

export const metadata: Metadata = {
  title: "Private Party Tow Truck Financing | TowLoans",
  description: "Private party tow truck financing information from TowLoans.",
};

export default function PrivatePartyTowTruckFinancingPage() {
  return <MinimalNavPage title="Private Party Tow Truck Financing" />;
}
