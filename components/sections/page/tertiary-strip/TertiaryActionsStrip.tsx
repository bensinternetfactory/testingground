import { ArrowRight } from "lucide-react";
import { CtaLink, LeadCta } from "@/features/cta/client";
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
            action.preApprovalTrigger ? (
              <LeadCta
                key={action.label}
                copy={{ eyebrow: action.eyebrow, label: action.label }}
                entry={{
                  kind: "pre-approval",
                  href: action.href,
                  trigger: action.preApprovalTrigger,
                }}
                appearance={{
                  tone: "inverse",
                  size: "sm",
                  align: "between",
                  className: "w-full rounded-2xl border-white/15 px-6 py-5",
                }}
                icon={<ArrowRight className="h-4 w-4" />}
                analytics={{ legacySection: "tertiary-strip" }}
                prefetch={false}
              />
            ) : (
              <CtaLink
                key={action.label}
                href={action.href}
                copy={{ eyebrow: action.eyebrow, label: action.label }}
                appearance={{
                  tone: "inverse",
                  size: "sm",
                  align: "between",
                  className: "w-full rounded-2xl border-white/15 px-6 py-5",
                }}
                icon={<ArrowRight className="h-4 w-4" />}
                analytics={{ legacySection: "tertiary-strip" }}
                prefetch={false}
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
}
