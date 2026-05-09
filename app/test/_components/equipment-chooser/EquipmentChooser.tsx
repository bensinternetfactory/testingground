import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { RollbackIcon } from "@/app/truckicons/RollbackIcon";
import { WreckerIcon } from "@/app/truckicons/WreckerIcon";
import { HeavyWreckerIcon } from "@/app/truckicons/HeavyWreckerIcon";
import { RotatorIcon } from "@/app/truckicons/RotatorIcon";
import { SectionShell } from "../primitives/SectionShell";
import { EQUIPMENT_CHOICES } from "../../_lib/content";
import type { TruckIconKind } from "../../_lib/types";

const HOOK_ICON_SRC = "/brand-assets/benefit-icons/hook/hook-dark.svg";
const wideClass = "w-[92px] md:w-[120px] h-auto";
const tallClass = "h-16 md:h-20 w-auto";

const RENDER_ICON: Record<TruckIconKind, () => ReactElement> = {
  rollback: () => <RollbackIcon className={wideClass} />,
  wrecker: () => <WreckerIcon className={wideClass} />,
  "heavy-wrecker": () => <HeavyWreckerIcon className={wideClass} />,
  rotator: () => <RotatorIcon className={wideClass} />,
  dtu: () => (
    <Image
      src={HOOK_ICON_SRC}
      alt=""
      width={59}
      height={103}
      className={tallClass}
    />
  ),
  trailer: () => (
    <Image
      src={HOOK_ICON_SRC}
      alt=""
      width={59}
      height={103}
      className={tallClass}
    />
  ),
};

export function EquipmentChooser() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-10 md:py-14">
      <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)] mb-6 md:mb-8">
        What do you need financing on?
      </h2>

      <ul className="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none -mx-4 px-4 scroll-pl-4 md:mx-0 md:px-0 md:scroll-pl-0 md:grid md:grid-cols-6 md:gap-6 md:overflow-visible md:snap-none">
        {EQUIPMENT_CHOICES.map((c) => (
          <li
            key={c.href}
            className="shrink-0 snap-start basis-[40%] min-w-[136px] md:basis-auto md:min-w-0 md:shrink"
          >
            <Link
              href={c.href}
              className="group flex flex-col items-center gap-3 outline-none"
            >
              <span className="flex items-center justify-center h-[136px] w-[136px] md:h-[168px] md:w-[168px] rounded-full bg-[var(--t-panel)] group-hover:brightness-95 transition">
                {RENDER_ICON[c.iconKind]()}
              </span>
              <span className="text-sm md:text-base font-semibold text-[var(--t-ink)] group-hover:text-[var(--t-blue-ink)] text-center">
                {c.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
