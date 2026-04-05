import type { ReactNode } from "react";
import { FramedTileSelector, type FramedHeroTileData } from "./FramedTileSelector";
import type { DrawerSelectionTrigger } from "@/components/ui/pre-approval-drawer";

export interface HeroConvertFramedTileRightConfig {
  headline: string;
  bodyCopy: string;
  footnoteMarkers?: Record<string, string>;
  selectionPrompt: string;
  selectionRequiredMessage: string;
  tiles: FramedHeroTileData[];
  cta: { label: string; href: string; drawer?: DrawerSelectionTrigger };
  microcopy?: string;
  disclaimer?: string;
}

function renderBodyWithMarkers(
  text: string,
  markers: Record<string, string>
): ReactNode[] {
  const parts: ReactNode[] = [text];

  for (const [substring, marker] of Object.entries(markers)) {
    const next: ReactNode[] = [];

    for (const part of parts) {
      if (typeof part !== "string") {
        next.push(part);
        continue;
      }

      const idx = part.indexOf(substring);
      if (idx === -1) {
        next.push(part);
        continue;
      }

      const before = part.slice(0, idx + substring.length);
      const after = part.slice(idx + substring.length);

      next.push(before);
      next.push(
        <sup key={`${substring}-${marker}`} className="text-[0.65em] text-[#999]">
          {marker}
        </sup>,
      );

      if (after) {
        next.push(after);
      }
    }

    parts.length = 0;
    parts.push(...next);
  }

  return parts;
}

export function HeroConvertFramedTileRight({
  config,
}: {
  config: HeroConvertFramedTileRightConfig;
}) {
  const bodyCopyContent = config.footnoteMarkers
    ? renderBodyWithMarkers(config.bodyCopy, config.footnoteMarkers)
    : config.bodyCopy;

  return (
    <section
      id="hero"
      className="bg-white pt-[var(--nav-height)] 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 lg:py-16">
        {/* Left column: headline + body */}
        <div className="mb-6 flex flex-col gap-5 sm:gap-6 lg:mb-0 lg:gap-8">
          <h1
            className="text-[2rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#111111] sm:text-[2.75rem] md:text-5xl lg:text-[3.5rem]"
            style={{ textWrap: "balance" }}
          >
            {config.headline}
          </h1>

          <p className="max-w-2xl text-base leading-6 text-[#545454] sm:text-[1.0625rem] sm:leading-7">
            {bodyCopyContent}
          </p>
        </div>

        {/* Right column: framed tile selector card */}
        <div className="flex flex-col gap-3">
          <FramedTileSelector
            tiles={config.tiles}
            cta={config.cta}
            selectionPrompt={config.selectionPrompt}
            selectionRequiredMessage={config.selectionRequiredMessage}
            gridCols="fixed-2"
          />

          {config.microcopy ? (
            <p className="text-sm leading-5 text-[#545454]">
              {config.microcopy}
            </p>
          ) : null}

          {config.disclaimer ? (
            <p className="text-xs leading-5 text-[#999]">
              {config.disclaimer}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
