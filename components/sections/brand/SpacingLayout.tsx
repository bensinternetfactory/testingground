"use client";

import { spacingScale } from "./brand-data";
import { DevDetail } from "./BrandClient";

const radiusTokens = [
  { label: "Buttons", value: "9999px", tailwind: "rounded-full" },
  { label: "Cards", value: "24px", tailwind: "rounded-3xl" },
  { label: "Feature cards", value: "24px", tailwind: "rounded-3xl" },
  { label: "Icon boxes", value: "16px", tailwind: "rounded-2xl" },
  { label: "Inputs", value: "12px", tailwind: "rounded-xl" },
];

export function SpacingLayout() {
  return (
    <section id="spacing" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-semibold tracking-tight text-[#101820]">
          Spacing & Layout
        </h2>

        {/* Spacing Scale */}
        <h3 className="mt-12 text-xl font-medium text-[#101820]">
          Spacing Scale
        </h3>
        <div className="mt-6 space-y-3">
          {spacingScale.map((s) => (
            <div key={s.step} className="flex items-center gap-4">
              <span className="w-12 shrink-0 text-right font-mono text-xs text-[#737373]">
                {s.px}px
              </span>
              <div
                className="h-6 rounded bg-[#22C55E]/20"
                style={{ width: `${Math.min(s.px * 2, 100)}%` }}
              />
              <span className="shrink-0 font-mono text-xs text-[#A3A3A3]">
                {s.tailwind}
              </span>
            </div>
          ))}
        </div>

        {/* Section Padding Guide */}
        <h3 className="mt-16 text-xl font-medium text-[#101820]">
          Section Padding
        </h3>
        <div className="mt-6 rounded-3xl bg-[#F5F5F5] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#545454]">Vertical padding (mobile)</span>
              <code className="rounded bg-white px-2 py-1 font-mono text-xs">
                py-20 (80px)
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#545454]">Vertical padding (desktop)</span>
              <code className="rounded bg-white px-2 py-1 font-mono text-xs">
                md:py-28 (112px)
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#545454]">Horizontal padding</span>
              <code className="rounded bg-white px-2 py-1 font-mono text-xs">
                px-6 (24px)
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#545454]">Content max width</span>
              <code className="rounded bg-white px-2 py-1 font-mono text-xs">
                max-w-7xl (1280px)
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#545454]">Grid gap</span>
              <code className="rounded bg-white px-2 py-1 font-mono text-xs">
                gap-6 (24px)
              </code>
            </div>
          </div>
          <DevDetail
            label="Section wrapper"
            value="mx-auto max-w-7xl px-6 py-20 md:py-28"
          />
        </div>

        {/* Grid Patterns */}
        <h3 className="mt-16 text-xl font-medium text-[#101820]">
          Grid Patterns
        </h3>
        <div className="mt-6 space-y-6">
          {[1, 2, 3, 4].map((cols) => (
            <div key={cols}>
              <p className="mb-2 text-xs font-medium text-[#737373]">
                {cols} Column{cols > 1 ? "s" : ""}
              </p>
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: cols }).map((_, i) => (
                  <div
                    key={i}
                    className="flex h-16 items-center justify-center rounded-2xl bg-[#F0FDF4] text-xs font-medium text-[#15803D] shadow-[inset_0_0_0_1px_#DCFCE7]"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Border Radius Reference */}
        <h3 className="mt-16 text-xl font-medium text-[#101820]">
          Border Radius
        </h3>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          {radiusTokens.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div
                className="flex h-20 w-20 items-center justify-center bg-[#101820]"
                style={{ borderRadius: r.value }}
              >
                <span className="text-xs text-white">{r.value}</span>
              </div>
              <span className="text-xs font-medium text-[#545454]">
                {r.label}
              </span>
              <span className="font-mono text-[11px] text-[#A3A3A3]">
                {r.tailwind}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
