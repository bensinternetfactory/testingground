import Image from "next/image";
import Link from "next/link";
import type { FooterConfig, FooterLinkItem } from "./config";

function FooterLink({
  link,
  className,
}: {
  link: FooterLinkItem;
  className: string;
}) {
  if (!link.href) {
    return <span className={`${className} cursor-default opacity-70`}>{link.label}</span>;
  }

  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} prefetch={false} className={className}>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

export function Footer({ config }: { config: FooterConfig }) {
  const currentYear = new Date().getFullYear();
  const navLinkClassName =
    "text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]";
  const legalLinkClassName =
    "text-xs text-white/60 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]";

  return (
    <footer className="bg-[#101820] pt-16 pb-8 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <Link href={config.logo.href} prefetch={false}>
            <Image
              src={config.logo.src}
              alt={config.logo.alt}
              width={config.logo.width}
              height={config.logo.height}
            />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {config.columns.map((column) => (
            <div key={column.id}>
              <h3 className="text-lg font-medium text-white">{column.heading}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} className={navLinkClassName} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-8">
          {config.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/60"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-white/60 sm:flex-row">
          <p>
            &copy; {currentYear} {config.companyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {config.contacts.map((contact) => (
              <a
                key={contact.href}
                href={contact.href}
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
              >
                {contact.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {config.legalLinks.map((link) => (
            <FooterLink
              key={link.label}
              link={link}
              className={legalLinkClassName}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
