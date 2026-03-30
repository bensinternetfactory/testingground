import { EquipmentFinancingPageShell } from "../_components/EquipmentFinancingPageShell";
import { rollbackFinancingPageConfig } from "./config";

export const metadata = rollbackFinancingPageConfig.metadata;

export default function RollbackFinancingPage() {
  return <EquipmentFinancingPageShell config={rollbackFinancingPageConfig} />;
}
