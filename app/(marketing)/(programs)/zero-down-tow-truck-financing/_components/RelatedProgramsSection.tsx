import Link from "next/link";

interface Program {
  title: string;
  body: string;
  linkLabel: string;
  href: string;
}

const programs: Program[] = [
  {
    title: "Deferred payments",
    body: "No payments for up to 180 days. Get the truck on the road, build the revenue stream, then start paying. Combined with $0 down, you add a truck with zero upfront cost and six months of breathing room.",
    linkLabel: "See deferred payments",
    href: "/deferred-payment-tow-truck-financing",
  },
  {
    title: "Fleet financing",
    body: "Adding your third, fifth, or tenth truck? Fleet operators get streamlined approvals and terms that reflect the business you've already built.",
    linkLabel: "See fleet financing",
    href: "/fleet-financing",
  },
  {
    title: "Private-party financing",
    body: "Found the right truck from another operator? We finance private-party deals with the same terms as dealer purchases. No markup, no middleman.",
    linkLabel: "See private-party financing",
    href: "/private-party-tow-truck-financing",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function RelatedProgramsSection() {
  return (
    <section className="pt-14">
      <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        Pair It With What Works for You
      </h2>
      <p className="mt-6 text-base leading-relaxed text-[#111] md:text-lg">
        Zero down is one piece. We built programs around how towing operators
        actually buy and run trucks.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {programs.map((program) => (
          <li
            key={program.href}
            className="flex flex-col gap-4 rounded-3xl bg-white p-7 shadow-[inset_0_0_0_1px_#E9E9E9] md:p-8"
          >
            <h3 className="text-lg font-semibold tracking-tight text-[#111]">
              {program.title}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-[#3A3A3A]">
              {program.body}
            </p>
            <Link
              href={program.href}
              className="inline-flex items-center gap-2 self-start rounded-full bg-[#F0FDF4] px-4 py-2 text-sm font-semibold text-[#15803D] transition-colors hover:bg-[#22C55E] hover:text-[#101820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
            >
              {program.linkLabel}
              <ArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
