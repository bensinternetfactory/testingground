import type { Metadata } from "next";
import { EquipmentFinancingPageShell } from "../_components/EquipmentFinancingPageShell";
import { rollbackFinancingPageConfig } from "./config";

export const metadata: Metadata = {
  title: "Rollback Financing — Pre-Approved in 30 Seconds | TowLoans",
  description:
    "Finance rollback tow trucks with zero down options, up to 84 months on new, longer terms on used trucks, and deferred payments up to 180 days.",
  openGraph: {
    title: "Rollback Financing — Pre-Approved in 30 Seconds | TowLoans",
    description:
      "Used, private seller, auction, and fleet rollback deals with fast pre-approval and commercial tow truck financing options.",
    type: "website",
  },
};

export default function RollbackFinancingPage() {
  return <EquipmentFinancingPageShell config={rollbackFinancingPageConfig} />;
}
