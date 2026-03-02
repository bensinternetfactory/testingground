"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  type CalculatorInputs,
  type CalculatorResults,
  DEFAULTS,
  TERM_OPTIONS,
  URL_KEYS,
  computeResults,
} from "./calculator-data";

// ── Helpers ────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}
function fmtDollars(n: number): string {
  if (!isFinite(n)) return "—";
  return "$" + fmt(Math.round(n));
}
function fmtPct(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toFixed(1) + "%";
}
function fmtMonths(n: number): string {
  if (!isFinite(n) || n <= 0) return "—";
  if (n < 1) return "< 1 mo";
  return n.toFixed(1) + " mo";
}

function cashFlowColor(net: number): "green" | "yellow" | "red" {
  if (net > 1000) return "green";
  if (net > 0) return "yellow";
  return "red";
}

const COLOR_CLASSES = {
  green: "bg-[#101820] text-[#22C55E] border-t-2 border-[#22C55E]",
  yellow: "bg-[#101820] text-amber-400 border-t-2 border-amber-400",
  red: "bg-[#101820] text-[#EF4444] border-t-2 border-[#EF4444]",
} as const;

// ── URL state helpers ──────────────────────────────────────────────

function readInputsFromURL(params: URLSearchParams): Partial<CalculatorInputs> {
  const result: Partial<CalculatorInputs> = {};
  for (const [key, urlKey] of Object.entries(URL_KEYS)) {
    const val = params.get(urlKey);
    if (val === null) continue;
    const k = key as keyof CalculatorInputs;
    if (k === "knowsPayment" || k === "hasDriver") {
      (result as Record<string, boolean>)[k] = val === "1";
    } else if (k === "driverPayType") {
      if (val === "percentage" || val === "hourly") result.driverPayType = val;
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) (result as Record<string, number>)[k] = num;
    }
  }
  return result;
}

function writeInputsToURL(inputs: CalculatorInputs): string {
  const params = new URLSearchParams();
  for (const [key, urlKey] of Object.entries(URL_KEYS)) {
    const k = key as keyof CalculatorInputs;
    const val = inputs[k];
    const def = DEFAULTS[k];
    if (val === def) continue; // skip defaults
    if (typeof val === "boolean") {
      params.set(urlKey, val ? "1" : "0");
    } else {
      params.set(urlKey, String(val));
    }
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

// ── Input Components ───────────────────────────────────────────────

function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step,
  hint,
  id,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#545454]">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#545454]">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value || ""}
          min={min}
          max={max}
          step={step ?? 1}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`w-full rounded-xl border border-[#E9E9E9] bg-[#FAFAFA] py-3 text-[#101820] focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] focus:outline-none ${prefix ? "pl-8 pr-4" : "px-4"} ${suffix ? "pr-14" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#545454]">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-[#545454]">{hint}</p>}
    </div>
  );
}

function ToggleSwitch({
  label,
  checked,
  onChange,
  id,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="text-sm font-medium text-[#545454]">
        {label}
      </label>
      <button
        id={id}
        role="switch"
        type="button"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${checked ? "bg-[#22C55E]" : "bg-[#E9E9E9]"}`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}

function SectionHeading({ children, step }: { children: React.ReactNode; step?: number }) {
  return (
    <h3 className="mb-4 flex items-center gap-2.5 text-sm font-medium uppercase tracking-wide text-[#545454]">
      {step && (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22C55E] text-xs font-semibold text-white">
          {step}
        </span>
      )}
      {children}
    </h3>
  );
}

// ── Conversion CTA Logic ───────────────────────────────────────────

function getConversionMessage(
  inputs: CalculatorInputs,
  results: CalculatorResults,
): { message: string; cta: string } {
  const color = cashFlowColor(results.netMonthlyCashFlow);

  if (color === "red") {
    return {
      message:
        "At these numbers, the truck doesn\u2019t cash flow. Adjusting your down payment or finding a better rate could change that.",
      cta: "See What Rates You Qualify For",
    };
  }
  if (color === "yellow") {
    return {
      message:
        "The truck cash flows, but the margin is thin. A lower payment could give you more breathing room.",
      cta: "See If You Qualify for Better Terms",
    };
  }
  if (inputs.knowsPayment && results.effectiveAPR !== null) {
    if (results.effectiveAPR > 9) {
      return {
        message:
          "Based on this structure, we may be able to lower your monthly payment and increase your cash flow.",
        cta: "See If You Qualify for Better Terms",
      };
    }
    return {
      message:
        "You\u2019re in a solid spot. Want to see if you qualify for even better terms?",
      cta: "Check Your Rate in Minutes",
    };
  }
  return {
    message:
      "This payment is an estimate. Rates and structures vary \u2014 see what you actually qualify for.",
    cta: "Get Pre-Qualified",
  };
}

