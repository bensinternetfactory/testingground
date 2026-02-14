"use client";

import { useState } from "react";

const equipmentTypes = [
  "Rollback / Flatbed",
  "Wheel-Lift Wrecker",
  "Integrated Wrecker",
  "Heavy-Duty Rotator",
  "Landoll / Trailer",
  "Other Specialty Equipment",
];

const conditions = [
  "Brand New (2025\u20132026)",
  "Like New (2022\u20132024)",
  "Used (2018\u20132021)",
  "Older but Solid (Pre-2018)",
];

const priceRanges = [
  "Under $40,000",
  "$40,000\u2013$75,000",
  "$75,000\u2013$120,000",
  "$120,000\u2013$200,000",
  "$200,000+",
];

const timelines = [
  "This week",
  "Within 2 weeks",
  "Within 30 days",
  "Just seeing what\u2019s out there",
];

function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <span className="relative inline-block">
      <label className="sr-only">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none border-b-2 border-[#DE3341] bg-transparent px-1 pb-1 text-lg font-medium text-[#DE3341] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 md:text-xl"
        aria-label={label}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </span>
  );
}

export function GuideBuilder() {
  const [equipment, setEquipment] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [timeline, setTimeline] = useState("");

  return (
    <section className="bg-[#FBF0F6] py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="mb-4 inline-block rounded-full bg-[#DE3341] px-4 py-1.5 text-sm font-medium text-white">
          Build your custom guide
        </span>
        <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
          Tell us what you&rsquo;re looking for
        </h2>
        <p className="mt-4 text-lg text-[#545454]">
          Pick your scenario. We&rsquo;ll show you what&rsquo;s possible.
        </p>

        {/* Mad-libs sentence */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-8 text-left shadow-[inset_0_0_0_1px_#E9E9E9] md:p-12">
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-4 text-lg leading-loose text-[#545454] md:text-xl">
            <span>I&rsquo;m looking at a</span>
            <Dropdown
              label="Equipment type"
              options={equipmentTypes}
              value={equipment}
              onChange={setEquipment}
            />
            <span>that&rsquo;s</span>
            <Dropdown
              label="Condition"
              options={conditions}
              value={condition}
              onChange={setCondition}
            />
            <span>for around</span>
            <Dropdown
              label="Price range"
              options={priceRanges}
              value={price}
              onChange={setPrice}
            />
            <span>and I need to move</span>
            <Dropdown
              label="Timeline"
              options={timelines}
              value={timeline}
              onChange={setTimeline}
            />
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#pre-approve"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#111111] px-8 text-base font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
            >
              Show me my options
            </a>
            <a
              href="tel:+18885550199"
              className="text-base font-medium text-[#545454] underline underline-offset-4 transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
            >
              Rather talk it through?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
