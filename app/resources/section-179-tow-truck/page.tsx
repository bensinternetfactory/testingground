import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/_shared/minimal-nav-page/MinimalNavPage";

export const metadata: Metadata = {
  title: "Section 179 Tow Truck Guide | TowLoans",
  description: "Section 179 tow truck guide placeholder from TowLoans.",
};

export default function Section179TowTruckPage() {
  return <MinimalNavPage title="Section 179 Tow Truck Guide" />;
}
