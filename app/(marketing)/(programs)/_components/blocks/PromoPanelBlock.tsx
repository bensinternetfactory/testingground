import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import type { PromoPanelSection } from "../page-config-types";
import { renderParagraphContent } from "./render-paragraph-content";

export function PromoPanelBlock({ section }: { section: PromoPanelSection }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-[calc(var(--nav-height)+24px)] pt-14"
    >
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:p-10">
        <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
          {section.heading}
        </h2>
        <div className="mt-5 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>{renderParagraphContent(paragraph)}</p>
          ))}
        </div>

        {section.bullets ? (
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {section.bullets.map((bullet) => (
              <li
                key={bullet.title}
                className="flex gap-3 rounded-2xl bg-white p-4 shadow-[inset_0_0_0_1px_#E9E9E9]"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#22C55E]"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                  >
                    <path d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z" />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-[#111]">
                  <span className="font-semibold text-[#111]">
                    {bullet.title}
                  </span>
                  {" \u2014 "}
                  {bullet.body}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {section.closingParagraphs ? (
          <div className="mt-6 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
            {section.closingParagraphs.map((paragraph, index) => (
              <p key={index}>{renderParagraphContent(paragraph)}</p>
            ))}
          </div>
        ) : null}

        <div className="mt-7">
          <RippleCtaLink
            href={section.cta.href}
            label={section.cta.label}
            preApprovalTrigger={section.cta.preApprovalTrigger}
            size="md"
            section="calculator-promo"
          />
        </div>
      </div>
    </section>
  );
}
