import { PullQuote } from "./PullQuote";

interface Row {
  label: string;
  withDown: string;
  zeroDown: string;
}

const rows: Row[] = [
  {
    label: "Down payment",
    withDown: "$7,500\u2013$15,000",
    zeroDown: "$0",
  },
  {
    label: "Amount financed",
    withDown: "$60,000\u2013$67,500",
    zeroDown: "$75,000",
  },
  {
    label: "Monthly payment",
    withDown: "$1,230\u2013$1,450/mo",
    zeroDown: "$1,540\u2013$1,610/mo",
  },
  {
    label: "Cash left in your business",
    withDown: "Down by $7,500\u2013$15,000",
    zeroDown: "Untouched",
  },
  {
    label: "Time to first tow",
    withDown: "After months of saving + approval",
    zeroDown: "Days",
  },
];

export function PaymentComparisonSection() {
  return (
    <section
      id="the-math"
      className="scroll-mt-[calc(var(--nav-height)+24px)] pt-14"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        What $0 Down Looks Like in Practice
      </h2>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        <p>Forget the abstract. Here&apos;s what this means for a real deal:</p>
        <p className="text-base font-semibold text-[#111] md:text-lg">
          Example: Used rollback, $75,000 purchase price, 60-month term.
        </p>
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-[#D4D4D4] md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#101820] text-white">
              <th scope="col" className="px-4 py-3 font-semibold">
                &nbsp;
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                With $7,500&ndash;$15,000 Down
              </th>
              <th
                scope="col"
                className="border-l-2 border-[#22C55E] px-4 py-3 font-semibold text-[#22C55E]"
              >
                With $0 Down
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D4D4D4] bg-white text-[#111]">
            {rows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="px-4 py-3 text-left font-medium text-[#111]"
                >
                  {row.label}
                </th>
                <td className="px-4 py-3">{row.withDown}</td>
                <td className="bg-[#F0FDF4] px-4 py-3 font-semibold text-[#15803D]">
                  {row.zeroDown}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked */}
      <div className="mt-6 space-y-4 md:hidden">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl border border-[#D4D4D4] bg-white p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#3A3A3A]">
              {row.label}
            </p>
            <dl className="mt-3 grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[#3A3A3A]">With down</dt>
                <dd className="text-right text-[#111]">{row.withDown}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#15803D]">With $0 down</dt>
                <dd className="text-right font-semibold text-[#15803D]">
                  {row.zeroDown}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        <p>
          Look at those two columns. Same truck. Same term. Same seller. The
          only thing that moves between them is whether $15,000 leaves your
          business account.
        </p>
        <p>
          Here&apos;s what that $15,000 actually buys you: roughly $200 off
          your monthly payment. Over the 60-month term, that&apos;s about
          $12,000 in &ldquo;savings.&rdquo;
        </p>
        <p>
          Do the arithmetic.{" "}
          <span className="font-semibold text-[#111]">
            You paid $15,000 to save $12,000.
          </span>{" "}
          That&apos;s not a discount. It&apos;s a prepayment &mdash; and a
          losing one. You&apos;re lending yourself your own working capital,
          and getting back less than you put in.
        </p>
        <p>
          The left column isn&apos;t the &ldquo;responsible&rdquo; choice.
          It&apos;s an operator who sent $15,000 to a lender that
          didn&apos;t need it, to avoid payments they could cover out of tow
          revenue anyway.
        </p>
      </div>

      <PullQuote>
        A down payment isn&apos;t a discount. It&apos;s a loan you made to
        yourself that pays back less than you put in.
      </PullQuote>
    </section>
  );
}
