import Link from "next/link";
import type { BottomLinkGroupsConfig } from "../config";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 flex-none text-[#15803D]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function BottomLinkCards({ config }: { config: BottomLinkGroupsConfig }) {
  return (
    <section className="bg-white py-16 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl space-y-10 px-6">
        {config.groups.map((group) => (
          <div key={group.label}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#3A3A3A]">
              {group.label}
            </p>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between gap-4 rounded-xl border border-[#D4D4D4] bg-white p-4 transition-colors hover:border-[#22C55E] hover:bg-[#F0FDF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
                  >
                    <span className="text-sm font-medium text-[#111]">
                      {link.label}
                    </span>
                    <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
