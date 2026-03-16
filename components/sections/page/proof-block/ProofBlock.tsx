import type { ProofBlockConfig } from "./config";

const CheckIcon = (
  <svg
    className="h-5 w-5 text-[#22C55E]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = (
  <svg
    className="h-5 w-5 text-[#D1D5DB]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export function ProofBlock({ config }: { config: ProofBlockConfig }) {
  const { kicker, headline, description, columns, rows } = config;

  return (
    <section
      id="proof"
      className="bg-white py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
            {kicker}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            {headline}
          </h2>
          {description ? (
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#545454] sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-3xl shadow-[inset_0_0_0_1px_#E9E9E9]">
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[36rem] text-left">
            <thead>
              <tr className="border-b border-[#E9E9E9] bg-[#F5F5F5]">
                <th scope="col" className="px-6 py-4 text-sm font-medium text-[#545454]">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-[#101820]">
                  {columns[0]}
                </th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-[#545454]">
                  {columns[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={
                    i < rows.length - 1 ? "border-b border-[#E9E9E9]" : ""
                  }
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#101820] sm:text-base">
                    {row.feature}
                  </td>
                  {row.values.map((value, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      <div className="flex justify-center">
                        {value ? CheckIcon : XIcon}
                        <span className="sr-only">
                          {value ? "Yes" : "No"}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
