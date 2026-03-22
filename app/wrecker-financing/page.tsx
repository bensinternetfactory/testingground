import { EquipmentFinancingPageShell } from "@/app/_shared/equipment-financing/EquipmentFinancingPageShell";
import {
  wreckerFinancingPageConfig,
} from "@/app/_shared/equipment-financing/equipment-page-config";

export const metadata = wreckerFinancingPageConfig.metadata;

export default function WreckerFinancingPage() {
  return <EquipmentFinancingPageShell config={wreckerFinancingPageConfig} />;
}
