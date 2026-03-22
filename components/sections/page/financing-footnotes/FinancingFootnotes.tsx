import type { FinancingFootnotesConfig } from "./config";

export function FinancingFootnotes({
  config,
}: {
  config: FinancingFootnotesConfig;
}) {
  return (
    <section className="bg-gray-50 py-6 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <ol className="list-none space-y-1 text-xs leading-5 text-[#999]">
          {config.items.map((item) => (
            <li key={item.marker}>
              <sup className="mr-1 font-medium">{item.marker}</sup>
              {item.text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
