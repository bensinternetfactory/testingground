import { RippleCtaLink } from "@/components/ui/ripple-cta-link";

const bullets = [
  {
    title: "Monthly cash flow",
    body: "after the payment, insurance, and operating costs",
  },
  {
    title: "Breakeven calls",
    body: "how many tows per month before the truck pays for itself",
  },
  {
    title: "Payback period",
    body: "when the truck has fully earned back its cost",
  },
  {
    title: "Profit per tow",
    body: "what you actually keep after expenses on every call",
  },
];

export function CalculatorPromoSection() {
  return (
    <section
      id="calculator"
      className="scroll-mt-[calc(var(--nav-height)+24px)] pt-14"
    >
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:p-10">
        <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
          Run the Numbers on Your Truck
        </h2>
        <div className="mt-5 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
          <p>
            Gut feel says the truck will cash flow. But you should know
            exactly how much before you commit.
          </p>
          <p>
            Our tow truck ROI calculator lets you plug in the real numbers
            &mdash; purchase price, your tow volume, average rate per call,
            insurance, fuel &mdash; and see what comes back:
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {bullets.map((bullet) => (
            <li
              key={bullet.title}
              className="flex gap-3 rounded-2xl bg-white p-4 shadow-[inset_0_0_0_1px_#E9E9E9]"
            >
              <span
                aria-hidden="true"
                className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#22C55E]"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-3 w-3 text-white"
                  fill="currentColor"
                >
                  <path d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z" />
                </svg>
              </span>
              <p className="text-sm leading-relaxed text-[#111]">
                <span className="font-semibold text-[#111]">{bullet.title}</span>{" "}
                &mdash; {bullet.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-base leading-relaxed text-[#111] md:text-lg">
          No signup. No email required. Just your numbers and the answer.
        </p>

        <div className="mt-7">
          <RippleCtaLink
            href="/tow-truck-calculator"
            label="Run the Calculator"
            size="md"
            section="calculator-promo"
          />
        </div>
      </div>
    </section>
  );
}
