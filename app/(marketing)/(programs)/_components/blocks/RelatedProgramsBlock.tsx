import Image from "next/image";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import type { RelatedProgramsSection } from "../page-config-types";
import { renderParagraphContent } from "./render-paragraph-content";

const ArrowIcon = (
  <svg
    className="h-4 w-4"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export function RelatedProgramsBlock({
  section,
}: {
  section: RelatedProgramsSection;
}) {
  return (
    <section className="pt-14">
      <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        {section.heading}
      </h2>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{renderParagraphContent(paragraph)}</p>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {section.programs.map((program) => (
          <li
            key={program.href}
            className="flex flex-col gap-4 rounded-3xl bg-white p-7 shadow-[inset_0_0_0_1px_#E9E9E9] md:p-8"
          >
            <Image
              src={program.iconSrc}
              alt=""
              width={72}
              height={72}
              className="mb-4 h-10 w-auto self-start sm:h-12"
            />
            <h3 className="text-lg font-semibold tracking-tight text-[#111]">
              {program.title}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-[#3A3A3A]">
              {program.body}
            </p>
            <RippleCtaLink
              href={program.href}
              label={program.linkLabel}
              icon={ArrowIcon}
              variant="outline"
              size="sm"
              section="related-programs"
              className="self-start"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
