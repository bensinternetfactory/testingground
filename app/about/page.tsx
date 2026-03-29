import type { Metadata } from "next";
import { MinimalNavPage } from "@/app/_shared/minimal-nav-page/MinimalNavPage";

export const metadata: Metadata = {
  title: "About TowLoans",
  description: "Learn more about TowLoans.",
};

export default function AboutPage() {
  return <MinimalNavPage title="About TowLoans" />;
}
