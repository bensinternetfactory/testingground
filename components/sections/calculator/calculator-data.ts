// calculator-data.ts — Default values, types, and calculation helpers
// for the Tow Truck ROI & Cash Flow Calculator.

// ── Types ──────────────────────────────────────────────────────────

export interface CalculatorInputs {
  // Section 1: Truck & Financing
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  termMonths: number;
  knowsPayment: boolean; // true = "I know my payment"
  manualPayment: number; // used when knowsPayment is true
  startupCosts: number;
  startupWrap: number;
  startupTools: number;
  startupLicensing: number;
  startupOther: number;

  // Section 2: Revenue
  revenuePerTow: number;
  towsPerDay: number;
  daysPerMonth: number;
  extraRevenuePerCall: number;

  // Section 3: Driver Costs
  hasDriver: boolean;
  driverPayType: "percentage" | "hourly";
  driverPercentage: number;
  driverHourlyRate: number;
  payrollBurden: number;

  // Section 4: Operating Expenses
  fuel: number;
  insurance: number;
  maintenance: number;
  yardStorage: number;
  softwareDispatch: number;
  miscOverhead: number;
}

export interface CalculatorResults {
  monthlyCalls: number;
  monthlyRevenue: number;
  driverCost: number;
  totalOpEx: number;
  monthlyPayment: number;
  netMonthlyCashFlow: number;
  annualProfit: number;
  cashInvested: number;
  roiPercent: number;
  paybackMonths: number;
  breakevenCalls: number;
  profitPerCall: number;
  operatingMargin: number;
  effectiveAPR: number | null; // null when using estimated rate
}

// ── Defaults ───────────────────────────────────────────────────────

export const DEFAULTS: CalculatorInputs = {
  purchasePrice: 65000,
  downPayment: 6500,
  interestRate: 8.5,
  termMonths: 60,
  knowsPayment: false,
  manualPayment: 1200,
  startupCosts: 5000,
  startupWrap: 2000,
  startupTools: 1500,
  startupLicensing: 500,
  startupOther: 1000,

  revenuePerTow: 200,
  towsPerDay: 3,
  daysPerMonth: 22,
  extraRevenuePerCall: 25,

  hasDriver: false,
  driverPayType: "percentage",
  driverPercentage: 25,
  driverHourlyRate: 18,
  payrollBurden: 15,

  fuel: 1200,
  insurance: 800,
  maintenance: 400,
  yardStorage: 300,
  softwareDispatch: 150,
  miscOverhead: 200,
};

// ── Term options ───────────────────────────────────────────────────

export const TERM_OPTIONS = [24, 36, 48, 60, 72, 84] as const;

// ── URL param keys ─────────────────────────────────────────────────

export const URL_KEYS: Record<keyof CalculatorInputs, string> = {
  purchasePrice: "price",
  downPayment: "down",
  interestRate: "rate",
  termMonths: "term",
  knowsPayment: "known",
  manualPayment: "pmt",
  startupCosts: "startup",
  startupWrap: "swrap",
  startupTools: "stools",
  startupLicensing: "slic",
  startupOther: "sother",
  revenuePerTow: "rev",
  towsPerDay: "tpd",
  daysPerMonth: "dpm",
  extraRevenuePerCall: "extra",
  hasDriver: "driver",
  driverPayType: "dpay",
  driverPercentage: "dpct",
  driverHourlyRate: "dhr",
  payrollBurden: "pb",
  fuel: "fuel",
  insurance: "ins",
  maintenance: "maint",
  yardStorage: "yard",
  softwareDispatch: "sw",
  miscOverhead: "misc",
};

// ── Calculation helpers ────────────────────────────────────────────

/** Standard amortization formula: monthly payment given principal, annual rate, months */
export function calcMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number,
): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRate <= 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1);
}

