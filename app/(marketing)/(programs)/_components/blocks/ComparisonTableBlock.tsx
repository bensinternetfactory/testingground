import type { ComparisonTableSection } from "../page-config-types";
import { renderParagraphContent } from "./render-paragraph-content";

export function ComparisonTableBlock({
  section,
}: {
  section: ComparisonTableSection;
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
        {section.introParagraphs.map((paragraph, index) => (
          <p key={index}>{renderParagraphContent(paragraph)}</p>
        ))}
        <p className="text-base font-semibold text-[#111] md:text-lg">
          {section.example}
        </p>
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-[#D4D4D4] md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#101820] text-white">
              <th scope="col" className="px-4 py-3 font-semibold">
                &nbsp;
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {section.withDownLabel}
              </th>
              <th
                scope="col"
                className="border-l-2 border-[#22C55E] px-4 py-3 font-semibold text-[#22C55E]"
              >
                {section.zeroDownLabel}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D4D4D4] bg-white text-[#111]">
            {section.rows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="px-4 py-3 text-left font-medium text-[#111]"
                >
                  {row.label}
                </th>
                <td className="px-4 py-3">{row.withDown}</td>
                <td className="bg-[#F0FDF4] px-4 py-3 font-semibold text-[#15803D]">
                  {row.zeroDown}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-4 md:hidden">
        {section.rows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl border border-[#D4D4D4] bg-white p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#3A3A3A]">
              {row.label}
            </p>
            <dl className="mt-3 grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[#3A3A3A]">{section.mobileWithDownLabel}</dt>
                <dd className="text-right text-[#111]">{row.withDown}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#15803D]">{section.mobileZeroDownLabel}</dt>
                <dd className="text-right font-semibold text-[#15803D]">
                  {row.zeroDown}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        {section.closingParagraphs.map((paragraph, index) => (
          <p key={index}>{renderParagraphContent(paragraph)}</p>
        ))}
      </div>
    </section>
  );
}
