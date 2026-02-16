"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface EquipmentTileProps {
  id: string;
  label: string;
  iconPath: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const EquipmentTile = memo(function EquipmentTile({
  id,
  label,
  iconPath,
  selected,
  onSelect,
}: EquipmentTileProps) {
  return (
    <button
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      style={{ touchAction: "manipulation" }}
      className={cn(
        "flex items-center gap-3 rounded-xl p-3 text-left",
        "transition-shadow duration-200",
        "focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:outline-none",
        "hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
        selected
          ? "shadow-[inset_0_0_0_2px_#111111] bg-[#F5F5F5]"
          : "shadow-[inset_0_0_0_1px_#E9E9E9]"
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBF0F6]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={iconPath}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm font-medium text-[#111111]">{label}</span>
    </button>
  );
});
