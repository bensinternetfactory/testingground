"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#101820]">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-4 px-6 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#22C55E]">
            Something went wrong
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            We hit an unexpected error.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#545454]">
            Try reloading the page. If the issue continues, call us at (888)
            555-0199.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white"
          >
            Try again
          </button>
          {error.digest ? (
            <p className="text-xs text-[#7A7A7A]">Error ID: {error.digest}</p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
