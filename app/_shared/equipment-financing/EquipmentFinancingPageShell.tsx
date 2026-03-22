import Link from "next/link";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { JsonLd } from "@/components/shared/JsonLd";
import { DrawerProvider, DRAWER_HASH } from "@/components/ui/pre-approval-drawer";
import { BrandMarquee } from "@/components/sections/page/brand-marquee";
import { TrustBridge } from "@/components/sections/page/trust-bridge";
import { ProgramCards } from "@/components/sections/page/program-cards/ProgramCards";
import { EquipmentDealsSection } from "@/components/sections/page/equipment-deals";
import { FaqSection } from "@/components/sections/page/faq";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import { Footer, FOOTER_CONFIG } from "@/components/sections/page/footer";
import { HeroConvertFramed } from "@/components/sections/heroes/hero-convert-framed";
import type { EquipmentFinancingPageConfig } from "./equipment-page-config";

export function EquipmentFinancingPageShell({
  config,
}: {
  config: EquipmentFinancingPageConfig;
}) {
  return (
    <div className="min-h-screen bg-white font-sans">
      <JsonLd data={config.faqSchema} />
      <JsonLd data={config.financialProductSchema} />
      <JsonLd data={config.breadcrumbSchema} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <StickyNav />

      <DrawerProvider>
        <main id="main-content">
          <HeroConvertFramed config={config.hero} />
          <ProgramCards config={config.programs} />
          <BrandMarquee />
          <TrustBridge config={config.trustBridge} />
          <EquipmentDealsSection config={config.dealsSection} />
          <FaqSection config={config.faqSection} />

          <section className="bg-gray-50 py-6 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
            <div className="mx-auto max-w-7xl px-6">
              <ol className="list-none space-y-1 text-xs leading-5 text-[#999]">
                <li>
                  <sup className="mr-1 font-medium">1</sup>
                  No credit check for pre-approval. Full approval uses a soft
                  Experian inquiry, so your score stays untouched.
                </li>
                <li>
                  <sup className="mr-1 font-medium">2</sup>
                  All financing is subject to credit review and approval. Terms
                  vary by truck, seller, and business profile.
                </li>
              </ol>
            </div>
          </section>

          <section className="bg-[#101820] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
            <div className="mx-auto max-w-5xl px-6 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#22C55E]">
                READY WHEN YOU ARE
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {config.closingCta.headline}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
                {config.closingCta.body}
              </p>

              <div className="mt-12">
                <RippleCtaLink
                  href={DRAWER_HASH}
                  label="Get Pre-Approved"
                  size="lg"
                  section="closing-cta"
                  className="!bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]"
                />
              </div>

              <p className="mt-8 text-sm text-white/60">
                Prefer to talk?{" "}
                <a
                  href="tel:+18885550199"
                  className="font-medium text-white underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
                >
                  (888)&nbsp;555-0199
                </a>
                <span className="ml-2 text-white/40">Mon-Fri 8am-6pm CT</span>
              </p>
            </div>
          </section>

          <section className="bg-white py-10 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#545454]">
                {config.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    className="rounded-sm underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </DrawerProvider>

      <Footer config={FOOTER_CONFIG} />
    </div>
  );
}
