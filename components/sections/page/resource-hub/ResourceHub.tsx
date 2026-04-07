import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/features/cta/client";
import type { ResourceHubConfig } from "./config";

const ArrowIcon = (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const ICONS = {
  "magnify-dark": {
    src: "/brand-assets/benefit-icons/terms/magnify-dark.svg",
    alt: "Tow truck cost research",
    width: 60,
    height: 60,
  },
  "cost-dark": {
    src: "/brand-assets/benefit-icons/terms/cost-dark.svg",
    alt: "Tow truck ROI and payment",
    width: 60,
    height: 60,
  },
  "trophy-green": {
    src: "/brand-assets/benefit-icons/best/trophy-green.svg",
    alt: "Top financing company comparison",
    width: 60,
    height: 60,
  },
  "terms-pencil": {
    src: "/brand-assets/benefit-icons/terms/terms-pencil.svg",
    alt: "Lease versus loan terms",
    width: 60,
    height: 60,
  },
} as const;

export function ResourceHub({ config }: { config: ResourceHubConfig }) {
  return (
    <section
      id="resources"
      className="bg-white py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            {config.headline}
          </h2>
          <p className="mt-4 text-lg text-[#545454]">{config.subtitle}</p>
        </div>

        <div className="-mx-6 mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scrollbar-none scroll-pl-6 px-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:scroll-pl-0 sm:px-0 lg:grid-cols-4">
          {config.cards.map((card) => {
            const icon = ICONS[card.iconId];

            return (
              <article
                key={card.id}
                className="group flex w-[72vw] min-w-[220px] max-w-[340px] shrink-0 snap-start flex-col rounded-3xl bg-[#F5F5F5] p-6 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)] min-[321px]:p-8 min-[425px]:w-[80vw] sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink sm:snap-align-none"
              >
                <div className="flex flex-col items-start">
                  {icon ? (
                    <div className="flex h-10 w-auto shrink-0 items-center sm:h-12">
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={icon.width}
                        height={icon.height}
                        className="h-10 w-auto sm:h-12"
                      />
                    </div>
                  ) : null}
                  <h3 className="mt-4 text-base font-medium tracking-tight text-[#101820] min-[321px]:text-xl min-[321px]:tracking-normal">
                    <Link
                      href={card.titleHref}
                      prefetch={false}
                      className="underline-offset-4 transition-colors hover:text-[#22C55E] hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820]"
                    >
                      {card.title}
                    </Link>
                  </h3>
                </div>

                <p className="mt-2 text-sm text-[#545454]">{card.description}</p>

                <div className="mt-auto pt-6">
                  <CtaLink
                    href={card.linkHref}
                    prefetch={false}
                    copy={{ label: card.linkText }}
                    icon={ArrowIcon}
                    appearance={{ size: "sm", className: "w-full justify-center" }}
                    analytics={{
                      legacySection: "resource-hub",
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 space-y-3 text-center text-base text-[#545454]">
          {config.inlineLinks.map((link) => (
            <p key={link.id}>
              {link.prefixText}{" "}
              <Link
                href={link.linkHref}
                prefetch={false}
                className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
              >
                {link.linkText}
              </Link>
              {link.suffixText ?? ""}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
