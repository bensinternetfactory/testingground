import Link from "next/link";
import { Phone } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { CtaButton } from "../primitives/CtaButton";
import { FOOTER_COLUMNS, PHONE_DISPLAY, PHONE_TEL } from "../../_lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <SectionShell as="footer" outerClassName="bg-white border-t border-[var(--t-divider)]" innerClassName="pt-12 md:pt-16 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_3fr] gap-8 lg:gap-12 pb-10 border-b border-[var(--t-divider)]">
        <div>
          <Link href="/test" className="inline-flex font-extrabold text-xl tracking-tight text-[var(--t-ink)]">
            <span className="text-[var(--t-blue)]">Tow</span>
            <span>Loans</span>
          </Link>
          <p className="mt-3 text-[14px] text-[var(--t-text-muted)] max-w-sm">
            Tow truck and recovery equipment financing for operators of every size.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <CtaButton href="/pre-approval" size="md">
              Apply Now
            </CtaButton>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-[var(--t-card-border)] text-[14px] font-semibold text-[var(--t-blue-ink)] hover:bg-[var(--t-bg-soft)]"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[13px] font-bold text-[var(--t-ink)] uppercase tracking-wider mb-3">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => {
                  const isExternal =
                    link.href.startsWith("tel:") ||
                    link.href.startsWith("mailto:") ||
                    link.href.startsWith("http");
                  const className =
                    "text-[13px] text-[var(--t-text-muted)] hover:text-[var(--t-blue-ink)] hover:underline";
                  return (
                    <li key={link.href + link.label}>
                      {isExternal ? (
                        <a href={link.href} className={className}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={className}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[12px] text-[var(--t-text-faint)]">
        <p>© {year} TowLoans. All rights reserved.</p>
        <p className="max-w-2xl sm:text-right">
          TowLoans matches qualified buyers with independent third-party lenders. Rates and terms vary by lender, equipment, and credit profile.
        </p>
      </div>
    </SectionShell>
  );
}
