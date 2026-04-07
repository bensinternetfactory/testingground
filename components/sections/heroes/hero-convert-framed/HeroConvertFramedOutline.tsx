import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import { CtaLink, LeadCta } from "@/features/cta/client";
import { FramedTileSelector, type FramedHeroTileData } from "./FramedTileSelector";
import { HeroGallery } from "./HeroGallery";
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";
import type { HeroConvertConfig } from "../hero-convert-geico/config";

interface HeroTertiaryAction {
  eyebrow: string;
  label: string;
  href: string;
  preApprovalTrigger?: PreApprovalTrigger;
}

interface HeroGalleryImage {
  src: StaticImageData;
  alt: string;
}

export interface HeroConvertFramedOutlineConfig
  extends Omit<
    HeroConvertConfig,
    "tiles" | "tertiaryLinks"
  > {
  tiles: FramedHeroTileData[];
  footnoteMarkers?: Record<string, string>;
  tertiaryActions: [HeroTertiaryAction, HeroTertiaryAction];
  galleryImages?: HeroGalleryImage[];
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

function TertiaryActionCard({
  action,
  compact = false,
}: {
  action: HeroTertiaryAction;
  compact?: boolean;
}) {
  const appearance = {
    tone: "secondary" as const,
    size: "sm" as const,
    align: "between" as const,
    className: compact
      ? "w-full text-left lg:w-auto"
      : "w-full rounded-2xl border-gray-200 px-6 py-5",
  };

  const sharedProps = {
    copy: compact
      ? { label: action.label }
      : { eyebrow: action.eyebrow, label: action.label },
    appearance,
    icon: <ArrowRight className="h-4 w-4" />,
    analytics: { legacySection: "hero" },
    prefetch: false,
  };

  return (
    action.preApprovalTrigger ? (
      <LeadCta
        {...sharedProps}
        entry={{
          kind: "pre-approval",
          href: action.href,
          trigger: action.preApprovalTrigger,
        }}
      />
    ) : (
      <CtaLink href={action.href} {...sharedProps} />
    )
  );
}

function TertiaryOutlineLinks({
  actions,
}: {
  actions: [HeroTertiaryAction, HeroTertiaryAction];
}) {
  return (
    <div className="border-t border-gray-200 pt-4">
      {actions.map((action, index) => (
        <div key={action.label} className={index === 0 ? undefined : "mt-4"}>
          <p className="mb-2 text-xs text-[#999]">{action.eyebrow}</p>
          <TertiaryActionCard action={action} compact />
        </div>
      ))}
    </div>
  );
}

export function HeroConvertFramedOutline({
  config,
}: {
  config: HeroConvertFramedOutlineConfig;
}) {
  const hasGallery = Boolean(config.galleryImages?.length);
  const bodyCopyContent = config.footnoteMarkers
    ? renderBodyWithMarkers(config.bodyCopy, config.footnoteMarkers)
    : config.bodyCopy;

  return (
    <section
      id="hero"
      className="bg-white pt-[var(--nav-height)] 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 lg:py-16">
        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
          <h1
            className="text-[2rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#111111] sm:text-[2.75rem] md:text-5xl lg:text-[3.5rem]"
            style={{ textWrap: "balance" }}
          >
            {config.headline}
          </h1>

          <p className="max-w-2xl text-base leading-6 text-[#545454] sm:text-[1.0625rem] sm:leading-7">
            {bodyCopyContent}
          </p>

          <FramedTileSelector
            tiles={config.tiles}
            cta={config.cta}
            selectionPrompt={config.selectionPrompt}
            selectionRequiredMessage={config.selectionRequiredMessage}
            viewAllLink={config.viewAllLink}
          />

          {config.microcopy ? (
            <p className="text-sm leading-5 text-[#545454]">
              {config.microcopy}
            </p>
          ) : null}

          {hasGallery ? (
            <div className="lg:hidden">
              <TertiaryOutlineLinks actions={config.tertiaryActions} />
            </div>
          ) : (
            <TertiaryOutlineLinks actions={config.tertiaryActions} />
          )}

          {config.disclaimer ? (
            <p className="text-xs leading-5 text-[#999]">
              {config.disclaimer}
            </p>
          ) : null}
        </div>

        {hasGallery ? (
          <div className="hidden lg:block">
            <HeroGallery images={config.galleryImages ?? []} />
          </div>
        ) : (
          <div className="hidden lg:block">
            <Image
              src={config.heroImage}
              alt={config.heroImageAlt}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 50vw, 0px"
              className="rounded-3xl object-cover"
            />
          </div>
        )}
      </div>

      {hasGallery ? (
        <div className="mx-auto hidden max-w-7xl grid-cols-2 gap-4 px-8 pb-10 lg:grid">
          {config.tertiaryActions.map((action) => (
            <TertiaryActionCard key={action.label} action={action} />
          ))}
        </div>
      ) : null}

      <div className="px-4 pb-4 sm:px-6 lg:hidden">
        <Image
          src={config.heroImage}
          alt={config.heroImageAlt}
          placeholder="blur"
          sizes="(max-width: 1023px) 100vw, 0px"
          className="h-48 w-full rounded-2xl object-cover sm:h-56"
        />
      </div>
    </section>
  );
}
