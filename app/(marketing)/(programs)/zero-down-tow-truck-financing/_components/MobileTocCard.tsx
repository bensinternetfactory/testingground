import type { TocItem } from "../config";

export function MobileTocCard({ items }: { items: TocItem[] }) {
  return (
    <details className="group mb-10 rounded-2xl bg-[#F5F5F5] shadow-[inset_0_0_0_1px_#E9E9E9] lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2">
        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[#111]">
          On this page
        </span>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#3A3A3A] transition-transform group-open:rotate-180"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </summary>
      <nav aria-label="On this page" className="px-5 pb-5">
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block rounded-sm border-l-2 border-transparent py-1 pl-3 text-[#3A3A3A] transition-colors hover:border-[#22C55E] hover:text-[#111] focus-visible:border-[#22C55E] focus-visible:text-[#111] focus-visible:outline-none"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
