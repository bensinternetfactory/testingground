import { ProgramPageShell } from "../_components/ProgramPageShell";
import { deferredPaymentPageConfig } from "./config";

export const metadata = deferredPaymentPageConfig.metadata;

export default function DeferredPaymentTowTruckFinancingPage() {
  return <ProgramPageShell config={deferredPaymentPageConfig} />;
}
