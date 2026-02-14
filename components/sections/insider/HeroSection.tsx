export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16"
    >
      {/* Subtle diagonal lines pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            #ffffff 40px,
            #ffffff 41px
          )`,
        }}
      />

      {/* Amber radial glow */}
      <div
        className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-amber-500/[0.07] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(90vh-4rem)] max-w-6xl items-center px-6 py-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-900/20 px-4 py-2 text-sm font-semibold tracking-wide text-amber-300 uppercase">
            Tow Truck Financing &mdash; Built for the Industry
          </p>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            Tow Truck Financing From People Who{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Know the Business
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl [text-wrap:pretty]">
            We&rsquo;ve financed over 3,000 tow trucks &mdash; flatbeds,
            rollbacks, wreckers, and heavy-duty rotators. Get pre-approved in
            under 30&nbsp;seconds. No credit check. Just a straight answer.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#pre-approve"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-orange-500/25 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              <span className="relative z-10">
                Get Pre-Approved &mdash; No Credit Check
              </span>
              <div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-4 text-sm text-slate-500">
            30-second form. No credit impact. Real pre-approval &mdash; not a
            bait quote.
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-slate-900 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
