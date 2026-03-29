import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/_shared/minimal-nav-page/MinimalNavPage";

export const metadata: Metadata = {
  title: "How Much Does a Tow Truck Cost? | TowLoans",
  description: "Tow truck cost guide placeholder from TowLoans.",
};

export default function HowMuchDoesATowTruckCostPage() {
  return <MinimalNavPage title="How Much Does a Tow Truck Cost?" />;
}
