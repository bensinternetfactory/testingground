import { Container } from "@/components/ui/Container";

export function BeforeAfterSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          Before vs. After Pre-Approval
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Comparison of experience before and after getting pre-approved
            </caption>
            <thead>
              <tr className="border-b border-zinc-200">
                <th scope="col" className="py-4 pr-4 font-semibold text-black">
                  Before
                </th>
                <th scope="col" className="py-4 font-semibold text-black">
                  After
                </th>
              </tr>
            </thead>
            <tbody className="text-base text-zinc-600">
              <tr className="border-b border-zinc-200">
                <td className="py-4 pr-4">&quot;I need to check with my bank&quot;</td>
                <td className="py-4">&quot;I can spend up to $X&quot;</td>
              </tr>
              <tr className="border-b border-zinc-200">
                <td className="py-4 pr-4">Loses deals to faster buyers</td>
                <td className="py-4">Negotiates from strength</td>
              </tr>
              <tr className="border-b border-zinc-200">
                <td className="py-4 pr-4">Worries about approval</td>
                <td className="py-4">Approved and ready</td>
              </tr>
              <tr className="border-b border-zinc-200">
                <td className="py-4 pr-4">Browses the show floor</td>
                <td className="py-4">Buys at the show</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 space-y-4 text-lg leading-8 text-zinc-600">
          <p>
            The best deals at the Florida Tow Show go fast. Rotators sell in hours, not days. That used heavy-duty wrecker priced right? Gone by lunch.
          </p>
          <p className="font-medium text-black">
            Pre-approved buyers don&apos;t miss out.
          </p>
        </div>
      </Container>
    </section>
  );
}
