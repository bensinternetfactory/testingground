import type { Metadata } from "next";
import { EquipmentFinancingPageShell } from "../_components/EquipmentFinancingPageShell";
import { rotatorFinancingPageConfig } from "./config";

export const metadata: Metadata = {
  title: "Rotator Financing — Pre-Approved in 30 Seconds | TowLoans",
  description:
    "Finance heavy-recovery rotators with zero down options, up to 84 months on new, longer terms on used units, and deferred payments up to 180 days.",
  openGraph: {
    title: "Rotator Financing — Pre-Approved in 30 Seconds | TowLoans",
    description:
      "Commercial rotator financing for heavy-recovery replacement units, used deals, operator-to-operator sales, and fleet expansion.",
    type: "website",
  },
};

export default function RotatorFinancingPage() {
  return <EquipmentFinancingPageShell config={rotatorFinancingPageConfig} />;
}
