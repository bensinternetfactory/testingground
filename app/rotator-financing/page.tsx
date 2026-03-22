import { EquipmentFinancingPageShell } from "@/app/_shared/equipment-financing/EquipmentFinancingPageShell";
import {
  rotatorFinancingPageConfig,
} from "@/app/_shared/equipment-financing/equipment-page-config";

export const metadata = rotatorFinancingPageConfig.metadata;

export default function RotatorFinancingPage() {
  return <EquipmentFinancingPageShell config={rotatorFinancingPageConfig} />;
}
