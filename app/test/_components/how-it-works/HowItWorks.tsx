import { SectionShell } from "../primitives/SectionShell";
import { CtaButton } from "../primitives/CtaButton";
import { HOW_IT_WORKS_STEPS } from "../../_lib/content";

export function HowItWorks() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-12 md:py-16">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)]">How it works</h2>
        <p className="mt-2 text-[14px] text-[var(--t-text-muted)]">
          Three steps, 30 seconds, real lender offers.
        </p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <li
            key={step.n}
            className="rounded-lg border border-[var(--t-card-border)] bg-[var(--t-bg-soft)] p-6"
          >
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--t-blue)] text-white text-sm font-bold mb-4">
              {step.n}
            </div>
            <h3 className="text-[16px] font-bold text-[var(--t-ink)]">{step.title}</h3>
            <p className="mt-2 text-[14px] text-[var(--t-text)]">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 md:mt-10 flex justify-center">
        <CtaButton href="/pre-approval" size="lg">
          Get Pre-Qualified
        </CtaButton>
      </div>
    </SectionShell>
  );
}
