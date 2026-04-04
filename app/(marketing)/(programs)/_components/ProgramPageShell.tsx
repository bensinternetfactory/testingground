import { HeroLeadGen } from "@/components/sections/heroes/hero-lead-gen/HeroLeadGen";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { EquipmentClosingCtaTrucks } from "@/components/sections/page/equipment-closing-cta";
import { FaqSection } from "@/components/sections/page/faq";
import { Footer } from "@/components/sections/page/footer/Footer";
import { FOOTER_CONFIG } from "@/components/sections/page/footer/config";
import { JsonLd } from "@/components/shared/JsonLd";
import { ArticleSidebar } from "./ArticleSidebar";
import { BlogLayout } from "./BlogLayout";
import { ProgramBottomLinks } from "./ProgramBottomLinks";
import { ProgramSectionRenderer } from "./ProgramSectionRenderer";
import { deriveToc } from "./derive-toc";
import type { ProgramPageConfig } from "./page-config-types";

export function ProgramPageShell({ config }: { config: ProgramPageConfig }) {
  const toc = deriveToc(config.sections, config.faqSection);

  return (
    <div className="min-h-screen bg-white font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <StickyNav />

      <main id="main-content" data-program-slug={config.slug}>
        <HeroLeadGen config={config.hero} />

        <BlogLayout>
          <article className="min-w-0 px-6 py-20 md:px-8 md:py-28 lg:px-10 xl:px-14 2xl:px-20">
            {config.sections.map((section, index) => (
              <ProgramSectionRenderer
                key={section.id ?? `${section.kind}-${index}`}
                section={section}
              />
            ))}
          </article>

          <ArticleSidebar toc={toc} cta={config.sidebarCta} />
        </BlogLayout>

        {config.faqSection ? <FaqSection config={config.faqSection} /> : null}
        <EquipmentClosingCtaTrucks config={config.closingCta} />
        <ProgramBottomLinks config={config.bottomLinks} />
        <JsonLd data={config.schemas.faq} />
        <JsonLd data={config.schemas.service} />
        <JsonLd data={config.schemas.breadcrumb} />
      </main>

      <Footer config={FOOTER_CONFIG} />
    </div>
  );
}
