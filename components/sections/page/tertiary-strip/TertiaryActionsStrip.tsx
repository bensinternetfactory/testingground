import { ArrowRight } from "lucide-react";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import type { TertiaryStripConfig } from "./config";

export function TertiaryActionsStrip({
  config,
}: {
  config: TertiaryStripConfig;
}) {
  return (
    <section className="bg-[#101820] py-5 sm:py-6 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {config.actions.map((action) => (
            <RippleCtaLink
              key={action.label}
              href={action.href}
              label={action.label}
              variant="outline-dark"
              size="sm"
              justify="between"
              icon={<ArrowRight className="h-4 w-4" />}
              preApprovalTrigger={action.preApprovalTrigger}
              prefetch={false}
              section="tertiary-strip"
              className="w-full rounded-2xl border-white/15 px-6 py-5"
            >
              <span className="flex flex-col items-start">
                <span className="text-xs text-white/60">{action.eyebrow}</span>
                <span className="mt-1 text-sm font-medium text-white">
                  {action.label}
                </span>
              </span>
            </RippleCtaLink>
          ))}
        </div>
      </div>
    </section>
  );
}
