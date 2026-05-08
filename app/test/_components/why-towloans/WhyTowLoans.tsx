import { ShieldCheck, Zap, BadgeCheck, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { WHY_TOWLOANS } from "../../_lib/content";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Zap,
  BadgeCheck,
  Phone,
};

export function WhyTowLoans() {
  return (
    <SectionShell outerClassName="bg-[var(--t-bg-tint)] border-y border-[var(--t-divider)]" innerClassName="py-12 md:py-16">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)]">Why operators choose TowLoans</h2>
        <p className="mt-2 text-[15px] text-[var(--t-text-muted)]">
          Built for tow truck buyers, not generic equipment finance leads.
        </p>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {WHY_TOWLOANS.map((item) => {
          const Icon = ICONS[item.icon] ?? ShieldCheck;
          return (
            <li
              key={item.title}
              className="rounded-lg bg-white border border-[var(--t-card-border)] p-5"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--t-bg-tint)] text-[var(--t-blue)] mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-[15px] font-bold text-[var(--t-ink)]">{item.title}</h3>
              <p className="mt-1 text-[13px] text-[var(--t-text-muted)]">{item.body}</p>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
