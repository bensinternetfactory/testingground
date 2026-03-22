"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { TermSliderConfig } from "@/app/_shared/equipment-financing/equipment-page-config";

export function TermLengthSlider({
  config,
}: {
  config: TermSliderConfig;
}) {
  const currentYear = new Date().getFullYear() + 1;
  const minYear = 2000;

  const [selectedYear, setSelectedYear] = useState(config.defaultYear);

  const maxTerm = useMemo(() => {
    for (const entry of config.lookupTable) {
      if (selectedYear >= entry.minYear && selectedYear <= entry.maxYear) {
        return entry.maxTermMonths;
      }
    }
    // Fallback: use the last entry
    return config.lookupTable[config.lookupTable.length - 1].maxTermMonths;
  }, [selectedYear, config.lookupTable]);

  return (
    <div>
      <Image
        src={config.iconSrc}
        alt={config.iconAlt}
        width={56}
        height={56}
        className="h-14 w-14"
      />

      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">
        {config.headline}
      </h3>
      <p className="mt-1 text-base font-medium text-[#545454]">
        {config.subheading}
      </p>
      <p className="mt-3 text-base leading-relaxed text-[#545454]">
        {config.body}
      </p>

      {/* Slider */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-xs font-medium text-[#999]">
          <span>{minYear}</span>
          <span className="text-sm font-semibold text-[#111]">{selectedYear}</span>
          <span>{currentYear}</span>
        </div>
        <input
          type="range"
          min={minYear}
          max={currentYear}
          step={1}
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          aria-label="Select truck model year"
          aria-valuetext={`${selectedYear} model year, up to ${maxTerm} month term`}
          className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[#111] [&::-webkit-slider-thumb]:h-[44px] [&::-webkit-slider-thumb]:w-[44px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#111] [&::-webkit-slider-thumb]:shadow-lg"
        />
      </div>

      {/* Result */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-8 text-center">
        <p className="text-4xl font-bold tracking-tight text-[#111] sm:text-5xl">
          {maxTerm} months
        </p>
        <p className="mt-2 text-sm text-[#545454]">maximum term length</p>
      </div>
    </div>
  );
}
