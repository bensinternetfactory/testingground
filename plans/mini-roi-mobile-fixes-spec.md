# MiniROI Mobile Fixes Spec

## Summary
Implement focused MiniROI polish updates after recent iteration work:
- Prevent mobile browser zoom when editing monthly payment.
- Ensure the payment underline never visually extends beyond the payment text.
- Improve edit affordances for tow rate with desktop pointer behavior and persistent icon visibility plus subtle mobile indication.
- Update disclaimer copy to clearly position this as an estimate step before full truck profit/loss buildout.

## Implementation Details

### PaymentField UX
- Keep inline-edit model and existing commit/cancel behavior.
- Expand tap target around display-mode payment text (mobile-friendly hit area).
- Use a mobile-safe input text size (`>= 16px`) while preserving overall visual style.
- Hide display underline in edit mode; show underline only in display mode.
- Constrain underline width to payment text content width (no container-width extension).
- Keep `Use estimated payment` reset copy unchanged.

### TowRateField UX
- Desktop: interactive tow-rate control shows pointer cursor.
- Desktop: pencil icon remains visible in non-edit mode.
- Mobile: keep subtle pencil indicator (faint mini icon) for editability hint.
- Preserve current inline edit form behavior and value parsing rules.

### Disclaimer Copy
- Replace prior long-form cautionary estimate text with:
  - `Estimates only. Click through to create a full truck profit and loss statement.`
- Keep disclaimer as plain text (no inline link), with CTA remaining the primary click-through path.

## Public Interfaces
- No prop signature changes required for `MiniROI`, `PaymentField`, or `TowRateField`.
- `MiniROIConfig.disclaimer` is updated as content-only config change.

## Acceptance Criteria
- On iPhone/Android-sized viewports, tapping monthly payment input does not trigger focus zoom.
- Display-mode payment underline matches text width and does not overshoot.
- Edit mode removes the display underline artifact.
- Desktop tow-rate control shows pointer cursor.
- Tow-rate pencil icon is clearly visible on desktop and subtle on mobile.
- Disclaimer renders exact updated copy and CTA behavior remains unchanged.

## Validation Gate
Run in this order as final checks:
1. `npm run lint`
2. `npm run build`
3. Playwright MCP validation for mobile + desktop interaction checks
4. Chrome DevTools MCP validation for runtime quality (console/network/errors)
