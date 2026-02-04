import { Container } from "@/components/ui/Container";

export function CTASectionV2() {
  return (
    <section id="cta" className="bg-gradient-to-br from-amber-600 via-amber-600 to-orange-600 py-16 md:py-24">
      <Container className="max-w-4xl">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Found a Truck? See Your Payment in 30 Seconds
          </h2>

          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg text-white/90">
            <p>
              Got a truck in mind? Run the numbers. Our payment calculator shows your estimated monthly payment instantly—no credit check, no commitment.
            </p>
            <p>
              If you want to proceed, the credit application takes 30 seconds. Approval decision same day. We finance private party deals in all 50 states.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-amber-700 shadow-lg transition-all hover:bg-amber-50 hover:shadow-xl"
            >
              Check Your Payment
            </a>
            <a
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              See What You Qualify For
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              No dealer required
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Title verification included
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Bank payoffs handled
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
