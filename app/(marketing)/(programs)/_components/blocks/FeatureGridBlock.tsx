import type { FeatureGridSection } from "../page-config-types";
import { renderParagraphContent } from "./render-paragraph-content";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-5 w-5 text-[#22C55E]"
    >
      <path
        fill="currentColor"
        d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z"
      />
    </svg>
  );
}

export function FeatureGridBlock({ section }: { section: FeatureGridSection }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-[calc(var(--nav-height)+24px)] pt-14"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        {section.heading}
      </h2>
      {section.introParagraphs ? (
        <div className="mt-6 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
          {section.introParagraphs.map((paragraph, index) => (
            <p key={index}>{renderParagraphContent(paragraph)}</p>
          ))}
        </div>
      ) : null}

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {section.items.map((item) => (
          <li
            key={item.title}
            className="flex flex-col gap-3 rounded-2xl bg-[#F5F5F5] p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:p-7"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_#E9E9E9]">
              <CheckIcon />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#111]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#3A3A3A]">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {section.closingParagraphs ? (
        <div className="mt-8 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
          {section.closingParagraphs.map((paragraph, index) => (
            <p key={index}>{renderParagraphContent(paragraph)}</p>
          ))}
        </div>
      ) : null}
    </section>
  );
}
