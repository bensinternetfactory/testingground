import type { IntroSection } from "../page-config-types";
import { renderParagraphContent } from "./render-paragraph-content";

export function IntroBlock({ section }: { section: IntroSection }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
      {section.paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={index === 0 ? "text-xl leading-relaxed text-[#111] md:text-2xl" : undefined}
        >
          {renderParagraphContent(paragraph)}
        </p>
      ))}
    </div>
  );
}
