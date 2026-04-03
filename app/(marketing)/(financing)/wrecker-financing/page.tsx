import { EquipmentFinancingPageShell } from "../_components/EquipmentFinancingPageShell";
import { wreckerFinancingPageConfig } from "./config";

export const metadata = wreckerFinancingPageConfig.metadata;

export default function WreckerFinancingPage() {
  return <EquipmentFinancingPageShell config={wreckerFinancingPageConfig} />;
}
