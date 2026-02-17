"use client";

/** A default tile card for use in the HeroShowcase footer slot. */
export function NavTile({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex h-14 items-center justify-between rounded-[1rem] border border-[#E5E5E5] bg-white p-4 transition-shadow duration-200 hover:shadow-lg md:h-[108px] md:p-6 lg:h-[116px] lg:rounded-[1.25rem]"
    >
      <span className="text-base font-normal text-[#111111] lg:text-2xl lg:leading-8">
        {label}
      </span>
      <TileArrow />
    </a>
  );
}

// Hoisted static SVG — never re-created on render
const TileArrow = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="shrink-0 text-[#999] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#111111]"
  >
    <path
      d="M7.5 5L12.5 10L7.5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
