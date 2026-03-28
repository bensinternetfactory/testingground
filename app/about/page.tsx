import type { Metadata } from "next";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm/StickyNav";
import { Footer } from "@/components/sections/page/footer/Footer";
import { FOOTER_CONFIG } from "@/components/sections/page/footer/config";

export const metadata: Metadata = {
  title: "About TowLoans",
  description: "This is about page.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <StickyNav />

      <main className="pt-[var(--nav-height)]">
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <h1 className="text-4xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            This is about page
          </h1>
        </section>
      </main>

      <Footer config={FOOTER_CONFIG} />
    </div>
  );
}
