The mini-roi section (§4 — "REVENUE PROOF") is an interactive single-slider calculator designed to answer one question: "Will
   this truck pay for itself?"

  Intent: Reduce financial anxiety and build conversion momentum by letting visitors instantly see how few tows it takes to
  cover a monthly truck payment — before they commit to the full calculator.

  How it works:
  - Visitor adjusts a slider for their per-tow rate ($100–$500)
  - Real-time output shows: monthly payment, breakeven tows needed, monthly/annual profit
  - A progress bar visualizes how easy breakeven is relative to available monthly calls (3/day × 22 days)
  - CTA passes the chosen revenue value to the full calculator (/tow-truck-calculator?rev={value})

  Strategic placement: It sits after testimonials (social proof) and before the resource hub, acting as a "proof bridge" —
  converting trust into tangible financial confidence before the deeper calculator tool.

## MiniROI Polish Prompt Spec (Decision-Complete)

### Summary

Polish MiniROI with production-safe UX, touch behavior, accessibility, and an editable monthly payment.
Behavior, edge cases, and verification are locked so implementation is deterministic.

### Implementation Changes

1. **Visual and layout direction**
   - Remove heading green accent split treatment — render full headline in dark (`text-[#101820]`).
   - Remove light green section background (`bg-[#F0FDF4]`) — use `bg-white`.
   - Metric card backgrounds change from `bg-[#F0FDF4]` to `bg-gray-50` for accessible contrast against white.
   - Keep green as a functional/state color where meaningful (progress bar fill, success states), not decorative.
   - Config shape unchanged — render `{config.headline.base} {config.headline.accent}` concatenated in one dark element.
   - Preserve section structure, content hierarchy, and 2xl containment classes.

2. **Slider and interaction model**
   - Use native `input[type="range"]` + Framer Motion shell for micro-feedback.
   - Slider value display: `motion.p` with `key={revenuePerTow}` for subtle fade animation on value change.
   - Add `touch-action-manipulation` class on the slider wrapper div.
   - Gate all animations behind `useReducedMotion()` — when true, skip `initial`/`animate` props.
   - `onChange` updates state live; `onMouseUp`/`onTouchEnd` mark the "committed" value (for future analytics).

3. **Editable monthly payment behavior**
   - Monthly payment starts at $1,200 default (`knowsPayment: true`, `manualPayment: 1200`).
   - The $1,200 is a flat default — MiniROI does NOT compute amortization. The user provides their payment.
   - Editable via inline swap-to-input: clicking the payment display opens a text input.
   - Input parsing: lenient sanitize (`$`, commas, spaces stripped), `parseFloat`, clamp to $30–$5,000.
   - Commit on blur or Enter. Escape cancels without committing.
   - Manual payment is authoritative for all MiniROI outputs once set; slider changes preserve manual mode.
   - Explicit reset control: "Use estimated payment" button (visible only in manual mode).
   - Reset switches to `knowsPayment: false`, and `computeResults` uses its amortization formula with config assumptions.

4. **Weak-state handling**
   - When `breakevenCalls > monthlyCalls`: switch to amber warning treatment.
   - Progress bar: track `bg-amber-100`, fill `bg-amber-400` (instead of green).
   - Label: `text-amber-600` with copy "Not covering payment yet — {N} tows needed" (instead of "{N} tows cover your payment").
   - Handle `Infinity` from `computeResults` (when net revenue per call ≤ 0) — treat as weak state.

5. **CTA and routing**
   - Replace bare `<Link>` with shared `RippleCtaLink` component.
   - Pass `section="mini-roi"` for future analytics wiring.
   - CTA query handoff:
     - Manual mode (default): `?rev={value}&known=true&pmt={manualPayment}`
     - Estimated mode (after reset): `?rev={value}`
   - Pass the current arrow SVG as the `icon` prop with `iconPosition="end"`.

6. **Analytics — deferred**
   - No analytics implementation in this phase.
   - Document planned events in component CLAUDE.md for future implementation:
     - `slider_commit` (value)
     - `payment_commit` (value, modality: blur|enter)
     - `payment_reset`
     - `cta_click` (revenuePerTow, paymentMode, paymentValue)
   - RippleCtaLink's `onAnalyticsEvent` prop is available when ready.

### Architecture

**Files to create:**

| File | Purpose |
|---|---|
| `mini-roi/PaymentField.tsx` | Client component — inline swap-to-input for monthly payment editing. Owns draft state, parse/clamp logic, commit/cancel/reset interactions. |

**Files to modify:**

| File | Changes |
|---|---|
| `mini-roi/MiniROI.tsx` | White bg, dark heading, gray-50 cards, new state model (revenuePerTow + paymentState), Framer Motion slider display, PaymentField composition, weak-state conditionals, RippleCtaLink CTA |
| `mini-roi/CLAUDE.md` | Update to reflect new sub-components, state model, deferred analytics plan |

**Files unchanged:**

