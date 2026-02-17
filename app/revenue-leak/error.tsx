"use client";

export default function RevenueLeakError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <h2 className="text-2xl font-medium text-[#111111]">
        Something went wrong
      </h2>
      <p className="text-[#545454]">
        We hit an unexpected error loading this page.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-[#111111] px-6 py-3 text-sm font-medium text-white hover:bg-[#333]"
      >
        Try again
      </button>
    </div>
  );
}
