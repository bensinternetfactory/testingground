const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "How It Works", href: "#financing" },
      { label: "Contact Us", href: "#" },
      { label: "Resources", href: "#" },
    ],
  },
  {
    title: "Financing Programs",
    links: [
      { label: "New Truck Financing", href: "#" },
      { label: "Used Truck Financing", href: "#" },
      { label: "Heavy-Duty / Rotator", href: "#" },
      { label: "Fleet Expansion", href: "#programs" },
      { label: "First-Time Buyer", href: "#" },
    ],
  },
  {
    title: "Equipment We Finance",
    links: [
      { label: "Rollbacks / Flatbeds", href: "#" },
      { label: "Wheel-Lift Wreckers", href: "#" },
      { label: "Integrated Wreckers", href: "#" },
      { label: "Heavy-Duty Rotators", href: "#" },
      { label: "Landoll Trailers", href: "#" },
      { label: "Specialty Equipment", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Payment Calculator", href: "#calculator" },
      { label: "FAQ", href: "#" },
      { label: "Pre-Approval Checklist", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
];

const trustBadges = [
  "BBB Accredited",
  "SSL Secured",
  "Trusted by 340+ Operators",
];

export function FooterSection() {
  return (
    <footer className="bg-[#111111] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Logo */}
        <div className="mb-12">
          <a href="/revenue-leak" className="text-xl font-medium text-white">
            TowCap
          </a>
        </div>

        {/* Columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-lg font-medium text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-8">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/60"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
          <p>&copy; 2026 TowCap. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="tel:+18885550199"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
            >
              (888)&nbsp;555-0199
            </a>
            <a
              href="mailto:info@towcap.com"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE3341] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
            >
              info@towcap.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
