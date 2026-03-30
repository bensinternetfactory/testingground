export default function ProgramsLoading() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav skeleton */}
      <div className="fixed top-0 right-0 left-0 z-50 h-[var(--nav-height)] border-b border-[#E9E9E9] bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="h-5 w-36 animate-pulse rounded bg-[#E5E5E5] md:w-44" />
          <div className="h-9 w-24 animate-pulse rounded-full bg-[#E5E5E5]" />
        </div>
      </div>

      {/* Heading section skeleton */}
      <main className="pt-[var(--nav-height)]">
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="h-10 w-3/4 animate-pulse rounded-lg bg-[#E5E5E5] sm:h-14 sm:w-2/3" />
        </section>
      </main>

      {/* Footer skeleton */}
      <footer className="bg-[#101820] pt-16 pb-8 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-5 w-36 animate-pulse rounded bg-white/10" />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
            </div>
            <div className="space-y-3">
              <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
            </div>
            <div className="space-y-3">
              <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
