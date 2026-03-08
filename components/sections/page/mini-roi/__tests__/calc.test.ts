import { describe, it, expect } from "vitest";
import { miniRoiCalc } from "../calc";

describe("miniRoiCalc", () => {
  it("computes monthlyCalls from towsPerDay × daysPerMonth", () => {
    const r = miniRoiCalc(200, 1200, 3, 22);
    expect(r.monthlyCalls).toBe(66);
  });

  it("computes basic breakeven", () => {
    const r = miniRoiCalc(200, 1200, 3, 22);
    expect(r.breakevenTows).toBe(6); // ceil(1200/200)
  });

  it("computes monthly profit", () => {
    const r = miniRoiCalc(200, 1200, 3, 22);
    expect(r.monthlyProfit).toBe(12000); // (200×66) − 1200
  });

  it("computes annual profit", () => {
    const r = miniRoiCalc(200, 1200, 3, 22);
    expect(r.annualProfit).toBe(144000); // 12000 × 12
  });

  it("computes breakeven for high tow rate", () => {
    const r = miniRoiCalc(500, 1200, 3, 22);
    expect(r.breakevenTows).toBe(3); // ceil(1200/500)
  });

  it("flags weak state when breakeven exceeds monthly calls", () => {
    const r = miniRoiCalc(30, 5000, 3, 22);
    expect(r.breakevenTows).toBe(167); // ceil(5000/30)
    expect(r.isWeak).toBe(true);
  });

  it("returns Infinity breakeven and isWeak for zero revenue", () => {
    const r = miniRoiCalc(0, 1200, 3, 22);
    expect(r.breakevenTows).toBe(Infinity);
    expect(r.isWeak).toBe(true);
  });

  it("handles decimal tow rate", () => {
    const r = miniRoiCalc(175.5, 1200, 3, 22);
    expect(r.breakevenTows).toBe(7); // ceil(1200/175.5) = 7
  });

  it("is not weak when breakeven is within monthly calls", () => {
    const r = miniRoiCalc(200, 1200, 3, 22);
    expect(r.isWeak).toBe(false);
  });
});
