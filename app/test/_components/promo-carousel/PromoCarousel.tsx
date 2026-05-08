"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { CtaButton } from "../primitives/CtaButton";
import type { CarouselSlide } from "../../_lib/types";

type Props = {
  slides: CarouselSlide[];
  intervalMs?: number;
};

export function PromoCarousel({ slides, intervalMs = 7000 }: Props) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [explicitPause, setExplicitPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const regionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  const isPaused = hovering || explicitPause;

  useEffect(() => {
    if (reducedMotion || isPaused || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reducedMotion, isPaused, intervalMs, slides.length]);

  const goTo = (i: number) =>
    setIndex(((i % slides.length) + slides.length) % slides.length);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotions"
      className="bg-white"
    >
      <SectionShell innerClassName="py-4 md:py-6">
        <div
          ref={regionRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => setHovering(true)}
          onBlurCapture={() => setHovering(false)}
          className="relative overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[16/6] focus:outline-none"
        >
          <ul
            className="absolute inset-0 flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <li
                key={i}
                className="relative shrink-0 grow-0 basis-full"
                aria-hidden={i !== index}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
              >
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 1280px, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent md:from-black/40"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-end md:items-center p-4 sm:p-6 md:p-10">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 md:p-7 max-w-sm md:max-w-md shadow-sm">
                    {slide.eyebrow && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--t-text-muted)] mb-2">
                        {slide.eyebrow}
                      </p>
                    )}
                    <h2 className="text-xl md:text-3xl font-extrabold text-[var(--t-ink-strong)] leading-tight">
                      {slide.headline}
                    </h2>
                    <p className="mt-2 text-sm md:text-[15px] text-[var(--t-text)]">
                      {slide.body}
                    </p>
                    <div className="mt-4">
                      <CtaButton
                        href={slide.ctaHref}
                        size="md"
                        tabIndex={i === index ? 0 : -1}
                      >
                        {slide.ctaLabel}
                      </CtaButton>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={explicitPause ? "Play carousel" : "Pause carousel"}
            aria-pressed={explicitPause}
            onClick={() => setExplicitPause((p) => !p)}
            className="absolute bottom-3 left-3 md:bottom-4 md:left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 hover:bg-white text-[var(--t-ink)] shadow-sm"
          >
            {explicitPause ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => goTo(i)}
                className={
                  "h-2 rounded-full transition-all ring-1 ring-black/10 " +
                  (i === index
                    ? "w-8 bg-white"
                    : "w-2 bg-white/60 hover:bg-white/80")
                }
              />
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
