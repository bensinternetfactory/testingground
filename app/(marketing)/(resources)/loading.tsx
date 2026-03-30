export default function ResourcesLoading() {
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
        {/* Dark hero skeleton */}
        <section className="bg-[#101820] py-12 md:py-16 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-white/10 sm:h-14" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-white/10" />
              <div className="h-4 w-2/3 max-w-2xl animate-pulse rounded bg-white/10" />
            </div>
            {/* Trust badge skeletons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="h-8 w-32 animate-pulse rounded-full border border-white/10" />
              <div className="h-8 w-28 animate-pulse rounded-full border border-white/10" />
              <div className="h-8 w-36 animate-pulse rounded-full border border-white/10" />
            </div>
          </div>
        </section>

        {/* Content area skeleton */}
        <section className="py-12 md:py-20 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="h-96 animate-pulse rounded-2xl bg-[#F5F5F5]" />
          </div>
        </section>

        {/* Disclaimer bar skeleton */}
        <section className="bg-[#101820] py-8 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="h-3 w-full animate-pulse rounded bg-white/10" />
            <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-white/10" />
          </div>
        </section>
      </main>
    </div>
  );
}
