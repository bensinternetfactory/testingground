"use client";

import { useCallback, useState } from "react";
import {
  preApprovalAmountStep,
  preApprovalDefaultAmount,
  preApprovalMaxAmount,
  preApprovalMinAmount,
} from "@/features/pre-approval/contract";
import "@/features/pre-approval/amount-slider.css";

function formatCurrency(value: number): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
  return value >= preApprovalMaxAmount ? `${formatted}+` : formatted;
}

export function AmountSlider({
  value: controlledValue,
  onChange,
}: {
  value?: number;
  onChange?: (value: number) => void;
}) {
  const [internalValue, setInternalValue] = useState(preApprovalDefaultAmount);
  const [isDragging, setIsDragging] = useState(false);
  const value = controlledValue ?? internalValue;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      setInternalValue(next);
      onChange?.(next);
    },
    [onChange],
  );

  const fillPercent =
    ((value - preApprovalMinAmount) /
      (preApprovalMaxAmount - preApprovalMinAmount)) *
    100;

  return (
    <div className="w-full" data-slider-root>
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
          min={preApprovalMinAmount}
          max={preApprovalMaxAmount}
          step={preApprovalAmountStep}
          value={value}
          onChange={handleChange}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerCancel={() => setIsDragging(false)}
          onBlur={() => setIsDragging(false)}
          aria-label="Estimated financing amount"
          aria-valuetext={formatCurrency(value)}
          className={`slider-thumb w-full appearance-none bg-transparent focus:outline-none ${isDragging ? "is-dragging" : ""}`}
          style={
            {
              "--fill": `${fillPercent}%`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Min / Max labels */}
      <div className="mt-2 flex justify-between text-sm tabular-nums text-[#545454]">
        <span>{formatCurrency(preApprovalMinAmount)}</span>
        <span>{formatCurrency(preApprovalMaxAmount)}</span>
      </div>
    </div>
  );
}
