const sources = [
  {
    iconPath:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    title: "Dealer Floor",
    description: "New or used from any manufacturer",
  },
  {
    iconPath:
      "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
    title: "Auction",
    description: "Live or online",
  },
  {
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Private Party",
    description: "Another operator selling their rig",
  },
];

const equipment = [
  { type: "Wreckers", classes: ["Light", "Medium", "Heavy"] },
  { type: "Rollbacks", classes: ["Light", "Medium", "Heavy"] },
  { type: "Flatbeds", classes: ["Light", "Medium", "Heavy"] },
  { type: "Rotators", classes: ["Heavy"] },
];

export function EquipmentSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
            We Finance Tow Trucks From{" "}
            <span className="text-amber-600">Any Source</span>
          </h2>
          <p className="mt-4 text-xl text-slate-600">
            It doesn&apos;t matter where you buy.
          </p>
        </div>

        {/* Source cards */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {sources.map((source, index) => (
            <li
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition-colors duration-200 hover:border-amber-300 hover:bg-amber-50"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-white">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={source.iconPath}
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {source.title}
              </h3>
              <p className="mt-2 text-slate-600">{source.description}</p>
            </li>
          ))}
        </ul>

        {/* Equipment grid */}
        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold text-slate-900">
            Equipment We Finance
          </h3>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((item, index) => (
              <li
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {item.type}
                  </h4>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.classes.map((cls, clsIndex) => (
                    <li
                      key={clsIndex}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                    >
                      {cls}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Tagline */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-2xl bg-gradient-to-r from-blue-900 to-cyan-800 px-8 py-6">
            <p className="text-2xl font-bold text-white md:text-3xl">
              If it tows, we finance it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
