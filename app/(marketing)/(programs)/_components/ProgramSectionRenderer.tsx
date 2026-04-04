import type { ReactElement } from "react";
import type { ProgramSection } from "./page-config-types";
import { ComparisonTableBlock } from "./blocks/ComparisonTableBlock";
import { ContentSectionBlock } from "./blocks/ContentSectionBlock";
import { DividerBlock } from "./blocks/DividerBlock";
import { FeatureGridBlock } from "./blocks/FeatureGridBlock";
import { InlineCtaBlock } from "./blocks/InlineCtaBlock";
import { IntroBlock } from "./blocks/IntroBlock";
import { PromoPanelBlock } from "./blocks/PromoPanelBlock";
import { PullQuoteBlock } from "./blocks/PullQuoteBlock";
import { QualificationPathsBlock } from "./blocks/QualificationPathsBlock";
import { RelatedProgramsBlock } from "./blocks/RelatedProgramsBlock";

type SectionKind = ProgramSection["kind"];
type SectionByKind<K extends SectionKind> = Extract<ProgramSection, { kind: K }>;
type SectionRendererMap = {
  [K in SectionKind]: (section: SectionByKind<K>) => ReactElement;
};

const renderers: SectionRendererMap = {
  intro: (section) => <IntroBlock section={section} />,
  contentSection: (section) => <ContentSectionBlock section={section} />,
  pullQuote: (section) => <PullQuoteBlock section={section} />,
  inlineCta: (section) => <InlineCtaBlock section={section} />,
  qualificationPaths: (section) => <QualificationPathsBlock section={section} />,
  featureGrid: (section) => <FeatureGridBlock section={section} />,
  comparisonTable: (section) => <ComparisonTableBlock section={section} />,
  promoPanel: (section) => <PromoPanelBlock section={section} />,
  relatedPrograms: (section) => <RelatedProgramsBlock section={section} />,
  divider: () => <DividerBlock />,
};

export function ProgramSectionRenderer({
  section,
}: {
  section: ProgramSection;
}) {
  const render = renderers[section.kind] as (section: ProgramSection) => ReactElement;

  return render(section);
}
