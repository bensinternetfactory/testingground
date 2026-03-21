"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";

interface HeroGalleryProps {
  images: { src: StaticImageData; alt: string }[];
}

export function HeroGallery({ images }: HeroGalleryProps) {
  const [idx, setIdx] = useState(0);
  if (images.length === 0) {
    return null;
  }

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const current = images[idx]!;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#999]">
        Rollbacks We&apos;ve Financed
      </p>

      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={current.src}
          alt={current.alt}
          placeholder="blur"
          className="aspect-square w-full object-cover"
          sizes="(min-width: 1024px) 45vw, 0px"
        />

        {/* Counter badge */}
        <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
          {idx + 1}/{images.length}
        </div>

        {/* Prev/next arrows */}
        <div className="absolute inset-x-0 bottom-4 flex justify-end gap-2 px-4">
          <button
            type="button"
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-[#111]" />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-[#111]" />
          </button>
        </div>
      </div>
    </div>
  );
}
