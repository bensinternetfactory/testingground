import type { Metadata } from "next";
import { EquipmentFinancingPageShell } from "../_components/EquipmentFinancingPageShell";
import { usedTowTruckFinancingPageConfig } from "./config";

export const metadata: Metadata = {
  title: "Used Tow Truck Financing — No Age or Mileage Limits | TowLoans",
  description:
    "Finance a used tow truck from any seller — dealer, auction, private party, or Facebook Marketplace. No age limit. No mileage limit. Zero down available. Pre-approved in 30 seconds.",
  openGraph: {
    title: "Used Tow Truck Financing — No Age or Mileage Limits | TowLoans",
    description:
      "Used tow truck financing for rollbacks, wreckers, heavy wreckers, and rotators from any seller with no age or mileage restrictions.",
    type: "website",
  },
};

export default function UsedTowTruckFinancingPage() {
  return <EquipmentFinancingPageShell config={usedTowTruckFinancingPageConfig} />;
}
