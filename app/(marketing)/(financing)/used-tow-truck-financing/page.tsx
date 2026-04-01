import type { Metadata } from "next";
import { EquipmentFinancingPageShell } from "../_components/EquipmentFinancingPageShell";
import { usedTowTruckFinancingPageConfig } from "./config";

export const metadata: Metadata = usedTowTruckFinancingPageConfig.metadata;

export default function UsedTowTruckFinancingPage() {
  return <EquipmentFinancingPageShell config={usedTowTruckFinancingPageConfig} />;
}
