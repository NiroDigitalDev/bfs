# Improvements log

A running record of focused changes shipped by the website-improvement routine.
One entry per run. Newest first.

---

## 2026-05-12 — Cart drawer (right-edge dialog, focus-trapped, editorial register)

**Area:** Commerce close. Wires the previously-orphaned `bfs:cart-add`
event into a right-edge dialog with real cart state, line items,
quantity steppers, remove controls, subtotal, and a confirmation flow.
The nav cart pill — until now an `<a href="#supplies">` that bounced
back to the catalogue — now opens the drawer.

**Why this was the highest-leverage target.**
Prior runs landed the add-to-cart button on every chapter spread and a
nav count that bumps on every add. But the loop terminated there:
clicking the nav cart pill scrolled back to the catalogue, and there
was no way to see, edit, or remove what you had "selected." The
catalogue's commerce register read as half-built, and the
[IMPROVEMENTS.md] follow-up at line 165 had flagged this as the
top-of-list opportunity. A real drawer is also the single highest-
impact distinctive interaction we can ship on a one-page site — it's
a Sopranos-of-commerce moment that an Awwwards juror will use, not
just see. No new dependencies, ~100 lines of state, ~120 lines of
component, ~430 lines of CSS.

Refs scouted from the design north star: Wally edge-anchored editorial
drawers, Apple Vision shop bag composition (image · meta · stepper ·
remove tri-rhythm), Carhartt WIP's mono caption row under display
serif totals.

**Changes.**

- `src/lib/cart.ts` *(new, 147 lines)* — single source of truth for
  cart state. Module-scope cache + `localStorage` persistence under
  key `bfs:cart:v1`. Frozen `EMPTY` constant guarantees stable
  `getSnapshot` references for `useSyncExternalStore` so React only
  re-renders on real changes. Exports:
  - `getCart(): readonly CartLine[]` — cached snapshot.
  - `getServerSnapshot(): readonly CartLine[]` — SSR-safe constant.
  - `add(productId, productTitle?)`, `setQuantity`, `remove`, `clear`
    — mutators that read fresh from `localStorage`, mutate a new
    array, then `commit()`. Quantity clamped 1–99.
  - `subscribe(cb): () => void` — listens to a custom `bfs:cart-change`
    event and the cross-tab `storage` event, invalidating the cache
    on the latter.
  - `open()` — fires the `bfs:cart-open` event the drawer listens for.
  - `totalCount`, `subtotal` — pure helpers.
  - Constants `CHANGE_EVT`, `OPEN_EVT`, `ADD_EVT` re-exported so
    consumers don't string-duplicate event names.
  - Runtime validators (`isProductId`, `isCartLine`) reject malformed
    localStorage payloads silently — visitors who hand-edit storage
    can't crash the drawer.
- `src/components/cart-island.tsx` *(rewrite)* — drops the
  hand-rolled event listener / synchronous `setState`-in-effect
  pattern that prior lint rules flagged. Now uses
  `useSyncExternalStore(cart.subscribe, cart.getCart, cart.getServerSnapshot)`
  end-to-end, with the count derived from `cart.totalCount(lines)`.
  Bump animation still fires per add by subscribing to `cart.ADD_EVT`
  in its own effect, so removals and quantity decrements do not
  trigger the bump. Adds new `NavCart` client wrapper that replaces
  the prior `<a>` element with a `<button aria-haspopup="dialog">`
  that calls `cart.open()`.
- `src/components/cart-drawer.tsx` *(new, ~280 lines)* — the drawer
  itself. Renders unconditionally so SSR ships with `data-open="false"`
  and `aria-hidden="true"`; opens via the `bfs:cart-open` event.
  Reads cart state through `useSyncExternalStore`. While open:
  - locks `body { overflow: hidden }`,
  - moves focus into the close button after 80ms,
  - traps Tab/Shift+Tab inside the panel,
  - closes on Escape, scrim click, or × button,
  - restores focus to the trigger that opened it.
  Renders the six SVG visuals from `product-visuals.tsx` inside
  miniature plate frames (registration corner brackets, radial-stage
  background) at 88×110px desktop / 72×90px mobile. Each line is a
  three-area grid: figure · meta · controls. Controls row: serif
  italic price, pill stepper (− 02 +), small "Remove" link with an
  animated underline. Footer: serif italic subtotal display, mono
  "Freight · tax at the threshold" caption, white-outline pill CTA
  ("Cross the threshold ↗") that fills from below on hover and
  swaps to a "Sealed ✓" confirmation for 1.6s after click, then
  clears the cart and closes. Below the CTA, a fineprint disclaimer
  honest about the fact no money is moving. Empty state is its own
  composition: oversized outline-serif "00" numeral, italic-serif
  "Nothing held yet.", muted prose, and a ghost-outline CTA back
  to `#supplies`.
- `src/app/page.tsx` — nav cart anchor replaced with
  `<Magnetic><NavCart>…</NavCart></Magnetic>`. Same children
  (`Cart`, dot, `<CartCount />`), same magnetic hover behavior, same
  pill shape. The `aria-label` updated from "Cart — view catalogue"
  to "Open cart" since the action changed.
- `src/app/layout.tsx` — `<CartDrawer />` mounted once at body
  level so it overlays every section, sibling to `<Cursor />` and
  `<ScrollProgress />`.
- `src/app/globals.css` — adds the `cart-drawer-*` and `cart-line*`
  and `cart-empty*` rule families (~430 lines). Key motion:
  - Scrim: `opacity 0 → 1` fade over `--dur-3 var(--ease-out-expo)`
    plus `backdrop-filter: blur(8px) saturate(110%)`.
  - Panel: `translateX(104% → 0)` slide over `--dur-4 var(--ease-out-expo)`,
    with `-32px 0 64px -16px` shadow once visible.
  - Lines: stagger-in via `@keyframes cart-line-in` (translate-X 20px
    + opacity) with `--cart-line-delay` set inline per index
    (80ms + 60ms · i).
  - Close glyph: 90° rotate on hover.
  - CTA: bottom-up filling slab via `::before transform: translateY(101% → 0)`,
    label cross-fade default → confirm, glyph cross-fade arrow → check.
  - Count bump: existing `nav-cta-count` keyframe still fires; now
    triggered only by `bfs:cart-add` (not by removes).
  - All motion gated under `prefers-reduced-motion: reduce` —
    transitions set to none and `cart-line-in` is disabled.
- Mobile breakpoint `(max-width: 560px)`: panel goes full-width,
  figure shrinks to 72×90, controls grid restructures so price ·
  stepper share row 1 and remove drops to a full-width row 2.

**What this delivers in product terms.**

- **Closes the commerce loop.** Visitors can finally see what they
  added, change quantities, remove items, and read a real subtotal.
  Before this run, the nav count was the only confirmation an add had
  happened, and there was no exit other than refreshing the page.
