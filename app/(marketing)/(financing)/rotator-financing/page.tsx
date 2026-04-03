import { EquipmentFinancingPageShell } from "../_components/EquipmentFinancingPageShell";
import { rotatorFinancingPageConfig } from "./config";

export const metadata = rotatorFinancingPageConfig.metadata;

export default function RotatorFinancingPage() {
  return <EquipmentFinancingPageShell config={rotatorFinancingPageConfig} />;
}
