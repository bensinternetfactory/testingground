"use client";

import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link/RippleCtaLink";
import { PaymentField } from "./PaymentField";
import { TowRateField } from "./TowRateField";
import { miniRoiCalc } from "./calc";
import type { MiniROIConfig } from "./config";

function fmtDollars(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

const SLIDER_THUMB_SIZE = 28;

export function MiniROI({ config }: { config: MiniROIConfig }) {
  const { slider, assumptions } = config;
  const [revenuePerTow, setRevenuePerTow] = useState(slider.defaultValue);
  const [isManual, setIsManual] = useState(true);
  const [manualPmt, setManualPmt] = useState(1200);
  // --- Custom slider state ---
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbX = useMotionValue(0);
  const lastSnappedRef = useRef(slider.defaultValue);

  // Helpers: value ↔ position
  const valueToX = useCallback(
    (val: number) => {
      const clamped = Math.min(Math.max(val, slider.min), slider.max);
      const trackW = trackRef.current?.offsetWidth ?? 1;
      const usableW = Math.max(trackW - SLIDER_THUMB_SIZE, 1);
      return (
        ((clamped - slider.min) / (slider.max - slider.min)) * usableW
      );
    },
    [slider.min, slider.max],
  );

  const xToValue = useCallback(
    (x: number) => {
      const trackW = trackRef.current?.offsetWidth ?? 1;
      const usableW = Math.max(trackW - SLIDER_THUMB_SIZE, 1);
      const ratio = Math.min(Math.max(x / usableW, 0), 1);
      const raw = slider.min + ratio * (slider.max - slider.min);
      return Math.round(raw / slider.step) * slider.step;
    },
    [slider.min, slider.max, slider.step],
  );

  // Sync thumb position when value changes externally (e.g. TowRateField)
  useLayoutEffect(() => {
    thumbX.set(valueToX(revenuePerTow));
  }, [revenuePerTow, valueToX, thumbX]);

  // Drag handler
  const handleDrag = useCallback(() => {
    const trackW = trackRef.current?.offsetWidth ?? 1;
    const usableW = Math.max(trackW - SLIDER_THUMB_SIZE, 1);
    const currentX = Math.min(Math.max(thumbX.get(), 0), usableW);
    const snapped = xToValue(currentX);

    if (snapped !== lastSnappedRef.current) {
      lastSnappedRef.current = snapped;
      setRevenuePerTow(snapped);
    }
  }, [xToValue, thumbX]);

  const handleDragEnd = useCallback(() => {
    thumbX.set(valueToX(lastSnappedRef.current));
  }, [valueToX, thumbX]);

  // Keyboard controls on thumb
  const handleThumbKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let next = revenuePerTow;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        next = Math.min(revenuePerTow + slider.step, slider.max);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        next = Math.max(revenuePerTow - slider.step, slider.min);
      } else {
        return;
      }
      e.preventDefault();
      setRevenuePerTow(next);
      lastSnappedRef.current = next;
    },
    [revenuePerTow, slider.step, slider.min, slider.max],
  );

  // Fill percentage for slider track
  const clampedForFill = Math.min(
    Math.max(revenuePerTow, slider.min),
    slider.max,
  );
  const fillPct =
    ((clampedForFill - slider.min) / (slider.max - slider.min)) * 100;

  // --- Simplified math ---
  const r = miniRoiCalc(
    revenuePerTow,
    manualPmt,
    assumptions.towsPerDay,
    assumptions.daysPerMonth,
  );

  const breakFillPct =
    r.breakevenTows === Infinity
      ? 100
      : Math.min((r.breakevenTows / r.monthlyCalls) * 100, 100);

  const ctaHref = isManual
    ? `${config.cta.basePath}?rev=${revenuePerTow}&pmt=${manualPmt}&known=true`
    : `${config.cta.basePath}?rev=${revenuePerTow}`;

  if (process.env.NODE_ENV !== "production") {
    console.debug("[MiniROI]", {
      revenuePerTow,
      monthlyPayment: manualPmt,
      ...r,
    });
  }

  const arrowIcon = (
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
  );

  return (
    <section
      id="revenue"
      className="bg-white py-20 md:py-28 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
          {config.headline.base} {config.headline.accent}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#545454]">
          {config.subheadline}
        </p>

        {/* Card */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:mt-16 md:p-10">
          {/* Tow rate display — tappable */}
          <div className="text-center">
            <span className="text-base font-medium text-[#545454]">
              {slider.label}
            </span>
            <TowRateField
              value={revenuePerTow}
              onCommit={(v) => {
                setRevenuePerTow(v);
                lastSnappedRef.current = Math.min(v, slider.max);
              }}
            />
          </div>

          {/* Custom drag slider */}
          <div className="relative mt-6 touch-none select-none">
            {/* Track */}
            <div
              ref={trackRef}
              className="relative h-3 w-full rounded-full bg-[#E5E7EB]"
            >
              {/* Fill */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#22C55E] transition-[width] duration-75 ease-out"
                style={{ width: `${fillPct}%` }}
              />
            </div>

            {/* Thumb */}
            <motion.div
              role="slider"
              tabIndex={0}
              aria-valuenow={revenuePerTow}
              aria-valuemin={slider.min}
              aria-valuemax={slider.max}
              aria-valuetext={`$${revenuePerTow} per tow`}
              aria-label="Revenue per tow"
              className="absolute top-1/2 left-0 z-10 h-7 w-7 -translate-y-1/2 cursor-grab rounded-full bg-[#22C55E] shadow-lg active:cursor-grabbing"
              style={{ x: thumbX }}
              drag="x"
              dragConstraints={trackRef}
              dragElastic={0}
              dragMomentum={false}
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 600, damping: 30 }}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onKeyDown={handleThumbKeyDown}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-[#545454] [font-variant-numeric:tabular-nums]">
            <span>{fmtDollars(slider.min)}</span>
            <span>{fmtDollars(slider.max)}</span>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <p className="text-center text-sm font-medium text-[#101820]">
              {r.isWeak ? (
                <>
                  <span className="text-amber-600 [font-variant-numeric:tabular-nums]">
                    Not covering payment yet
                  </span>{" "}
                  &mdash;{" "}
                  <span className="[font-variant-numeric:tabular-nums]">
                    {r.breakevenTows === Infinity
                      ? "breakeven not reachable"
                      : `${r.breakevenTows} tows needed`}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[#15803D] [font-variant-numeric:tabular-nums]">
                    {r.breakevenTows} tows
                  </span>{" "}
                  cover your payment
                </>
              )}
            </p>
            <div
              className={`relative mt-3 h-3 overflow-hidden rounded-full ${
                r.isWeak ? "bg-amber-100" : "bg-[#E5E7EB]"
              }`}
            >
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-150 ease-out ${
                  r.isWeak ? "bg-amber-400" : "bg-[#22C55E]"
                }`}
                style={{ width: `${breakFillPct}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-xs text-[#545454]">
              <PaymentField
                value={manualPmt}
                isManual={isManual}
                onCommit={(v) => {
                  setManualPmt(v);
                  setIsManual(true);
                }}
                onReset={() => setIsManual(false)}
              />
              <span className="[font-variant-numeric:tabular-nums]">
                {r.monthlyCalls} tows/month
              </span>
            </div>
          </div>

          {/* Metric grid */}
          <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Monthly Payment", value: fmtDollars(manualPmt) },
              {
                label: "Breakeven Tows",
                value:
                  r.breakevenTows === Infinity ? "N/A" : `${r.breakevenTows}`,
              },
              {
                label: "Monthly Profit",
                value: fmtDollars(r.monthlyProfit),
              },
              { label: "Annual Profit", value: fmtDollars(r.annualProfit) },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl bg-gray-50 p-4 text-center"
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
            <RippleCtaLink
              href={ctaHref}
              label={config.cta.label}
              icon={arrowIcon}
              iconPosition="end"
              section="mini-roi"
            />
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
