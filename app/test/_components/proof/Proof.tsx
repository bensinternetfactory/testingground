import { Quote, DollarSign, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { PROOF_ITEMS } from "../../_lib/content";
import type { ProofItem } from "../../_lib/types";

const ICONS: Record<ProofItem["kind"], LucideIcon> = {
  testimonial: Quote,
  funded: DollarSign,
  approval: Sparkles,
};

export function Proof() {
  return (
    <SectionShell outerClassName="bg-[var(--t-bg-soft)]" innerClassName="py-12 md:py-16">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)]">
          Operators we&apos;ve funded
        </h2>
        <p className="mt-2 text-[14px] text-[var(--t-text-muted)]">
          Real approvals, real trucks, real outcomes.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {PROOF_ITEMS.map((item, i) => {
          const Icon = ICONS[item.kind];
          return (
            <li
              key={i}
              className="rounded-lg bg-white border border-[var(--t-card-border)] p-6 flex flex-col"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--t-bg-tint)] text-[var(--t-blue)] mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-[16px] font-bold text-[var(--t-ink)] leading-snug">{item.title}</h3>
              <p className="mt-1 text-[13px] font-semibold text-[var(--t-text-muted)]">{item.subtitle}</p>
              <p className="mt-3 text-[14px] text-[var(--t-text)] grow">{item.body}</p>
              {(item.attribution || item.meta) && (
                <p className="mt-4 text-[12px] text-[var(--t-text-faint)] uppercase tracking-wider">
                  {item.attribution ?? item.meta}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
