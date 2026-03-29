import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/_shared/minimal-nav-page/MinimalNavPage";

export const metadata: Metadata = {
  title: "Tow Truck Financing Companies | TowLoans",
  description: "Tow truck financing companies guide placeholder from TowLoans.",
};

export default function TowTruckFinancingCompaniesPage() {
  return <MinimalNavPage title="Tow Truck Financing Companies" />;
}
