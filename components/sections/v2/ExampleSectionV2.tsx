import { Container } from "@/components/ui/Container";

export function ExampleSectionV2() {
  return (
    <section className="bg-zinc-50 py-16 md:py-24">
      <Container className="max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            What a Private Party Deal Actually Looks Like
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Example 1 - Clear Title */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg">
            {/* Header badge */}
            <div className="absolute right-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Clear Title
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </span>
                <h3 className="text-xl font-bold text-zinc-900">
                  The $57,000 Ram 5500 Rollback
                </h3>
              </div>

              <p className="mt-4 text-zinc-600">
                Customer found a Ram 5500 rollback on Facebook Marketplace. Seller was a towing operator scaling down his fleet. Price was fair, truck was solid, but no dealer meant most lenders wouldn&apos;t touch it.
              </p>

              {/* Stats */}
              <div className="mt-6 flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-amber-600">$57,000</p>
                  <p className="text-sm text-zinc-500">Deal value</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">4 days</p>
                  <p className="text-sm text-zinc-500">Time to fund</p>
                </div>
              </div>

              {/* Steps */}
              <div className="mt-6 space-y-3">
                {[
                  "Customer sent us the listing and seller info",
                  "Seller had clear title—no existing loan",
                  "Customer signed docs electronically",
                  "Seller completed his paperwork in about 10 minutes",
                  "We wired $57,000 to the seller",
                  "Seller mailed the title, customer picked up the truck",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-zinc-600">{step}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-zinc-500">
                Total time from first contact to funding: 4 days. Would have been faster, but the seller was out of town for a day.
              </p>
            </div>
          </div>

          {/* Example 2 - With Payoff */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg">
            {/* Header badge */}
            <div className="absolute right-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Bank Payoff
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </span>
                <h3 className="text-xl font-bold text-zinc-900">
                  When the seller has a loan
                </h3>
              </div>

              <p className="mt-4 text-zinc-600">
                Different deal, same process—with an extra step. Buyer found a heavy wrecker from another company. Seller still owed $40,000 on it. Agreed price was $75,000.
              </p>

              {/* Stats */}
              <div className="mt-6 flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-amber-600">$75,000</p>
                  <p className="text-sm text-zinc-500">Deal value</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">$40,000</p>
                  <p className="text-sm text-zinc-500">Payoff handled</p>
                </div>
              </div>

              {/* Steps */}
              <div className="mt-6 space-y-3">
                {[
                  "Seller got a 10-15 day payoff letter from their lender",
                  "We verified the payoff amount and lien position",
                  "At closing, we wired $40,000 to the seller's bank",
                  "We sent the remaining $35,000 equity to the seller",
                  "Bank released the title once payoff cleared",
                  "Deal done, buyer picked up the truck",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-zinc-600">{step}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-zinc-500">
                Added about a week for the payoff process. But the buyer got the wrecker he wanted at a price that worked.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
