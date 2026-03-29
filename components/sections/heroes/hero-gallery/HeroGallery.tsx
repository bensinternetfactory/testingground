import Image from "next/image";
import Link from "next/link";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import { HeroInput } from "./HeroInput";
import type { HeroGalleryConfig } from "./config";

export function HeroGallery({ config }: { config: HeroGalleryConfig }) {
  return (
    <section
      id="hero"
      className="bg-white pt-[var(--nav-height)] 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden"
    >
      {/* Text content */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16 lg:py-20">
        {/* Left-aligned on mobile, centered on desktop */}
        <div className="md:mx-auto md:max-w-3xl md:text-center">
          <h1
            className="text-[2.5rem] font-bold leading-[1.1] text-[#101820] sm:text-[3.25rem] md:text-6xl lg:text-[4.5rem]"
            style={{ textWrap: "balance" }}
          >
            {config.headline}
          </h1>

          <p className="mt-4 text-lg text-[#545454] md:mx-auto md:max-w-lg md:text-[1.0625rem]">
            {config.subheadline}
          </p>

          {/* Desktop input — hidden on mobile */}
          <div className="mt-8 hidden md:block">
            <HeroInput
              placeholder={config.inputPlaceholder}
              ctaLabel={config.ctaLabel}
            />
          </div>

          {/* Mobile CTA + tertiary links — hidden on desktop */}
          <div className="mt-6 flex flex-col gap-4 md:hidden">
            <RippleCtaLink
              href={config.mobileCta.href}
              label={config.mobileCta.label}
              section="hero-gallery"
              className="w-full"
            />

            {/* Tertiary link container */}
            <div className="overflow-hidden rounded-full border border-gray-200">
              {config.tertiaryLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  data-drawer-title={link.drawerTitle}
                  prefetch={false}
                  className={`flex items-center justify-between px-5 py-3.5 text-sm text-[#545454] transition-colors hover:bg-gray-50 ${
                    i > 0 ? "border-t border-gray-200" : ""
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="ml-2 text-gray-400" aria-hidden="true">
                    ›
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Truck image gallery — desktop only */}
      <div className="relative mt-0 hidden overflow-hidden md:block">
        {/* Row 1 */}
        <div className="flex justify-center gap-3 lg:gap-4">
          {config.images.row1.map((src, i) => (
            <div
              key={src}
              className="relative h-40 w-56 shrink-0 overflow-hidden rounded-xl lg:h-48 lg:w-64"
            >
              <Image
                src={src}
                alt={`Tow truck ${i + 1}`}
                fill
                sizes="(max-width: 1023px) 224px, 256px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Row 2 — offset by half an image width */}
        <div
          className="mt-3 flex justify-center gap-3 lg:mt-4 lg:gap-4"
          style={{ transform: "translateX(8rem)" }}
        >
          {config.images.row2.map((src, i) => (
            <div
              key={src}
              className="relative h-40 w-56 shrink-0 overflow-hidden rounded-xl lg:h-48 lg:w-64"
            >
              <Image
                src={src}
                alt={`Tow truck ${i + 8}`}
                fill
                sizes="(max-width: 1023px) 224px, 256px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Bottom gradient fade to next section's gray */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-[#F5F5F5]" />
      </div>

      {/* Seamless color bridge to next section */}
      <div className="hidden h-8 bg-[#F5F5F5] md:block" />
    </section>
  );
}
