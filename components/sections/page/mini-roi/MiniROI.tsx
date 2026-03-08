"use client";

import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
  type KeyboardEvent,
} from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link/RippleCtaLink";
import { PaymentField } from "./PaymentField";
import { TowRateField } from "./TowRateField";
import { miniRoiCalc } from "./calc";
import type { MiniROIConfig } from "./config";
import { formatUSD } from "./currency";
import { clampToSlider, getBreakFillPct, getSliderValueForKey } from "./math";

const SLIDER_THUMB_SIZE = 28;
const MINI_ROI_DEBUG = process.env.NEXT_PUBLIC_MINI_ROI_DEBUG === "1";

const ARROW_ICON = (
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

export function MiniROI({ config }: { config: MiniROIConfig }) {
  const { slider, assumptions } = config;
  const [typedRevenuePerTow, setTypedRevenuePerTow] = useState(
    slider.defaultValue,
  );
  const [manualPmt, setManualPmt] = useState(1200);

  const sliderRevenuePerTow = clampToSlider(
    typedRevenuePerTow,
    slider.min,
    slider.max,
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbX = useMotionValue(0);
  const lastSnappedRef = useRef(
    clampToSlider(slider.defaultValue, slider.min, slider.max),
  );
  const shouldReduceMotion = useReducedMotion();

  const valueToX = useCallback(
    (val: number) => {
      const clamped = clampToSlider(val, slider.min, slider.max);
      const trackW = trackRef.current?.offsetWidth ?? 1;
      const usableW = Math.max(trackW - SLIDER_THUMB_SIZE, 1);
      return ((clamped - slider.min) / (slider.max - slider.min)) * usableW;
    },
    [slider.min, slider.max],
  );

  const xToValue = useCallback(
    (x: number) => {
      const trackW = trackRef.current?.offsetWidth ?? 1;
      const usableW = Math.max(trackW - SLIDER_THUMB_SIZE, 1);
      const ratio = Math.min(Math.max(x / usableW, 0), 1);
      const raw = slider.min + ratio * (slider.max - slider.min);
      const snapped = Math.round(raw / slider.step) * slider.step;
      return clampToSlider(snapped, slider.min, slider.max);
    },
    [slider.min, slider.max, slider.step],
  );

  const syncThumbToSliderValue = useCallback(() => {
    thumbX.set(valueToX(sliderRevenuePerTow));
  }, [sliderRevenuePerTow, thumbX, valueToX]);

  useLayoutEffect(() => {
    syncThumbToSliderValue();
  }, [syncThumbToSliderValue]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      syncThumbToSliderValue();
    });

    observer.observe(track);
    return () => observer.disconnect();
  }, [syncThumbToSliderValue]);

  const handleDrag = useCallback(() => {
    const trackW = trackRef.current?.offsetWidth ?? 1;
    const usableW = Math.max(trackW - SLIDER_THUMB_SIZE, 1);
    const currentX = Math.min(Math.max(thumbX.get(), 0), usableW);
    const snapped = xToValue(currentX);

    if (snapped !== lastSnappedRef.current) {
      lastSnappedRef.current = snapped;
      setTypedRevenuePerTow(snapped);
    }
  }, [xToValue, thumbX]);

  const handleDragEnd = useCallback(() => {
    thumbX.set(valueToX(lastSnappedRef.current));
  }, [valueToX, thumbX]);

  const handleThumbKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const next = getSliderValueForKey(
        e.key,
        sliderRevenuePerTow,
        slider.min,
        slider.max,
        slider.step,
      );
      if (next === null) {
        return;
      }

      e.preventDefault();
      setTypedRevenuePerTow(next);
      lastSnappedRef.current = next;
    },
    [sliderRevenuePerTow, slider.step, slider.min, slider.max],
  );

  const fillPct =
    ((sliderRevenuePerTow - slider.min) / (slider.max - slider.min)) * 100;

  const r = miniRoiCalc(
    typedRevenuePerTow,
    manualPmt,
    assumptions.towsPerDay,
    assumptions.daysPerMonth,
  );

  const breakFillPct = getBreakFillPct(r.breakevenTows, r.monthlyCalls);

  const ctaHref = `${config.cta.basePath}?${new URLSearchParams({
    rev: String(typedRevenuePerTow),
    pmt: String(manualPmt),
    known: "true",
  }).toString()}`;

  if (MINI_ROI_DEBUG) {
    console.debug("[MiniROI]", {
      typedRevenuePerTow,
      sliderRevenuePerTow,
      monthlyPayment: manualPmt,
      ...r,
    });
  }

  const sliderFillTransition = shouldReduceMotion
    ? ""
    : "transition-[width] duration-75 ease-out";
  const breakFillTransition = shouldReduceMotion
    ? ""
    : "transition-[width,background-color] duration-150 ease-out";

  return (
    <section
      id="revenue"
      className="bg-white py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
          {config.headline.base} {config.headline.accent}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#545454]">
          {config.subheadline}
        </p>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:mt-16 md:p-10">
          <div className="text-center">
            <span className="text-base font-medium text-[#545454]">
              {slider.label}
            </span>
            <TowRateField
              value={typedRevenuePerTow}
              onCommit={(nextValue) => {
                setTypedRevenuePerTow(nextValue);
                lastSnappedRef.current = clampToSlider(
                  nextValue,
                  slider.min,
                  slider.max,
                );
              }}
            />
          </div>

          <div className="relative mt-6 touch-none select-none">
            <div
              ref={trackRef}
              className="relative h-3 w-full rounded-full bg-[#E5E7EB]"
            >
              <div
                className={`absolute inset-y-0 left-0 rounded-full bg-[#22C55E] ${sliderFillTransition}`}
                style={{ width: `${fillPct}%` }}
              />
            </div>

            <motion.div
              role="slider"
              tabIndex={0}
              aria-valuenow={sliderRevenuePerTow}
              aria-valuemin={slider.min}
              aria-valuemax={slider.max}
              aria-valuetext={`${formatUSD(sliderRevenuePerTow)} per tow`}
              aria-label="Revenue per tow"
              className="absolute top-1/2 left-0 z-10 h-7 w-7 -translate-y-1/2 cursor-grab rounded-full bg-[#22C55E] shadow-lg active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
              style={{ x: thumbX }}
              drag="x"
              dragConstraints={trackRef}
              dragElastic={0}
              dragMomentum={false}
              whileTap={shouldReduceMotion ? undefined : { scale: 1.3 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 600, damping: 30 }
              }
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onKeyDown={handleThumbKeyDown}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-[#545454] [font-variant-numeric:tabular-nums]">
            <span>{formatUSD(slider.min)}</span>
            <span>{formatUSD(slider.max)}</span>
          </div>

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
                className={`absolute inset-y-0 left-0 rounded-full ${breakFillTransition} ${
                  r.isWeak ? "bg-amber-400" : "bg-[#22C55E]"
                }`}
                style={{ width: `${breakFillPct}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-xs text-[#545454]">
              <PaymentField value={manualPmt} onCommit={setManualPmt} />
              <span className="[font-variant-numeric:tabular-nums]">
                {r.monthlyCalls} tows/month
              </span>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Monthly Payment", value: formatUSD(manualPmt) },
              {
                label: "Breakeven Tows",
                value:
                  r.breakevenTows === Infinity ? "N/A" : `${r.breakevenTows}`,
              },
              {
                label: "Monthly Profit",
                value: formatUSD(r.monthlyProfit),
              },
              { label: "Annual Profit", value: formatUSD(r.annualProfit) },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl bg-gray-50 p-4 text-center"
              >
                <dt className="text-xs font-medium text-[#545454]">{m.label}</dt>
                <dd className="mt-1 text-xl font-semibold text-[#101820] [font-variant-numeric:tabular-nums] md:text-2xl">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 text-center">
            <RippleCtaLink
              href={ctaHref}
              label={config.cta.label}
              icon={ARROW_ICON}
              iconPosition="end"
              section="mini-roi"
            />
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[#545454]">
          {config.disclaimer}
        </p>
      </div>
    </section>
  );
}
