import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Truck } from "lucide-react";
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
  dtu: Truck as IconComponent,
  lowboy: Truck as IconComponent,
};

const WIDE_ICON_KINDS = new Set<TruckIconKind>([
  "rollback",
  "wrecker",
  "heavy-wrecker",
  "rotator",
]);

export function EquipmentChooser() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-10 md:py-14">
      <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)] mb-6 md:mb-8">
        What do you need financing on?
      </h2>

      <ul
        className="
          flex gap-4 md:gap-6
          overflow-x-auto lg:overflow-visible
          snap-x snap-mandatory lg:snap-none
          -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0
          lg:justify-between
          scroll-smooth
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          pb-2
        "
      >
        {EQUIPMENT_CHOICES.map((c) => {
          const Icon = ICONS[c.iconKind];
          const isWide = WIDE_ICON_KINDS.has(c.iconKind);
          return (
            <li key={c.href} className="snap-start shrink-0 lg:shrink">
              <Link
                href={c.href}
                className="group flex flex-col items-center gap-3 w-[144px] md:w-[176px] outline-none"
              >
                <span className="flex items-center justify-center h-[136px] w-[136px] md:h-[168px] md:w-[168px] rounded-full bg-[var(--t-panel)] group-hover:brightness-95 transition">
                  <Icon
                    className={
                      isWide
                        ? "w-[92px] md:w-[120px] h-auto"
                        : "h-16 w-16 md:h-20 md:w-20 text-[var(--t-ink)]"
                    }
                  />
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
