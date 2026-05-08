import Image from "next/image";
import { SectionShell } from "../primitives/SectionShell";
import { CtaButton } from "../primitives/CtaButton";
import { SPOTLIGHT } from "../../_lib/content";

export function Spotlight() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        <div className="relative aspect-[4/3] md:aspect-[5/4] w-full">
          <Image
            src={SPOTLIGHT.imageSrc}
            alt={SPOTLIGHT.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--t-text-muted)] mb-3">
            {SPOTLIGHT.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[var(--t-ink-strong)] leading-tight">
            {SPOTLIGHT.headline}
          </h2>
          <p className="mt-4 text-[15px] md:text-base text-[var(--t-text)]">
            {SPOTLIGHT.body}
          </p>
          <div className="mt-6">
            <CtaButton href={SPOTLIGHT.ctaHref} size="lg">
              {SPOTLIGHT.ctaLabel}
            </CtaButton>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
