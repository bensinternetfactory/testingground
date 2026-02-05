import { Container } from "@/components/ui/Container";

export function EquipmentSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          We Finance Tow Trucks From Any Source
        </h2>
        <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600">
          <p>It doesn&apos;t matter where you buy:</p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <span className="font-medium text-black">Dealer floor</span> — New or used from any manufacturer
            </li>
            <li>
              <span className="font-medium text-black">Auction</span> — Live or online
            </li>
            <li>
              <span className="font-medium text-black">Private party</span> — Another operator selling their rig
            </li>
          </ul>
          <p>
            We&apos;ve been financing tow trucks bought at the Florida Tow Show for years.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-medium text-black">Equipment We Finance</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Types of tow trucks and duty classes we finance
              </caption>
              <thead>
                <tr className="border-b border-zinc-200">
                  <th scope="col" className="py-4 pr-4 font-semibold text-black">
                    Type
                  </th>
                  <th scope="col" className="py-4 font-semibold text-black">
                    Duty Class
                  </th>
                </tr>
              </thead>
              <tbody className="text-base text-zinc-600">
                <tr className="border-b border-zinc-200">
                  <td className="py-4 pr-4 font-medium text-black">Wreckers</td>
                  <td className="py-4">Light, Medium, Heavy</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="py-4 pr-4 font-medium text-black">Rollbacks</td>
                  <td className="py-4">Light, Medium, Heavy</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="py-4 pr-4 font-medium text-black">Flatbeds</td>
                  <td className="py-4">Light, Medium, Heavy</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="py-4 pr-4 font-medium text-black">Rotators</td>
                  <td className="py-4">Heavy</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            New truck financing. Used tow truck financing. Wrecker financing. Rollback financing. Rotator financing.
          </p>
          <p className="mt-2 font-medium text-black">
            If it tows, we finance it.
          </p>
        </div>
      </Container>
    </section>
  );
}
