import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-4 px-6 py-16 text-[#101820]">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#22C55E]">
        Not found
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        That page does not exist.
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-[#545454]">
        The route may have moved, or the URL may be incorrect.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white"
      >
        Go home
      </Link>
    </main>
  );
}
