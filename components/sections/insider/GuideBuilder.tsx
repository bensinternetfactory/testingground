"use client";

import { useState } from "react";

const truckTypes = [
  "Rollback / Flatbed",
  "Light-Duty Wrecker",
  "Medium-Duty Wrecker",
  "Heavy-Duty Wrecker",
  "Integrated Wrecker (Boom + Bed)",
  "Heavy-Duty Rotator (50-ton)",
  "Heavy-Duty Rotator (75-ton)",
  "Multi-Car Carrier",
  "Landoll / Trailer",
];

const conditions = [
  "Brand New (Factory Order)",
  "New (Dealer Stock)",
  "Low-Mileage Used (Under 80K)",
  "Higher-Mileage Used (80K\u2013200K)",
  "Older Unit (10+ Years)",
  "Rebuilding / Remounting a Chassis",
];

const timelines = [
  "On the road this week",
  "Within 30 days",
  "Within 60 days",
  "I\u2019m still shopping \u2014 just exploring rates",
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
        className="cursor-pointer appearance-none border-b-2 border-amber-400 bg-transparent px-1 pb-1 text-lg font-semibold text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 md:text-xl"
        style={{ colorScheme: "dark" }}
        aria-label={label}
      >
        <option value="" disabled className="bg-slate-800 text-slate-300">
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-800 text-white">
            {opt}
          </option>
        ))}
      </select>
    </span>
  );
}

export function GuideBuilder() {
  const [truckType, setTruckType] = useState("");
  const [condition, setCondition] = useState("");
  const [timeline, setTimeline] = useState("");

  return (
    <section className="bg-slate-900 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
          Tell Us What You Need
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          Pick your scenario. We&rsquo;ll show you what&rsquo;s possible.
        </p>

        {/* Mad-libs sentence */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-700 bg-slate-800 p-8 text-left md:p-12">
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-4 text-lg leading-loose text-slate-300 md:text-xl">
            <span>I want to finance a</span>
            <Dropdown
              label="Truck type"
              options={truckTypes}
              value={truckType}
              onChange={setTruckType}
            />
            <span>that&rsquo;s</span>
            <Dropdown
              label="Condition"
              options={conditions}
              value={condition}
              onChange={setCondition}
            />
            <span>and I need it</span>
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
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              Get Pre-Approved Now
            </a>
            <a
              href="tel:+18005550199"
              className="text-sm font-medium text-slate-400 transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
            >
              Rather talk to someone? Call&nbsp;us&nbsp;&rarr;
            </a>
          </div>

          <p className="mt-4 text-center text-sm text-slate-500">
            No credit check to get pre-approved. Takes about 30&nbsp;seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
