import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { RollbackIcon } from "@/app/truckicons/RollbackIcon";
import { WreckerIcon } from "@/app/truckicons/WreckerIcon";
import { HeavyWreckerIcon } from "@/app/truckicons/HeavyWreckerIcon";
import { RotatorIcon } from "@/app/truckicons/RotatorIcon";
import { SectionShell } from "../primitives/SectionShell";
import { EQUIPMENT_CHOICES } from "../../_lib/content";
import type { TruckIconKind } from "../../_lib/types";

type IconComponent = ComponentType<{ className?: string } & SVGProps<SVGSVGElement>>;

const ICONS: Record<TruckIconKind, IconComponent> = {
  rollback: RollbackIcon as IconComponent,
  wrecker: WreckerIcon as IconComponent,
  "heavy-wrecker": HeavyWreckerIcon as IconComponent,
  rotator: RotatorIcon as IconComponent,
};

export function EquipmentChooser() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-10 md:py-14">
      <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)] mb-6 md:mb-8">
        What do you need financing on?
      </h2>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {EQUIPMENT_CHOICES.map((c) => {
          const Icon = ICONS[c.iconKind];
          return (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group flex flex-col items-center gap-3 outline-none"
              >
                <span className="flex items-center justify-center h-[136px] w-[136px] md:h-[168px] md:w-[168px] rounded-full bg-[var(--t-panel)] group-hover:brightness-95 transition">
                  <Icon className="w-[92px] md:w-[120px] h-auto" />
                </span>
                <span className="text-sm md:text-base font-semibold text-[var(--t-ink)] group-hover:text-[var(--t-blue-ink)] text-center">
                  {c.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
