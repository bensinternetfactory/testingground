import { memo } from "react";
import { cn } from "@/lib/utils";

export interface SelectionTileProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const SelectionTile = memo(function SelectionTile({
  id,
  label,
  icon,
  selected,
  onSelect,
}: SelectionTileProps) {
  return (
    <button
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      style={{ touchAction: "manipulation" }}
      className={cn(
        "flex items-center gap-3 rounded-xl border-2 p-4 text-left",
        "focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:outline-none",
        "hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
        selected
          ? "border-[#111111] bg-[#F5F5F5]"
          : "border-[#E9E9E9]"
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="text-sm font-medium text-[#111111]">{label}</span>
    </button>
  );
});
