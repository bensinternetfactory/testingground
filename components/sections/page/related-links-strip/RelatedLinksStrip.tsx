import Link from "next/link";
import type { RelatedLinksStripConfig } from "./config";

export function RelatedLinksStrip({
  config,
}: {
  config: RelatedLinksStripConfig;
}) {
  return (
    <section className="bg-white py-10 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#545454]">
          {config.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className="rounded-sm underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
