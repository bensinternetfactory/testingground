import type { Metadata } from "next";
import { EquipmentFinancingPageShell } from "../_components/EquipmentFinancingPageShell";
import { wreckerFinancingPageConfig } from "./config";

export const metadata: Metadata = {
  title: "Wrecker Financing — Pre-Approved in 30 Seconds | TowLoans",
  description:
    "Finance light-duty wreckers and heavy wreckers with zero down options, longer terms on used units, up to 84 months on new, and deferred payments up to 180 days.",
  openGraph: {
    title: "Wrecker Financing — Pre-Approved in 30 Seconds | TowLoans",
    description:
      "Commercial wrecker financing for light-duty, heavy-duty recovery, used, private seller, and fleet expansion deals.",
    type: "website",
  },
};

export default function WreckerFinancingPage() {
  return <EquipmentFinancingPageShell config={wreckerFinancingPageConfig} />;
}
