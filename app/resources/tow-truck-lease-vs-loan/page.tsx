import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/_shared/minimal-nav-page/MinimalNavPage";

export const metadata: Metadata = {
  title: "Tow Truck Lease vs Loan | TowLoans",
  description: "Tow truck lease versus loan guide placeholder from TowLoans.",
};

export default function TowTruckLeaseVsLoanPage() {
  return <MinimalNavPage title="Tow Truck Lease vs Loan" />;
}
