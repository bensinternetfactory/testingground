import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { PROGRAMS } from "../../_lib/content";

export function ProgramsRow() {
  return (
    <SectionShell outerClassName="bg-[var(--t-bg-soft)]" innerClassName="py-10 md:py-14">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)]">
          Financing programs by situation
        </h2>
        <Link
          href="/programs"
          className="hidden sm:inline text-sm font-semibold text-[var(--t-blue-ink)] hover:underline whitespace-nowrap"
        >
          See all programs →
        </Link>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {PROGRAMS.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="group flex h-full flex-col justify-between gap-3 rounded-lg border border-[var(--t-card-border)] bg-white p-4 hover:border-[var(--t-blue)] hover:shadow-sm transition"
            >
              <div>
                <p className="text-[15px] font-bold text-[var(--t-ink)] group-hover:text-[var(--t-blue-ink)]">
                  {p.label}
                </p>
                <p className="mt-1 text-[13px] text-[var(--t-text-muted)]">
                  {p.description}
                </p>
              </div>
              <span className="inline-flex items-center text-[13px] font-semibold text-[var(--t-blue-ink)]">
                Learn more
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
