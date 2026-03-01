"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import "./hero-showcase.css";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type HeroImage = StaticImageData | string;

export interface HeroShowcaseProps {
  images: readonly HeroImage[];
  headline: string;
  phrases: readonly string[];
  cta: { label: string; href: string; subtext?: string };
  footer?: React.ReactNode;
  arcConfig?: {
    spacing?: number;
    startOffset?: number;
    duration?: number;
    priorityCount?: number;
    sizes?: string;
  };
  phraseInterval?: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * HeroShowcase — Reusable hero with rotating image arc, animated phrases, and CTA.
 *
 * @example Basic usage
 * ```tsx
 * import { HeroShowcase } from "@/components/sections/heroes/hero-showcase-rm";
 * import { NavTile } from "@/components/sections/heroes/hero-showcase-rm";
 * import img1 from "@/public/hero-1.jpg";
 * import img2 from "@/public/hero-2.jpg";
 *
 * <HeroShowcase
 *   images={[img1, img2]}
 *   headline="Your Headline"
 *   phrases={["phrase one", "phrase two", "phrase three"]}
 *   cta={{ label: "Get Started", href: "#signup" }}
 *   footer={
 *     <>
 *       <NavTile label="Option A" href="/a" />
 *       <NavTile label="Option B" href="/b" />
 *     </>
 *   }
 * />
 * ```
 *
 * @example Using the existing site config
 * ```tsx
 * import { HeroShowcase, HERO_CONFIG } from "@/components/sections/heroes/hero-showcase-rm";
 *
 * <HeroShowcase {...HERO_CONFIG} footer={<YourFooter />} />
 * ```
 *
 * @remarks
 * - `images` accepts static imports (blur placeholder included) or URL strings (no blur).
 *   The component repeats images internally to fill 360deg — only pass unique images.
 *   Empty array = no arc rendered (headline/phrases/CTA still render).
 *   Remote string URLs require `images.remotePatterns` in `next.config.ts`.
 * - `phrases` with a single entry renders statically (no animation, no timer).
 * - `footer` is a ReactNode slot. Use `NavTile` for the default tile card, or pass
 *   any custom markup. Omit to hide the section.
 * - The arc is decorative (`aria-hidden`). If a consumer makes thumbnails interactive,
 *   they must remove `aria-hidden` and provide alt text + keyboard nav.
 *
 * @see {@link ./config.ts} for the revenue-leak page's data config (server-safe).
 * @see {@link ./NavTile.tsx} for the default footer tile component.
 */

function buildArcImages(images: readonly HeroImage[], spacing: number): HeroImage[] {
  if (!images?.length) return [];
  const totalSlots = Math.ceil(360 / spacing);
  return Array.from({ length: totalSlots }, (_, i) => images[i % images.length]);
}

function getThumbnailStyle(
  index: number,
  startOffset: number,
  spacing: number,
  duration: number,
): React.CSSProperties {
  const startRotation = startOffset + index * spacing;
  return {
    "--start-rotation": `${startRotation}deg`,
    animation: `arc-rotate ${duration}s linear infinite`,
    willChange: "transform",
    backfaceVisibility: "hidden",
  } as React.CSSProperties;
}

/* ------------------------------------------------------------------ */
/*  Internal sub-components                                            */
/* ------------------------------------------------------------------ */

function ArcThumbnails({
  images,
  spacing,
  startOffset,
  duration,
  priorityCount,
  sizes,
}: {
  images: readonly HeroImage[];
  spacing: number;
  startOffset: number;
  duration: number;
  priorityCount: number;
  sizes: string;
}) {
  const arcImages = buildArcImages(images, spacing);
  const eagerCount = Math.max(0, Math.min(priorityCount, arcImages.length));

  if (!arcImages.length) return null;

  return (
    <div
      className="thumbnails pointer-events-none absolute left-1/2 mt-4 md:mt-6 lg:mt-12"
      aria-hidden="true"
      style={{ top: 0, transform: "translate(-50%, -50%)" }}
    >
      {arcImages.map((img, i) => {
        const isStatic = typeof img !== "string";
        return (
          <div
            key={i}
            className="arc-thumbnail absolute overflow-hidden bg-[#E8E4DE]"
            style={getThumbnailStyle(i, startOffset, spacing, duration)}
          >
            <div className="arc-thumbnail-inner relative h-full w-full">
              <Image
                src={img}
                fill
                placeholder={isStatic ? "blur" : "empty"}
                alt=""
                sizes={sizes}
                priority={i < eagerCount}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GradientOverlays() {
  return (
    <>
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[1] hidden h-[6.25rem] w-[15%] md:block lg:w-[20%]"
        style={{ background: "linear-gradient(transparent, white)" }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 z-[1] hidden h-[6.25rem] w-[15%] md:block lg:w-[20%]"
        style={{ background: "linear-gradient(transparent, white)" }}
      />
    </>
  );
}

function RotatingPhrases({
  phrases,
  interval,
}: {
  phrases: readonly string[];
  interval: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (phrases.length < 2) return;
    setActiveIndex(0);
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phrases.length);
    }, interval);
    return () => clearInterval(id);
  }, [phrases, interval]);

  if (phrases.length === 1) {
    return (
      <div className="relative h-[2.5rem] w-full overflow-hidden md:mb-4 md:h-[3rem] lg:h-[4rem]">
        <span className="absolute inset-x-0 top-0 text-center text-[2rem] font-medium leading-[2.5rem] text-[#111111] md:text-[2.5rem] md:leading-[3rem] lg:text-[3.5rem] lg:leading-[4rem]">
          {phrases[0]}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative h-[2.5rem] w-full overflow-hidden md:mb-4 md:h-[3rem] lg:h-[4rem]"
      aria-live="polite"
    >
      <AnimatePresence>
        <motion.span
          key={phrases[activeIndex]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-x-0 top-0 text-center text-[2rem] font-medium leading-[2.5rem] text-[#111111] md:text-[2.5rem] md:leading-[3rem] lg:text-[3.5rem] lg:leading-[4rem]"
        >
          {phrases[activeIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function HeroCTA({ cta }: { cta: HeroShowcaseProps["cta"] }) {
  return (
    <div className="mt-4 self-stretch min-[470px]:self-center lg:mt-10">
      <Link
        href={cta.href}
        className="flex h-14 w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-lg font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 min-[470px]:inline-flex min-[470px]:h-[4.5rem] min-[470px]:w-auto"
      >
        {cta.label}
      </Link>
      {cta.subtext && (
        <p className="mt-2 text-xs text-[#777]">{cta.subtext}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function HeroShowcase({
  images,
  headline,
  phrases,
  cta,
  footer,
  arcConfig,
  phraseInterval = 4000,
}: HeroShowcaseProps) {
  const {
    spacing = 18,
    startOffset = -90,
    duration = 300,
    priorityCount = 5,
    sizes = "(min-width: 1080px) 152px, (min-width: 768px) 98px, 56px",
  } = arcConfig ?? {};

  return (
    <section id="hero" className="relative bg-white pt-[var(--nav-height)]">
      {/* Arc area */}
      <div className="relative flex min-h-[280px] items-end justify-center overflow-hidden mb-0 md:mb-4 md:min-h-[416px] lg:mb-8 lg:min-h-[544px]">
        <ArcThumbnails
          images={images}
          spacing={spacing}
          startOffset={startOffset}
          duration={duration}
          priorityCount={priorityCount}
          sizes={sizes}
        />
        <GradientOverlays />

        {/* Centered content */}
        <div className="relative z-[2] mx-auto mb-5 flex w-full flex-col items-center px-6 text-center md:mb-8 md:max-w-[38rem]">
          <h1 className="mb-1 text-[0.75rem] leading-4 font-normal text-[#545454] md:text-[0.875rem] md:leading-5 lg:text-[1.25rem] lg:leading-7">
            {headline}
          </h1>
          <RotatingPhrases phrases={phrases} interval={phraseInterval} />
          <HeroCTA cta={cta} />
        </div>
      </div>

      {/* Footer slot */}
      {footer && (
        <div className="mx-auto max-w-[75rem] px-6 py-4 md:px-8 md:py-12">
          <div className="grid grid-cols-1 gap-4 md:grid-flow-col md:auto-cols-fr lg:gap-6">
            {footer}
          </div>
        </div>
      )}
    </section>
  );
}
