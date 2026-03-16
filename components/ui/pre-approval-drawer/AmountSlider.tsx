"use client";

import { useState, useCallback } from "react";
import { SLIDER_MIN, SLIDER_MAX, SLIDER_STEP, SLIDER_DEFAULT } from "./config";
import "./amount-slider.css";

function formatCurrency(value: number): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
  return value >= SLIDER_MAX ? `${formatted}+` : formatted;
}

export function AmountSlider({
  value: controlledValue,
  onChange,
}: {
  value?: number;
  onChange?: (value: number) => void;
}) {
  const [internalValue, setInternalValue] = useState(SLIDER_DEFAULT);
  const value = controlledValue ?? internalValue;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      setInternalValue(next);
      onChange?.(next);
    },
    [onChange],
  );

  const fillPercent = ((value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;

  return (
    <div className="w-full">
      {/* Prominent value display */}
      <p
        className="text-center text-5xl font-semibold tracking-tight tabular-nums text-[#101820] sm:text-6xl"
        aria-hidden="true"
      >
        {formatCurrency(value)}
      </p>

      {/* Range input */}
      <div className="mt-8 px-1">
        <input
          name="estimated-financing-amount"
          type="range"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={SLIDER_STEP}
          value={value}
          onChange={handleChange}
          aria-label="Estimated financing amount"
          aria-valuetext={formatCurrency(value)}
          className="slider-thumb w-full appearance-none bg-transparent focus:outline-none"
          style={
            {
              "--fill": `${fillPercent}%`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Min / Max labels */}
      <div className="mt-2 flex justify-between text-sm tabular-nums text-[#545454]">
        <span>{formatCurrency(SLIDER_MIN)}</span>
        <span>{formatCurrency(SLIDER_MAX)}</span>
      </div>
    </div>
  );
}
