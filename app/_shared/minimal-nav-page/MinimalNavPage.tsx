import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { Footer, FOOTER_CONFIG } from "@/components/sections/page/footer";

export function MinimalNavPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-white font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <StickyNav />

      <main id="main-content" className="pt-[var(--nav-height)]">
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            {title}
          </h1>
        </section>
      </main>

      <Footer config={FOOTER_CONFIG} />
    </div>
  );
}
