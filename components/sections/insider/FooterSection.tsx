const footerColumns = [
  {
    title: "Tow Truck Financing by Type",
    links: [
      "Rollback Financing",
      "Flatbed Financing",
      "Light-Duty Wrecker Financing",
      "Medium-Duty Wrecker Financing",
      "Heavy-Duty Wrecker Financing",
      "Rotator Financing",
      "Multi-Car Carrier Financing",
    ],
  },
  {
    title: "Programs",
    links: [
      "Fleet Expansion",
      "Owner-Operator Upgrade",
      "Used Truck Financing",
      "New Build Financing",
      "Chassis Remount Financing",
      "First-Time Buyer Program",
    ],
  },
  {
    title: "Resources",
    links: [
      "Payment Calculator",
      "Financing FAQ",
      "Blog / Industry News",
      "Truck Buying Guide",
      "Credit Score Guide for Tow Operators",
    ],
  },
  {
    title: "Company",
    links: [
      "About Tow Loans",
      "Contact",
      "Reviews",
      "Privacy Policy",
      "Terms of Service",
    ],
  },
];

const badges = [
  "BBB Accredited",
  "SSL Secured",
  "3,000+ Tow Trucks Financed",
];

export function FooterSection() {
  return (
    <footer className="bg-slate-950 pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6">
        {/* Column grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold tracking-wide text-white uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-slate-800 pt-8">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-400"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-8 text-center text-xs text-slate-700">
          &copy; {new Date().getFullYear()} Tow Loans. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
