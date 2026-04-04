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
          Example: Used rollback, $75,000 purchase price, 60-month term,
          8.5&ndash;10.5% rate
        </p>
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl shadow-[inset_0_0_0_1px_#E9E9E9] md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#F5F5F5] text-[#111]">
              <th scope="col" className="px-4 py-3 font-semibold">
                &nbsp;
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                With $7,500&ndash;$15,000 Down
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-[#15803D]">
                With $0 Down
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9E9E9] bg-white text-[#111]">
            {rows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="px-4 py-3 text-left font-medium text-[#111]"
                >
                  {row.label}
                </th>
                <td className="px-4 py-3">{row.withDown}</td>
                <td className="px-4 py-3 font-medium text-[#15803D]">
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
            className="rounded-2xl bg-white p-4 shadow-[inset_0_0_0_1px_#E9E9E9]"
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
                <dd className="text-right font-medium text-[#15803D]">
                  {row.zeroDown}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        <p>
          Same rate. Same term. The only difference is whether you hand over
          $7,500&ndash;$15,000 upfront or keep it working in your business.
        </p>
        <p>
          Yes, the monthly payment is higher without a down payment. Roughly
          $150&ndash;$300/mo higher depending on the deal. Operators know this.
        </p>
        <p>
          But here&apos;s what that $15,000 &ldquo;saved&rdquo; on the monthly
          payment actually costs you: if that truck runs 2&ndash;3 tows per day
          at $200+, you&apos;re leaving $12,000&ndash;$18,000/month in gross
          revenue on the table every month you spend saving up. The difference
          in monthly payment pays for itself before lunch on day one.
        </p>
      </div>

      <PullQuote>The math isn&apos;t close.</PullQuote>
    </section>
  );
}
