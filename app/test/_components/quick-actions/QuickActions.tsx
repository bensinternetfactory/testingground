import Link from "next/link";
import { PiggyBank, Calculator } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { CtaButton } from "../primitives/CtaButton";

export function QuickActions() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-6 md:py-8">
      <div className="rounded-2xl bg-[var(--t-panel)] p-4 md:p-5 grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.2fr] gap-3 md:gap-4 items-stretch">
        {/* Cell 1: Greeting + primary CTA */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-3 px-2 md:px-4 py-2 md:py-1">
          <p className="text-base md:text-lg font-extrabold text-[var(--t-ink)] whitespace-nowrap">
            Found a truck?
          </p>
          <CtaButton href="/pre-approval" size="md">
            Get Approved
          </CtaButton>
        </div>

        {/* Cell 2: icon promo block (white inner panel) */}
        <Link
          href="/pre-approval"
          className="group flex items-center gap-3 rounded-xl bg-white border border-[var(--t-card-border)] hover:border-[var(--t-blue)] hover:shadow-sm transition px-4 py-3"
        >
          <span className="flex items-center justify-center h-12 w-12 rounded-full bg-[var(--t-bg-tint)] text-[var(--t-blue)] shrink-0">
            <PiggyBank className="h-6 w-6" />
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[var(--t-ink)]">
              Looking at trucks?
            </span>
            <span className="text-sm font-semibold text-[var(--t-blue-ink)] group-hover:underline truncate">
              What&apos;s my buying power
            </span>
          </div>
        </Link>

        {/* Cell 3: icon promo block */}
        <Link
          href="/tow-truck-calculator"
          className="group flex items-center gap-3 rounded-xl bg-white border border-[var(--t-card-border)] hover:border-[var(--t-blue)] hover:shadow-sm transition px-4 py-3"
        >
          <span className="flex items-center justify-center h-12 w-12 rounded-full bg-[var(--t-bg-tint)] text-[var(--t-blue)] shrink-0">
            <Calculator className="h-6 w-6" />
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[var(--t-ink)]">
              Tow Truck ROI Calculator
            </span>
            <span className="text-sm font-semibold text-[var(--t-blue-ink)] group-hover:underline truncate">
              Estimate your return →
            </span>
          </div>
        </Link>
      </div>
    </SectionShell>
  );
}
