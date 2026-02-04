import { Container } from "@/components/ui/Container";

const buyerRequirements = [
  {
    label: "Established towing business",
    note: "this isn't startup financing. You need operating history.",
  },
  {
    label: "Good credit history",
    note: "not perfect, but solid. We look at the business and personal credit.",
  },
  {
    label: "Minimum deal size: $20,000",
    note: "below that, the process doesn't make sense for either of us.",
  },
  {
    label: "No truck age or mileage restrictions",
    note: "early 2000s trucks, high-mileage workhorses, all fine. If it runs and has value, we can finance it.",
  },
];

const sellerRequirements = [
  {
    label: "Title or e-title",
    note: "we verify ownership and check for liens.",
  },
  {
    label: "Willingness to sign electronic docs",
    note: "about 10-15 minutes of their time.",
  },
  {
    label: "If they have a loan: 10-15 day payoff letter",
    note: "from their lender showing exact payoff amount.",
  },
];

const goodFits = [
  "Heavy wreckers and rotators from other companies",
  "Older equipment that still runs great",
  "Auction purchases",
  "Retiring operator buyouts",
  "Fleet reduction sales from established companies",
];

export function RequirementsSectionV2() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container className="max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Private Party Tow Truck Financing Requirements
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* What you need */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <h3 className="text-xl font-bold text-zinc-900">What you need</h3>
            </div>

            <ul className="mt-6 space-y-4">
              {buyerRequirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-medium text-zinc-900">{req.label}</span>
                    <span className="text-zinc-600">—{req.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What the seller needs */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <h3 className="text-xl font-bold text-zinc-900">What the seller needs</h3>
            </div>

            <ul className="mt-6 space-y-4">
              {sellerRequirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-medium text-zinc-900">{req.label}</span>
                    <span className="text-zinc-600">—{req.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Good fit for */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </span>
              <h3 className="text-xl font-bold text-zinc-900">Good fit for</h3>
            </div>

            <ul className="mt-6 space-y-3">
              {goodFits.map((fit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700">{fit}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-zinc-700">
              The $20,000 minimum means this works especially well for higher-value equipment—heavy wreckers, rotators, well-equipped flatbeds. That&apos;s often where the best private party deals are anyway.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
