"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Calculate time left from target date
function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - Date.now();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

// SSR-safe hydration detection
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );
  const isClient = useIsClient();

  useEffect(() => {
    const tick = () => {
      setTimeLeft(calculateTimeLeft(targetDate));
    };

    tick();
    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isClient };
}

const CheckIcon = () => (
  <svg
    className="h-5 w-5 text-green-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

// Hoist static countdown items outside component
const countdownLabels = ["Days", "Hours", "Min", "Sec"] as const;

// April 9, 2026 - hoisted outside component for stable reference
const showDate = new Date("2026-04-09T09:00:00");

export function CTASection() {
  const { timeLeft, isClient } = useCountdown(showDate);

  const countdownValues = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-800 py-20 md:py-28">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Countdown */}
        <div className="mb-10" aria-label="Countdown to Florida Tow Show">
          <p className="mb-4 text-lg font-medium text-cyan-300">
            The Show Starts In
          </p>
          <div
            className="flex justify-center gap-4"
            role="timer"
            aria-live={isClient ? "polite" : undefined}
            aria-atomic="true"
          >
            {countdownLabels.map((label, index) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm md:px-6 md:py-4"
              >
                <span
                  className="text-2xl font-bold text-white md:text-4xl"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {String(countdownValues[index]).padStart(2, "0")}
                </span>
                <span className="text-xs text-cyan-200 md:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl [text-wrap:balance]">
          The Show Is April&nbsp;9-11.
          <br />
          <span className="text-amber-400">Get Your Number Now.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-blue-100">
          Don&apos;t walk the Florida Tow Show wondering if you can afford what
          you&apos;re looking at. Get pre-approved. Know your budget. Negotiate
          from strength. Close deals others can&apos;t.
        </p>

        {/* Offer badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="rounded-lg bg-white/10 px-6 py-3 text-lg font-bold text-white backdrop-blur-sm">
            $0&nbsp;Down
          </div>
          <div className="rounded-lg bg-white/10 px-6 py-3 text-lg font-bold text-white backdrop-blur-sm">
            No Payments for 180&nbsp;Days
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <a
            href="#"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-5 text-xl font-bold text-white shadow-xl shadow-orange-500/30 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <span className="relative z-10">
              Get Pre-Approved for the Florida Tow Show
            </span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
              aria-hidden="true"
            />
            {/* Pulse effect - respects reduced motion */}
            <span className="absolute inset-0 rounded-full motion-reduce:hidden" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-orange-400 opacity-20" />
            </span>
          </a>
        </div>

        {/* Trust indicators */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>5-minute application</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>Same-day decisions</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>No obligation until you buy</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
