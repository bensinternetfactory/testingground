import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/(marketing)/_components/MinimalNavPage";

export const metadata: Metadata = {
  title: "Used Tow Truck Financing | TowLoans",
  description: "Used tow truck financing information from TowLoans.",
};

export default function UsedTowTruckFinancingPage() {
  return <MinimalNavPage title="Used Tow Truck Financing" />;
}
