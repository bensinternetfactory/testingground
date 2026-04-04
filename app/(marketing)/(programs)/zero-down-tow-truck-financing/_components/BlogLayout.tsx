import type { ReactNode } from "react";

/**
 * Two-column article layout with a sticky sidebar on lg+.
 *
 * Uses `max-w-7xl` to match the rest of the site's section containers.
 * The section's `py` padding lives on the ARTICLE and SIDEBAR grid items
 * (not on the grid container) so the sidebar's off-white background can
 * fill the entire grid-cell height — from the hero's bottom border all
 * the way through to the FAQ section — giving the sidebar a distinct
 * column appearance.
 *
 * Intentionally omits `2xl:overflow-hidden` — sticky positioning breaks
 * if any ancestor clips overflow.
 *
 * Children should be ordered: [article, sidebar].
 */
export function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-[#E9E9E9] bg-white 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px]">
        {children}
      </div>
    </section>
  );
}
