"use client";

import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/utils";

export interface FramedSelectionTileProps {
  id: string;
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const FramedSelectionTile = memo(function FramedSelectionTile({
  id,
  label,
  iconSrc,
  iconAlt = "",
  iconWidth = 150,
  iconHeight = 43,
  selected,
  onSelect,
}: FramedSelectionTileProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      onClick={() => onSelect(id)}
      className={cn(
        "relative flex min-h-[5.5rem] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 p-4 text-center transition-[border-color,background-color] duration-200 sm:min-h-32 sm:gap-3 sm:p-6",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2",
        selected
          ? "border-[#22C55E] bg-[#F2FBF5]"
          : "border-[#D8E4DC] bg-white hover:border-[#86D7A3] hover:bg-[#F7FCF8]",
      )}
    >
      {iconSrc ? (
        <span className="pointer-events-none shrink-0" aria-hidden="true">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={iconWidth}
            height={iconHeight}
            className="h-8 w-auto sm:h-12"
          />
        </span>
      ) : null}
      <span className="text-sm font-medium text-[#101820] sm:text-base">
        {label}
      </span>
    </button>
  );
});
