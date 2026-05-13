# Spec — press-clipping-register

Replace the press section's logo-cloud row (five center-flexed Inter-900
uppercase fake publication names with a translateY hover lift) with a
hairline-divided clipping-book register: each entry is a structured
citation with an italic-serif Roman numeral, italic-serif publication
name, and italic-serif "Vol. / № / p." marginalia in oldstyle numerals.
Drops the template logo-cloud pattern — the loudest "not BFS" tell still
left on the homepage's cold half.

## Surface
`src/app/page.tsx` — the `<section className="press">` block, lines
521-549 of the current file (the five `.press-item` spans and their
parent `.press-grid`).
`src/app/globals.css` — replace the `.press-grid` + `.press-item` +
`.press-item:hover` rules (lines ~2216-2236). `.press`, `.press-eyebrow`,
and `.press-disclaimer` remain unchanged in this ship (the disclaimer's
contrast lift is a separate backlog item).

## Composition

### Markup (page.tsx)

Replace the inline string array + `.map(p => <span>)` with a typed local
array of citation objects, then render an `<ol className="press-register">`.

```tsx
const citations = [
  { roman: "I",   name: "Apollo Off-Hours",     vol: "Vol. XI",  issue: "№ 3", page: "p. 42" },
  { roman: "II",  name: "The Reinhardt Review", vol: "Vol. IV",  issue: "№ 11", page: "p. 7"  },
  { roman: "III", name: "Vantablack Vogue",     vol: "Vol. VII", issue: "№ 1", page: "p. 28" },
  { roman: "IV",  name: "Outrenoir Quarterly",  vol: "Vol. II",  issue: "№ 6", page: "p. 14" },
  { roman: "V",   name: "Pen World*",           vol: "Vol. IX",  issue: "№ 2", page: "p. 31" },
] as const;
```

```tsx
<Reveal delay="0.15s">
  <ol className="press-register">
    {citations.map((c, i) => (
      <li className="press-clipping" key={c.name}>
        <span className="press-clipping-num" aria-hidden>{c.roman}.</span>
        <span className="press-clipping-name">{c.name}</span>
        <span className="press-clipping-meta" aria-hidden>
          {c.vol} · {c.issue} · {c.page}
        </span>
      </li>
    ))}
  </ol>
</Reveal>
```

The `aria-hidden` on numeral + marginalia keeps the screen-reader
register clean — AT users hear the five publication names as an ordered
list, with the `<ol>` providing implicit enumeration.

### Layout (globals.css — new block replaces ~lines 2216-2236)

Two register modes:

1. **Desktop (≥ 720px)** — five horizontally-divided cells in a grid
   of `grid-template-columns: repeat(5, 1fr)` inside the existing
   `max-width: 1100px` container. Each `.press-clipping` is a
   `display: grid; grid-template-rows: auto auto auto; row-gap: 6px;
   padding: 28px 18px;` cell. Hairline vertical rules between cells via
   `border-left: 1px solid var(--color-line);` on every cell except the
   first.
2. **Mobile (< 720px)** — fall through to a single column. The vertical
   rules collapse to a single horizontal hairline between rows
   (`border-top: 1px solid var(--color-line);` on every cell except the
   first; reset `border-left` to none).

The whole register also carries a hairline `border-top` and `border-bottom`
(`1px solid var(--color-line)`) on the parent `<ol>` to seal it visually
as a clipping-sheet rather than a row of pills.

### Typography

- `.press-clipping-num` — `font-family: var(--font-serif); font-style:
  italic; font-size: clamp(18px, 2vw, 28px); color: rgba(255,255,255,0.55);
  font-variant-numeric: oldstyle-nums;`. Centered (or left-aligned —
  centered for now to maintain a vertical axis through the cell).
- `.press-clipping-name` — `font-family: var(--font-serif); font-style:
  italic; font-weight: 400; font-size: clamp(16px, 1.7vw, 22px); color:
  rgba(255,255,255,0.78); line-height: 1.25; letter-spacing: -0.005em;`.
  Centered. NOT uppercase (drops the Inter-900 uppercase register
  entirely).
- `.press-clipping-meta` — `font-family: var(--font-serif); font-style:
  italic; font-size: 11px; color: rgba(255,255,255,0.32); letter-spacing:
  0.04em; font-variant-numeric: oldstyle-nums;`. Centered. Smaller, dim.

### Micro-interactions (the load-bearing replacement for the lift hover)

