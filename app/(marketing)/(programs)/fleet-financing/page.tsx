import { ProgramPageShell } from "../_components/ProgramPageShell";
import { fleetFinancingPageConfig } from "./config";

export const metadata = fleetFinancingPageConfig.metadata;

export default function FleetFinancingPage() {
  return <ProgramPageShell config={fleetFinancingPageConfig} />;
}