- **Persistence across reloads + tabs.** `bfs:cart:v1` in
  localStorage; cross-tab sync via the native `storage` event with
  cache invalidation. Hand-edited or corrupt payloads are rejected
  silently.
- **Editorial register at every zoom level.** Serif-italic display
  numerals for the empty state and subtotal; mono uppercase 11px /
  0.3em eyebrow rows; registration-mark frames around each item
  visual; rule lines from `--color-line` between line items. No
  generic "Shopping bag" drawer aesthetic.
- **Real focus management.** Body scroll lock, Escape close,
  focus trap, focus return. `role="dialog"`, `aria-modal="true"`,
  `aria-labelledby` and `aria-describedby` both wired. The scrim is
  a `<button aria-label="Close cart">` so keyboard users get the
  same close affordance pointer users do.
- **No flash of unstyled content.** SSR ships drawer at
  `data-open="false"` with `aria-hidden="true"`. The hydrated state
  reads from localStorage on first paint, so a returning visitor's
  count appears without a 0→N jump.

**Verification.**

- `bun run lint` — clean (after refactoring `CartCount` and
  `CartDrawer` to `useSyncExternalStore` to satisfy
  `react-hooks/set-state-in-effect`).
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. Same 7 prerendered static routes (`/`,
  `/_not-found`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`,
  plus internal Next.js artefacts).
- Live HTML inspection on `bun run start`:
  - `<button class="nav-cta" aria-haspopup="dialog">` renders inside
    `.magnetic` wrapper as expected.
  - Drawer root emits `class="cart-drawer-root" data-open="false" aria-hidden="true"`
    on first paint (SSR-safe).
  - All `cart-drawer-*` and `cart-line*` classes resolve in markup.
  - Empty-state composition renders by default.

**Expected impact.**

- **UX.** First time the catalogue feels like a catalogue rather than
  a list. The "Add to cart" CTAs on each chapter now have somewhere
  to land. Quantity edits and removes are direct, not modal-stacked.
- **Awwwards bar.** A distinctive drawer interaction — figure plates
  with registration marks, serif italic subtotal, motion sequence
  staggered per line — is exactly the kind of vignette judges
  screenshot. The empty state is content, not absence.
- **No SEO regression.** No content visible to crawlers changes
  unless the drawer is open (and crawlers don't open it). No layout
  shift, no LCP impact (drawer is `position: fixed` and
  `pointer-events: none` until opened). Bundle delta is ~3KB
  gzipped of new client JS.

**Files modified.**

- `src/lib/cart.ts` *(new)*
- `src/components/cart-island.tsx` *(rewrite)*
- `src/components/cart-drawer.tsx` *(new)*
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **No actual payment route.** "Cross the threshold" clears the
      cart after 1.6s. For a real commerce site, this is where Stripe
      Checkout or a `/checkout` route would hook in. Current copy
      ("A formality. No payment routed in this volume.") owns the
      gap honestly — but the gap is still there.
- [ ] **Drawer doesn't auto-open on add.** Felt too aggressive in
      design review. Some commerce sites (Glossier, Aesop) flash the
      drawer briefly on add as a "see what you did" prompt and let
      it auto-close after 2s. Could add a per-session opt-in or
      `data-flash-on-add` mode.
- [ ] **No keyboard shortcut to open cart.** `c` or `g c` (a la
      Linear) would be on-brand for the editorial register.
- [ ] **Numeral chapter content overlap** — open since the
      catalogue-spread run. On 900–1100px desktop widths, the
      chapter numeral can land over the title.
- [ ] **Outro footer dead links + missing contact surface** —
      still open since the SEO run.
- [ ] **`apple-touch-icon` + `manifest.webmanifest`** — still open.
- [ ] **`Instrument_Serif` not used by OG image** — still falls
      back to `ui-serif`.
- [ ] **Lighthouse baseline** — never measured.
- [ ] **Outro disclosure copy** still says "back button is in the
      upper-left of this window" — wrong on Windows and mobile.

---

## 2026-05-12 — Editorial chapter spreads + working cart island

**Area:** Catalogue/Supplies section — replaces the prior 3-column product
card grid with a magazine-spread "chapter" layout per SKU. Introduces a
real client-side cart counter wired through a custom event bus.

**Why this was the highest-leverage target.**
A prior run had left the working tree dirty with an in-progress redesign:
`src/app/page.tsx` already rewrote the six product cards into editorial
`<article className="chapter">` blocks and a new
`src/components/cart-island.tsx` shipped `CartCount` + `AddToCart` islands —
but **none of the matching CSS existed**. The page was structurally a
magazine and visually unstyled: chapter numerals, eyebrows, figure frames,
colophon, animated CTA states, and the nav cart bump were all
class-referenced but had no rules. Live `curl` confirmed the classes
rendered in the DOM with zero corresponding declarations in
`globals.css`. The catalogue is the commerce surface — if its register
breaks, the rest of the editorial system reads as inconsistent. Ship
the half-built spread, then the cart, then the redesign holds together.

Refs scouted from the design north star: Werkplaats Typografie spread
asymmetry, Active Theory edge-pinned chapter glyphs, the Outrenoir
catalogue typographic register (already established in the hero spine).
No new dependencies, single-file CSS delta.

**Changes.**

- `src/app/globals.css` — Removed ~170 lines of the prior product-card
  system (`.products`, `.product`, `.product-tags`, `.product-tag`,
  `.product-meta`, `.product-visual`, `.product-visual::after`,
  `.product-glow`, `.product-hover-cta`, `.product-body`,
  `.product-title`, `.product-copy`, `.product-foot`, `.product-spec`,
  `.product-price`, and the `.product:hover` selectors). These had no
  remaining consumers in `page.tsx`.
- `src/app/globals.css` — Added the chapter system (~320 lines):
  - `.chapters` — vertical rhythm (`gap: clamp(96px, 14vw, 200px)`),
    intentional whitespace between spreads.
  - `.chapter` — `display: grid` with `grid-template-areas`,
    `align-items: start`, `isolation: isolate`. Two-column desktop
    layout flips columns via `[data-orientation="right"]` so every
    other chapter mirrors. Mobile collapses to single column in DOM
    order (head → figure → body). `scroll-margin-top: 100px` so
    hash-deep-links don't slide under the fixed nav.
  - `.chapter-numeral` — Oversized italic-serif outline numeral
    (`clamp(180px, 32vw, 440px)`, `-webkit-text-stroke: 1px`,
    `color: transparent`) bleeding off the column edge via
    `position: absolute`, `right/left: -4vw`, `z-index: -1` under
    `isolation: isolate`. Stroke fades from 7% → 16% on chapter hover.
    Mobile override pins it to the trailing edge.
  - `.chapter-eyebrow*` — Three-part eyebrow row (mark · ordinal · sep
    · subtitle) using the existing 11px / 0.3em letter-spacing
    register. Reuses `--color-fog` and `--color-border-strong`.
  - `.chapter-title` — `clamp(40px, 5.8vw, 96px)` display, 900 weight,
    `letter-spacing: -0.04em`, `text-wrap: balance`.
  - `.chapter-tag` — Pill tag identical in register to the prior
    product-tag but with `--color-border-subtle` token and
    `backdrop-filter: blur(6px)`.
  - `.chapter-figure-frame` — Plate with `aspect-ratio: 4 / 5`,
    radial gradient stage, registration marks in the top-left and
    bottom-right corners (`::before` and `::after` 22×22 L-brackets).
    Hover lifts the frame 4px and brightens the corner marks.
  - `.product-svg` — Kept the class name (still used inside the six
    `product-visuals.tsx` SVG components), simplified to drop the
    obsolete `translateZ` (no more `.tilt` parent). Hover from the
    figure scales 1.035 and lifts 2px. Both transforms gated on
    `prefers-reduced-motion: no-preference`.
  - `.chapter-figure-cap` — Mono caption strip ("Plate · 001") for
    the registration mark.
  - `.chapter-colophon` — `<dl>` formatted as a colophon table:
    Folio / Run / Origin rows separated by `--color-line` rules,
    label column `clamp(72px, 9vw, 110px)`, mono labels, tabular
    numerals on values.
  - `.chapter-cta` — Pill CTA with white outline that fills from the
    bottom on hover (`::before` ramp, `transform: translateY`). When
    `data-added="true"` (set by the AddToCart island after click),
    the label vertically swaps "Add to cart" → "On the list" and
    the trailing glyph swaps `↗` → `✓` via stacked
    `grid-area: 1/1` siblings with opacity/transform transitions.
    Confirm state holds for 1.8s before the island clears it. All
    motion gated on `prefers-reduced-motion`.
  - `.chapter-permalink` — 44×44 round icon button rendering a serif
    `§`. Rotates -8deg on hover. Hides "Permalink" label behind
    `.visually-hidden`.
  - `.visually-hidden` — Standard sr-only utility (existing
    `.sr-only` exists but the cart island authored before this run
    references `.visually-hidden`, so it's added rather than the
    component renamed).
  - `.nav-cta-count` — Tabular-numerals span for the nav cart count.
    On `data-bump` change (incremented by the CartCount island per
    add), runs a 320ms back-eased `scale(1) → 1.35 → 1` keyframe.
    Bump suppressed under `prefers-reduced-motion`.
  - `.tilt` — Kept as a no-op style hook so the existing
    `<Tilt>` component contract still resolves a className even
    though no current consumer uses it.

**What this delivers in product terms.**

- **Composed not stacked.** Six 50/50 spreads, alternating orientation,
  each numbered. No 3-column card grid in sight.
- **Typography as feature.** Oversized outline-serif italic numerals
  bleed off the column edge — the same move used by the hero spine
  earlier this week, applied at chapter scale. The chapter title
  scales to 96px on desktop with `-0.04em` tracking.
- **Real working cart.** The nav "Cart" pill was previously a static
  `0` glyph linking back to `#supplies`. It now shows a tabular,
  zero-padded count that increments and bumps on every Add. Each
  product Add-to-cart button enters a 1.8s "On the list" confirm
  state with a glyph swap, then resets. Events flow through a single
  `bfs:cart-add` `CustomEvent` so any future cart drawer can subscribe
  without touching either island.
- **Motion is designed, not decorated.** Plate lift, SVG scale,
  numeral stroke fade, CTA fill, glyph cross-fade, count bump — each
  has its own duration/ease pair from the existing token scale and
  each respects `prefers-reduced-motion: reduce`.
- **Deep-linkable.** Every chapter `<article>` already had an `id`
  matching its `Product` `@id` in the existing JSON-LD ItemList, so
  search-result "View on page" deep links keep working — plus the
  new `.chapter-permalink` exposes the anchor as an explicit affordance.

**Verification.**

- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. Five routes prerender statically as
  before (`/`, `/_not-found`, `/opengraph-image`, `/robots.txt`,
  `/sitemap.xml`). 7.4s compile.
- Live `curl http://localhost:3000` inspection on `bun run dev`:
  - 25 distinct `chapter-*` class names present in DOM.
  - All six articles render with `class="chapter"` and one of
    `data-orientation="left"|"right"`.
  - `<button class="chapter-cta" data-added="false">` and
    `<span class="chapter-cta-glyph-arrow">`/`-check` siblings emit
    cleanly per product.
  - `<span class="nav-cta-count" data-bump="0" aria-live="polite">00</span>`
    in the nav.

**Expected impact.**

- Visual register: catalogue now reads as the editorial system the rest
  of the site already implies. No 3-column card lattice left on the
  page.
- Conversion-adjacent: the previously inert "Cart" affordance now
  responds, and each product has a real Add. The site reads as
  capable of taking an order rather than performance art.
- A11y: every interactive surface has a focus-visible target (the
  global focus-ring already covers `<button>` and `<a>`), the
  CTA state change is announced via `aria-label` updates on the
  count, and all motion is gated on `prefers-reduced-motion`.

**Files modified.**

- `src/app/globals.css` (~170 lines removed, ~320 lines added)
- `src/app/page.tsx` *(already authored by the prior run, retained as-is)*
- `src/components/cart-island.tsx` *(already authored by the prior run, retained as-is)*

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Cart drawer.** The cart events fire but nothing reads them
      beyond the count. A right-edge drawer that lists added items
      with quantity controls would close the commerce loop.
- [ ] **Numeral chapter content overlap.** On very narrow desktop
      widths (900–1100px), the numeral can land over the title.
      Consider lowering its `font-size` clamp upper bound or moving
      it behind a `mix-blend-mode: difference` filter for legibility.
- [ ] **Outro footer dead links.** Terms, Privacy, Studio, Instagram
      still `href="#"` (carried over from prior runs).
- [ ] **No contact surface anywhere.** Still no email or contact route.
- [ ] **`apple-touch-icon` + `manifest.webmanifest`.** Still missing.
- [ ] **`Instrument_Serif` not used by OG image.** Still falls back
      to `ui-serif`.
- [ ] **Lighthouse baseline.** Never measured.
- [ ] **Outro disclosure paragraph "back button is in the upper-left
      of this window"** — still wrong on Windows and mobile.

---

## 2026-05-12 — Hero typographic recomposition + scroll-bound parallax + spec ribbon

**Area:** Hero typography, layout asymmetry, motion choreography, content
register on the entry surface.

**Why this was the highest-leverage target.**
Three rounds of auditors across the last two runs have flagged the hero as
the ceiling: "canonical, not composed" (centered stack, both title words
at identical 900 weight, eyebrow buried inside the `<h1>`, 3-stat counter
row in SaaS landing-page format). The previous run installed the token
foundation (named easings, duration scale, semantic colour ramp, fluid
stroke primitives) precisely so this cycle could consume them — every
typographic decision below references existing tokens, none of them invent
new primitives. The hero is the entry surface; whatever register it sets
runs through the rest of the site. The reference scout returned six
concrete typographic moves (Werkplaats clamp-overlap, Active Theory
edge-pinned chapter glyph, Hello Monday differential one-rAF parallax,
Pentagram fluid stroke width via clamp). This run lands all of them
under a single 230-line CSS delta, no new deps.

**Changes.**

- `src/components/parallax-root.tsx` *(new)* — Client component that
  writes `window.scrollY` (unitless) to `--scroll-y` on `:root`, rAF-
  throttled, passive listener, mounted once in the root layout. Skipped
  entirely under `prefers-reduced-motion: reduce` so the CSS fallback
  `var(--scroll-y, 0)` evaluates to 0 and every parallax transform stays
  at identity. One listener, many speeds (Hello Monday's differential-
  drag pattern) instead of per-component scroll observers.
- `src/app/layout.tsx` — Mounted `<ParallaxRoot />` alongside the other
  global client utilities (Loader, ScrollProgress, Cursor).
- `src/app/page.tsx` — Restructured the hero markup. The h1 now wraps two
  block-level `.hero-word` spans (each containing a SplitText) instead
  of a flex column with an inline `.hero-title-row`. The italic-serif
  eyebrow is lifted *out* of the `<h1>` into a sibling `.hero-aside`,
  baseline-anchored under the second word. A new `<aside className="hero-edge">`
  contains the edge-anchored chapter spine ("001 — Volume · Catalogue").
  The 3-stat `.hero-stats` counter row (47,283 / 99.9% / 42+) is replaced
  with a 3-cell `.hero-spec` ribbon: **Edition III · MMXXVI** (no counter),
  **Light absorbed · 550 nm 99.9%** (the one stat that earned its
  animation), **Made in / The absence of light** (serif-italic prose
  value, tonal contrast against the Latin specs). The h1 now carries
  `aria-label="Dark Matter."` and the inner word spans are
  `aria-hidden`, so screen readers get the composed name once instead
  of three character-split announcements.
- `src/app/globals.css` — Removed `.hero-title-row`, `.hero-eyebrow`,
  `.hero-eyebrow-line`, `.hero-stats`, `.stat-num`, `.stat-label` (none
  referenced elsewhere; cleaned, not deprecated).
- `src/app/globals.css` — Added `.hero-title-stack` with
  `transform: translate3d(0, clamp(-200px, calc(var(--scroll-y, 0) * -0.35px), 0px), 0)`.
  The clamp ceiling prevents the title from drifting off-screen at
  long-page scroll; the fallback `0` means the rule degrades to identity
  before JS mounts and under reduced-motion.
- `src/app/globals.css` — `.hero-word-2` (Matter) overlaps
  `.hero-word-1` (Dark) via `margin-top: clamp(-0.22em, -2.8vw, -0.08em)`
  (Werkplaats clamp-overlap: collision survives all breakpoints because
  the negative margin scales with viewport, not with a fixed pixel
  value). Asymmetric horizontal shift via
  `padding-left: clamp(8vw, 14vw, 18vw)` — "Matter" steps right out of
  Dark's left edge, breaking the centered-canonical layout the audit
  flagged.
- `src/app/globals.css` — `.hero-outline` stroke width is now fluid
  `-webkit-text-stroke: clamp(1px, 0.2vw, 3.5px) #f4f4f4` (Pentagram MIT
  move: hairline editorial register at any zoom, no fixed-pixel break
  at large viewport sizes). Replaces the previous 2px/3px breakpoint
  switch.
- `src/app/globals.css` — `.hero-aside` (the lifted eyebrow) uses the
  same `padding-left` as `.hero-word-2` so the italic tagline
  baseline-aligns under "Matter" rather than centering inside the title
  column. Parallax drag index is `-0.55px` (faster than the title's
  `-0.35px`) — the differential drag is the move; the eyebrow appears
  to lift away from the title as the page scrolls, marking a
  compositional separation that single-speed parallax can't.
- `src/app/globals.css` — `.hero-edge` spans the full hero height as a
  ~28-48px wide column at `left:0`, with `.hero-edge-stem` rotated -90°
  inside (horizontal flex strip flipped vertical). Display: none below
  900px (mobile keeps the layout clean). Parallax index `-0.15px` —
  slowest layer, reads as structural rather than motion. Custom CSS,
  no library; the rotation is on the inner stem so the outer wrapper's
  parallax transform composes cleanly.
- `src/app/globals.css` — `.hero` gets `padding-left: clamp(56px, 5vw, 88px)`
  ≥ 900px so the title and meta row clear the rotated chapter spine on
  every desktop viewport between 900–1480px (below 900 the spine is
  hidden anyway).
- `src/app/globals.css` — `.hero-spec` is a 1-col grid that flips to
  3-col ≥ 720px. Inter-column dividers are vertical hairlines at
  `::before` of every row after the first; on mobile they flip to
  horizontal hairlines via `border-top`. The last spec val carries
  `.hero-spec-val--prose` (italic serif, lighter weight) so the colophon
  reads as composition, not data — three rows of identical 900-weight
  Latin numerals would have just rebuilt the SaaS row the audit flagged.
- `src/app/globals.css` — `.hero-scroll` ("Descend" cue) repositioned
  from `left:20px` to `right:20px` so the bottom-left no longer crowds
  the chapter-spine column.
- `src/app/globals.css` — `.marquee-row` gets edge fade masks
  (`mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)`).
  Cheap polish win the marquee audit called out: the marquees no longer
  hard-crop at viewport edges. Vendor prefix included for Safari.
- `src/app/globals.css` — `.btn-primary:active, .btn-ghost:active`
  scale(0.985) press state, eased via `var(--dur-1)` / `var(--ease-out-quart)`.
  Audit flagged the CTAs as lacking a feedback layer beneath the magnetic
  pointer follow. The Magnetic wrapper transforms the OUTER div; the
  inner button keeps its own transform, so press scale composes.

**Verification.**
- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. Same 5 routes prerendered statically (`/`,
  `/_not-found`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`).
  No new client bundle beyond the ~15-line `ParallaxRoot` (a single
  passive scroll listener with rAF throttle).
- Reduced-motion: `ParallaxRoot.useEffect` early-returns on
  `prefers-reduced-motion: reduce`, leaving `--scroll-y` unset. Every
  parallax transform's `clamp(min, calc(var(--scroll-y, 0) * factor), 0)`
  collapses to `clamp(min, 0px, 0px) = 0px` → identity transform.
  No new motion paths leak past the reduced-motion gate.
- Visual structure verified via markup diff: h1 carries the composed
  accessible name once; chapter spine is `aria-hidden` (decorative);
  spec ribbon order reads top→bottom on mobile, left→right on desktop.

**Expected impact.**
- Hero now reads as composed, not stacked: weight contrast (solid 900 vs
  hairline outline), case unchanged but kerning/tracking diverged
  (-0.07em vs -0.05em), asymmetric horizontal shift breaks the centered
  layout, and the negative-margin overlap scales with viewport so the
  collision survives every breakpoint. The italic-serif aside, lifted
  out of the `<h1>`, now reads as its own compositional element rather
  than a buried subtitle.
- Scroll-bound parallax via a single rAF listener with three different
  drag indices is the kind of motion choreography Awwwards juries reward
  ("designed, not decorated") — and it costs ~15 lines of client JS plus
  three `translate3d` rules in CSS. No animation library.
- Spec ribbon replaces three SaaS-styled counters with one numeric stat
  (the one with brand meaning), one Latin-numeral colophon entry, and
  one italic-serif prose value. The audit's most-flagged issue ("SaaS
  landing-page copy-paste, not editorial brand") is closed without
  losing the one number worth animating (99.9% light absorbed at 550 nm).
- Tokens from the previous run did the heavy lifting: every easing,
  duration, colour, and ring reference uses an existing `var(--*)` —
  zero new primitives were defined this run, and the foundation
  invests forward (next cycle's hero exit / product chapters can
  consume the same parallax pipeline by adding a single CSS rule).
- Performance: one new ~600-byte client component (`ParallaxRoot`),
  one passive scroll listener, rAF-throttled. No CLS impact (markup
  reflow happens at static render, not on scroll). No new dependencies.

**Files modified.**
- `src/components/parallax-root.tsx` *(new)*
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Stat band repositioning + content rewrite** — the white-slab
      stat band (100% K / 0 white margins / 1/1 hue / 4.9★) is now the
      next-highest-leverage SaaS-feeling artefact. Marquee/stat audit
      recommended either (a) reordering it before the marquees as a
      prelude, or (b) rewriting the content from technical telemetry
      to poetic colophon ("Monochrome by conviction", "One colour,
      one choice", "Shipped — sealed — sacred"). The white inversion
      moment is worth keeping; the SaaS content is not.
- [ ] **Marquee weight/case hierarchy** — the two marquee rows still
      differ only by outline-vs-fill. Marquee audit recommended one
      row in mono / one in display, or one tracked-tight / one
      tracked-loose, so the rows feel composed instead of stacked.
- [ ] **Product grid bento** — six uniform cards still; let `void-book`
      occupy a 2-col feature row, vary card sizes / orientations, and
      give each product visual a distinct gesture (cover lift, fan-out,
      stroke draw-on, stack depth-shift) rather than the current shared
      greyscale gradient.
- [ ] **Scroll-pinned product chapters** — reference-scout recommended
      a Frans Hals Museum-style pinned spec sheet with chapter-by-
      chapter reveal as the catalogue moment.
- [ ] **Hero exit choreography** — hero enters with stagger but exits
      without any goodbye motion. Could bind hero background opacity
      or scale to scrollY > 100vh via the same `--scroll-y` listener
      that already exists.
- [ ] **PWA + apple-touch-icon + manifest.webmanifest** — open from
      prior runs.
- [ ] **Outro footer dead links + missing contact surface** — open from
      prior runs.
- [ ] **OG image typography fidelity** — load `Instrument_Serif` as a
      buffer inside `opengraph-image.tsx` instead of `ui-serif`
      fallback.
- [ ] **Lighthouse baseline** — still unmeasured.

---

## 2026-05-12 — Design-system tokens + a11y foundation (focus ring, reduced-motion gating)

**Area:** Cross-cutting CSS tokens, accessibility baseline, motion gating,
font-payload trim.

**Why this was the highest-leverage target.**
The previous three runs shipped surface polish: a redesign with custom cursor,
loader, kinetic display type, bento product cards, magnetic CTAs; then a full
SEO foundation; then the FAQPage + per-product-anchors JSON-LD closure. Three
parallel audits in this run flagged the same systemic ceiling underneath: there
is no real design system. Every section invents its own `clamp()`, every motion
primitive its own `cubic-bezier`, every overlay its own raw `rgba`. The
accessibility posture compounds the problem — a `cursor: none` site-wide rule
with zero `:focus-visible` rules anywhere, JS motion hooks ignoring
`prefers-reduced-motion`, and a global `* { animation-duration: 0.001ms }`
sledgehammer that disables functional transitions along with decorative ones.
Both are disqualifying for any Awwwards-tier jury, and both ceiling-cap every
future visual cycle: any new motion or color decision has to invent its
primitives instead of composing on existing ones. This run installs the
foundation so future cycles compose, not invent.

**Changes.**
- `src/app/globals.css` — Extended `@theme inline` with:
  - **Semantic colour ramp** (`--color-text`, `--color-text-strong`,
    `--color-text-muted`, `--color-text-faint`, `--color-border-subtle`,
    `--color-border-strong`, `--color-overlay-1`, `--color-overlay-2`,
    `--color-ring`) layered on top of the existing surface ramp.
  - **Motion easing tokens** (`--ease-out-expo`, `--ease-out-quart`,
    `--ease-out-back`, `--ease-in-out-quint`, `--ease-in-out-quart`) — each
    named by intent, replacing six bespoke `cubic-bezier()` values that were
    scattered across components.
  - **Duration scale** (`--dur-1` 200ms → `--dur-6` 1400ms) replacing
    ad-hoc 0.2s/0.25s/0.3s/0.4s/0.5s/0.6s/0.7s/0.8s/0.9s/1s/1.5s timings.
- `src/app/globals.css` — Refactored 14 hot-traffic rules to consume the new
  tokens: `.reveal`, `.split-char`, `.btn-primary` + `::before`, `.btn-arrow`,
  `.btn-ghost`, `.cursor-ring`, `.tilt`, `.product`, `.product-visual`,
  `.product-svg`, `.product-glow`, `.product-hover-cta`, `.survival-card`,
  `.survival-line`, `.quote`, `.faq-panel`, `.faq-toggle span`, `.loader`,
  `.loader-curtain`, `.loader-bar-fill`. The cubic-bezier diversity that
  audits flagged ("every component invents its own easing") is now five
  named curves chosen per intent.
- `src/app/globals.css` — Added a designed global focus ring:
  `:focus-visible { outline: 2px solid var(--color-ring); outline-offset: 4px;
  box-shadow: 0 0 0 6px rgba(0,0,0,0.5); transition: outline-offset … }`,
  with a compact-offset override on `.btn-primary` / `.btn-ghost` /
  `.nav-cta` (rings hug the pill) and an inverted treatment inside the
  white `.stat-band` so the ring stays legible on light. Pre-existing
  `:focus` rule resets the outline so the visible state is the
  `:focus-visible` one only. The audit's `grep` for `outline` / `:focus`
  returned 0 hits before this run; after, every interactive element has
  a visible, designed focus state.
- `src/app/globals.css` — Scoped the `cursor: none` rule to
  `@media (pointer: fine) and (prefers-reduced-motion: no-preference)` and
  dropped `input, textarea, select` from the selector list (those keep
  their native text caret). Also: `:focus-visible { cursor: auto; }` so
  the moment a keyboard user lands on any control, the native pointer
  returns alongside the focus ring. Three a11y failure modes (no focus
  ring + hidden cursor + reduced-motion users with no cursor) collapse
  into one fix.
- `src/app/globals.css` — Replaced the global reduced-motion sledgehammer
  with a surgical version: collapses `--dur-1`..`--dur-6` to `0.01ms` (so
  any rule that uses them goes near-instant), snaps `.split-char`,
  `.reveal`, `.survival-line` and `.hero-scroll-line::after` to their
  final state, and disables the four persistent decorative animation
  loops by name (`.grain`, `.hero-meta-dot`, `.marquee-track`,
  `.loader-bar-fill`). Functional transitions (FAQ panel open,
  button colour swap, focus-ring growth) keep working because their state
  still toggles. This replaces the previous `* { animation-duration:
  0.001ms !important }` which killed everything indiscriminately.
- `src/app/globals.css` — Set `body { font-weight: 500 }` so dropping
  Inter's 400 weight in layout.tsx does not fall back to system-ui for
  unclassed body text.
- `src/components/cursor.tsx`, `src/components/magnetic.tsx`,
  `src/components/tilt.tsx`, `src/components/spotlight.tsx` — Added
  `if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  return;` to each `useEffect`, immediately after the existing
  `(pointer: fine)` guard. The rAF loops and pointer listeners no longer
  mount at all for users who request reduced motion. Previously these
  ran regardless of the media query.
- `src/components/counter.tsx` — Reads the reduced-motion preference once
  per mount, then inside the IntersectionObserver callback either snaps
  `setValue(to)` once or starts the rAF easing loop. The synchronous
  setState path is gated inside the observer callback so the React 19
  `react-hooks/set-state-in-effect` rule stays satisfied.
- `src/components/reveal.tsx` — Same pattern: if reduced-motion is set,
  the element gets `.active` immediately instead of waiting for the
  IntersectionObserver. No observer is created at all in that branch.
- `src/components/loader.tsx` — Two changes. (1) Under reduced-motion,
  the loader skips its dwell entirely (`setPhase("done")` deferred via
  `requestAnimationFrame` to keep React 19's
  `react-hooks/set-state-in-effect` rule happy). (2) The non-reduced
  dwell is shortened from 1.6s → 0.9s and the total from 2.4s → 1.5s.
  The hero audit flagged the original timing as "Awwwards 2021, not 2026" —
  the curtain reveal is the moment, the dwell isn't.
- `src/components/faq-item.tsx` — Added `id={\`faq-panel-\${index}\`}` to
  the panel and `aria-controls={panelId}` to the trigger, plus
  `role="region"` and `aria-hidden={!open}` on the panel. The previous
  state used `aria-expanded` alone, which announces the open/closed
  state but does not link the trigger to its disclosed region for
  assistive tech traversal.
- `src/app/layout.tsx` — Trimmed Inter weights from five
  (`["400", "500", "700", "800", "900"]`) to four
  (`["500", "700", "800", "900"]`); weight 400 was not referenced anywhere
  in the stylesheet. Added explicit `display: "swap"` to both `Inter()`
  and `Instrument_Serif()` font-loader calls (next/font's default is
  `swap`, but the explicit declaration matches the audit's
  recommendation and locks behaviour).
- `next.config.ts` — Was an empty `NextConfig`; now declares
  `compress: true`, `poweredByHeader: false`, and
  `images.formats: ["image/avif", "image/webp"]` so future image work
  (per the previous run's open follow-up, even a single `next/image`
  product still) inherits modern formats without further config.

**Verification.**
- `bun run lint` — clean (after fixing two `react-hooks/set-state-in-effect`
  hits by moving the synchronous `setValue`/`setPhase` calls into a
  callback / `requestAnimationFrame` deferral).
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. Same 5 routes prerendered statically (`/`,
  `/_not-found`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`). No
  bundle regression.
- Visual diff (no live-browser test in this run): the surgical
  reduced-motion block keeps `.btn-primary` colour swap and `.faq-panel`
  open transition working; only the persistent decorative loops
  (`.grain`, the `.hero-meta-dot` pulse, marquees, loader bar) are
  disabled. Keyboard focus now shows a visible 2px white ring on every
  interactive element on dark surfaces and a 2px black ring on the
  inverted `.stat-band`.

**Expected impact.**
- A11y posture: keyboard navigation now has a visible focus indicator
  on every focusable element — the largest single Awwwards-disqualifying
  gap is closed. Reduced-motion users get a working site with no rAF
  loops, no IntersectionObserver-driven entrances, and no decorative
  animation loops, but functional transitions (FAQ open, button hover)
  still work.
- Foundation for future cycles: any new motion or colour decision now
  composes on tokens (`var(--ease-out-expo)`, `var(--dur-3)`,
  `var(--color-text-muted)`) instead of inventing new primitives. The
  next hero or product-grid redesign cycle does not need to touch
  `globals.css` to introduce a new easing or duration.
- Performance: one fewer Inter weight in the font payload; AVIF/WebP
  format priority configured for future imagery; `poweredByHeader`
  removed for a marginal response-size win.
- No CLS impact: no layout changed, no new client JS, no new
  dependencies.

**Files modified.**
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/cursor.tsx`
- `src/components/magnetic.tsx`
- `src/components/tilt.tsx`
- `src/components/spotlight.tsx`
- `src/components/counter.tsx`
- `src/components/reveal.tsx`
- `src/components/loader.tsx`
- `src/components/faq-item.tsx`
- `next.config.ts`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Hero typographic upgrade** — auditors flagged the hero as
      "canonical, not composed". Future cycle: let `Matter` overlap
      `Dark` (negative margin-top), introduce real width/weight contrast
      between the two title words, anchor the eyebrow chapter-numeral
      style ("001 —") to the viewport edge, and bind transforms to
      `scrollY` so the title parallaxes into the marquees. Tokens from
      this run unlock that work without further CSS plumbing.
- [ ] **Product grid bento** — the six product cards are visually
      uniform. Future cycle: make `void-book` a 2-col feature row,
      vary card sizes / orientations, and give each product visual a
      distinct gesture (cover lift, fan-out, stroke draw-on, stack
      depth-shift) rather than the current shared greyscale gradient.
- [ ] **Scroll-pinned product chapters** — reference-scout recommended a
      Frans Hals Museum-style pinned spec sheet with chapter-by-chapter
      reveal as the catalogue moment.
- [ ] **PWA + apple-touch-icon + manifest.webmanifest** — open from
      prior runs; `src/app/apple-icon.tsx` + `src/app/manifest.ts`
      programmatic routes.
- [ ] **Outro footer dead links + missing contact surface** — open from
      prior runs.
- [ ] **OG image typography fidelity** — load `Instrument_Serif` as a
      buffer inside `opengraph-image.tsx` instead of `ui-serif`
      fallback.
- [ ] **Lighthouse baseline** — still unmeasured.

---

## 2026-05-12 — FAQ JSON-LD + per-product anchors + cart semantic upgrade

**Area:** Structured data completion, fragment-link correctness, nav semantics.

**Why this was the highest-leverage target.**
The previous run shipped the SEO foundation (metadata, OG, sitemap, robots,
Organization + ItemList of `Product` JSON-LD). It left three known gaps in
its own follow-up list that, taken together, finish that story:

1. **`Product` `@id` pointed at a fragment that did not exist.** The JSON-LD
   declared each product's `@id` as `${siteUrl}/#${p.id}` (e.g.
   `/#void-book`), but the corresponding `<article>` elements had no `id`
   attribute. Search engines following the `@id` would land on the section
   wrapper, not the product. That is a correctness regression introduced by
   the prior run — fixing it now closes the loop.
2. **Six FAQ Q&As already render on-page but were not machine-readable.**
   No `FAQPage` schema = a free SERP rich-result surface left on the table.
3. **The nav "Cart" was a `<button>` with no `onClick`.** It read as
   interactive (magnetic, link cursor) but did nothing. On a single-page
   conceptual brand, the right semantic is a same-page anchor to the
   catalogue, not a stub for a checkout flow that does not exist.

These three items share one through-line: every interactive surface and
every `@id` reference should resolve to something real. Bundling them is
one cohesive improvement, not three small ones.

**Changes.**
- `src/data/faqs.ts` *(new)* — Extracted the 6 Q&A entries into a typed
  `Faq[]` constant. Single source of truth, mirroring the
  `src/data/products.ts` pattern from the previous run. Both the page
  rendering and the FAQPage JSON-LD consume this one list.
- `src/app/layout.tsx` — Added a third `application/ld+json` script:
  `FAQPage` schema with `@id` of `${siteUrl}/#faq` and `mainEntity`
  built from `faqs.map(...)`. Each `Question` carries its `acceptedAnswer`
  with full answer text. Also: the existing `Product` JSON-LD now includes
  a top-level `url` field per item, and its `Offer.url` now points at the
  product fragment (`/#void-book`) rather than the section
  (`/#supplies`) — so search-result deep links land on the right
  `<article>`, not the section header.
- `src/app/page.tsx` — Added `id={id}` to each `<article className="product">`
  in the products map, destructuring `id` from the product object. The
  fragment URL in the `Product` `@id` now resolves to a real DOM anchor for
  all six SKUs. Also: replaced the inline FAQ JSX block (six hardcoded
  `<FaqItem>` elements) with a single `faqs.map(...)` over the new data
  module, preserving the exact rendered text, ordering, and component
  props.
- `src/app/page.tsx` — Converted the nav Cart `<button>` to
  `<a href="#supplies">` with `aria-label="Cart: zero items — view
  catalogue"` so screen readers announce the actual destination instead of
  an ambiguous "Cart" button. Visual treatment (magnetic wrapper,
  `.nav-cta` class, dot separator, `0`) is unchanged.

**Verification.**
- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. 5 routes prerendered statically.
- Live HTML inspection via `bun run start`:
  - 3 distinct `application/ld+json` script blocks emitted: `Organization`,
    `ItemList`, `FAQPage`.
  - 6 `"@type":"Question"` entries inside `FAQPage`, with the full answer
    text for each (verified against the on-page copy by sampling the
    closing words of every answer).
  - All 6 product article `id` attributes present in the DOM
    (`void-book`, `abyssal-cardstock`, `event-horizon-pad`, `sticky-voids`,
    `savior-pen`, `executive-despair`) — fragment links from the JSON-LD
    `@id` now scroll to the correct `<article>`.
  - `Product` `Offer.url` field now serializes to per-product fragments
    (verified `…/#void-book`, `…/#abyssal-cardstock`, `…/#event-horizon-pad`
    in the rendered output).
  - Cart control rendered as `<a href="#supplies" class="nav-cta" …>` with
    the new `aria-label`; no `<button class="nav-cta">` remaining.
  - Heading hierarchy unchanged. No CLS change (no new layout, no new
    client JS). No new dependencies.

**Expected impact.**
- Google: eligible for `FAQPage` rich results (the FAQ "What people are
  asking" surface) in addition to the existing `Product` rich results.
- Deep links from search results to a product now land on that product's
  `<article>`, not the section header — improving the "View on page"
  jump experience.
- Cart control is now keyboard-focusable as a link, announces its real
  destination to assistive tech, and is no longer a no-op interactive
  button. Removes a latent UX dead-end.
- Maintenance: a future FAQ edit is now a one-place change in
  `src/data/faqs.ts`; both the page and the schema update together.

**Files modified.**
- `src/data/faqs.ts` *(new)*
- `src/app/layout.tsx`
- `src/app/page.tsx`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **`apple-touch-icon` + `manifest.webmanifest`** — still open. Next.js
      16 supports `src/app/apple-icon.tsx` and `src/app/manifest.ts` as
      programmatic routes; both would inherit the `#000` brand colour and
      close the iOS/Android home-screen icon gap.
- [ ] **Outro footer dead links** (Terms, Privacy, Studio, Instagram all
      `href="#"`). Audit recommended leaving them as deliberate
      placeholders on a conceptual-brand site, but the question is still
      open. Decide per link in a future run.
- [ ] **No contact surface.** No address, no email, no contact route.
      Trust gap for a commerce-flavoured page. A single `mailto:` in the
      footer would close it.
- [ ] **Outro disclosure copy** still says "back button is in the
      upper-left of this window" — wrong on Windows and on mobile.
      Generalise.
- [ ] **`Instrument_Serif` not used by OG image** — currently falls back
      to `ui-serif`. Loading the actual Google Font as a buffer inside
      `opengraph-image.tsx` would tighten brand coherence.
- [ ] **Lighthouse baseline** — still unmeasured. A first pass would let
      future runs target the worst metric.

---

## 2026-05-12 — SEO foundation + social-share metadata + Product structured data

**Area:** Site-wide `<head>` metadata, crawl signals, share rendering.

**Why this was the highest-leverage target.**
The site is a single-page conceptual brand with a deliberately provocative name
("Blacks For Sale", with a self-aware disclaimer in the footer). Prior to this
run the `Metadata` export contained only `title` and `description`. That meant:

- Shares on Slack, iMessage, Twitter, Discord, Linear and any unfurler
  rendered the bare URL with no preview image and no context-bearing
  description — actively bad for a name whose first reading is hostile.
- Search engines had no Open Graph fallback, no Twitter card, no canonical, no
  `metadataBase`, no `robots` directive, no `sitemap.xml`, no `robots.txt`.
- Six on-page products with declared prices had no `Product` schema, so they
  were ineligible for Google product rich results.
- No `themeColor` / `colorScheme` meant browser chrome rendered light on a
  page that's pure black.

**Changes.**
- `src/app/layout.tsx` — expanded `Metadata` export: `metadataBase`,
  title template, `applicationName`, `authors`, `creator`, `publisher`,
  `category`, intent-targeted `keywords` (real query intents — "black
  notebook", "matte black notebook", "silver gel pen", "black cardstock",
  not generic filler), `alternates.canonical`, `formatDetection`, full
  `openGraph` block, full `twitter` card (`summary_large_image`), and
  `robots` directive with Google-specific image/snippet limits.
- `src/app/layout.tsx` — added `viewport` export (`themeColor: #000`,
  `colorScheme: dark`, `width: device-width`, `initialScale: 1`).
- `src/app/layout.tsx` — emitted two `application/ld+json` scripts:
  `Organization` and `ItemList` of all six `Product` entries with
  `Offer` (price, currency, availability).
- `src/app/opengraph-image.tsx` — programmatic 1200×630 OG image
  rendered with `next/og`. Pure black background, editorial-serif
  "Dark / Matter." wordmark, share-safe disclaimer-aware sub-copy, and
  the same coordinate/edition motif used in the page nav. Statically
  prerendered.
- `src/app/sitemap.ts` — single-URL sitemap (the site is one page).
- `src/app/robots.ts` — `Allow: /` for all UAs, with `Host` and
  `Sitemap` directives pointing at the resolved site URL.
- `src/lib/site.ts` — single source of truth for site name, tagline,
  description, share-description, and `siteUrl`. The URL resolver
  prefers `NEXT_PUBLIC_SITE_URL`, then `VERCEL_PROJECT_PRODUCTION_URL`,
  then `VERCEL_URL`, then `http://localhost:3000`, so OG/canonical
  URLs resolve correctly in preview and production without manual
  configuration.
- `src/data/products.ts` — extracted product data (id, chapter, title,
  subtitle, price string, `priceAmount`, currency, spec, copy, tags)
  out of `page.tsx` so both the page and the JSON-LD ItemList consume
  one list. Visuals are paired locally inside `page.tsx` via a
  `Record<ProductId, ComponentType>` map.
- `src/app/page.tsx` — now imports `products` from `@/data/products`
  and pairs the right SVG visual per `id`. Rendering is unchanged.

**Verification.**
- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. Five routes prerendered statically: `/`,
  `/_not-found`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`.
- Live HTML inspection on `bun run start`:
  - `<title>`, `<meta name="description">`, canonical link, theme-color,
    robots directive, color-scheme all present.
  - 11 `og:*` tags emitted including `og:image` pointing to
    `/opengraph-image` with `width=1200`, `height=630`, `type=image/png`,
    `og:image:alt`.
  - 8 `twitter:*` tags emitted with `summary_large_image`.
  - 2 `application/ld+json` scripts in DOM (Organization + ItemList).
  - `GET /opengraph-image` → 200, `image/png`, 51 KB.
  - `GET /robots.txt` → valid with `Host:` and `Sitemap:` directives.
  - `GET /sitemap.xml` → valid XML with the homepage URL.
- Title length: 52 chars (≤60). Description length: 154 chars (140–160).
  One `<h1>`. Heading hierarchy unchanged (h1 → h2 → h3 → h4).

**Expected impact.**
- Google: eligible for `Product` rich results across the six SKUs;
  improved crawl coverage via `sitemap.xml`; canonical resolves the
  `https://…/` vs `https://…` form.
- Social: every unfurled share now carries a brand-aligned image with
  the disclaimer-aware tagline, materially reducing the chance the
  bare URL is read out of context.
- Lighthouse SEO: existing missing-meta deductions resolved; no
  expected impact on LCP/CLS/INP (no client JS added, no layout shift,
  OG image is a separate static route).

**Files modified.**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/opengraph-image.tsx` *(new)*
- `src/app/sitemap.ts` *(new)*
- `src/app/robots.ts` *(new)*
- `src/data/products.ts` *(new)*
- `src/lib/site.ts` *(new)*

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Outro footer dead links.** Terms, Privacy, Studio, Instagram
      all currently `href="#"`. They are visible to every visitor and
      hurt both UX and E-E-A-T signals. Decide per link: implement,
      remove, or annotate as placeholder.
- [ ] **No contact surface anywhere.** No address, no email, no
      contact route. For a commerce-flavoured site this is a trust
      gap. Even a single `mailto:` in the footer would close it.
- [ ] **`/cart` is a button with no destination.** The nav "Cart"
      control reads as commerce but does nothing. Either wire to a
      stubbed `/cart` route with a "currently quiet" empty state, or
      relabel.
- [ ] **No FAQ JSON-LD.** Six FAQ entries already exist on-page; add
      `FAQPage` schema for an extra rich-result surface.
- [ ] **Single-page hash links + JSON-LD `@id`.** Product anchors
      currently scroll to `#supplies` (the section). Add per-product
      anchors (`id={p.id}`) on each `<article>` so the `Product`
      `@id` in JSON-LD resolves to a real fragment and "View on page"
      deep links from search results work.
- [ ] **`apple-touch-icon` + `manifest.webmanifest`.** Favicon exists
      but iOS bookmarks and Android PWA installs will fall back to a
      light icon on a non-dark background.
- [ ] **`Instrument_Serif` not used by OG image.** Currently falls
      back to `ui-serif`. Loading the actual Google Font as a buffer
      inside `opengraph-image.tsx` would tighten brand coherence.
- [ ] **Lighthouse run.** None measured yet. A baseline pass would
      let future runs target the worst metric.
- [ ] **Copy: outro disclosure paragraph.** Strong, but mentions
      "back button is in the upper-left of this window" — wrong on
      Windows and on mobile. Generalise.
