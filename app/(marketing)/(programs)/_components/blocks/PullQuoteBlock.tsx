import type { PullQuoteSection } from "../page-config-types";
import { renderParagraphContent } from "./render-paragraph-content";

export function PullQuoteBlock({ section }: { section: PullQuoteSection }) {
  return (
    <blockquote className="my-8 border-l-4 border-[#22C55E] ps-5 py-2 text-lg italic leading-relaxed text-[#111] md:text-xl">
      {renderParagraphContent(section.content)}
    </blockquote>
  );
}
