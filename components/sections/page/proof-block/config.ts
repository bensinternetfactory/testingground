export interface ProofBlockRow {
  feature: string;
  values: [boolean, boolean];
}

export interface ProofBlockConfig {
  kicker: string;
  headline: string;
  columns: [string, string];
  rows: ProofBlockRow[];
}

export const PROOF_BLOCK_CONFIG: ProofBlockConfig = {
  kicker: "THE DIFFERENCE",
  headline: "Why operators finance rollbacks through us",
  columns: ["TowLoans", "Most Lenders"],
  rows: [
    { feature: "Used truck financing", values: [true, true] },
    { feature: "Private seller deals", values: [true, false] },
    { feature: "Auction & marketplace deals", values: [true, false] },
    { feature: "No credit check pre-approval", values: [true, false] },
    {
      feature: "See payment range before full application",
      values: [true, false],
    },
    { feature: "$0 down available", values: [true, false] },
    { feature: "No dealer required", values: [true, false] },
    { feature: "Deferred payments up to 180 days", values: [true, false] },
  ],
};
