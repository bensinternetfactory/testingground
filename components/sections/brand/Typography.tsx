"use client";

import { typeScale } from "./brand-data";
import { DevDetail } from "./BrandClient";

export function Typography() {
  return (
    <section id="type" className="bg-[#F5F5F5] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-semibold tracking-tight text-[#101820]">
          Typography
        </h2>

        {/* Font Family Card */}
        <div className="mt-12 rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
          <p className="text-sm font-medium uppercase tracking-wider text-[#737373]">
            Font Family
          </p>
          <p className="mt-3 text-5xl font-bold text-[#101820]">Geist Sans</p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { weight: 400, label: "Regular" },
              { weight: 500, label: "Medium" },
              { weight: 600, label: "Semibold" },
              { weight: 700, label: "Bold" },
            ].map((w) => (
              <p
                key={w.weight}
                className="text-lg text-[#545454]"
                style={{ fontWeight: w.weight }}
              >
                {w.label} ({w.weight})
              </p>
            ))}
          </div>
          <DevDetail label="Variable" value="--font-geist-sans" />
        </div>

        {/* Type Scale */}
        <div className="mt-12 space-y-0 divide-y divide-[#E5E5E5] rounded-3xl bg-white shadow-[inset_0_0_0_1px_#E9E9E9]">
          {typeScale.map((t) => (
            <div
              key={t.level}
              className="flex flex-col gap-4 p-6 md:flex-row md:items-baseline md:justify-between"
            >
              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-[#101820]"
                  style={{
                    fontSize: t.size,
                    fontWeight: t.weight,
                    lineHeight: t.lineHeight,
                  }}
                >
                  {t.sample}
                </p>
              </div>
              <div className="shrink-0 space-y-0.5 md:text-right">
                <p className="text-sm font-medium text-[#101820]">
                  {t.level}
                </p>
                <p className="font-mono text-xs text-[#737373]">
                  {t.size} / {t.weight} / {t.lineHeight}
                </p>
                <p className="text-xs text-[#A3A3A3]">
                  &lt;{t.tag}&gt;
                </p>
                <DevDetail label="Tailwind" value={t.tailwind} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
