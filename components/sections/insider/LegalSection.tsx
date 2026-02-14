export function LegalSection() {
  return (
    <section className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center text-xs leading-relaxed text-slate-600">
          Tow Loans is a commercial equipment financing broker, not a direct
          lender. All financing is subject to credit approval and lender terms.
          Pre-approval results are preliminary estimates based on information
          provided and do not constitute a financing offer or commitment. No hard
          credit inquiry is performed during pre-approval; a soft credit inquiry
          may be conducted upon formal application submission. Rates, terms, and
          approval timelines vary based on applicant creditworthiness, equipment
          type, equipment age, and lender requirements. The 24-hour approval
          timeline reflects typical processing times and is not a guarantee.
          Payment estimates provided by calculators on this site are for
          illustrative purposes only. Tow Loans does not charge application fees.
          Your personal information is protected in accordance with our Privacy
          Policy.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
          <a
            href="#"
            className="transition-colors hover:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Privacy Policy
          </a>
          <span aria-hidden="true">&middot;</span>
          <a
            href="#"
            className="transition-colors hover:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Terms of Service
          </a>
          <span aria-hidden="true">&middot;</span>
          <a
            href="#"
            className="transition-colors hover:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Equal Credit Opportunity
          </a>
          <span aria-hidden="true">&middot;</span>
          <a
            href="#"
            className="transition-colors hover:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
