"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CtaButton } from "../primitives/CtaButton";
import type { CarouselSlide } from "../../_lib/types";

type Props = {
  slides: CarouselSlide[];
  intervalMs?: number;
};

export function PromoCarousel({ slides, intervalMs = 7000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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

  useEffect(() => {
    if (reducedMotion || paused || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, intervalMs, slides.length]);

  const goTo = (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length);

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
      className="relative bg-[var(--t-bg-soft)] border-b border-[var(--t-divider)]"
    >
      <div
        ref={regionRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden focus:outline-none"
      >
        <div className="overflow-hidden">
          <ul
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <li
                key={i}
                className="shrink-0 grow-0 basis-full"
                aria-hidden={i !== index}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12"
                  style={{ background: slide.bg ?? "var(--t-bg-soft)" }}
                >
                  <div className="order-2 md:order-1 max-w-xl">
                    {slide.eyebrow && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--t-text-muted)] mb-3">
                        {slide.eyebrow}
                      </p>
                    )}
                    <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--t-ink-strong)] leading-tight">
                      {slide.headline}
                    </h2>
                    <p className="mt-3 text-[15px] md:text-base text-[var(--t-text)]">
                      {slide.body}
                    </p>
                    <div className="mt-5">
                      <CtaButton href={slide.ctaHref} size="lg" tabIndex={i === index ? 0 : -1}>
                        {slide.ctaLabel}
                      </CtaButton>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 relative aspect-[16/10] md:aspect-[5/3] w-full">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover rounded-lg"
                      priority={i === 0}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={
                "h-2.5 rounded-full transition-all " +
                (i === index
                  ? "w-6 bg-[var(--t-blue)]"
                  : "w-2.5 bg-[var(--t-card-border)] hover:bg-[var(--t-text-faint)]")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
