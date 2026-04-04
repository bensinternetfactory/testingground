import type { QualificationPathsSection } from "../page-config-types";
import { renderParagraphContent } from "./render-paragraph-content";

export function QualificationPathsBlock({
  section,
}: {
  section: QualificationPathsSection;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-[calc(var(--nav-height)+24px)] pt-14"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        {section.heading}
      </h2>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{renderParagraphContent(paragraph)}</p>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {section.paths.map((path) => (
          <div
            key={path.label}
            className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:p-8"
          >
            <div className="inline-flex items-center rounded-full bg-[#15803D] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              {path.label}
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#111] md:text-[1.75rem]">
              {path.title}
            </h3>
            <ol className="mt-5 space-y-4">
              {path.items.map((item, index) => (
                <li key={item.label} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#F5F5F5] text-sm font-semibold text-[#111]"
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-[#111] md:text-lg">
                      {item.label}
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-[#3A3A3A]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            {path.explanation ? (
              <p className="mt-6 border-t border-[#E9E9E9] pt-5 text-base leading-relaxed text-[#111] md:text-lg">
                {renderParagraphContent(path.explanation)}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {section.closingNote ? (
        <p className="mt-8 text-base leading-relaxed text-[#111] md:text-lg">
          {renderParagraphContent(section.closingNote)}
        </p>
      ) : null}
    </section>
  );
}
