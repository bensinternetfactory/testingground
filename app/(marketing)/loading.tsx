export default function MarketingLoading() {
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
        {/* Hero skeleton */}
        <section className="bg-white py-12 md:py-16 lg:py-20 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-6 md:text-center">
            <div className="mx-auto md:max-w-3xl">
              <div className="h-12 w-3/4 animate-pulse rounded-lg bg-[#E5E5E5] md:mx-auto md:h-16" />
              <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-[#E5E5E5] md:mx-auto" />
              <div className="mt-8 hidden h-14 w-full max-w-md animate-pulse rounded-full bg-[#E5E5E5] md:mx-auto md:block" />
            </div>
          </div>
        </section>

        {/* Equipment cards skeleton */}
        <section className="bg-[#F5F5F5] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto h-8 w-64 animate-pulse rounded bg-[#E5E5E5]" />
            <div className="mx-auto mt-3 h-5 w-48 animate-pulse rounded bg-[#E5E5E5]" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="h-64 animate-pulse rounded-3xl bg-white" />
              <div className="h-64 animate-pulse rounded-3xl bg-white" />
              <div className="h-64 animate-pulse rounded-3xl bg-white" />
              <div className="h-64 animate-pulse rounded-3xl bg-white" />
            </div>
          </div>
        </section>

        {/* Two-column section hint */}
        <section className="bg-white py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-2 lg:gap-12">
            <div className="h-48 animate-pulse rounded-2xl bg-[#E5E5E5]" />
            <div className="mt-8 space-y-4 lg:mt-0">
              <div className="h-8 w-2/3 animate-pulse rounded bg-[#E5E5E5]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#E5E5E5]" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-[#E5E5E5]" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
