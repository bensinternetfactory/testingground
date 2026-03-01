"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { BRAND_LOGOS } from "./config";
import "./brand-marquee.css";

export function BrandMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const logoGroup = BRAND_LOGOS.map((logo, i) => {
    const h = logo.height ?? 44;
    const hMobile = Math.round(h * 0.75);
    return (
    <div
      key={`${logo.name}-${i}`}
      className="logo-box relative shrink-0"
      style={
        {
          "--logo-w": `${logo.width}px`,
          "--logo-w-mobile": `${Math.round(logo.width * 0.75)}px`,
          "--logo-h": `${h}px`,
          "--logo-h-mobile": `${hMobile}px`,
        } as React.CSSProperties
      }
    >
      <Image
        src={logo.src}
        alt={logo.name}
        fill
        sizes={`${logo.width}px`}
        className={`object-contain ${logo.filter === "black" ? "brightness-0" : "grayscale"}`}
      />
    </div>
    );
  });

  return (
    <section ref={sectionRef} className="bg-[#F5F5F5] py-12 md:py-16">
      {/* Headline — constrained width */}
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-lg font-medium text-[#545454] md:text-xl">
          We finance all major brands
        </p>
      </div>

      {/* Logo strip — full bleed */}
      <div className="overflow-hidden" aria-hidden="true">
        <div
          className={`marquee-track flex w-max ${
            isVisible ? "marquee-animate" : ""
          }`}
        >
          <div className="flex shrink-0 items-center gap-12 pr-12">
            {logoGroup}
          </div>
          <div className="flex shrink-0 items-center gap-12 pr-12">
            {logoGroup}
          </div>
        </div>
      </div>
    </section>
  );
}