| File | Reason |
|---|---|
| `mini-roi/config.ts` | Public API stable — no type changes |
| `mini-roi/index.ts` | Barrel export unchanged |
| `calculator-data.ts` | Already supports `knowsPayment` + `manualPayment` |

### Component State Design

```ts
// MiniROI.tsx
const [revenuePerTow, setRevenuePerTow] = useState(config.slider.defaultValue);
const [isManual, setIsManual] = useState(true);       // starts in manual mode
const [manualPmt, setManualPmt] = useState(1200);      // flat default

// Derived
const inputs: CalculatorInputs = {
  ...DEFAULTS,
  ...config.assumptions,
  revenuePerTow,
  knowsPayment: isManual,
  manualPayment: manualPmt,
};
const r = computeResults(inputs);
const isWeak = r.breakevenCalls > r.monthlyCalls;
const ctaHref = isManual
  ? `${config.cta.basePath}?rev=${revenuePerTow}&known=true&pmt=${manualPmt}`
  : `${config.cta.basePath}?rev=${revenuePerTow}`;
```

```ts
// PaymentField.tsx — internal state
const [editing, setEditing] = useState(false);
const [draft, setDraft] = useState("");
```

### PaymentField Component

**Props:**
```ts
interface PaymentFieldProps {
  value: number;                    // committed payment value
  isManual: boolean;                // whether user has overridden
  onCommit: (value: number) => void;
  onReset: () => void;
}
```

**Display mode:** `motion.span` with `key={value}`, dashed underline to signal editability, `role="button"` + `tabIndex={0}` for keyboard access. Click or Enter/Space opens edit mode.

**Edit mode:** `<input type="text" inputMode="decimal">` with auto-focus via `useEffect` + ref. Commit on blur/Enter, cancel on Escape.

**Parse logic:** Strip `$`, commas, spaces → `parseFloat` → clamp `[30, 5000]` → fall back to prior value if `NaN`.

**Reset button:** "Use estimated payment" — visible only when `isManual === true`. Calls `onReset`.

### Public Interfaces / Types
- No breaking changes to exported `MiniROIConfig`.
- Config `headline.base` and `headline.accent` still exist — rendered concatenated in dark text.
- Query contract extension in CTA URL: `known` + `pmt` alongside existing `rev`.

### Test Plan and Acceptance Matrix

1. **Interaction correctness**
   - Slider works with mouse, touch, keyboard; value updates are smooth and bounded.
   - Payment inline edit: click opens input, blur/Enter commits, Escape cancels.
   - Payment parsing: "$1,500" → 1500, "abc" → no change, "50000" → 5000 (clamped), "10" → 30 (clamped).
   - Reduced motion disables non-essential animation while preserving usability.

2. **Outcome/state correctness**
   - Derived metrics recompute correctly in manual mode and estimated mode.
   - Weak-state amber treatment triggers only when `breakevenCalls > monthlyCalls`.
   - Weak-state handles `Infinity` gracefully (shows amber, not broken UI).
   - Slider changes preserve manual payment mode (don't reset to estimated).

3. **Integration correctness**
   - CTA uses RippleCtaLink with correct query params for both manual/estimated states.
   - Manual mode default: href includes `rev`, `known=true`, `pmt`.
   - After reset to estimated: href includes only `rev`.

4. **Quality gates**
   - `npm run lint` passes.
   - `npm run build` passes.
   - 2xl containment classes preserved on section element.

### Build Sequence

1. **PaymentField.tsx** — Create the inline edit component with display/edit modes, parse/clamp, commit/cancel/reset.
2. **MiniROI.tsx — Visual cleanup** — White bg, dark heading, gray-50 metric cards.
3. **MiniROI.tsx — State model** — Add `isManual`, `manualPmt` state. Wire `inputs` to use `knowsPayment`/`manualPayment`. Compute `isWeak` and `ctaHref`.
4. **MiniROI.tsx — PaymentField integration** — Replace static payment text with `<PaymentField>`, wire callbacks.
5. **MiniROI.tsx — Weak-state treatment** — Conditional amber classes and copy on progress bar.
6. **MiniROI.tsx — Framer Motion** — `motion.p` on slider value display, `touch-action-manipulation`, `useReducedMotion` gating.
7. **MiniROI.tsx — CTA replacement** — Swap bare `<Link>` for `RippleCtaLink` with computed href and icon.
8. **CLAUDE.md update** — Document new architecture, PaymentField, state model, deferred analytics.
9. **Quality gates** — `npm run lint`, `npm run build`, manual verification.

### Assumptions and Defaults Locked

- Tone: trust-first realism.
- Motion: micro-feedback only (Framer Motion `motion.p` key animation, reduced-motion parity).
- Edit UX: inline swap field in PaymentField component.
- Payment default: $1,200 flat (not computed from amortization).
- Payment bounds: $30–$5,000.
- Manual mode persists until explicit reset.
- Section uses white bg with functional green accents only (no decorative green heading/background).
- Analytics deferred — document planned events in CLAUDE.md for future implementation.
