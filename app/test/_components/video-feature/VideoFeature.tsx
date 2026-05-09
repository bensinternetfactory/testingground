import { SectionShell } from "../primitives/SectionShell";
import { CtaButton } from "../primitives/CtaButton";

export function VideoFeature() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-8 md:py-12">
      <div className="rounded-2xl md:rounded-3xl bg-[var(--t-blue)] p-4 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div
            role="img"
            aria-label="Video placeholder"
            className="aspect-video w-full overflow-hidden rounded-xl md:rounded-2xl bg-black/15 ring-1 ring-white/10 grid place-items-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-white/90 grid place-items-center">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 translate-x-[1px] fill-[var(--t-blue-ink)]"
                >
                  <path d="M8 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 8 5.5z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white/80">
                Video coming soon
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              Pre-approval in minutes, not days
            </h2>
            <p className="mt-3 md:mt-4 max-w-prose text-base md:text-lg leading-relaxed text-white/90">
              Skip the dealership runaround. Get a real rate and a real number
              before you walk in — no hard credit pull, no commitment. See what
              you qualify for in about 30 seconds.
            </p>
            <CtaButton
              href="#"
              variant="secondary"
              size="lg"
              className="mt-6"
            >
              Get started
            </CtaButton>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
