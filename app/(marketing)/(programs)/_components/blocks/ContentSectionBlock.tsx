import type { ContentSection } from "../page-config-types";
import { renderParagraphContent } from "./render-paragraph-content";

export function ContentSectionBlock({
  section,
}: {
  section: ContentSection;
}) {
  const prose = (
    <div
      className={`space-y-5 text-base leading-relaxed text-[#111] md:text-lg ${
        section.heading || section.eyebrow ? "mt-6" : ""
      }`}
    >
      {section.paragraphs.map((paragraph, index) => (
        <p key={index}>{renderParagraphContent(paragraph)}</p>
      ))}
      {section.list ? (
        <ul className="ps-5 list-disc space-y-2 marker:text-[#22C55E]">
          {section.list.map((item) => (
            <li key={item.label}>
              <span className="font-semibold text-[#111]">{item.label}</span>
              {" \u2014 "}
              {item.body}
            </li>
          ))}
        </ul>
      ) : null}
      {section.closingParagraphs?.map((paragraph, index) => (
        <p key={index} className={section.list && index === 0 ? "pt-2" : undefined}>
          {renderParagraphContent(paragraph)}
        </p>
      ))}
    </div>
  );

  if (section.id) {
    return (
      <section
        id={section.id}
        className="scroll-mt-[calc(var(--nav-height)+24px)] pt-14"
      >
        {section.eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#15803D]">
            {section.eyebrow}
          </p>
        ) : null}
        {section.heading ? (
          <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
            {section.heading}
          </h2>
        ) : null}
        {prose}
      </section>
    );
  }

  return prose;
}
