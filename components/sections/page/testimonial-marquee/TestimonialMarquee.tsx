"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ROW_1, ROW_2, type TestimonialReview } from "./config";
import "./testimonial-marquee.css";

/* ------------------------------------------------------------------ */
/*  Inline SVGs                                                        */
/* ------------------------------------------------------------------ */

function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#FACC15"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="inline-block shrink-0"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.5 14.5 0 010-9.18l-7.98-6.19a24.08 24.08 0 000 21.56l7.98-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Review Card                                                        */
/* ------------------------------------------------------------------ */

function ReviewCard({
  review,
  isExpanded,
  onToggle,
  isClone = false,
}: {
  review: TestimonialReview;
  isExpanded: boolean;
  onToggle: () => void;
  isClone?: boolean;
}) {
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isClone) return;

    const updateClamp = () => {
      setIsClamped(el.scrollHeight > el.clientHeight + 1);
    };

    updateClamp();

    const resizeObserver = new ResizeObserver(updateClamp);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateClamp);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateClamp);
    };
  }, [isClone, review.body, review.title]);

  return (
    <article className="w-80 shrink-0 rounded-xl border border-gray-200 bg-white p-5">
      {/* Stars */}
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} size={16} />
        ))}
      </div>
      <span className="sr-only">5 out of 5 stars</span>

      {/* Title */}
      <p className="mt-2 text-sm font-bold text-[#101820] line-clamp-1">
        {review.title}
      </p>

      {/* Body */}
      <div className="relative mt-1.5 h-[4.5rem]">
        <p
          ref={bodyRef}
          className={`text-sm leading-snug text-[#545454] whitespace-pre-line ${
            isExpanded
              ? "overflow-y-auto h-full"
              : "line-clamp-3"
          }`}
          style={isExpanded ? { maxHeight: "4.5rem" } : undefined}
        >
          {review.body}
        </p>
        {/* Gradient fade when collapsed and clamped */}
        {!isClone && !isExpanded && isClamped && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      {/* Read more / Read less */}
      {!isClone && isClamped && (
        <button
          onClick={onToggle}
          tabIndex={-1}
          className="mt-1 text-xs font-medium text-[#22C55E] hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
          aria-label={
            isExpanded
              ? `Collapse review by ${review.author}`
              : `Read full review by ${review.author}`
          }
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}

      {/* Footer */}
      <div className="mt-3 flex min-w-0 items-center gap-1.5 text-sm text-[#545454]">
        <span className="min-w-0 flex-1 truncate font-medium text-[#101820]">
          {review.author}
        </span>
        <span aria-hidden="true">&middot;</span>
        <GoogleIcon />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function TestimonialMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isPaused = isHovered || expandedId !== null;

  // IntersectionObserver — toggle marquee-visible class (no position reset)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Apply marquee-visible class to tracks based on visibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tracks = container.querySelectorAll(".testimonial-track");
    tracks.forEach((track) => {
      if (isVisible) {
        track.classList.add("marquee-visible");
      } else {
        track.classList.remove("marquee-visible");
      }
    });
  }, [isVisible]);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const renderRow = (reviews: TestimonialReview[]) =>
    reviews.map((review) => (
      <ReviewCard
        key={review.id}
        review={review}
        isExpanded={expandedId === review.id}
        onToggle={() => handleToggle(review.id)}
      />
    ));

  const renderClones = (reviews: TestimonialReview[]) => (
    <div aria-hidden="true" className="pointer-events-none contents">
      {reviews.map((review) => (
        <ReviewCard
          key={`clone-${review.id}`}
          review={review}
          isExpanded={false}
          onToggle={() => {}}
          isClone
        />
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-gray-50 py-20 md:py-28"
    >
      {/* Skip link */}
      <a
        href="#after-testimonials"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#101820] focus:shadow-lg"
      >
        Skip testimonials
      </a>

      {/* Header — constrained */}
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
          Trusted by Tow Operators
        </h2>

        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} size={24} />
            ))}
          </div>
          <span className="text-base font-medium text-[#101820]">
            Rated 5 Stars by Operators
          </span>
        </div>
      </div>

      {/* Marquee container — capped at 1536px */}
      <div
        ref={containerRef}
        className="testimonial-marquee-container mx-auto mt-12 max-w-screen-2xl overflow-hidden"
        data-paused={isPaused ? "true" : "false"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onTouchCancel={() => setIsHovered(false)}
      >
        {/* Row 1: left-to-right */}
        <div className="testimonial-track marquee-row-1 flex w-max gap-6">
          {renderRow(ROW_1)}
          {renderClones(ROW_1)}
        </div>

        {/* Row 2: right-to-left */}
        <div className="testimonial-track marquee-row-2 mt-6 flex w-max gap-6">
          {renderRow(ROW_2)}
          {renderClones(ROW_2)}
        </div>
      </div>

      <span id="after-testimonials" />
    </section>
  );
}
