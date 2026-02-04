import { Container } from "@/components/ui/Container";

const dealKillers = [
  {
    number: "1",
    title: "Impatient sellers",
    problem:
      "Seller wants cash today. Doesn't want to wait a few days for financing to process. Decides to take a lower cash offer instead.",
    context:
      "Financing takes time—not weeks, but not hours either. A cooperative seller with clear title can close same day. But if the seller needs a payoff or is slow to respond, it takes longer.",
    solution:
      "Set expectations with the seller before you commit. Tell them you're financing, explain the timeline, make sure they're willing to wait. If they need cash today, this isn't the deal.",
  },
  {
    number: "2",
    title: "Hidden liens",
    problem:
      "Seller thinks the title is clear. Turns out their bank still has a claim. Or there's a mechanic's lien they forgot about. We discover it during verification.",
    context:
      "We can handle payoffs—that's routine. But surprise liens add time and sometimes kill the deal if the seller didn't budget for them.",
    solution:
      "Ask the seller directly if there's any money owed on the truck. Get a copy of the title early. We'll verify everything, but knowing upfront helps.",
  },
  {
    number: "3",
    title: "Valuation gaps",
    problem:
      "Seller wants $80,000. Comps say $60,000. The bank runs approximately 5 comps on similar trucks—recently sold, currently listed. If the agreed price is way over market, the deal doesn't work.",
    context: "",
    solution:
      "Know the market before you negotiate. Check what similar trucks are selling for. If the price is fair, financing works. If you're overpaying, we'll tell you—and you might want to renegotiate.",
  },
];

export function DealKillersSectionV2() {
  return (
    <section className="bg-zinc-50 py-16 md:py-24">
      <Container className="max-w-5xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Deal Breakers
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            What Makes Private Party Deals Fall Through
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Not every private party deal closes. Here&apos;s what kills them—so you can avoid these problems.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {dealKillers.map((killer, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
            >
              <div className="flex flex-col md:flex-row">
                {/* Number badge */}
                <div className="flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 p-6 text-white md:w-24">
                  <span className="text-4xl font-bold">#{killer.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                  <h3 className="text-xl font-bold text-zinc-900">{killer.title}</h3>

                  {/* Problem */}
                  <div className="mt-4 rounded-lg bg-red-50 p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-zinc-700">{killer.problem}</p>
                    </div>
                  </div>

                  {/* Context */}
                  {killer.context && (
                    <p className="mt-4 text-zinc-600">{killer.context}</p>
                  )}

                  {/* Solution */}
                  <div className="mt-4 rounded-lg bg-green-50 p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <span className="font-semibold text-green-800">Solution: </span>
                        <span className="text-zinc-700">{killer.solution}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm md:p-8">
          <p className="text-lg text-zinc-700">
            Most deals close fine. But the ones that don&apos;t usually fail for one of these three reasons. Knowing them helps you pick better deals and set them up right from the start.
          </p>
        </div>
      </Container>
    </section>
  );
}