// ── Main Component ─────────────────────────────────────────────────

export function Calculator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // State
  const [inputs, setInputs] = useState<CalculatorInputs>(() => ({
    ...DEFAULTS,
    ...readInputsFromURL(searchParams),
  }));
  const [showStartupBreakdown, setShowStartupBreakdown] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [showMobileResults, setShowMobileResults] = useState(false);

  // Derived
  const results = useMemo(() => computeResults(inputs), [inputs]);
  const color = cashFlowColor(results.netMonthlyCashFlow);
  const conversion = useMemo(
    () => getConversionMessage(inputs, results),
    [inputs, results],
  );

  // Update a single field
  const set = useCallback(<K extends keyof CalculatorInputs>(key: K, val: CalculatorInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  }, []);

  // URL sync — write on change (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const qs = writeInputsToURL(inputs);
    router.replace(pathname + qs, { scroll: false });
  }, [inputs, router, pathname]);

  // Sync startup costs from breakdown when expanded
  const updateStartupFromBreakdown = useCallback(
    (field: "startupWrap" | "startupTools" | "startupLicensing" | "startupOther", val: number) => {
      setInputs((prev) => {
        const next = { ...prev, [field]: val };
        next.startupCosts = next.startupWrap + next.startupTools + next.startupLicensing + next.startupOther;
        return next;
      });
    },
    [],
  );

  // Email submit (UI only)
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) setEmailSent(true);
  };

  const totalOpEx =
    inputs.fuel + inputs.insurance + inputs.maintenance + inputs.yardStorage + inputs.softwareDispatch + inputs.miscOverhead;

  return (
    <div className="relative">
      {/* Desktop: two-column grid · Mobile: stacked */}
      <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
        {/* ═════════════════ LEFT COLUMN: INPUTS ═════════════════ */}
        <div className="space-y-8">
          {/* ── Section 1: Truck & Financing ── */}
          <div className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] sm:p-8">
            <SectionHeading step={1}>Truck &amp; Financing</SectionHeading>

            <div className="mb-6">
              <ToggleSwitch
                id="knows-payment"
                label="I know my monthly payment"
                checked={inputs.knowsPayment}
                onChange={(v) => set("knowsPayment", v)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                id="purchase-price"
                label="Purchase Price"
                prefix="$"
                value={inputs.purchasePrice}
                onChange={(v) => set("purchasePrice", v)}
                min={0}
              />
              <NumberInput
                id="down-payment"
                label="Down Payment"
                prefix="$"
                value={inputs.downPayment}
                onChange={(v) => set("downPayment", v)}
                min={0}
              />

              {inputs.knowsPayment ? (
                <NumberInput
                  id="manual-payment"
                  label="Monthly Payment"
                  prefix="$"
                  value={inputs.manualPayment}
                  onChange={(v) => set("manualPayment", v)}
                  min={0}
                />
              ) : (
                <NumberInput
                  id="interest-rate"
                  label="Interest Rate"
                  suffix="%"
                  value={inputs.interestRate}
                  onChange={(v) => set("interestRate", v)}
                  min={0}
                  max={30}
                  step={0.1}
                />
              )}

              <div>
                <label htmlFor="term-months" className="mb-1.5 block text-sm font-medium text-[#545454]">
                  Loan Term
                </label>
                <select
                  id="term-months"
                  value={inputs.termMonths}
                  onChange={(e) => set("termMonths", parseInt(e.target.value))}
                  className="w-full rounded-xl border border-[#E9E9E9] bg-[#FAFAFA] px-4 py-3 text-[#101820] focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] focus:outline-none"
                >
                  {TERM_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t} months ({t / 12} years)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Startup costs */}
            <div className="mt-6 border-t border-[#E9E9E9] pt-6">
              <div className="flex items-center justify-between">
                <NumberInput
                  id="startup-costs"
                  label="Startup Costs"
                  prefix="$"
                  value={inputs.startupCosts}
                  onChange={(v) => set("startupCosts", v)}
                  min={0}
                  hint="Wrap, tools, licensing — one-time out-of-pocket"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowStartupBreakdown(!showStartupBreakdown)}
                className="mt-2 text-sm font-medium text-[#101820] underline decoration-[#E9E9E9] underline-offset-4 hover:decoration-[#101820]"
                aria-expanded={showStartupBreakdown}
              >
                {showStartupBreakdown ? "Hide breakdown" : "See breakdown"}
              </button>
              <AnimatePresence>
                {showStartupBreakdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <NumberInput
                        id="startup-wrap"
                        label="Wrap / Lettering"
                        prefix="$"
                        value={inputs.startupWrap}
                        onChange={(v) => updateStartupFromBreakdown("startupWrap", v)}
                        min={0}
                      />
                      <NumberInput
                        id="startup-tools"
                        label="Tools & Equipment"
                        prefix="$"
                        value={inputs.startupTools}
                        onChange={(v) => updateStartupFromBreakdown("startupTools", v)}
                        min={0}
                      />
                      <NumberInput
                        id="startup-licensing"
                        label="Licensing & Permits"
                        prefix="$"
                        value={inputs.startupLicensing}
                        onChange={(v) => updateStartupFromBreakdown("startupLicensing", v)}
                        min={0}
                      />
                      <NumberInput
                        id="startup-other"
                        label="Other"
                        prefix="$"
                        value={inputs.startupOther}
                        onChange={(v) => updateStartupFromBreakdown("startupOther", v)}
                        min={0}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Section 2: Revenue ── */}
          <div className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] sm:p-8">
            <SectionHeading step={2}>Revenue</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                id="rev-per-tow"
                label="Revenue per Tow"
                prefix="$"
                value={inputs.revenuePerTow}
                onChange={(v) => set("revenuePerTow", v)}
                min={0}
              />
              <NumberInput
                id="tows-per-day"
                label="Tows per Day"
                value={inputs.towsPerDay}
                onChange={(v) => set("towsPerDay", v)}
                min={0}
                step={0.5}
              />
              <NumberInput
                id="days-per-month"
                label="Days per Month"
                value={inputs.daysPerMonth}
                onChange={(v) => set("daysPerMonth", v)}
                min={0}
                max={31}
              />
              <NumberInput
                id="extra-rev"
                label="Extra Revenue per Call"
                prefix="$"
                value={inputs.extraRevenuePerCall}
                onChange={(v) => set("extraRevenuePerCall", v)}
                min={0}
                hint="Storage, winching, mileage charges"
              />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#545454]">
              Most operators average 2&ndash;5 tows per day depending on market and contracts.
            </p>
          </div>

          {/* ── Section 3: Driver Costs ── */}
          <div className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] sm:p-8">
            <SectionHeading step={3}>Driver Costs</SectionHeading>
            <ToggleSwitch
              id="has-driver"
              label="I&rsquo;m hiring a driver for this truck"
              checked={inputs.hasDriver}
              onChange={(v) => set("hasDriver", v)}
            />
            {!inputs.hasDriver && (
              <p className="mt-2 text-xs text-[#545454]">
                Owner-operator &mdash; no driver cost applied.
              </p>
            )}
            <AnimatePresence>
              {inputs.hasDriver && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4">
                    {/* Pay type toggle */}
                    <div className="flex gap-2">
                      {(["percentage", "hourly"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => set("driverPayType", type)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            inputs.driverPayType === type
                              ? "bg-[#101820] text-white"
                              : "bg-[#F5F5F5] text-[#545454] hover:bg-[#E9E9E9]"
                          }`}
                        >
                          {type === "percentage" ? "% of Revenue" : "Hourly Rate"}
                        </button>
                      ))}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {inputs.driverPayType === "percentage" ? (
                        <NumberInput
                          id="driver-pct"
                          label="Driver Percentage"
                          suffix="%"
                          value={inputs.driverPercentage}
                          onChange={(v) => set("driverPercentage", v)}
                          min={0}
                          max={100}
                        />
                      ) : (
                        <NumberInput
                          id="driver-hourly"
                          label="Hourly Rate"
                          prefix="$"
                          value={inputs.driverHourlyRate}
                          onChange={(v) => set("driverHourlyRate", v)}
                          min={0}
                        />
                      )}
                      <NumberInput
                        id="payroll-burden"
                        label="Payroll Burden"
                        suffix="%"
                        value={inputs.payrollBurden}
                        onChange={(v) => set("payrollBurden", v)}
                        min={0}
                        max={50}
                        hint="Taxes, workers comp, etc."
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Section 4: Operating Expenses ── */}
          <div className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] sm:p-8">
            <SectionHeading step={4}>Monthly Operating Expenses</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput id="fuel" label="Fuel" prefix="$" value={inputs.fuel} onChange={(v) => set("fuel", v)} min={0} />
              <NumberInput id="insurance" label="Insurance" prefix="$" value={inputs.insurance} onChange={(v) => set("insurance", v)} min={0} />
              <NumberInput id="maintenance" label="Maintenance Reserve" prefix="$" value={inputs.maintenance} onChange={(v) => set("maintenance", v)} min={0} />
              <NumberInput id="yard" label="Yard / Storage" prefix="$" value={inputs.yardStorage} onChange={(v) => set("yardStorage", v)} min={0} />
              <NumberInput id="software" label="Software / Dispatch" prefix="$" value={inputs.softwareDispatch} onChange={(v) => set("softwareDispatch", v)} min={0} />
              <NumberInput id="misc" label="Misc Overhead" prefix="$" value={inputs.miscOverhead} onChange={(v) => set("miscOverhead", v)} min={0} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#E9E9E9] pt-4">
              <span className="text-sm font-medium text-[#545454]">Total Monthly Expenses</span>
              <span className="text-base font-medium text-[#101820]">{fmtDollars(totalOpEx)}</span>
            </div>
          </div>
        </div>

        {/* ═════════════════ RIGHT COLUMN: RESULTS ═════════════════ */}
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-height)+2rem)]">
            <ResultsPanel
              results={results}
              color={color}
              conversion={conversion}
              emailValue={emailValue}
              emailSent={emailSent}
              onEmailChange={setEmailValue}
              onEmailSubmit={handleEmailSubmit}
              inputs={inputs}
            />
          </div>
        </div>
      </div>

      {/* ═════════════════ MOBILE: Sticky Bottom Bar ═════════════════ */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#101820] p-4 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Net Monthly Cash Flow</p>
            <p className={`text-xl font-medium ${color === "green" ? "text-[#22C55E]" : color === "yellow" ? "text-amber-400" : "text-[#EF4444]"}`}>
              {fmtDollars(results.netMonthlyCashFlow)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowMobileResults(true)}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#22C55E] px-6 text-sm font-medium text-[#101820]"
          >
            See Full Results
          </button>
        </div>
      </div>

      {/* Mobile results overlay */}
      <AnimatePresence>
        {showMobileResults && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-white lg:hidden"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#101820] px-6 py-4">
              <h2 className="text-lg font-medium text-white">Your Results</h2>
              <button
                type="button"
                onClick={() => setShowMobileResults(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
                aria-label="Close results"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="p-6">
              <ResultsPanel
                results={results}
                color={color}
                conversion={conversion}
                emailValue={emailValue}
                emailSent={emailSent}
                onEmailChange={setEmailValue}
                onEmailSubmit={handleEmailSubmit}
                inputs={inputs}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}

// ── Results Panel ──────────────────────────────────────────────────

function ResultsPanel({
  results,
  color,
  conversion,
  emailValue,
  emailSent,
  onEmailChange,
  onEmailSubmit,
  inputs,
}: {
  results: CalculatorResults;
  color: "green" | "yellow" | "red";
  conversion: { message: string; cta: string };
  emailValue: string;
  emailSent: boolean;
  onEmailChange: (v: string) => void;
  onEmailSubmit: (e: React.FormEvent) => void;
  inputs: CalculatorInputs;
}) {
  return (
    <div className="space-y-6">
      {/* Cash Flow Hero */}
      <motion.div
        layout
        className={`rounded-3xl p-6 sm:p-8 ${COLOR_CLASSES[color]}`}
      >
        <p className="text-sm font-medium uppercase tracking-wide text-white/60">
          Net Monthly Cash Flow
        </p>
        <motion.p
          key={results.netMonthlyCashFlow}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="mt-1 text-4xl font-medium tracking-tight"
        >
          {fmtDollars(results.netMonthlyCashFlow)}
        </motion.p>
        <p className="mt-1 text-sm text-white/40">
          {fmtDollars(results.annualProfit)}/yr
        </p>
      </motion.div>

      {/* Monthly P&L */}
      <div className="rounded-3xl border-l-4 border-[#22C55E] bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] sm:p-8">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#545454]">
          Monthly P&amp;L
        </h3>
        <div className="space-y-3">
          <PLRow label="Revenue" value={results.monthlyRevenue} positive />
          <PLRow label={`Tow calls (${results.monthlyCalls}/mo)`} value={results.monthlyRevenue} sub positive />
          {results.driverCost > 0 && (
            <PLRow label="Driver cost" value={-results.driverCost} />
          )}
          <PLRow label="Operating expenses" value={-results.totalOpEx} />
          <PLRow label="Truck payment" value={-results.monthlyPayment} />
          <div className="border-t border-[#E9E9E9] pt-3">
            <PLRow
              label="Net cash flow"
              value={results.netMonthlyCashFlow}
              bold
              positive={results.netMonthlyCashFlow > 0}
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] sm:p-8">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#545454]">
          Key Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="ROI" value={fmtPct(results.roiPercent)} index={0} />
          <MetricCard label="Payback" value={fmtMonths(results.paybackMonths)} index={1} />
          <MetricCard label="Breakeven" value={isFinite(results.breakevenCalls) ? `${results.breakevenCalls} calls/mo` : "—"} index={2} />
          <MetricCard label="Profit / Call" value={fmtDollars(results.profitPerCall)} index={3} />
          <MetricCard label="Operating Margin" value={fmtPct(results.operatingMargin)} index={4} />
          <MetricCard label="Cash Invested" value={fmtDollars(results.cashInvested)} index={5} />
        </div>
      </div>

      {/* Effective APR callout */}
      {inputs.knowsPayment && results.effectiveAPR !== null && (
        <div
          className={`rounded-2xl p-4 text-sm ${
            results.effectiveAPR > 9
              ? "bg-amber-50 text-amber-800"
              : "bg-[#22C55E]/10 text-[#15803D]"
          }`}
        >
          <p className="font-medium">
            Effective APR: {results.effectiveAPR.toFixed(1)}%
          </p>
          {results.effectiveAPR > 9 && (
            <p className="mt-1 opacity-80">
              That&rsquo;s on the high side &mdash; refinancing could save you{" "}
              {fmtDollars((results.monthlyPayment - results.monthlyPayment * 0.85) * inputs.termMonths)}{" "}
              over the life of the loan.
            </p>
          )}
        </div>
      )}

      {/* Conversion CTA */}
      <div className="rounded-3xl bg-[#101820] p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-white/70">
          {conversion.message}
        </p>
        <button
          type="button"
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#22C55E] px-8 text-base font-medium text-[#101820] transition-colors hover:bg-[#15803D] hover:text-white"
        >
          {conversion.cta}
        </button>
      </div>

      {/* Email Capture */}
      <div className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] sm:p-8">
        {emailSent ? (
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E]/10">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-medium text-[#101820]">Breakdown sent!</p>
            <p className="mt-1 text-sm text-[#545454]">Check your inbox for the full analysis.</p>
          </div>
        ) : (
          <>
            <p className="mb-3 text-sm font-medium text-[#101820]">
              Save your results
            </p>
            <form onSubmit={onEmailSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={emailValue}
                onChange={(e) => onEmailChange(e.target.value)}
                required
                className="min-w-0 flex-1 rounded-xl border border-[#E9E9E9] px-4 py-3 text-sm text-[#101820] focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[#101820] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#101820]/90"
              >
                Send My Breakdown
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Small sub-components ───────────────────────────────────────────

function PLRow({
  label,
  value,
  bold,
  positive,
  sub,
}: {
  label: string;
  value: number;
  bold?: boolean;
  positive?: boolean;
  sub?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between ${sub ? "pl-4 text-xs" : "text-sm"} ${bold ? "font-medium" : ""}`}>
      <span className={sub ? "text-[#545454]" : "text-[#101820]"}>{label}</span>
      <span className={positive ? "text-[#15803D]" : value < 0 ? "text-[#EF4444]" : "text-[#101820]"}>
        {value < 0 ? "-" : ""}{fmtDollars(Math.abs(value))}
      </span>
    </div>
  );
}

function MetricCard({ label, value, index = 0 }: { label: string; value: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-xl border border-[#DCFCE7] bg-[#F0FDF4] p-3"
    >
      <p className="text-xs text-[#545454]">{label}</p>
      <p className="mt-0.5 text-lg font-medium text-[#101820]">{value}</p>
    </motion.div>
  );
}
