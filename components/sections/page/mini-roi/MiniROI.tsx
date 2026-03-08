"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DEFAULTS,
  computeResults,
  type CalculatorInputs,
} from "@/components/sections/calculator/calculator-data";
import type { MiniROIConfig } from "./config";

function fmtDollars(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export function MiniROI({ config }: { config: MiniROIConfig }) {
  const [value, setValue] = useState(config.slider.defaultValue);

  const inputs: CalculatorInputs = {
    ...DEFAULTS,
    ...config.assumptions,
    revenuePerTow: value,
  };
  const r = computeResults(inputs);

  const fillPct = Math.min(
    (r.breakevenCalls / r.monthlyCalls) * 100,
    100,
  );

  return (
    <section id="revenue" className="bg-[#F0FDF4] py-20 md:py-28 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Headline */}
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
          {config.headline.base}{" "}
          <span className="text-[#22C55E]">{config.headline.accent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#545454]">
          {config.subheadline}
        </p>

        {/* Card */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:mt-16 md:p-10">
          {/* Slider */}
          <label className="block text-center">
            <span className="text-base font-medium text-[#545454]">
              {config.slider.label}
            </span>
            <span className="mt-2 block text-5xl font-semibold text-[#101820] [font-variant-numeric:tabular-nums]">
              {fmtDollars(value)}
            </span>
          </label>

          <input
            type="range"
            min={config.slider.min}
            max={config.slider.max}
            step={config.slider.step}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-label="Revenue per tow"
            aria-valuetext={`$${value} per tow`}
            className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E5E7EB] accent-[#22C55E] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#22C55E] [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="mt-1 flex justify-between text-xs text-[#545454] [font-variant-numeric:tabular-nums]">
            <span>{fmtDollars(config.slider.min)}</span>
            <span>{fmtDollars(config.slider.max)}</span>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <p className="text-center text-sm font-medium text-[#101820]">
              <span className="text-[#15803D] [font-variant-numeric:tabular-nums]">
                {r.breakevenCalls} tows
              </span>{" "}
              cover your payment
            </p>
            <div className="relative mt-3 h-3 overflow-hidden rounded-full bg-[#E5E7EB]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#22C55E] transition-all duration-150 ease-out"
                style={{ width: `${fillPct}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-xs text-[#545454] [font-variant-numeric:tabular-nums]">
              <span>Payment: {fmtDollars(r.monthlyPayment)}/mo</span>
              <span>{r.monthlyCalls} tows/month</span>
            </div>
          </div>

          {/* Metric grid */}
          <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Monthly Payment", value: fmtDollars(r.monthlyPayment) },
              { label: "Breakeven Tows", value: `${r.breakevenCalls}` },
              {
                label: "Monthly Profit",
                value: fmtDollars(r.netMonthlyCashFlow),
              },
              { label: "Annual Profit", value: fmtDollars(r.annualProfit) },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl bg-[#F0FDF4] p-4 text-center"
              >
                <dt className="text-xs font-medium text-[#545454]">
                  {m.label}
                </dt>
                <dd className="mt-1 text-xl font-semibold text-[#101820] [font-variant-numeric:tabular-nums] md:text-2xl">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              href={`${config.cta.basePath}?rev=${value}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2"
            >
              {config.cta.label}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[#545454]">
          {config.disclaimer}
        </p>
      </div>
    </section>
  );
}
