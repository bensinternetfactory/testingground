"use client";

import Link from "next/link";

export default function ResourcesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-5 px-6 py-16 text-[#101820]">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#22C55E]">
        Something went wrong
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        We could not load this resource.
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-[#545454]">
        An unexpected error occurred while loading this resource. Try
        refreshing, or return to the homepage.
      </p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-sm font-medium text-[#111111] underline underline-offset-4"
        >
          Go home
        </Link>
      </div>
      {error.digest ? (
        <p className="text-xs text-[#7A7A7A]">Error ID: {error.digest}</p>
      ) : null}
    </main>
  );
}
