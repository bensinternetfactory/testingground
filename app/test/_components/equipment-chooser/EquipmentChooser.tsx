import Link from "next/link";
import Image from "next/image";
import { SectionShell } from "../primitives/SectionShell";
import { EQUIPMENT_CHOICES } from "../../_lib/content";

export function EquipmentChooser() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-10 md:py-14">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)]">
          What do you need financing on?
        </h2>
        <Link
          href="/equipment"
          className="hidden sm:inline text-sm font-semibold text-[var(--t-blue-ink)] hover:underline whitespace-nowrap"
        >
          See all equipment →
        </Link>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {EQUIPMENT_CHOICES.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group block rounded-lg border border-[var(--t-card-border)] bg-[var(--t-bg-soft)] hover:border-[var(--t-blue)] hover:shadow-sm transition overflow-hidden"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={c.imageSrc}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="px-3 py-3 text-center">
                <span className="text-sm font-semibold text-[var(--t-ink)] group-hover:text-[var(--t-blue-ink)]">
                  {c.label}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
