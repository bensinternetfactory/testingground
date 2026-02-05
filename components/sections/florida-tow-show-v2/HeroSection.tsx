const CheckIcon = () => (
  <svg
    className="h-5 w-5 text-green-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-800">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        {/* Event date badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-900/50 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75 motion-reduce:animate-none"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
          </span>
          <span>Florida Tow Show — April&nbsp;9-11, 2026 | Orlando</span>
        </div>

        {/* Floating badges */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <div className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-lg font-bold text-white shadow-lg shadow-orange-500/25">
            $0&nbsp;DOWN
          </div>
          <div className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-lg font-bold text-white shadow-lg shadow-orange-500/25">
            180&nbsp;DAYS DEFERRED
          </div>
        </div>

        {/* Main headline */}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl [text-wrap:balance]">
          Walk the Show as a{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Buyer
          </span>
          , Not a Browser
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-blue-100 md:text-2xl">
          Get pre-approved for tow truck financing before April&nbsp;9th. Buy in
          April. Work it all summer. First payment in October.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <a
            href="#"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-orange-500/30 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <span className="relative z-10">Get Pre-Approved Now</span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Trust indicators */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>5-minute application</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>Same-day decisions</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>No obligation</span>
          </li>
        </ul>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
