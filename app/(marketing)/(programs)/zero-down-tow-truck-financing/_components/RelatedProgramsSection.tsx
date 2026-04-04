import Image from "next/image";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";

const ArrowIcon = (
  <svg
    className="h-4 w-4"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

interface Program {
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  iconSrc: string;
}

const programs: Program[] = [
  {
    title: "Deferred payments",
    body: "No payments for up to 180 days. Get the truck on the road, build the revenue stream, then start paying. Combined with $0 down, you add a truck with zero upfront cost and six months of breathing room.",
    linkLabel: "See details",
    href: "/deferred-payment-tow-truck-financing",
    iconSrc: "/brand-assets/benefit-icons/deferment/deferment-180-dark.svg",
  },
  {
    title: "Fleet financing",
    body: "Adding your third, fifth, or tenth truck? Fleet operators get streamlined approvals and terms that reflect the business you've already built.",
    linkLabel: "See details",
    href: "/fleet-financing",
    iconSrc: "/brand-assets/benefit-icons/terms/terms-dark.svg",
  },
  {
    title: "Private-party financing",
    body: "Found the right truck from another operator? We finance private-party deals with the same terms as dealer purchases. No markup, no middleman.",
    linkLabel: "See details",
    href: "/private-party-tow-truck-financing",
    iconSrc: "/brand-assets/benefit-icons/hook/hook-dark.svg",
  },
];

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
            <Image
              src={program.iconSrc}
              alt=""
              width={72}
              height={72}
              className="mb-4 h-10 w-auto self-start sm:h-12"
            />
            <h3 className="text-lg font-semibold tracking-tight text-[#111]">
              {program.title}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-[#3A3A3A]">
              {program.body}
            </p>
            <RippleCtaLink
              href={program.href}
              label={program.linkLabel}
              icon={ArrowIcon}
              variant="outline"
              size="sm"
              section="related-programs"
              className="self-start"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
