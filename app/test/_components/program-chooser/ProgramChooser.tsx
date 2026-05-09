import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "../primitives/SectionShell";
import { PROGRAM_CHOICES } from "../../_lib/content";

export function ProgramChooser() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="pt-6 pb-10 md:pt-8 md:pb-14">
      <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)] mb-6 md:mb-8">
        Tow truck financing by need
      </h2>

      <ul className="grid grid-cols-3 gap-x-4 gap-y-5 md:grid-cols-6 md:gap-6">
        {PROGRAM_CHOICES.map((p) => {
          return (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group flex flex-col items-center gap-2 md:gap-3 outline-none"
              >
                <span className="flex items-center justify-center h-[109px] w-[109px] md:h-[200px] md:w-[200px] rounded-full bg-[var(--t-panel)] group-hover:brightness-95 transition">
                  <Image
                    src={p.iconSrc}
                    alt={p.iconAlt}
                    width={p.iconWidth}
                    height={p.iconHeight}
                    className="h-12 w-auto md:h-20 max-w-[64px] md:max-w-[112px]"
                  />
                </span>
                <span className="text-xs md:text-base font-semibold text-[var(--t-ink)] group-hover:text-[var(--t-blue-ink)] text-center leading-tight">
                  {p.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
