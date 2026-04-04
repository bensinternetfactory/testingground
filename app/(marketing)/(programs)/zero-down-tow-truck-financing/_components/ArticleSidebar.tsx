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
    <div className="hidden lg:block lg:border-l lg:border-[#D4D4D4] lg:px-6 lg:py-24 xl:px-8 xl:py-28">
      <aside className="sticky top-[calc(var(--nav-height)+24px)] flex flex-col gap-5">
        <TableOfContents items={toc} />
        <SidebarCta config={cta} />
      </aside>
    </div>
  );
}
