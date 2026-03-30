import { EquipmentFinancingPageShell } from "../_components/EquipmentFinancingPageShell";
import {
  wreckerFinancingPageConfig,
} from "../_components/equipment-page-config";

export const metadata = wreckerFinancingPageConfig.metadata;

export default function WreckerFinancingPage() {
  return <EquipmentFinancingPageShell config={wreckerFinancingPageConfig} />;
}