`.press-clipping`:
- Default: name at 0.78 alpha, numeral at 0.55, meta at 0.32. Cell
  border-left at `var(--color-line)` (#1c1c1c).
- `:hover`: name → 1.0 alpha; numeral → 0.78; meta → 0.55. Cell
  border-left → `var(--color-line-2)` (#2a2a2a). All four transitions
  use `var(--dur-2) var(--ease-out-quart)`.
- `:focus-within` mirrors `:hover` for keyboard parity.
- A 1px hairline draws in along the bottom of the cell on hover/focus
  via `::after { content: ""; position: absolute; left: 0; right: 0;
  bottom: -1px; height: 1px; background: rgba(255,255,255,0.55);
  transform-origin: left; transform: scaleX(0); transition: transform
  var(--dur-2) var(--ease-out-quart); }`. `:hover::after, :focus-within::after
  { transform: scaleX(1); }`. The cell needs `position: relative;` and
  `overflow: hidden;` is NOT applied (the underline draws below the
  bottom border).
- `prefers-reduced-motion: reduce` — strip the transform-scale draw-in
  and collapse to instant color swap; keep the opacity transitions
  instant. Already established pattern (see chapter-rail reduced-motion).

### A11y

- The numeral and meta line are decorative (`aria-hidden`) — the `<ol>`
  itself enumerates and the publication name is the meaningful content.
- The `<ol>` exposes a five-item ordered list to AT — "Press · selected
  mentions" eyebrow remains as the list's labeling context (no
  `aria-labelledby` needed since `.press-eyebrow` precedes it visually
  and semantically).
- No interactive children — clippings are not links in this ship (no
  destinations to link to; the publications are fictional). Keyboard
  focus is therefore not directly relevant on `.press-clipping`, but
  `:focus-within` still mirrors `:hover` to handle any future link
  insertion.
- Contrast: name at 0.78 alpha over `#050505` ≈ 11.2:1 — comfortably AA.
  Numeral at 0.55 ≈ 6.5:1 — AA. Meta at 0.32 ≈ 2.5:1 — decorative-only
  (aria-hidden), so the WCAG decorative exemption applies (same rule
  the existing `.chapter-rail` opacities ride on).

### Motion

- Existing `<Reveal delay="0.15s">` wraps the whole `<ol>` (already
  present). No additional reveal stagger per cell — keeps the section
  compact and not over-staggered.
- Hover micro-interactions per above; no other motion.
- `prefers-reduced-motion: reduce` collapses the underline-draw to
  instant.

### Acceptance criteria

- `bun run build` passes; `/` prerenders.
- The press section SSR HTML contains `<ol class="press-register">`
  with exactly 5 `<li class="press-clipping">` children, each containing
  three `<span>`s (`press-clipping-num`, `press-clipping-name`,
  `press-clipping-meta`).
- The publication names rendered are: "Apollo Off-Hours", "The
  Reinhardt Review", "Vantablack Vogue", "Outrenoir Quarterly",
  "Pen World*" — unchanged from current.
- No `.press-grid` or `.press-item` rule remains in `globals.css`
  (they're fully replaced).
- The strip is keyboard-navigable in the sense that focus passes over
  it without trapping — there are no new focusable elements added.
- Reduced-motion: no underline draw-in transform; instant color swap on
  hover.
- Lighthouse a11y on `/` does NOT regress (was 100 last measured;
  must remain ≥ 95).
- No new client JS — the section remains a Server Component. Net
  client-JS delta = 0 bytes.

## Primitives reused
`<Reveal>` (existing wrapper, unchanged usage); existing tokens
`--color-line`, `--color-line-2`, `--color-fog`, `--font-serif`,
`--dur-2`, `--ease-out-quart`. No new tokens, no new components, no
new dependencies.

## Out of scope
- The `.press-disclaimer` contrast lift (already in backlog as
  `press-disclaimer-aa-bump`).
- Making the citations clickable to real URLs (the publications are
  fictional; out of scope until BFS has real press to cite).
- The press-eyebrow copy.
- Any change to the `Reveal` stagger.

## Self-rated rubric
T 3 · M 1 · L 3 · I 2 · A 3 · D 3 = 15 / 18 (Awwwards-grade band — the
move retires the loudest template-residue surface on the homepage
without expanding scope into a redesign).

## Risk hint
`low`.
- Scoped to one section in `page.tsx` and one CSS block in `globals.css`.
- No shared primitives modified.
- No new client deps, no new fonts, no new tokens.
- Net delta ≤ 150 LOC.
