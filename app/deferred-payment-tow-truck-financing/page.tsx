import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/_shared/minimal-nav-page/MinimalNavPage";

export const metadata: Metadata = {
  title: "Deferred Payment Tow Truck Financing | TowLoans",
  description:
    "Deferred payment tow truck financing information from TowLoans.",
};

export default function DeferredPaymentTowTruckFinancingPage() {
  return <MinimalNavPage title="Deferred Payment Tow Truck Financing" />;
}
