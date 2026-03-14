import Image from "next/image";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link/RippleCtaLink";
import type { ClosingCtaConfig } from "./config";

export function ClosingCta({ config }: { config: ClosingCtaConfig }) {
  const { headline, benefits, primaryCta, contactBlock } = config;

  return (
    <section
      id="final-cta"
      className="bg-white py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            {headline}
          </h2>
        </div>

        {/* Benefit tiles */}
        {benefits.length > 0 && (
          <ul className="mt-16 grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <li
                key={benefit.id}
                className="flex flex-col items-center rounded-3xl bg-[#F5F5F5] px-6 py-10 text-center shadow-[inset_0_0_0_1px_#E9E9E9]"
              >
                <div className="flex h-14 w-14 items-center justify-center">
                  <Image
                    src={benefit.icon.src}
                    alt={benefit.icon.decorative ? "" : benefit.icon.alt}
                    width={benefit.icon.width}
                    height={benefit.icon.height}
                    className="h-10 w-auto"
                  />
                </div>
                <h3 className="mt-6 text-xl font-medium text-[#101820]">
                  {benefit.label}
                </h3>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center text-center">
          <RippleCtaLink
            href={primaryCta.href}
            label={primaryCta.label}
            ariaLabel={primaryCta.label}
            size="lg"
            section="closing-cta"
          >
            <span aria-hidden="true" className="sm:hidden">
              {primaryCta.shortLabel}
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              {primaryCta.label}
            </span>
          </RippleCtaLink>

          {contactBlock && (
            <>
              <p className="mt-6 text-sm text-[#545454]">
                Or call us now:{" "}
                <a
                  href={contactBlock.phone.href}
                  className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#101820]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {contactBlock.phone.label}
                </a>
              </p>
              <p className="mt-2 text-xs text-[#545454]">
                {contactBlock.supportText}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
