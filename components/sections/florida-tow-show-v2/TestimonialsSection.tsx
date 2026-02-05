const testimonials = [
  {
    quote:
      "Got pre-approved before last year's show. Found a rollback on the floor, negotiated $3K off because I could close same day. Seller didn't want to haul it back.",
    name: "Mike R.",
    location: "Tampa",
    highlight: "Saved $3K",
  },
  {
    quote:
      "I'd been to three shows just looking. Finally got smart, got pre-approved, and walked out with a medium-duty wrecker. Should've done it years ago.",
    name: "Carlos M.",
    location: "Orlando",
    highlight: "Closed at the show",
  },
  {
    quote:
      "The 180-day deferral was the difference. Used it all summer, had the money by the time payments started.",
    name: "James T.",
    location: "Jacksonville",
    highlight: "Paid with revenue",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-slate-900 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Operators Who Came{" "}
            <span className="text-amber-400">Prepared</span>
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Real stories from the show floor.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li
              key={index}
              className="relative rounded-2xl bg-slate-800 p-8 shadow-xl"
            >
              {/* Quote mark */}
              <div
                className="absolute -top-4 left-6 text-6xl font-serif text-amber-500/30"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Highlight badge */}
              <div className="mb-4 inline-block rounded-full bg-amber-500/20 px-4 py-1 text-sm font-medium text-amber-400">
                {testimonial.highlight}
              </div>

              <blockquote className="relative z-10 text-lg leading-relaxed text-slate-300">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <footer className="mt-6 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-lg font-bold text-white"
                  aria-hidden="true"
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <cite className="not-italic font-bold text-white">
                    {testimonial.name}
                  </cite>
                  <p className="flex items-center gap-1 text-sm text-slate-400">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {testimonial.location}, FL
                  </p>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
