import { memo } from "react";
import { cn } from "@/lib/utils";
import { RollbackIcon } from "@/app/truckicons/RollbackIcon";
import { WreckerIcon } from "@/app/truckicons/WreckerIcon";
import { HeavyWreckerIcon } from "@/app/truckicons/HeavyWreckerIcon";
import { RotatorIcon } from "@/app/truckicons/RotatorIcon";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  rollback: RollbackIcon,
  wrecker: WreckerIcon,
  "heavy-wrecker": HeavyWreckerIcon,
  rotator: RotatorIcon,
};

interface EquipmentTileProps {
  id: string;
  label: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const EquipmentTile = memo(function EquipmentTile({
  id,
  label,
  selected,
  onSelect,
}: EquipmentTileProps) {
  const Icon = ICON_MAP[id];

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
      {Icon && (
        <span className="shrink-0">
          <Icon className="w-20" />
        </span>
      )}
      <span className="text-sm font-medium text-[#111111]">{label}</span>
    </button>
  );
});
