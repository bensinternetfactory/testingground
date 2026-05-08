import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { CtaButton } from "../primitives/CtaButton";
import { PROGRAM_CARDS } from "../../_lib/content";

export function ProgramCards() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-12 md:py-16">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)]">
            Featured financing programs
          </h2>
          <p className="mt-1 text-[14px] text-[var(--t-text-muted)]">
            Real lender programs matched to your situation.
          </p>
        </div>
        <Link
          href="/programs"
          className="hidden sm:inline text-sm font-semibold text-[var(--t-blue-ink)] hover:underline whitespace-nowrap"
        >
          See all →
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {PROGRAM_CARDS.map((card) => (
          <li
            key={card.title}
            className="flex flex-col rounded-lg overflow-hidden border border-[var(--t-card-border)] bg-white hover:shadow-sm transition"
          >
            <div className="relative aspect-[16/10] w-full bg-[var(--t-bg-soft)]">
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 p-5 grow">
              <h3 className="text-lg font-bold text-[var(--t-ink)]">{card.title}</h3>
              <p className="text-[14px] text-[var(--t-text)] grow">{card.description}</p>
              <p className="inline-flex items-start gap-1.5 text-[13px] font-semibold text-[var(--t-success)]">
                <Check className="h-4 w-4 mt-px shrink-0" />
                <span>{card.qualifyingNote}</span>
              </p>
              <div className="pt-1">
                <CtaButton href={card.ctaHref} variant="secondary" size="sm">
                  {card.ctaLabel}
                </CtaButton>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
