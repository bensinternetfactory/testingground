import type { TocItem } from "../config";

export function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#3A3A3A]">
        On this page
      </p>
      <ul className="space-y-2">
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
  );
}
