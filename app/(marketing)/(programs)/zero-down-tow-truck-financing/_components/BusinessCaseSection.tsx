import { PullQuote } from "./PullQuote";

export function BusinessCaseSection() {
  return (
    <section
      id="business-case"
      className="scroll-mt-[calc(var(--nav-height)+24px)] pt-14"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        Why Zero Down Is a Business Decision, Not a Handout
      </h2>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        <p>
          Most lenders treat a down payment like a trust exercise. Put skin in
          the game, prove you&apos;re serious. That logic makes sense for
          consumer auto loans. It falls apart in towing.
        </p>
        <p>Here&apos;s the math operators already know:</p>
      </div>

      <PullQuote>
        A single tow truck averaging 2&ndash;3 calls per day at $200+ per tow
        generates $12,000&ndash;$18,000/month in gross revenue. A typical
        monthly payment on a financed truck runs $1,500&ndash;$1,600. The
        truck covers its own payment within the first week of the month.
      </PullQuote>

      <div className="space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        <p>
          So why would you drain $10,000&ndash;$25,000 in working capital for a
          down payment when the truck starts earning before the first bill
          hits?
        </p>
        <p>That cash has better places to be:</p>
        <ul className="ps-5 list-disc space-y-2 marker:text-[#22C55E]">
          <li>
            <span className="font-semibold text-[#111]">
              Operating reserves
            </span>{" "}
            &mdash; one insurance renewal or major repair bill and you&apos;re
            scrambling
          </li>
          <li>
            <span className="font-semibold text-[#111]">Growth capital</span>{" "}
            &mdash; the next truck, the next contract, the next opportunity that
            shows up on a Tuesday with no warning
          </li>
          <li>
            <span className="font-semibold text-[#111]">Payroll</span> &mdash;
            drivers don&apos;t wait for your cash flow to catch up
          </li>
          <li>
            <span className="font-semibold text-[#111]">Equipment</span> &mdash;
            new bed, new wheel lift, GPS, lighting &mdash; the stuff that keeps
            trucks road-ready
          </li>
        </ul>
        <p className="pt-2">
          Zero down isn&apos;t about qualifying for less. It&apos;s about
          deploying capital where it works hardest.
        </p>
      </div>
    </section>
  );
}
