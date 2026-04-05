import { ProgramPageShell } from "../_components/ProgramPageShell";
import { privatePartyPageConfig } from "./config";

export const metadata = privatePartyPageConfig.metadata;

export default function PrivatePartyTowTruckFinancingPage() {
  return <ProgramPageShell config={privatePartyPageConfig} />;
}
