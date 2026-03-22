import type { EquipmentDealsSectionConfig } from "./config";

export function EquipmentDealsSection({
  config,
}: {
  config: EquipmentDealsSectionConfig;
}) {
  return (
    <section className="bg-[#F8FAFC] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {config.eyebrow ? (
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
              {config.eyebrow}
            </p>
          ) : null}
          <h2
            className={`text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl ${
              config.eyebrow ? "mt-4" : ""
            }`}
          >
            {config.heading}
          </h2>
          {config.intro ? (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#545454]">
              {config.intro}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {config.items.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9]"
            >
              <h3 className="text-lg font-medium tracking-tight text-[#101820]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#545454]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
