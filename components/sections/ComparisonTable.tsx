import { Container } from "@/components/ui/Container";

export function ComparisonTable() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Private Party vs Dealer Financing: Which Is Right for You?
        </h2>
        <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <p>
            Neither option is universally better. It depends on your situation.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Comparison of private party and dealer tow truck financing
              </caption>
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th scope="col" className="py-4 pr-4 font-semibold text-black dark:text-zinc-100">
                    Factor
                  </th>
                  <th scope="col" className="py-4 pr-4 font-semibold text-black dark:text-zinc-100">
                    Private Party
                  </th>
                  <th scope="col" className="py-4 font-semibold text-black dark:text-zinc-100">
                    Dealer
                  </th>
                </tr>
              </thead>
              <tbody className="text-base">
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="py-4 pr-4 font-medium text-black dark:text-zinc-200">Selection</td>
                  <td className="py-4 pr-4">Unlimited—anywhere you find it</td>
                  <td className="py-4">Limited to their inventory</td>
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="py-4 pr-4 font-medium text-black dark:text-zinc-200">Price</td>
                  <td className="py-4 pr-4">Typically lower (no retail markup)</td>
                  <td className="py-4">Retail pricing</td>
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="py-4 pr-4 font-medium text-black dark:text-zinc-200">Financing</td>
                  <td className="py-4 pr-4">Need a lender who does private party</td>
                  <td className="py-4">Most lenders work with dealers</td>
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="py-4 pr-4 font-medium text-black dark:text-zinc-200">Speed</td>
                  <td className="py-4 pr-4">Depends on seller cooperation</td>
                  <td className="py-4">Usually straightforward</td>
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="py-4 pr-4 font-medium text-black dark:text-zinc-200">Warranty</td>
                  <td className="py-4 pr-4">As-is, typically</td>
                  <td className="py-4">Sometimes available</td>
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="py-4 pr-4 font-medium text-black dark:text-zinc-200">Inspection</td>
                  <td className="py-4 pr-4">You do your own due diligence</td>
                  <td className="py-4">Dealer handles prep</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-medium text-black dark:text-zinc-100">
                When dealer makes sense
              </h3>
              <ul className="mt-4 ml-6 list-disc space-y-2">
                <li>You need the truck immediately</li>
                <li>You want a warranty</li>
                <li>You don&apos;t have time to verify condition yourself</li>
                <li>You&apos;re new to buying equipment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-black dark:text-zinc-100">
                When private party wins
              </h3>
              <ul className="mt-4 ml-6 list-disc space-y-2">
                <li>You found a specific truck at a good price</li>
                <li>You&apos;re buying from someone you know or trust</li>
                <li>Heavy equipment that rarely shows up at dealers</li>
                <li>You know how to evaluate a truck yourself</li>
              </ul>
            </div>
          </div>

          <p className="mt-8">
            Most established operators are comfortable evaluating equipment themselves. If that&apos;s you, private party opens up deals you&apos;d never find at a dealer—especially for heavy wreckers and specialty equipment.
          </p>
        </div>
      </Container>
    </section>
  );
}
