const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatUSD(value: number): string {
  return CURRENCY_FORMATTER.format(Math.round(value));
}

export function parseCurrencyInput(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "");
  if (cleaned.length === 0) return null;

  const parsed = Number.parseFloat(cleaned);
  if (!Number.isFinite(parsed)) return null;

  return parsed;
}
