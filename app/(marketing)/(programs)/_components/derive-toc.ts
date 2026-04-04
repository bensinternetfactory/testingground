import type {
  ProgramSection,
  TocItem,
} from "./page-config-types";
import type { FaqSectionConfig } from "@/components/sections/page/faq";

export function deriveToc(
  sections: ProgramSection[],
  faqSection?: FaqSectionConfig,
): TocItem[] {
  const items = sections.flatMap((section) =>
    section.id && section.tocLabel
      ? [{ id: section.id, label: section.tocLabel }]
      : [],
  );

  if (faqSection) {
    items.push({ id: "faq", label: "FAQ" });
  }

  return items;
}
