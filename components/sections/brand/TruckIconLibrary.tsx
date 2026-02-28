"use client";

import Image from "next/image";
import { truckIcons } from "./brand-data";
import { DevDetail } from "./BrandClient";

const bgMap = {
  light: { bg: "#FFFFFF", border: "shadow-[inset_0_0_0_1px_#E5E5E5]" },
  dark: { bg: "#101820", border: "" },
  green: { bg: "#FFFFFF", border: "shadow-[inset_0_0_0_1px_#E5E5E5]" },
} as const;

export function TruckIconLibrary() {
  return (
    <section id="trucks" className="bg-[#F0FDF4] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-semibold tracking-tight text-[#101820]">
          Truck Icon Library
        </h2>
        <p className="mt-3 text-base text-[#545454]">
          Four truck types with dark, green, and light variants. Rollback
          includes additional light sub-variants.
        </p>

        {truckIcons.map((truck) => (
          <div key={truck.name} className="mt-12">
            <h3 className="text-lg font-medium text-[#101820]">
              {truck.name}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {truck.variants.map((v) => {
                const bgInfo = bgMap[v.bg];
                return (
                  <div key={v.src} className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-40 w-full items-center justify-center rounded-2xl ${bgInfo.border}`}
                      style={{ backgroundColor: bgInfo.bg }}
                    >
                      <Image
                        src={v.src}
                        alt={`${truck.name} - ${v.label}`}
                        width={200}
                        height={120}
                        className="h-auto w-[200px] object-contain"
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
