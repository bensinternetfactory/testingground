export function clampToSlider(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getSliderValueForKey(
  key: string,
  currentValue: number,
  min: number,
  max: number,
  step: number,
): number | null {
  if (key === "ArrowRight" || key === "ArrowUp") {
    return Math.min(currentValue + step, max);
  }
  if (key === "ArrowLeft" || key === "ArrowDown") {
    return Math.max(currentValue - step, min);
  }
  if (key === "Home") return min;
  if (key === "End") return max;
  return null;
}

export function getBreakFillPct(
  breakevenTows: number,
  monthlyCalls: number,
): number {
  if (breakevenTows === Infinity) return 100;
  if (!Number.isFinite(monthlyCalls) || monthlyCalls <= 0) {
    return breakevenTows > 0 ? 100 : 0;
  }

  const ratio = (breakevenTows / monthlyCalls) * 100;
  return Math.min(Math.max(ratio, 0), 100);
}
