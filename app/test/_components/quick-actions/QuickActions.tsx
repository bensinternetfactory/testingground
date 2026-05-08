import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { QUICK_ACTIONS } from "../../_lib/content";

export function QuickActions() {
  return (
    <SectionShell outerClassName="bg-white border-b border-[var(--t-divider)]" innerClassName="py-3">
      <ul className="flex flex-col sm:flex-row sm:items-center sm:divide-x sm:divide-[var(--t-divider)]">
        {QUICK_ACTIONS.map((item) => {
          const isExternal = item.href.startsWith("tel:") || item.href.startsWith("mailto:");
          const className =
            "flex items-center justify-between sm:justify-start gap-2 px-2 sm:px-4 py-2 text-[13px] font-medium text-[var(--t-blue-ink)] hover:underline w-full";
          return (
            <li key={item.href} className="flex-1">
              {isExternal ? (
                <a href={item.href} className={className}>
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-[var(--t-text-muted)]" />
                </a>
              ) : (
                <Link href={item.href} className={className}>
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-[var(--t-text-muted)]" />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
