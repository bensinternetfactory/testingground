import { describe, it, expect } from "vitest";
import { clampToSlider, getBreakFillPct, getSliderValueForKey } from "../math";

describe("mini-roi math helpers", () => {
  it("clamps slider values to min/max", () => {
    expect(clampToSlider(10, 30, 500)).toBe(30);
    expect(clampToSlider(200, 30, 500)).toBe(200);
    expect(clampToSlider(900, 30, 500)).toBe(500);
  });

  it("returns 100 for Infinity breakeven", () => {
    expect(getBreakFillPct(Infinity, 66)).toBe(100);
  });

  it("guards zero or invalid monthly calls", () => {
    expect(getBreakFillPct(6, 0)).toBe(100);
    expect(getBreakFillPct(0, 0)).toBe(0);
    expect(getBreakFillPct(6, Number.NaN)).toBe(100);
  });

  it("returns bounded percentage when calls are valid", () => {
    expect(getBreakFillPct(6, 66)).toBeCloseTo(9.09, 2);
    expect(getBreakFillPct(120, 66)).toBe(100);
  });

  it("maps keyboard keys to bounded slider values", () => {
    expect(getSliderValueForKey("ArrowRight", 200, 30, 500, 10)).toBe(210);
    expect(getSliderValueForKey("ArrowLeft", 30, 30, 500, 10)).toBe(30);
    expect(getSliderValueForKey("Home", 200, 30, 500, 10)).toBe(30);
    expect(getSliderValueForKey("End", 200, 30, 500, 10)).toBe(500);
    expect(getSliderValueForKey("Tab", 200, 30, 500, 10)).toBeNull();
  });
});
