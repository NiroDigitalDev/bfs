# Spec — chapter-numeral scroll-driven counter-parallax

## Pick

Add per-element scroll-driven counter-parallax to `.chapter-numeral`
on the homepage chapter spreads. The oversized italic-serif folio
glyphs (used six times across the catalogue) currently sit dead —
they only react to `:hover` (`globals.css:1361`). On scroll they
drift counter to the figure, reading as composition instead of
decoration. Awwwards-tier move using CSS `animation-timeline: view()`
(per-element timeline, no JS).

## Files

Single file: `src/app/globals.css`. Insert the new block immediately
AFTER the existing `.chapter:hover .chapter-numeral` rule
(currently at line 1361) so hover-state stroke change retains
priority in source order.

## CSS to add (~20 LOC)

```css
/* Scroll-driven counter-parallax. Each numeral has its own
   per-element view() timeline. Gated on:
   (a) animation-timeline support (@supports — falls back to static),
   (b) prefers-reduced-motion: no-preference,
   (c) min-width: 900px (matches the desktop layout the numerals
       are sized for; small-viewport rules at line ~1352 reposition
       them).
   We animate transform ONLY — stroke-color stays under the existing
   base + hover rules, so :hover continues to brighten the glyph. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) and (min-width: 900px) {
    .chapter-numeral {
      animation: chapter-numeral-drift linear both;
      animation-timeline: view();
      animation-range: entry 0% exit 100%;
    }
    @keyframes chapter-numeral-drift {
      from { transform: translate3d(0, 80px, 0); }
      to   { transform: translate3d(0, -80px, 0); }
    }
  }
}
```

## Why this composition

- **Per-element timeline.** `animation-timeline: view()` binds the
  animation progress to *this element's* viewport position, not the
  document scroll. So each of the six chapter numerals drifts
  relative to its own chapter's entry/exit, not in lock-step.
- **Counter-parallax direction.** `+80px → -80px` over entry→exit:
  numeral starts 80px below its computed position when entering the
  bottom of the viewport, ends 80px above when exiting the top.
  Net 160px traversal independent of (and counter to) the chapter
  figure's natural scroll — the glyph appears to drift slowly
  upward through the column.
- **±80px range is subtle.** Chapters span large vertical real
  estate. 160px traversal at ~viewport-height + element-height
  amounts to a quiet drift, not a stunt.
- **Pure CSS.** No JS. No new component. No new client weight.
- **Existing `--scroll-y` not used.** That var is a *global* scroll
  position. Per-chapter relative parallax requires per-element
  timeline (or IntersectionObserver). Native CSS timeline is the
  right semantic and broadly supported (Chrome 115+, Edge 115+,
  Safari 18+ as of 2026-05). Older browsers fall through @supports
  → static numeral (current behavior). Zero regression.

## Acceptance

- `bun run build` clean.
- `bun run lint` clean.
- `bunx tsc --noEmit` clean (n/a — pure CSS).
- SSR HTML for `/` still contains 6 `.chapter-numeral` spans.
- Net client JS delta: 0 KB.
- CSS delta: ~20 LOC, single block, gated by @supports + @media.
- Reduced-motion: no animation registered (entire block excluded
  by `prefers-reduced-motion: no-preference`).
- Non-supporting browser: numeral renders static as before.
- Mobile (≤ 899px): numeral renders static as before (the
  min-width gate matches the existing repositioning at line 1352).
- `.chapter:hover .chapter-numeral` still brightens the stroke
  on hover (we don't animate stroke-color).
- Lighthouse perf on `/` unchanged ± 1 point.

## Self-rated rubric

T:2 M:3 L:3 I:1 A:2 D:3 = **14 / 18** (Distinctive)

T=2: italic-serif folio glyph reused at full display scale, drift
makes the typography read as composition.
M:3: per-element view() timeline is the current cutting-edge CSS
motion technique — Awwwards-tier.
L:3: six chapter spreads gain compositional rhythm.
I:1: no new interactive affordance; hover stroke still wins.
A:2: gated by reduced-motion + @supports + min-width fallback;
decorative glyph; transform-only so no contrast change.
D:3: scroll-driven animation via native CSS is a distinctive
2026 move — most Next.js sites still hand-roll IO + setState.

## Out of scope

- No new motion primitive component.
- No JS scroll listeners (the existing `<ParallaxRoot/>` is
  unaffected — that's a separate global-scroll mechanism).
- No companion drift on `.chapter-figure` or `.chapter-body` —
  isolate the move to the numeral so the composition reads as
  "the typography drifts" not "everything drifts."
- No stroke-color animation — the existing base + hover rules
  govern that property.

## Follow-ups (if any surface)

- If verification surfaces a perf cost from continuous animation
  evaluation, gate further with `will-change: transform`. (Don't
  add proactively — overuse of `will-change` regresses memory.)
- The auditor also flagged `.hero-aside-line` static scale and
  `.section-tag::before` collision with `.chapter-eyebrow-mark` —
  separate ships.
