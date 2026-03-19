import type { Metadata } from "next";
import { HeroConvertFramed } from "@/components/sections/heroes/hero-convert-framed";
import { RollbackFinancingPageShell } from "./_shared/RollbackFinancingPageShell";
import { rollbackHeroConfig } from "./_shared/rollback-page-data";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Rollback Financing — Pre-Approved in 30 Seconds | TowLoans",
  description:
    "Finance any rollback tow truck — used, private seller, or auction. Pre-approved in 30 seconds with no credit check. Deferred payments up to 180 days. $0 down available.",
  openGraph: {
    title: "Rollback Financing — Pre-Approved in 30 Seconds | TowLoans",
    description:
      "Used trucks, private sellers, auction units. Pre-approved in 30 seconds with no credit check.",
    type: "website",
  },
};

export default function RollbackFinancingPage() {
  return (
    <RollbackFinancingPageShell
      hero={<HeroConvertFramed config={rollbackHeroConfig} />}
    />
  );
}
