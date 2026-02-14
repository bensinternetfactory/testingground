const TruckIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
    />
  </svg>
);

export function StickyNav() {
  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 border-b border-[#E9E9E9] bg-white/95 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/revenue-leak" className="text-xl font-medium text-[#DE3341]">
          TowCap
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <a
              href="#financing"
              className="text-base font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
            >
              Financing
            </a>
          </li>
          <li>
            <a
              href="#programs"
              className="text-base font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
            >
              Programs
            </a>
          </li>
          <li>
            <a
              href="#calculator"
              className="text-base font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
            >
              Calculator
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-base font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
            >
              About
            </a>
          </li>
        </ul>

        {/* Phone + CTA */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+18885550199"
            className="flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
            aria-label="Call us at (888) 555-0199"
          >
            <TruckIcon />
            <span className="hidden sm:inline">(888)&nbsp;555-0199</span>
          </a>
          <a
            href="#pre-approve"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#111111] px-6 text-base font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            <span className="hidden sm:inline">Get Pre-Approved</span>
            <span className="sm:hidden">Apply</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
