"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import truck1 from "@/public/truck-1.jpg";
import truck2 from "@/public/truck-2.jpg";
import truck3 from "@/public/truck-3.jpg";
import truck4 from "@/public/truck-4.jpg";
import truck5 from "@/public/truck-5.jpg";
import truck6 from "@/public/truck-6.jpg";
import truck7 from "@/public/truck-7.jpg";
import truck8 from "@/public/truck-8.jpg";
import truck9 from "@/public/truck-9.jpg";
import truck10 from "@/public/truck-10.jpg";
import truck11 from "@/public/truck-11.jpg";
import truck12 from "@/public/truck-12.jpg";
import truck13 from "@/public/truck-13.jpg";
import truck14 from "@/public/truck-14.jpg";
import truck15 from "@/public/truck-15.jpg";

// 20 thumbnails: 15 unique + 5 duplicates for full circular spacing
const HERO_IMAGES: StaticImageData[] = [
  truck1, truck2, truck3, truck4, truck5,
  truck6, truck7, truck8, truck9, truck10,
  truck11, truck12, truck13, truck14, truck15,
  truck6, truck7, truck8, truck9, truck10,
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

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
          {HERO_IMAGES.map((img, i) => (
            <div
              key={i}
              className="arc-thumbnail absolute overflow-hidden bg-[#E8E4DE]"
              style={getThumbnailStyle(i)}
            >
              <div className="arc-thumbnail-inner relative h-full w-full">
                <Image
                  src={img}
                  fill
                  placeholder="blur"
                  alt=""
                  sizes="(min-width: 1080px) 152px, (min-width: 768px) 98px, 56px"
                  priority={i < 5}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
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
              See my payment
            </a>
            <p className="mt-2 text-xs text-[#777]">
              Get pre-approved in less than 30 seconds. No credit check
            </p>
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
