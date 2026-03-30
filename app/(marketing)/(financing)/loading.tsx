export default function FinancingLoading() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav skeleton */}
      <div className="fixed top-0 right-0 left-0 z-50 h-[var(--nav-height)] border-b border-[#E9E9E9] bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="h-5 w-36 animate-pulse rounded bg-[#E5E5E5] md:w-44" />
          <div className="h-9 w-24 animate-pulse rounded-full bg-[#E5E5E5]" />
        </div>
      </div>

      <main className="pt-[var(--nav-height)]">
        {/* Hero skeleton — two-column layout */}
        <section className="bg-white 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 lg:py-16">
            {/* Left column — text + tile selector */}
            <div className="space-y-6">
              <div className="h-10 w-4/5 animate-pulse rounded-lg bg-[#E5E5E5] sm:h-14" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-[#E5E5E5]" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#E5E5E5]" />
              </div>
              {/* Framed tile selector skeleton */}
              <div className="rounded-3xl border border-[#E9E9E9] p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="h-20 animate-pulse rounded-2xl bg-[#F5F5F5] sm:h-32" />
                  <div className="h-20 animate-pulse rounded-2xl bg-[#F5F5F5] sm:h-32" />
                  <div className="h-20 animate-pulse rounded-2xl bg-[#F5F5F5] sm:h-32" />
                  <div className="h-20 animate-pulse rounded-2xl bg-[#F5F5F5] sm:h-32" />
                </div>
                <div className="mt-4 h-12 w-full animate-pulse rounded-full bg-[#E5E5E5]" />
              </div>
            </div>
            {/* Right column — gallery image (desktop) */}
            <div className="hidden lg:block">
              <div className="h-80 animate-pulse rounded-3xl bg-[#E5E5E5]" />
            </div>
          </div>
          {/* Mobile hero image */}
          <div className="px-4 pb-4 sm:px-6 lg:hidden">
            <div className="h-48 w-full animate-pulse rounded-2xl bg-[#E5E5E5] sm:h-56" />
          </div>
        </section>

        {/* Brand marquee skeleton */}
        <section className="bg-[#101820] py-6 md:py-8 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 overflow-hidden px-6">
            <div className="h-6 w-20 animate-pulse rounded bg-white/10" />
            <div className="h-6 w-24 animate-pulse rounded bg-white/10" />
            <div className="hidden h-6 w-20 animate-pulse rounded bg-white/10 sm:block" />
            <div className="hidden h-6 w-28 animate-pulse rounded bg-white/10 md:block" />
            <div className="hidden h-6 w-20 animate-pulse rounded bg-white/10 lg:block" />
          </div>
        </section>

        {/* FAQ skeleton hint */}
        <section className="bg-white py-20 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto h-8 w-48 animate-pulse rounded bg-[#E5E5E5]" />
            <div className="mt-8 space-y-4">
              <div className="h-14 animate-pulse rounded-xl bg-[#F5F5F5]" />
              <div className="h-14 animate-pulse rounded-xl bg-[#F5F5F5]" />
              <div className="h-14 animate-pulse rounded-xl bg-[#F5F5F5]" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
