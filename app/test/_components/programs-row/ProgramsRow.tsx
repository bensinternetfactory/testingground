import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { PROGRAMS } from "../../_lib/content";

export function ProgramsRow() {
  return (
    <SectionShell outerClassName="bg-[var(--t-bg-soft)]" innerClassName="py-10 md:py-14">
      <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)] mb-6 md:mb-8">
        Financing programs by situation
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 md:gap-y-4">
        {PROGRAMS.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="group inline-flex items-baseline gap-2 text-base md:text-lg font-medium text-[var(--t-blue-ink)] underline underline-offset-4 decoration-[var(--t-blue-ink)]/40 hover:decoration-[var(--t-blue-ink)] hover:text-[var(--t-blue-hover)] transition"
            >
              <span>{p.label}</span>
              <ArrowRight className="h-4 w-4 self-center -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition" />
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
