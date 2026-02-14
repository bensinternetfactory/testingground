"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HERO_IMAGES = [
  { src: "/placeholder-1.jpg", alt: "Tow truck 1" },
  { src: "/placeholder-2.jpg", alt: "Tow truck 2" },
  { src: "/placeholder-3.jpg", alt: "Tow truck 3" },
  { src: "/placeholder-4.jpg", alt: "Tow truck 4" },
  { src: "/placeholder-5.jpg", alt: "Tow truck 5" },
  { src: "/placeholder-6.jpg", alt: "Tow truck 6" },
  { src: "/placeholder-7.jpg", alt: "Tow truck 7" },
  { src: "/placeholder-8.jpg", alt: "Tow truck 8" },
  { src: "/placeholder-9.jpg", alt: "Tow truck 9" },
  { src: "/placeholder-10.jpg", alt: "Tow truck 10" },
];

const ROTATING_PHRASES = ["lower payments", "faster funding", "better experience"];

const CTA_TILES = [
  { label: "Rollback Financing", href: "/rollback" },
  { label: "Wrecker Financing", href: "/wrecker" },
  { label: "Rotator Financing", href: "/rotator" },
];

// 20 thumbnails, each spaced 18deg apart, starting at -90deg
const START_OFFSET = -90;
const SPACING = 18;

function getThumbnailStyle(index: number): React.CSSProperties {
  const startRotation = START_OFFSET + index * SPACING;
  return {
    "--start-rotation": `${startRotation}deg`,
    animation: "arc-rotate 300s linear infinite",
    willChange: "transform",
    backfaceVisibility: "hidden",
  } as React.CSSProperties;
}

function getImageStyle(index: number): React.CSSProperties {
  const startRotation = START_OFFSET + index * SPACING;
  return {
    "--start-rotation": `${startRotation}deg`,
    animation: "arc-counter-rotate 300s linear infinite",
    willChange: "transform",
    backfaceVisibility: "hidden" as const,
  } as React.CSSProperties;
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate images to get 20 thumbnails
  const allImages = [...HERO_IMAGES, ...HERO_IMAGES];

  return (
    <section id="hero" className="relative bg-white pt-[72px]">
      {/* Arc area */}
      <div className="relative flex min-h-[280px] items-end justify-center overflow-hidden mb-0 md:mb-4 md:min-h-[416px] lg:mb-8 lg:min-h-[544px]">
        {/* Thumbnails container - centered */}
        <div
          className="thumbnails pointer-events-none absolute left-1/2 mt-4 md:mt-6 lg:mt-12"
          aria-hidden="true"
          style={{ top: 0, transform: 'translate(-50%, -50%)' }}
        >
          {allImages.map((img, i) => (
            <div
              key={i}
              className="arc-thumbnail absolute overflow-hidden"
              style={getThumbnailStyle(i)}
            >
              <div
                className="arc-thumbnail-inner h-full w-full bg-[#E8E4DE]"
                style={getImageStyle(i)}
              >
                {/* Placeholder — swap for <Image> when real photos are ready */}
                <div className="flex h-full w-full items-center justify-center text-[0.5rem] text-[#999] sm:text-xs">
                  {i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays — desktop only */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-[1] hidden h-[6.25rem] w-[15%] md:block lg:w-[20%]"
          style={{
            background: "linear-gradient(transparent, white)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 z-[1] hidden h-[6.25rem] w-[15%] md:block lg:w-[20%]"
          style={{
            background: "linear-gradient(transparent, white)",
          }}
        />

        {/* Centered content */}
        <div className="relative z-[2] mx-auto mb-5 flex w-full flex-col items-center px-6 text-center md:mb-8 md:max-w-[38rem]">
          <h1 className="mb-1 text-[0.75rem] leading-4 font-normal text-[#545454] md:text-[0.875rem] md:leading-5 lg:text-[1.25rem] lg:leading-7">
            Easy Tow Truck Financing
          </h1>

          {/* Rotating phrases */}
          <div
            className="relative h-[2.5rem] w-full overflow-hidden md:mb-4 md:h-[3rem] lg:h-[4rem]"
            aria-live="polite"
          >
            <AnimatePresence>
              <motion.span
                key={ROTATING_PHRASES[activeIndex]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-x-0 top-0 text-center text-[2rem] font-medium leading-[2.5rem] text-[#111111] md:text-[2.5rem] md:leading-[3rem] lg:text-[3.5rem] lg:leading-[4rem]"
              >
                {ROTATING_PHRASES[activeIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* CTA button */}
          <div className="mt-4 self-stretch min-[470px]:self-center lg:mt-10">
            <a
              href="#pre-approve"
              className="flex h-14 w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-lg font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 min-[470px]:inline-flex min-[470px]:h-[4.5rem] min-[470px]:w-auto"
            >
              See what I qualify for
            </a>
          </div>
        </div>

      </div>

      {/* CTA Tile Cards */}
      <div className="mx-auto max-w-[75rem] px-6 py-4 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-flow-col md:auto-cols-fr lg:gap-6">
          {CTA_TILES.map((tile) => (
            <a
              key={tile.label}
              href={tile.href}
              className="group flex h-14 items-center justify-between rounded-[1rem] border border-[#E5E5E5] bg-white p-4 transition-shadow duration-200 hover:shadow-lg md:h-[108px] md:p-6 lg:h-[116px] lg:rounded-[1.25rem]"
            >
              <span className="text-base font-normal text-[#111111] lg:text-2xl lg:leading-8">
                {tile.label}
              </span>

              {/* Arrow */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="shrink-0 text-[#999] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#111111]"
              >
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
