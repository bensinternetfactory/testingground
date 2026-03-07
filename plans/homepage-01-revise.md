Location: homepage-01
Section: Brand Marquee (New Section) 
This section should be located underneath the Program cards. We are using this to break up space visually

Background: White or very light neutral

Objective

Create a horizontal logo marquee (ticker-style banner) that communicates:

“We finance all major brands.”

This section should subtly reinforce trust and scale by showcasing recognizable equipment manufacturers.

Layout + Structure

Full-width section

Horizontally scrolling row of brand logos

Logos move continuously from right to left

Slow, smooth motion (not distracting)

Seamless infinite loop (no visible jump or reset)

No visible scrollbars

Place a short headline above the marquee:

Headline:
“We finance all major brands”

Optional subtext (if needed):
“Flexible programs for leading manufacturers”

Animation Behavior

Continuous linear animation

Duration: slow (20–40 seconds per full loop)

No easing (linear for natural ticker effect)

Should loop seamlessly (duplicate logo set to avoid snapping)

Pause animation on hover (desktop only)

Respect prefers-reduced-motion (disable animation if user preference is set)

Logo Styling

Logos should:

Be equal height (consistent visual rhythm)

Maintain original brand proportions

Use grayscale by default

Fade to full color on hover (optional but preferred)

Spacing between logos should feel generous and premium

No borders or cards around logos (clean strip aesthetic)

Mobile Behavior

Marquee should remain animated on mobile

Speed slightly slower on mobile if needed

Ensure logos are large enough to be legible but not oversized

No manual scrolling — this is auto-moving

Implementation Guidelines (Tailwind / CSS)

Use flex row with whitespace-nowrap

Duplicate logo array for seamless infinite scroll

Use keyframe animation for translateX

Hide overflow on container

Consider masking gradient edges (left and right fade) for a polished effect

Performance optimized (transform-based animation)

Acceptance Criteria

✅ Infinite seamless loop

✅ Smooth, slow animation

✅ No jump when restarting

✅ Pauses on hover (desktop)

✅ Honors reduced motion preferences

✅ Looks premium and clean

✅ Fully responsive