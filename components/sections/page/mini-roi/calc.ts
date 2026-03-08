export interface MiniRoiResult {
  monthlyCalls: number;
  monthlyRevenue: number;
  breakevenTows: number;
  monthlyProfit: number;
  annualProfit: number;
  isWeak: boolean;
}

export function miniRoiCalc(
  revenuePerTow: number,
  monthlyPayment: number,
  towsPerDay: number,
  daysPerMonth: number,
): MiniRoiResult {
  const monthlyCalls = towsPerDay * daysPerMonth;
  const monthlyRevenue = revenuePerTow * monthlyCalls;
  const breakevenTows =
    revenuePerTow <= 0 ? Infinity : Math.ceil(monthlyPayment / revenuePerTow);
  const monthlyProfit = monthlyRevenue - monthlyPayment;
  const annualProfit = monthlyProfit * 12;
  const isWeak = breakevenTows > monthlyCalls || revenuePerTow <= 0;

  return {
    monthlyCalls,
    monthlyRevenue,
    breakevenTows,
    monthlyProfit,
    annualProfit,
    isWeak,
  };
}
