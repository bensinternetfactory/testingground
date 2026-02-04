import { Container } from "@/components/ui/Container";

export function HeroSectionV2() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32">
      {/* Accent stripe */}
      <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

      <Container className="max-w-5xl">
        <div className="flex flex-col items-start">
          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No Dealer Required
          </span>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Private Party{" "}
            <span className="text-amber-600">Tow Truck</span>{" "}
            Financing
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-600">
            Found a truck from another towing company? A retiring operator? Facebook Marketplace?{" "}
            <span className="font-semibold text-zinc-900">You can finance it.</span>
          </p>

          {/* Key points */}
          <div className="mt-8 space-y-4 text-lg text-zinc-600">
            <p>
              Private party tow truck financing lets you buy equipment directly from sellers—no dealer required. That $57,000 Ram 5500 flatbed you spotted on Marketplace? The heavy wrecker a competitor is selling? The rotator from a retiring owner? All financeable.
            </p>
            <p>
              <span className="font-medium text-zinc-900">The problem:</span> Most lenders refuse private party deals. They only work with dealers because it&apos;s easier. No dealer invoice? No financing.
            </p>
            <p>
              We built our process around private party transactions. We verify titles, handle bank payoffs when sellers still owe money, and wire funds directly. You find the truck. We finance it.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cta"
              className="inline-flex h-14 items-center justify-center rounded-full bg-amber-600 px-8 text-base font-semibold text-white shadow-lg shadow-amber-600/25 transition-all hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-600/30"
            >
              See What You Qualify For
            </a>
            <a
              href="#process"
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-zinc-200 bg-white px-8 text-base font-semibold text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
            >
              How It Works
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              All 50 States
            </div>
            <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Same-Day Decisions
            </div>
            <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Bank Payoffs Handled
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
