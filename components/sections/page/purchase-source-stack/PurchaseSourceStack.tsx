"use client";

import {
  type FocusEvent,
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { PurchaseSourceStackConfig } from "./config";

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function PurchaseSourceStack({
  config,
}: {
  config: PurchaseSourceStackConfig;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cardCount = config.cards.length;
  const isPaused =
    prefersReducedMotion || isHoverPaused || isFocusPaused || isUserPaused;
  const activeCard = config.cards[activeIndex];
  const liveAnnouncement = `${activeCard.sourceName} slide ${activeIndex + 1} of ${cardCount}. ${
    isPaused ? "Carousel paused." : "Carousel playing."
  }`;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cardCount);
  }, [cardCount]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cardCount) % cardCount);
  }, [cardCount]);

  // Auto-rotation
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(goNext, config.rotationIntervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext, config.rotationIntervalMs]);

  // Keyboard nav
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  // Swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 50) {
        goNext();
      } else if (diff < -50) {
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  const handleBlurCapture = useCallback((e: FocusEvent<HTMLDivElement>) => {
    const nextTarget = e.relatedTarget;

    if (nextTarget instanceof Node && e.currentTarget.contains(nextTarget)) {
      return;
    }

    setIsFocusPaused(false);
  }, []);

  // Reduced motion — static list
  if (prefersReducedMotion) {
    return (
      <div>
        <Image
          src={config.iconSrc}
          alt={config.iconAlt}
          width={56}
          height={56}
          className="h-14 w-14"
        />
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">
          {config.headline}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-[#545454]">
          {config.body}
        </p>
        <div className="mt-8 space-y-4">
          {config.cards.map((card) => (
            <SourceCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Image
        src={config.iconSrc}
        alt={config.iconAlt}
        width={56}
        height={56}
        className="h-14 w-14"
      />
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">
        {config.headline}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[#545454]">
        {config.body}
      </p>

      <div
        className="relative mt-8"
        role="region"
        aria-roledescription="carousel"
        aria-label="Purchase sources"
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onFocusCapture={() => setIsFocusPaused(true)}
        onBlurCapture={handleBlurCapture}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <p className="sr-only" aria-live={isPaused ? "polite" : "off"}>
          {liveAnnouncement}
        </p>

        {/* Card stack */}
        <div className="relative" style={{ minHeight: "220px" }}>
          {config.cards.map((card, index) => {
            const offset = (index - activeIndex + cardCount) % cardCount;
            const isActive = offset === 0;

            let transform = "none";
            let opacity = 0;
            let zIndex = 0;

            if (offset === 0) {
              transform = "scale(1) translateY(0)";
              opacity = 1;
              zIndex = 3;
            } else if (offset === 1 || offset === cardCount - 1) {
              transform = "scale(0.95) translateY(8px)";
              opacity = 0.6;
              zIndex = 2;
            } else if (offset === 2 || offset === cardCount - 2) {
              transform = "scale(0.90) translateY(16px)";
              opacity = 0.35;
              zIndex = 1;
            }

            return (
              <div
                key={card.id}
                id={`purchase-source-slide-${card.id}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${cardCount}: ${card.sourceName}`}
                aria-hidden={!isActive}
                className="absolute inset-x-0 top-0 transition-all duration-300 ease-out"
                style={{ transform, opacity, zIndex }}
              >
                <SourceCard card={card} />
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous source"
              className="rounded-full border border-gray-300 p-2 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsUserPaused((prev) => !prev)}
              aria-pressed={isUserPaused}
              aria-label={isUserPaused ? "Resume carousel autoplay" : "Pause carousel autoplay"}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium text-[#111] transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
            >
              {isUserPaused ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
              {isUserPaused ? "Play" : "Pause"}
            </button>
          </div>

          <div className="flex gap-2">
            {config.cards.map((card, i) => (
              <button
                key={card.id}
                type="button"
                aria-controls={`purchase-source-slide-${card.id}`}
                aria-label={
                  i === activeIndex
                    ? `${card.sourceName} slide, current`
                    : `Go to ${card.sourceName} slide`
                }
                aria-pressed={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === activeIndex ? "bg-[#111]" : "bg-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next source"
            className="rounded-full border border-gray-300 p-2 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SourceCard({
  card,
}: {
  card: PurchaseSourceStackConfig["cards"][number];
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={card.iconSrc}
            alt={card.iconAlt}
            fill
            sizes="40px"
            className="object-contain p-1.5"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#111]">{card.sourceName}</p>
          <p className="text-xs text-[#999]">{card.sourceSubtitle}</p>
        </div>
        <span className="ml-auto inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          {card.badgeLabel}
        </span>
      </div>
      <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3">
        <p className="text-sm text-[#545454]">{card.sampleListing}</p>
        <p className="mt-1 text-lg font-semibold text-[#111]">{card.samplePrice}</p>
      </div>
    </div>
  );
}
