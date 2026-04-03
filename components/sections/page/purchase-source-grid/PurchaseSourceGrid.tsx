"use client";

import Image from "next/image";
import type { PurchaseSourceGridConfig } from "./config";
import { PURCHASE_SOURCE_GRID_ITEMS } from "./config";

export function PurchaseSourceGrid({
  config,
}: {
  config: PurchaseSourceGridConfig;
}) {
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
      <p className="mt-3 text-base leading-relaxed text-[#545454]">
        {config.body}
      </p>

      <ul className="mt-8 space-y-4" role="list">
        {PURCHASE_SOURCE_GRID_ITEMS.map((item) => (
          <li key={item.sourceName} className="flex items-start gap-3">
            <CheckCircleIcon />
            <div>
              <p className="text-sm font-semibold text-[#111]">
                {item.sourceName}
              </p>
              <p className="text-sm text-[#545454]">{item.descriptor}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
