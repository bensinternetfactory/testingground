import { Container } from "@/components/ui/Container";

const qualifications = [
  { text: "Trucks from Facebook Marketplace or Craigslist", icon: "marketplace" },
  { text: "Auction purchases", icon: "auction" },
  { text: "Buying from a retiring operator", icon: "handshake" },
  { text: "Purchasing from another towing company", icon: "truck" },
  { text: "Any non-dealer transaction", icon: "check" },
];

function getIcon(type: string) {
  switch (type) {
    case "marketplace":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "auction":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      );
    case "handshake":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      );
    case "truck":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
  }
}

export function DefinitionSectionV2() {
  return (
    <section className="bg-zinc-50 py-16 md:py-24">
      <Container className="max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column - Definition */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              What Is Private Party Tow Truck Financing?
            </h2>
            <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg leading-relaxed text-zinc-700">
                  Private party tow truck financing lets you finance a truck purchased directly from another person or business—not a dealer. This includes trucks from Facebook Marketplace, auctions, retiring operators, or other towing companies selling equipment.
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Qualifications */}
          <div>
            <h3 className="text-xl font-semibold text-zinc-900">
              What qualifies as a private party purchase:
            </h3>
            <ul className="mt-6 space-y-4">
              {qualifications.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    {getIcon(item.icon)}
                  </span>
                  <span className="text-zinc-700">{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg font-medium text-zinc-900">
              If there&apos;s no dealer involved, it&apos;s private party. Simple as that.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
