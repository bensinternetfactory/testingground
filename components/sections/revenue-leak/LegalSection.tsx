export function LegalSection() {
  return (
    <section className="border-t border-[#E9E9E9] bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs leading-relaxed text-[#545454]">
          All financing subject to credit approval. Rates, terms, and conditions
          vary based on creditworthiness, equipment type, age, and other factors.
          TowCap is a financing broker and works with multiple lending partners
          to find the best fit for your operation. TowCap is not a direct
          lender. Pre-approval is a preliminary assessment and does not
          constitute a final loan offer or commitment. Approval timelines are
          estimates and may vary. Equipment financing is for commercial/business
          use only. Examples and testimonials reflect individual results and are
          not guarantees of future performance. Monthly payment estimates
          provided by calculators or pre-approval tools on this site are for
          illustrative purposes only.
        </p>

        <nav
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2"
          aria-label="Legal links"
        >
          <a
            href="#"
            className="text-xs text-[#545454] underline underline-offset-4 transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs text-[#545454] underline underline-offset-4 transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            Terms of Use
          </a>
          <a
            href="#"
            className="text-xs text-[#545454] underline underline-offset-4 transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            Equal Credit Opportunity Notice
          </a>
          <a
            href="#"
            className="text-xs text-[#545454] underline underline-offset-4 transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            Do Not Sell My Information
          </a>
        </nav>
      </div>
    </section>
  );
}
