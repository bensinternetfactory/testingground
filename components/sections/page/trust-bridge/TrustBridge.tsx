import type { TrustBridgeConfig } from "./config";

export function TrustBridge({ config }: { config: TrustBridgeConfig }) {
  const { kicker, headline, steps } = config;

  return (
    <section
      id="trust-bridge"
      className="bg-[#F5F5F5] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
            {kicker}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            {headline}
          </h2>
        </div>

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="flex flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#15803D] text-sm font-semibold text-white">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-medium text-[#101820]">
                {step.title}
              </h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
