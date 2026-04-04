interface FlexibilityItem {
  title: string;
  body: string;
}

const items: FlexibilityItem[] = [
  {
    title: "Truck type",
    body: "Rollbacks, flatbeds, wreckers, heavy wreckers, rotators, integrated carriers. Light duty through heavy recovery.",
  },
  {
    title: "Truck age",
    body: "New off the lot or 20+ years old. If it's mechanically sound and makes business sense, we'll finance it.",
  },
  {
    title: "Mileage",
    body: "No cap. The odometer is not a disqualifier.",
  },
  {
    title: "Seller",
    body: "Dealer, private party, auction, Facebook Marketplace, the operator down the road who's retiring.",
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-5 w-5 text-[#22C55E]"
    >
      <path
        fill="currentColor"
        d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z"
      />
    </svg>
  );
}

export function TruckFlexibilitySection() {
  return (
    <section
      id="any-truck"
      className="scroll-mt-[calc(var(--nav-height)+24px)] pt-14"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        Any Truck. Any Age. Any Seller.
      </h2>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        <p>
          This is where most &ldquo;zero down&rdquo; offers fall apart with
          other lenders. The asterisks start piling up: new trucks only. Dealer
          purchases only. Under 100,000 miles only.
        </p>
        <p>We don&apos;t do that.</p>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex flex-col gap-3 rounded-2xl bg-[#F5F5F5] p-5 shadow-[inset_0_0_0_1px_#E9E9E9]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_#E9E9E9]">
              <CheckIcon />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#111]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#3A3A3A]">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-base leading-relaxed text-[#111] md:text-lg">
        The truck needs to make sense for your business. That&apos;s the bar.
        Not an arbitrary checklist designed to protect the lender at the
        operator&apos;s expense.
      </p>
    </section>
  );
}
