import Image from "next/image";

export function BrandHero() {
  return (
    <section id="logo" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Centered large logo */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/brand-assets/logo/towloans-dark-logo.svg"
            alt="TowLoans"
            width={400}
            height={58}
            priority
            className="h-auto w-[280px] md:w-[400px]"
          />
          <p className="mt-4 text-lg text-[#737373]">Brand Style Guide</p>
        </div>

        {/* Two-up logo showcase */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Dark logo on white */}
          <div className="flex items-center justify-center rounded-3xl bg-white p-12 shadow-[inset_0_0_0_1px_#E5E5E5]">
            <Image
              src="/brand-assets/logo/towloans-dark-logo.svg"
              alt="TowLoans dark logo on white background"
              width={280}
              height={40}
              className="h-auto w-[200px] md:w-[280px]"
            />
          </div>

          {/* Light logo on dark */}
          <div className="flex items-center justify-center rounded-3xl bg-[#101820] p-12 shadow-[inset_0_0_0_1px_#E5E5E5]">
            <Image
              src="/brand-assets/logo/towloans-light-logo.svg"
              alt="TowLoans light logo on dark background"
              width={280}
              height={40}
              className="h-auto w-[200px] md:w-[280px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
