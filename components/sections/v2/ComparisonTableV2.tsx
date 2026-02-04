import { Container } from "@/components/ui/Container";

const comparisonData = [
  {
    factor: "Selection",
    privateParty: "Unlimited—anywhere you find it",
    dealer: "Limited to their inventory",
    privatePartyWins: true,
  },
  {
    factor: "Price",
    privateParty: "Typically lower (no retail markup)",
    dealer: "Retail pricing",
    privatePartyWins: true,
  },
  {
    factor: "Financing",
    privateParty: "Need a lender who does private party",
    dealer: "Most lenders work with dealers",
    privatePartyWins: false,
  },
  {
    factor: "Speed",
    privateParty: "Depends on seller cooperation",
    dealer: "Usually straightforward",
    privatePartyWins: false,
  },
  {
    factor: "Warranty",
    privateParty: "As-is, typically",
    dealer: "Sometimes available",
    privatePartyWins: false,
  },
  {
    factor: "Inspection",
    privateParty: "You do your own due diligence",
    dealer: "Dealer handles prep",
    privatePartyWins: null,
  },
];

const dealerMakesSense = [
  "You need the truck immediately",
  "You want a warranty",
  "You don't have time to verify condition yourself",
  "You're new to buying equipment",
];

const privatePartyWins = [
  "You found a specific truck at a good price",
  "You're buying from someone you know or trust",
  "Heavy equipment that rarely shows up at dealers",
  "You know how to evaluate a truck yourself",
];

export function ComparisonTableV2() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container className="max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Private Party vs Dealer Financing: Which Is Right for You?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Neither option is universally better. It depends on your situation.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <caption className="sr-only">
                Comparison of private party and dealer tow truck financing
              </caption>
              <thead>
                <tr className="bg-zinc-100">
                  <th
                    scope="col"
                    className="py-4 pl-6 pr-4 text-left text-sm font-semibold text-zinc-900"
                  >
                    Factor
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-sm font-semibold text-zinc-900"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
                        P
                      </span>
                      Private Party
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 pr-6 text-left text-sm font-semibold text-zinc-900"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-600 text-xs text-white">
                        D
                      </span>
                      Dealer
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-zinc-50"}
                  >
                    <td className="py-4 pl-6 pr-4 text-sm font-semibold text-zinc-900">
                      {row.factor}
                    </td>
                    <td className="px-4 py-4 text-sm text-zinc-600">
                      <div className="flex items-center gap-2">
                        {row.privatePartyWins === true && (
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        {row.privateParty}
                      </div>
                    </td>
                    <td className="px-4 py-4 pr-6 text-sm text-zinc-600">
                      <div className="flex items-center gap-2">
                        {row.privatePartyWins === false && (
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        {row.dealer}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to choose cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Dealer */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-600 text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              <h3 className="text-xl font-bold text-zinc-900">When dealer makes sense</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {dealerMakesSense.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-zinc-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Party */}
          <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </span>
              <h3 className="text-xl font-bold text-zinc-900">When private party wins</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {privatePartyWins.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-lg text-zinc-600">
          Most established operators are comfortable evaluating equipment themselves. If that&apos;s you, private party opens up deals you&apos;d never find at a dealer—especially for heavy wreckers and specialty equipment.
        </p>
      </Container>
    </section>
  );
}
