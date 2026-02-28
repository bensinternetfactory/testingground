"use client";

import { primaryColors, grayScale, surfaceColors } from "./brand-data";
import { CopyButton, DevDetail } from "./BrandClient";

export function ColorSystem() {
  return (
    <section id="colors" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-semibold tracking-tight text-[#101820]">
          Color System
        </h2>

        {/* Primary Palette */}
        <h3 className="mt-12 text-xl font-medium text-[#101820]">
          Primary Palette
        </h3>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {primaryColors.map((c) => (
            <div key={c.hex} className="group">
              <div
                className="flex h-32 items-end rounded-2xl p-4 shadow-[inset_0_0_0_1px_#E5E5E5]"
                style={{ backgroundColor: c.hex }}
              >
                <span className={`text-sm font-medium ${c.textClass}`}>
                  {c.name}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="font-mono text-sm text-[#545454]">
                  {c.hex}
                </span>
                <CopyButton value={c.hex} />
              </div>
              <DevDetail label="CSS var" value={c.cssVar} />
              <DevDetail label="Tailwind" value={c.tailwind} />
            </div>
          ))}
        </div>

        {/* Gray Scale */}
        <h3 className="mt-16 text-xl font-medium text-[#101820]">
          Gray Scale
        </h3>
        <div className="mt-6 flex gap-0 overflow-x-auto rounded-2xl shadow-[inset_0_0_0_1px_#E5E5E5]">
          {grayScale.map((g) => {
            const isLight = parseInt(g.step) < 500;
            return (
              <div
                key={g.step}
                className="group flex min-w-[72px] flex-1 flex-col items-center justify-end p-3"
                style={{ backgroundColor: g.hex }}
              >
                <span
                  className={`text-[11px] font-medium ${
                    isLight ? "text-[#545454]" : "text-white"
                  }`}
                >
                  {g.step}
                </span>
                <div className="mt-1 flex items-center gap-0.5">
                  <span
                    className={`font-mono text-[10px] ${
                      isLight ? "text-[#737373]" : "text-white/70"
                    }`}
                  >
                    {g.hex}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Surface Colors */}
        <h3 className="mt-16 text-xl font-medium text-[#101820]">
          Surface Colors
        </h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {surfaceColors.map((s) => (
            <div
              key={s.hex}
              className="rounded-2xl p-6 shadow-[inset_0_0_0_1px_#E5E5E5]"
              style={{ backgroundColor: s.hex }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-medium"
                  style={{ color: s.textColor }}
                >
                  {s.name}
                </span>
                <div className="flex items-center gap-1">
                  <span
                    className="font-mono text-sm"
                    style={{ color: s.textColor, opacity: 0.7 }}
                  >
                    {s.hex}
                  </span>
                  <CopyButton value={s.hex} />
                </div>
              </div>
              <p
                className="mt-2 text-sm"
                style={{ color: s.textColor, opacity: 0.6 }}
              >
                {s.description}
              </p>
              <DevDetail label="CSS var" value={s.cssVar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
