export interface TrustBridgeStep {
  number: string;
  title: string;
}

export interface TrustBridgeConfig {
  kicker: string;
  headline: string;
  steps: TrustBridgeStep[];
}

export const TRUST_BRIDGE_CONFIG: TrustBridgeConfig = {
  kicker: "HOW IT WORKS",
  headline: "Four steps. One straight answer.",
  steps: [
    { number: "1", title: "Select your rollback type" },
    { number: "2", title: "Set your financing amount" },
    { number: "3", title: "Answer a few questions" },
    { number: "4", title: "See your payment range" },
  ],
};
