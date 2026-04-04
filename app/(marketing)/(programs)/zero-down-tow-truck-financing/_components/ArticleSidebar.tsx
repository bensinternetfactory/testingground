import { SidebarCta } from "./SidebarCta";
import { TableOfContents } from "./TableOfContents";
import type { SidebarCtaConfig, TocItem } from "../config";

export function ArticleSidebar({
  toc,
  cta,
}: {
  toc: TocItem[];
  cta: SidebarCtaConfig;
}) {
  return (
    <div className="hidden lg:block lg:border-l lg:border-[#D4D4D4] lg:py-28 lg:pl-10 lg:pr-0">
      <aside className="sticky top-[calc(var(--nav-height)+24px)] flex flex-col gap-8">
        <TableOfContents items={toc} />
        <SidebarCta config={cta} />
      </aside>
    </div>
  );
}
