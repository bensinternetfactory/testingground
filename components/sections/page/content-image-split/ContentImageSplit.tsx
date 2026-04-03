import Image from "next/image";
import type { ContentImageSplitConfig } from "./config";

export function ContentImageSplit({
  config,
}: {
  config: ContentImageSplitConfig;
}) {
  const bg = config.background === "white" ? "bg-white" : "bg-[#F5F5F5]";

  return (
    <section className={`${bg} py-20 md:py-28 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-stretch md:gap-14 lg:gap-20">
          {/* Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
              {config.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111] sm:text-4xl">
              {config.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#545454] sm:text-lg">
              {config.body}
            </p>
          </div>

          {/* Image */}
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl md:min-h-0">
            <Image
              src={config.imageSrc}
              alt={config.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
