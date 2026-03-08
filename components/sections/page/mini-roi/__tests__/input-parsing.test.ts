import { describe, it, expect } from "vitest";
import { parseCurrencyInput } from "../currency";
import { parseTowRate } from "../TowRateField";
import { parseDollars } from "../PaymentField";

describe("mini-roi input parsing", () => {
  it("parses standard currency-like input", () => {
    expect(parseCurrencyInput("$1,250")).toBe(1250);
    expect(parseCurrencyInput(" 175.5 ")).toBe(175.5);
  });

  it("rejects non-finite and empty values", () => {
    expect(parseCurrencyInput("")).toBeNull();
    expect(parseCurrencyInput("1e309")).toBeNull();
    expect(parseCurrencyInput("Infinity")).toBeNull();
  });

  it("tow-rate parser falls back on invalid values", () => {
    expect(parseTowRate("0", 200)).toBe(200);
    expect(parseTowRate("abc", 200)).toBe(200);
    expect(parseTowRate("1e309", 200)).toBe(200);
  });

  it("payment parser clamps into supported bounds", () => {
    expect(parseDollars("5", 1200)).toBe(30);
    expect(parseDollars("7000", 1200)).toBe(5000);
    expect(parseDollars("1e309", 1200)).toBe(1200);
  });
});