/** Newton-Raphson to back-calculate effective APR from a known payment */
export function calcEffectiveAPR(
  principal: number,
  payment: number,
  months: number,
): number | null {
  if (principal <= 0 || payment <= 0 || months <= 0) return null;
  // If payment would never cover principal
  if (payment * months <= principal) return null;

  let r = 0.08 / 12; // initial guess: 8% APR
  for (let i = 0; i < 100; i++) {
    const rn = Math.pow(1 + r, months);
    const f = principal * (r * rn) / (rn - 1) - payment;
    // derivative of f with respect to r
    const df =
      principal *
      ((rn + r * months * Math.pow(1 + r, months - 1)) * (rn - 1) -
        r * rn * months * Math.pow(1 + r, months - 1)) /
      ((rn - 1) * (rn - 1));

    if (Math.abs(df) < 1e-14) break;
    const rNew = r - f / df;
    if (Math.abs(rNew - r) < 1e-10) {
      r = rNew;
      break;
    }
    r = rNew;
    if (r <= 0) r = 0.001 / 12; // guard against negative
  }
  return r * 12 * 100; // annual percentage
}

/** Compute all derived results from inputs */
export function computeResults(inputs: CalculatorInputs): CalculatorResults {
  const monthlyCalls = inputs.towsPerDay * inputs.daysPerMonth;
  const monthlyRevenue =
    inputs.revenuePerTow * monthlyCalls +
    inputs.extraRevenuePerCall * monthlyCalls;

  // Driver cost
  let driverCost = 0;
  if (inputs.hasDriver) {
    const burdenMult = 1 + inputs.payrollBurden / 100;
    if (inputs.driverPayType === "percentage") {
      driverCost = monthlyRevenue * (inputs.driverPercentage / 100) * burdenMult;
    } else {
      driverCost = inputs.driverHourlyRate * 8 * inputs.daysPerMonth * burdenMult;
    }
  }

  // OpEx
  const totalOpEx =
    inputs.fuel +
    inputs.insurance +
    inputs.maintenance +
    inputs.yardStorage +
    inputs.softwareDispatch +
    inputs.miscOverhead;

  // Payment
  const principal = inputs.purchasePrice - inputs.downPayment;
  let monthlyPayment: number;
  let effectiveAPR: number | null = null;

  if (inputs.knowsPayment) {
    monthlyPayment = inputs.manualPayment;
    effectiveAPR = calcEffectiveAPR(principal, inputs.manualPayment, inputs.termMonths);
  } else {
    monthlyPayment = calcMonthlyPayment(principal, inputs.interestRate, inputs.termMonths);
  }

  const netMonthlyCashFlow = monthlyRevenue - driverCost - totalOpEx - monthlyPayment;
  const annualProfit = netMonthlyCashFlow * 12;
  const cashInvested = inputs.downPayment + inputs.startupCosts;
  const roiPercent = cashInvested > 0 ? (annualProfit / cashInvested) * 100 : 0;
  const paybackMonths = netMonthlyCashFlow > 0 ? cashInvested / netMonthlyCashFlow : Infinity;

  // Breakeven calls: (OpEx + Payment + Driver Fixed) / net revenue per call
  const netRevenuePerCall = inputs.revenuePerTow + inputs.extraRevenuePerCall;
  let variableCostPerCall = 0;
  if (inputs.hasDriver && inputs.driverPayType === "percentage") {
    variableCostPerCall =
      netRevenuePerCall * (inputs.driverPercentage / 100) * (1 + inputs.payrollBurden / 100);
  }
  const fixedMonthlyCosts =
    totalOpEx +
    monthlyPayment +
    (inputs.hasDriver && inputs.driverPayType === "hourly"
      ? inputs.driverHourlyRate * 8 * inputs.daysPerMonth * (1 + inputs.payrollBurden / 100)
      : 0);

  const netPerCall = netRevenuePerCall - variableCostPerCall;
  const breakevenCalls = netPerCall > 0 ? Math.ceil(fixedMonthlyCosts / netPerCall) : Infinity;

  const profitPerCall = monthlyCalls > 0 ? netMonthlyCashFlow / monthlyCalls : 0;
  const operatingMargin = monthlyRevenue > 0 ? (netMonthlyCashFlow / monthlyRevenue) * 100 : 0;

  return {
    monthlyCalls,
    monthlyRevenue,
    driverCost,
    totalOpEx,
    monthlyPayment,
    netMonthlyCashFlow,
    annualProfit,
    cashInvested,
    roiPercent,
    paybackMonths,
    breakevenCalls,
    profitPerCall,
    operatingMargin,
    effectiveAPR,
  };
}
