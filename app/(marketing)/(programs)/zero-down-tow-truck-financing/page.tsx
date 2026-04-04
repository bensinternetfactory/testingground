import { ProgramPageShell } from "../_components/ProgramPageShell";
import { zeroDownPageConfig } from "./config";

export const metadata = zeroDownPageConfig.metadata;

export default function ZeroDownTowTruckFinancingPage() {
  return <ProgramPageShell config={zeroDownPageConfig} />;
}
