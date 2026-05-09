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
const TRUCK_CLASS = "w-[115px] md:w-[155px] h-auto";
const ROLLBACK_CLASS = "w-[125px] md:w-[170px] h-auto";
const HOOK_CLASS = "h-[60px] md:h-[80px] w-auto";

const RENDER_ICON: Record<TruckIconKind, () => ReactElement> = {
  rollback: () => <RollbackIcon className={ROLLBACK_CLASS} />,
  wrecker: () => <WreckerIcon className={TRUCK_CLASS} />,
  "heavy-wrecker": () => <HeavyWreckerIcon className={TRUCK_CLASS} />,
  rotator: () => <RotatorIcon className={TRUCK_CLASS} />,
  dtu: () => (
    <Image
      src={HOOK_ICON_SRC}
      alt=""
      width={59}
      height={103}
      className={HOOK_CLASS}
    />
  ),
  trailer: () => (
    <Image
      src={HOOK_ICON_SRC}
      alt=""
      width={59}
      height={103}
      className={HOOK_CLASS}
    />
  ),
};

export function EquipmentChooser() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="pt-10 pb-6 md:pt-14 md:pb-8">
      <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)] mb-6 md:mb-8">
        What do you need financing on?
      </h2>

      <ul className="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none -mx-4 px-4 scroll-pl-4 md:mx-0 md:px-0 md:scroll-pl-0 md:grid md:grid-cols-6 md:gap-6 md:overflow-visible md:snap-none">
        {EQUIPMENT_CHOICES.map((c) => (
          <li
            key={c.href}
            className="shrink-0 snap-start basis-[40%] min-w-[140px] md:basis-auto md:min-w-0 md:shrink"
          >
            <Link
              href={c.href}
              className="group flex flex-col items-center gap-3 outline-none"
            >
              <span className="flex items-center justify-center h-[140px] w-[140px] md:h-[200px] md:w-[200px] rounded-full bg-[var(--t-panel)] group-hover:brightness-95 transition">
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
