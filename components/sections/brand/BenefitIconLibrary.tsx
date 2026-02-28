"use client";

import Image from "next/image";
import { benefitIcons } from "./brand-data";
import { DevDetail } from "./BrandClient";

const bgMap = {
  light: { bg: "#FFFFFF", border: "shadow-[inset_0_0_0_1px_#E5E5E5]" },
  dark: { bg: "#101820", border: "" },
  green: { bg: "#FFFFFF", border: "shadow-[inset_0_0_0_1px_#E5E5E5]" },
} as const;

export function BenefitIconLibrary() {
  return (
    <section id="benefit-icons" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-semibold tracking-tight text-[#101820]">
          Benefit Icon Library
        </h2>

        {/* Prescriptive rules */}
        <div className="mt-6 rounded-2xl bg-[#F0FDF4] p-4 text-sm text-[#15803D]">
          <p className="font-medium">Icon Usage Rules</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[#15803D]/80">
            <li>Dark icons on light backgrounds (white, gray 50-200)</li>
            <li>Light icons on dark backgrounds (#101820, gray 700-900)</li>
            <li>Green icons on white backgrounds only</li>
            <li>Never recolor icons — use the provided variant</li>
          </ul>
        </div>

        {/* Icon categories */}
        {benefitIcons.map((category) => (
          <div key={category.name} className="mt-12">
            <h3 className="text-lg font-medium text-[#101820]">
              {category.name}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {category.variants.map((v) => {
                const bgInfo = bgMap[v.bg];
                return (
                  <div key={v.src} className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-28 w-full items-center justify-center rounded-2xl ${bgInfo.border}`}
                      style={{ backgroundColor: bgInfo.bg }}
                    >
                      <Image
                        src={v.src}
                        alt={`${category.name} - ${v.label}`}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-[#737373]">
                      {v.label}
                    </span>
                    <DevDetail label="Path" value={v.src} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
