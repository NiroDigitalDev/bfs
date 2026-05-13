# Improvements log

A running record of focused changes shipped by the website-improvement routine.
One entry per run. Newest first.

---

## 2026-05-13 — Custom editorial 404 — "Not / Found." composition, rotated 404 spine, errata ribbon

**Area.** A new top-level route: the 404 page. Previously the site shipped
the framework default — a bare, monochrome system message at
`/_not-found`. Every prior run's editorial register stopped at the edges
of `/`; the 404 was the one surface that still read as a stock Next.js
build artifact.

**Why this was the highest-leverage target.**
Awwwards, SOTD, and FWA jurors test 404s. They are a craft signal — a
site that has worked its register down to its error states is a site
that has been finished. For a single-page conceptual brand whose entire
proposition is "deliberate, edited, editorial," shipping the generic
framework 404 was the loudest remaining template-feel surface on the
site. The fix is also genuinely scoped: a new file, a new CSS block,
zero risk to the working tree of the homepage, and a clean diff that
exercises every primitive already invested in (Reveal, SplitText,
Magnetic, the hero typographic composition, the outro wordmark).

Three open follow-ups from prior runs (apple-icon, OG image font
embedding, footer dead-link audit) were considered but skipped this
round: they are tighter brand-coherence wins, but none of them are
*visible at gallery scale* the way a 404 page is when a visitor hits
one.

**Design pass.**
Composition mirrors the hero spread so the 404 reads as a sibling
chapter, not an exception:

- A **top register strip** carries `Status · 404 · Reference not
  found` on the left (with the same pulsing meta-dot the hero uses)
  and `Lat 0° 0′ N · Lon 0° 0′ W` on the right — the same coordinates
  ledger that runs through the chapter colophons and outro.
- A **rotated edge spine** down the left edge (desktop only)
  carries `404 / · / Permanent vacancy` in the same `letter-spacing:
  0.42em` editorial smallcaps as the hero's `001 / Volume · Catalogue`
  spine.
- The **display title** is `Not / Found.` set in the hero composition:
  word 1 solid, word 2 outlined with `-webkit-text-stroke`, the period
  filled, fluid type at `clamp(72px, 16vw, 288px)`, word 2 negative-
  margined over word 1 and shifted right (the Werkplaats / Pentagram
  asymmetric move). SplitText carries the staggered enter.
- A **serif-italic eyebrow** `Filed under absences.` sits under the
  title with the same hairline rule + serif italic as the hero aside.
- The **lede** is a single brand-voice paragraph: "The catalogue does
  not list this entry. Either the binding came loose, or it was never
  pressed — the void keeps no inventory of what it has erased."
- **Two CTAs**, both wrapped in `Magnetic`: primary "Return to the
  volume" → `/`, ghost "Browse the catalogue" → `/#supplies`. Both
  use `next/link` for client-side navigation back into the SPA.
- A **spec ribbon** below the lede in the hero-spec register:
  `Status / 404 · Not found`, `Filed under / Errata, Vol. III` (serif
  italic), `Index entry / None` (serif italic).
- A **marginalia § note** in italic serif: "A page that has been
  bound and shelved here is, by definition, in print. The reverse
  also holds." — a brand-voice rhetorical flourish that doubles as a
  permission slip for any reader who arrived by accident.
- A **foot register grid** matching the outro: `BFS · Errata`,
  `Lat 0° · Lon 0°`, `Edition III · MMXXVI`, `Folio · 404`.
- A **closing wordmark** `404` at `clamp(38vw, 46vw, 56vw)` rendered
  as a 1px outline-stroke — identical typographic treatment to the
  outro `BFS` wordmark, so the page signs off in the same register
  it opened in.

**Implementation.**
- `src/app/not-found.tsx` *(new)* — server component (no `"use client"`)
  composed from existing client primitives (`Reveal`, `SplitText`,
  `Magnetic`). `metadata` export sets a custom `title`
  (`Reference not found`, which threads through the layout template
  to `Reference not found · Blacks For Sale`), a description string,
  and `robots: { index: false, follow: true }` so the 404 is not
  indexed but its outbound links still pass crawl signal back to the
  homepage. Internal navigation uses `next/link` `Link` (caught and
  fixed in the lint pass from a first revision that used bare `<a>`).
- `src/app/globals.css` — appended a single `============ 404 / NOT
  FOUND ============` block (~290 lines) under the chapter rail
  rules. New class namespace: `.nf*` (not-found). Mirrors the hero
  patterns by *reading them*, not by extending them: the 404 has
  no shared selectors with hero or outro, so a future change to
  either won't accidentally drift the 404, and a future change to
  the 404 won't touch the working homepage. One `prefers-reduced-
  motion` guard on the pulsing register dot.

**Verification.**
- `bun run lint` — clean after `<a>` → `next/link` `Link` fix.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. 5 routes prerendered statically:
  `/`, `/_not-found` (now the custom page), `/opengraph-image`,
  `/robots.txt`, `/sitemap.xml`.
- Static HTML inspection of `.next/server/app/_not-found.html`:
  - `<title>Reference not found · Blacks For Sale</title>` rendered
    correctly via the layout's title template.
  - `<meta name="robots" content="noindex, follow">` emitted.
  - 23 distinct `.nf*` classes present in the DOM (`.nf`, `.nf-frame`,
    `.nf-title`, `.nf-outline`, `.nf-period`, `.nf-edge*`,
    `.nf-spec*`, `.nf-marginalia*`, `.nf-foot`, `.nf-wordmark`).
  - All editorial copy strings present: "Reference not found",
    "Filed under absences", "Permanent vacancy", "Return to the
    volume", "404 · Not found", "Errata, Vol. III".
  - Both CTAs render as `<a>` with the correct hrefs (`/` and
    `/#supplies`) and carry the `data-cursor` attributes for the
    custom cursor.
  - `aria-label="Not found."` on the `<h1>` so the SplitText'd
    `aria-hidden` spans announce a single readable string to AT
    instead of letter-by-letter.

**Expected impact.**
- Awwwards / SOTD / FWA judging surface: the framework default 404
  is now a purposeful, brand-coherent editorial page. This is a
  small craft signal but it's the kind of detail jurors check.
- Brand coherence on real-world mistakes: typos in URLs, stale links
  from search, deep-links to deleted anchors — all now land on a
  page that reads in the same voice as the rest of the site rather
  than dumping the visitor onto a bare framework error state.
- SEO: `robots: noindex, follow` means the page itself stays out of
  the index (correct — 404s should not be indexed), but its links
  to `/` and `/#supplies` are still crawled, which routes any crawl
  budget hitting bad URLs back into the live surface.
- No CLS, no new client JS dependencies, no new fonts, no new
  external requests. Static prerendered as part of the existing
  `_not-found` route.

**Files modified.**
- `src/app/not-found.tsx` *(new)*
- `src/app/globals.css` *(appended `.nf*` block, ~290 lines)*

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Audit decision still pending: footer dead links.** Terms /
      Privacy / Studio / Instagram in the outro all still resolve
      to `#`. The Studio one in the disclaimer-base nav is now
      `mailto:` (since the colophon ship), but the four in the
      outro-links remain placeholders. Decide per link in a future
      run: implement, remove, or annotate as deliberate placeholders
      for a conceptual brand.
- [ ] **`apple-icon.tsx` + `manifest.ts` still open.** Next.js 16
      supports both as programmatic routes. Would close the iOS/
      Android home-screen icon gap and let the brand square mark
      pin as `#000` on installs.
- [ ] **OG image still falls back to `ui-serif`.** Embedding
      Instrument Serif as a base64 buffer in `opengraph-image.tsx`
      would tighten brand coherence at the share moment.
- [ ] **Newsletter form is inert.** `Newsletter` accepts an email
      and shows "Received. Dispatch is rare…" but POSTs nowhere. A
      future run should either wire it (Buttondown, Resend, etc.)
      or rephrase the success state so it's truthful.
- [ ] **Marquee + tilt reduced-motion guards.** The audit flagged
      that `.marquee-track` infinite animation and `.tilt` transform
      loop don't currently pause under `prefers-reduced-motion`.
      Small, safe a11y polish.
- [ ] **Lighthouse baseline.** Still unmeasured. A first pass would
      let future runs target the worst real metric instead of
      audit-derived hunches.

---

## 2026-05-13 — FAQ editorial unfold: italic § toggle, "Reply." marginalia, permalinks + @id

**Area.** Chapter 05, "On Record" — the six-question FAQ at the foot of the
single-page editorial spread.

**Why this was the highest-leverage target.**
Across ten prior runs the rest of the page evolved into a deliberately
choreographed editorial publication: SplitText reveals, magnetic CTAs,
parallax dust on the hero, object-portrait tilt on the catalogue, hairline-
ruled survival codex, italic-numeral colophon. The FAQ was the only
*interactive* moment on the page that still read as a stock accordion:
the height transition (the modern `grid-template-rows: 0fr → 1fr`
technique) was actually fine, but the *register* was generic. A plain
plus/minus toggle. Body copy that snapped in without choreography. No
marginalia. No § permalink, despite editorial § marks being used
elsewhere on the page (chapter spreads, colophon). No per-question
fragment anchors, so the FAQPage JSON-LD `mainEntity[]` had no `@id`
and the Q&As weren't independently addressable from search results.

The opportunity was to bring the FAQ up to the same level of editorial
finish as the rest of the page in a single scoped pass: one component
file, one CSS block, four lines of schema.

**Changes.**
- `src/components/faq-item.tsx` — stable `id={faq-${index}}` on each
  item wrapper, replaced the two-`<span>` plus/minus toggle with a
  single italic-serif `§` glyph, restructured the panel inner into
  a two-column grid (64px marginalia gutter + body) hosting a
  `Reply.` italic-serif marginalia label, a `<p className="faq-answer">`
  body, and a `<a className="faq-permalink" href="#faq-NN">§ NN</a>`
  fragment anchor.
- `src/app/globals.css` — extended the `.faq-*` block:
  - `.faq-item.open` now brightens the top hairline (`rgba(244, 244, 244, 0.55)`)
    and softens the next sibling's hairline so the open entry visually
    registers as the "current page".
  - `.faq-item.open .faq-index` scales 1.0 → 1.06 and shifts from
    `--color-fog` → `#fff` on `var(--dur-3) var(--ease-out-expo)`.
  - `.faq-item.open .faq-q` tightens letter-spacing from -0.02em →
    -0.025em on the same easing — a tiny typographic tell.
  - `.faq-toggle-glyph` is a single italic-serif `§` rotated 0 → 90°
    on open with `var(--ease-out-back)`; colour shifts fog → white.
  - Inner content (`.faq-marginalia`, `.faq-answer`, `.faq-permalink`)
    fades in from `translateY(6px)` to `0` with staggered delays
    (140ms / 180ms / 260ms) on `var(--dur-4) var(--ease-out-quart)` —
    the answer reads as the page unfurling, not snapping.
  - Hover state on `.faq-permalink` underlines via 1px hairline border.
  - `@media (max-width: 640px)` collapses the marginalia gutter to a
    single column so the body wraps to viewport on phones.
  - `@media (prefers-reduced-motion: reduce)` zeroes the translateY
    decoration, drops index numeral scale, and removes transition
    delays; the functional height transition + toggle crossfade
    remain so the FAQ keeps working.
- `src/app/layout.tsx` — `faqPageLd.mainEntity[].@id` and `.url` now
  resolve to `${siteUrl}/#faq-${f.index}` so each `Question` is an
  addressable schema entity (closes the "Single-page hash links +
  JSON-LD @id" open follow-up for the FAQ surface; the same pattern
  remains open for products).

**Verification.**
- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. All five routes prerendered statically:
  `/`, `/_not-found`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`.
- Static HTML inspection on the prerendered `index.html`:
  - Six `id="faq-NN"` wrappers present (`faq-01`…`faq-06`).
  - Six `faq-marginalia`, six `faq-permalink`, six `faq-toggle-glyph`
    occurrences — one per item.
  - Six `href="#faq-NN"` fragment links present.
  - FAQPage JSON-LD now contains six `mainEntity[].@id` entries
    resolving to `…/#faq-NN`.

**Expected impact.**
- *Visual.* The FAQ now reads as an editorial unfold rather than a
  generic accordion. Open-state index numeral, italic-serif `§` toggle,
  italic `Reply.` marginalia, and the staggered body fade-in put the
  section in the same register as the rest of the page (publisher's
  mark, chapter colophons, field notes pull-quotes).
- *SEO.* Each FAQ entry now has a stable fragment anchor and an `@id`
  in the FAQPage schema, making individual Q&As independently
  citeable. Where Google surfaces an FAQ rich result, the deep link
  from a specific question can scroll-to-anchor on the page.
- *A11y.* `aria-expanded`, `aria-controls`, `role="region"`,
  `aria-labelledby` preserved. The italic `§` toggle is `aria-hidden`
  (the trigger button is the labelled control). The permalink has an
  explicit `aria-label="Link to question NN"` for screen readers
  since "§ 01" alone wouldn't convey purpose. Reduced-motion respects
  the established surgical pattern: functional transitions keep
  working, decorative translates disable.
- *Performance.* No JS added. One additional anchor element per FAQ
  item. CSS additions are token-based (no new `--dur-*` or `--ease-*`).
  Static prerender footprint unchanged in route count; trivial bytes.

**Files modified.**
- `src/components/faq-item.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Per-product `@id` symmetry.** Products in `productCatalogLd`
      already use `${siteUrl}/#${p.id}` for `@id` and the `<article
      id={p.id}>` anchors exist in markup. Verify and, where missing,
      align with the FAQ pattern just established (stable fragment +
      schema @id resolves to a real on-page anchor).
- [ ] **Marquee row hierarchy.** Still flagged: one row should be
      mono / tight, one display / loose, to differentiate the two
      otherwise-identical scrolling banners.
- [ ] **Newsletter success state.** Today the form transitions button
      copy only. A serif "Filed." or "Logged." confirm state with the
      same italic-serif register as the FAQ marginalia would close the
      gap on the second transactional moment.
- [ ] **Cart drawer confirm copy.** "Sealed ✓" works but a one-line
      italic-serif lede in the drawer (e.g. "On its way.") would
      mirror the editorial register the FAQ now establishes for the
      page's interactive surfaces.
- [ ] **Hero exit choreography.** Bind background opacity / scale to
      `scrollY > 100vh` so the hero doesn't simply slide off — still
      open from the parallax pass.
- [ ] **PWA + apple-touch-icon + manifest.webmanifest.** Long-standing.
- [ ] **Lighthouse baseline.** Still unmeasured.
- [ ] **OG image typography fidelity.** Instrument_Serif still falls
      back to `ui-serif` in `opengraph-image.tsx`.

---

## 2026-05-13 — Field Notes rebuilt as display pull-quotes + Review JSON-LD + cheap wins

**Area.** Chapter 04, "From the chromatically committed." — the
testimonials section. Replaces a 2-column grid of rounded gradient
cards (`border-radius: 18px`, `linear-gradient(180deg, #0c0c0c,
#060606)`, `translateY(-4px)` hover, decorative corner `"`) with a
single-column editorial register: hairline-ruled, italic-serif
display pull-quotes at `clamp(26px, 3.4vw, 44px)`, alternating
left/right `Fig. I`–`Fig. IV` marginalia, centered attribution rules
set in tracked small-caps with the role rendered in italic Instrument
Serif. Reference lodestar: The Gentlewoman / Fantastic Man pull-quote
register (per the reference-scout brief). The publication has a
strong satirical voice but no display-scale quotation moment until
now; the new treatment lets the four testimonials carry their weight
instead of sitting in chips.

**Why now.** Convergent audit signal:
- The end-of-page auditor flagged `.quote` as a **P0** SaaS card
  pattern with no editorial register.
- The reference scout independently picked **Testimonials / pull-quote
  treatment** as the single most undercooked area on the page given
  the strength of the surrounding editorial moves.
- The same auditor flagged a missing `Review` JSON-LD payload despite
  Organization, ItemList(Product), and FAQPage already being wired —
  surfacing the quotes as rich-result Reviews is high-leverage and
  costs essentially nothing once the testimonials are extracted to a
  shared data module.

**What shipped.**

- `src/data/testimonials.ts` *(new)* — extracted the four testimonials
  out of `page.tsx` so both the page and the JSON-LD consume one
  source. Schema: `{ roman, fig, quote, name, role, place }`. `place`
  is set to `"—"` for Sarah T. (no city in the previous copy) so the
  `pullquote-role` renderer can drop the dot-separator.
- `src/app/page.tsx` — `.cult` rebuilt:
  - New head pattern (`cult-head` / `cult-title` / `cult-lede`):
    centered Instrument Serif italic title at `clamp(36px, 5.4vw,
    72px)` instead of `SplitText section-title`. The title is now the
    register marker, not just a heading.
  - The 2-col grid of `<figure className="quote">` is gone; replaced
    by `<ol className="cult-entries">` with one `<li>` per
    testimonial. Alternating `data-side="left|right"` puts the `Fig.
    N` marginalia on the appropriate margin at ≥920px, stacks above
    the quote on mobile.
  - Each quote is now `<figure className="pullquote">` with: a
    centered hairline rule (`pullquote-rule`, 1px × clamp 28–48px
    gradient drop), a `blockquote` opened by a low-contrast `&ldquo;`
    glyph rendered inline (not as a 120px corner ornament), and a
    centered `figcaption` with em-dash, tracked small-caps name, and
    italic-serif role with city.
- `src/app/layout.tsx` — added a `Review[]` JSON-LD payload, one
  `<script type="application/ld+json">` per testimonial. Each Review
  carries `reviewBody`, `author` (`Person` with `jobTitle` and
  optional `homeLocation`), and `itemReviewed` (`Organization`
  pointing at the brand + siteUrl). No `reviewRating` is emitted —
  fabricated stars on a satirical brand would read as schema-spam and
  would risk a manual penalty. The brand-level rich result is the
  goal, not Product reviews with ratings.
- `src/app/globals.css` — `.cult` / `.quotes` / `.quote*` block
  (lines 1940–2008) replaced wholesale with `.cult` / `.cult-head` /
  `.cult-title` / `.cult-lede` / `.cult-entries` / `.cult-entry` /
  `.cult-fig*` / `.pullquote*` block (~150 lines). No animations, no
  hovers — the register is print. Adds a 1px gradient drop at
  `.cult::before` so the entrance from the press grid is a
  punctuation mark, not an abrupt panel change. Includes a mobile
  fallback (<920px) that collapses the marginalia above each quote.

**Cheap wins folded in.**

- `src/components/faq-item.tsx` — fixed an a11y misuse: the FAQ panel
  carried `aria-hidden={!open}` on a still-tabbable region. Removed
  the `aria-hidden` (the panel is collapsed via
  `grid-template-rows`); added a stable `triggerId` and
  `aria-labelledby={triggerId}` on the panel for screen-reader
  context. The FAQ trigger now also has an `id` attribute.
- `src/components/split-text.tsx` — added optional `id` prop so the
  Field Notes section can use `aria-labelledby="cult-heading"`
  without wrapping SplitText in a redundant outer span.
- `src/app/page.tsx` — outro primary CTA copy changed from "Enter the
  catalogue" / `data-cursor-label="Enter"` / `↗` to "Return to the
  catalogue" / `data-cursor-label="Return"` / `↑`. The destination is
  `#supplies` which is *above* the outro — "Enter" was reading as a
  dead loop. "Return" is the honest verb and the up-arrow signals
  direction.
- `src/app/page.tsx` — promoted the signoff paragraph (`MMXXVI · Made
  in the absence of light. · All wrongs reserved.`) above the
  outline `BFS` wordmark, so the funniest line on the page now lands
  *before* the closing mark instead of below it where most readers
  have already left.

**Verification.**

- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. 7 static pages prerendered (`/`,
  `/_not-found`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`).
  Compiled successfully in 845.6ms via Turbopack.
- `bun run start` + `curl http://localhost:3000/` — confirmed the
  new markup is in the rendered HTML: `cult-heading` id present,
  `pullquote-body` class present, "Field Notes" eyebrow rendered,
  `Review` JSON-LD payloads in the document.

**Expected impact.**

- **Design:** the strongest editorial moment of the middle of the
  page (the publisher's-mark colophon) is no longer immediately
  followed by SaaS-card testimonials. The page now reads as a
  consistent magazine spread from CH. 02 onward — survival codex,
  colophon mark, Field Notes pull-quotes, FAQ, masthead colophon
  outro. The "rounded card with translateY hover" pattern is now
  fully absent from the build.
- **SEO:** four `Review` schemas wired to the brand. Google may now
  surface the satirical pull-quotes as review-style rich results
  attached to the Organization, increasing the share-context of
  search-result snippets. No rating ratings emitted — keeping the
  schema honest.
- **A11y:** FAQ panel no longer applies `aria-hidden` to tabbable
  content; the panel gains a proper labelled-by relationship to its
  trigger. The `<section id="cult">` gains a `aria-labelledby` to
  the SplitText heading.
- **Copy:** outro CTA verb now matches the destination it scrolls to.

**Files modified.**

- `src/data/testimonials.ts` *(new)*
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/faq-item.tsx`
- `src/components/split-text.tsx`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Custom cursor has only one real state ("link") — flagged
      P0 by the hero auditor.** Marquees, hero figures, FAQ rows,
      and the scroll arrow are all invisible to the cursor system.
      `data-cursor="text"` CSS at `globals.css:180-186` is already
      wired but unused. Direction: introduce `read`, `view`, `drag`,
      `disabled` modes; set `data-cursor="drag"` on marquee rows.
- [ ] **All six product visuals read as the same lit black slab —
      flagged P0 by the catalogue auditor.** Differentiate by
      camera/composition: 3/4 oblique notebook with page-edge;
      hero-on-its-side cardstock; top-down spiral pad; clustered low-
      angle stickies; macro on pen tip.
- [ ] **Marquees have zero interaction — flagged P0.** No `:hover`
      pause, no `data-cursor="drag"`, no drag-to-scrub. For a strip
      taking ~20% of viewport this is the laziest motion in the
      build.
- [ ] **Chapter card pattern is still uniform — flagged P0.** Every
      chapter shares the same two-area grid and pill CTA. Per-chapter
      layout variants (`full-bleed | caption | type-dominant |
      cluster`) would break the symmetry without changing data.
- [ ] **Outro wordmark is a 1px hairline outline at 50vw — flagged
      P0.** Not bold enough to be the closing image, not quiet enough
      to be background texture. Either fill + crop at baseline, or
      split into stacked rows (`BFS` / `MMXXVI`).
- [ ] **Hero period never gets its own beat — flagged P1.** The
      title is literally "Dark Matter." and the period lands without
      a heartbeat / pulse / parallax differential.
- [ ] **Magnetic only wraps 3 elements.** Hero scroll arrow, logo
      mark, FAQ chevrons would all benefit at low strength.
- [ ] **Press grid is uppercase weight-900 sans, not press
      clippings.** Per-outlet typographic mix would lift it.
- [ ] **`opengraph-image.tsx` still falls back to `ui-serif`.** Load
      the Instrument Serif font buffer for brand-coherent OG share.

---

## 2026-05-13 — Survival Guide rebuilt as hairline-ruled editorial codex (+ bundled a11y fixes)

**Area:** Chapter 02, "On the use of dark paper." — the three-note
section that sits immediately after the publisher's-mark colophon.
Replaces the prior `display: grid; repeat(3, 1fr)` SaaS-feeling card row
(rounded `border-radius: 18px`, `linear-gradient` fill, hover
`translateY(-6px)`, decorative ghost numeral) with a single hairline-
ruled, asymmetric editorial codex: three numbered `<li>` rows with
oversized Instrument Serif italic numerals (01 / 02 / 03) bleeding
alternating margins, sentence-case titles, and small italic margin-
note annotations that mirror the publisher's-mark colophon's right-
column language ("Twelve seconds to set", "Opaque pigment, archival.").

Two adjacent a11y fixes were bundled into the same commit because they
touch immediately neighbouring code:

1. **Duplicate `id="colophon-heading"`** — the publisher's-mark `<h2>`
   and the outro footer `<h3>` both carried the same id, and both
   parent `<section>` elements used `aria-labelledby="colophon-heading"`
   to claim it. Per HTML spec ids must be unique; screen readers were
   resolving only the first match, so the outro section was silently
   losing its accessible name. The outro is now `outro-colophon-heading`.
2. **Heading hierarchy skip in `<section id="manifesto">`** — the
   manifesto opened with `<h2>` then jumped straight to `<h4>` for its
   four numbered items. AX trees building a TOC saw a level skip.
   The `<h4>` is now `<h3>`; CSS selector updated to match.

**Why this was the highest-leverage target.**

Phase-1 discovery converged on this section from three independent
directions:

- The **visual auditor** ranked the Survival Guide as a top-3 HIGH-
  severity finding alongside Press and Testimonials, calling out that
  the page reads as "two sites, and the second one is a SaaS landing
  page." Survival is the most adjacent of the three to the just-shipped
  publisher's-mark colophon and the cleanest extension path — the
  colophon spent its budget establishing a hairline-ruled, type-as-
  imagery editorial syntax, and the next section the user scrolls into
  immediately whiplashes back into 3-card SaaS chrome. One section
  break does the most damage because of where it sits.
- The **reference-scout** independently flagged the publisher's mark
  as a single moment that wants to become a *system* — Pangram Pangram
  Foundry uses massive serif glyphs not just as one-off heroes but as
  recurring section dividers tracking with the chapter rail. Promoting
  the K-glyph register to Chapter 02 via numbered italic 01/02/03 is
  the cheapest way to turn a one-off flourish into the page's
  compositional signature.
- The **technical auditor** found a real HTML-spec / a11y bug
  (duplicate id) on adjacent code, plus a heading-hierarchy skip in the
  next section after the one being rewritten. Both are tiny fixes that
  belong in the same commit since they live within ~200 lines of the
  primary edit.

Three concerns settled in one ship: the strongest remaining visual
register break, an extension of the brand's signature compositional
move into a *system*, and two real a11y bugs adjacent to the work.

Refs scouted in phase 1 for the new register: Pangram Pangram Foundry
(glyph-as-recurring-divider), Bureau Borsche (numbered editorial
spreads), MM Paris (hairline-ruled marginalia), Pentagram MIT
(numbered notes where the number is the composition).

**What changed.**

- `src/app/page.tsx` (was lines 356–401, now ~356–409) — Removed the
  entire `<div className="survival">` block with its three
  `<div className="survival-card">` children, the inset
  `<span className="survival-num">` ghost numerals, and the
  `<span className="survival-line">` hover-sweep. Replaced with
  `<ol className="survival-codex">` containing three
  `<li className="codex-row" data-side="left|right">` items, each
  composed of:
  - A `<span className="codex-numeral" aria-hidden>` carrying the
    visible 01 / 02 / 03 (oversized Instrument Serif italic, weight
    400, `clamp(96px, 24vw, 140px)` mobile → `clamp(140px, 17vw, 240px)`
    ≥1100px, white with the same `text-shadow: 0 0 1px rgba(...0.18)`
    inner-shadow the K colophon uses).
  - A `<div className="codex-body">` holding `<span class="codex-
    eyebrow">Note · {I|II|III}</span>` (uppercase, 11px, 0.34em
    tracked, `border-bottom` hairline at `width: max-content`), the
    `<h3 className="codex-title">` (sentence-case Inter 700, restored
    from the prior all-caps treatment), the `<p className="codex-
    prose">` (`var(--color-text-muted)`, `clamp(14px, 1.05vw, 15px)`,
    `max-width: 46ch`), and — on rows 01 and 02 only — a
    `<span className="codex-annotation">` set in Instrument Serif
    italic for the margin-note echo.
  - A `<span className="codex-rule" aria-hidden />` for the per-row
    hairline that fills on hover.
- `src/app/page.tsx` — Copy refresh on the three notes plus the lede.
  Section title unchanged ("On the use of dark paper.").
  - Lede was: *"Three notes for the page in front of you. None of them
    are optional, all of them are obvious."* — now: *"Three notes on
    writing into the dark. None optional. None new."* The original
    repeated the count the oversized numerals will now telegraph;
    the new lede trades two clauses for two fragments and matches the
    spec ribbon's cadence.
  - Title 01: *"Refuse standard ink"* → *"Choose the ink, not the
    pen."* (editorial observation, not instruction; mirrors the
    manifesto's "Specification first, slogan second." cadence).
    Annotation: *"Opaque pigment, archival."*
  - Title 02: *"Let the page rest"* → *"Let the pigment set."*
    (material verb instead of soft anthropomorphism; "hold" → "keep"
    avoids re-using the hero's "hold the dark"). Annotation:
    *"Twelve seconds to set."* — a deliberate echo of the colophon's
    annotation, placed beside the body that earns it.
  - Title 03: *"Anticipate the attention"* → *"Expect to be asked."*
    (concrete event from the body, not the abstract). Body
    preserved nearly verbatim; no annotation (a margin note here
    would gild a closer that wants to land on "single tone").
- `src/app/page.tsx:443` — `<h4>{m.t}</h4>` → `<h3>{m.t}</h3>` inside
  the manifesto-list map. Restores the heading hierarchy h2 → h3 → no
  skip.
- `src/app/page.tsx:583–586` — outro colophon section's
  `aria-labelledby="colophon-heading"` and its child `<h3
  id="colophon-heading">` both renamed to `outro-colophon-heading`.
  Publisher's-mark `<h2 id="colophon-heading">` at line ~299 keeps the
  canonical id.
- `src/app/globals.css` — Deleted the entire prior `.survival, .survival-
  card, .survival-num, .survival-line, .survival-card:hover, .survival-
  card:hover .survival-line` block (was lines 1678–1738, ~60 lines).
  Replaced with `.survival-codex, .codex-row, .codex-numeral, .codex-
  body, .codex-eyebrow, .codex-title, .codex-prose, .codex-annotation,
  .codex-rule` (~125 lines) plus two mid-width breakpoints (≥768px
  and ≥1100px) that swap the row's grid columns for the N-shape
  asymmetry. Row 1 and Row 3 carry `data-side="left"` (numeral in
  column 1, body in column 2); Row 2 carries `data-side="right"`
  (numeral grid-column 2 with `justify-self: end`, body in column 1).
  DOM order is constant for screen readers — visual placement is
  purely grid-column override.
- `src/app/globals.css:1807` — `.manifesto-item h4 { … }` →
  `.manifesto-item h3 { … }`. Rule body unchanged.
- `src/app/globals.css:2974–2978` (the reduced-motion block) —
  Replaced the stale `.survival-line` snap rule with a `.codex-rule`
  treatment that pins the per-row hairline to a static, half-opacity
  filled state under `prefers-reduced-motion: reduce`. Row entry
  animations short-circuit via the existing `.reveal` reduced-motion
  branch.

**Motion spec.**

- Row enter: each `<li>` wrapped in `<Reveal delay={`${i * 0.09}s`}>` —
  identical cadence to the `colophon-row` immediately above. The 0.12s
  delay used by the prior survival-card was inconsistent with the rest
  of the page's 0.09s staircase; this aligns it.
- Hover: only the `.codex-rule` width transitions from 0 → 100% over
  `var(--dur-4)` (`700ms`) with `var(--ease-out-quart)`. The row, the
  numeral, the title, the body, and the annotation do **not**
  translate, scale, or change weight. The Awwwards bar for this
  section was specifically "hover does not lift the card"; the rule
  fill is a single-property width animation on a 1px element, which
  is cheap and reads as a printed underline being drawn.
- Reduced motion: rule snaps to its filled state at half opacity; no
  Reveal translate or fade.

**Verification.**

- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. Five routes prerendered statically.
- Live HTML inspection via `bun run start`:
  - `id="colophon-heading"` appears exactly once (the publisher's-mark
    `<h2>`); `id="outro-colophon-heading"` appears exactly once (the
    outro `<h3>`).
  - Both `aria-labelledby` references on the page (`colophon-heading`,
    `outro-colophon-heading`) resolve to unique, present ids.
  - Zero `<h4>` elements anywhere in the rendered HTML (was 4 inside
    the manifesto-list; all promoted to `<h3>`).
  - Heading map: 1 × h1, 8 × h2, 14 × h3, 0 × h4. No skips.
  - Three `.codex-row` `<li>` elements rendered; six in raw count
    because Next.js 16 also serialises the component tree into the
    inline RSC flight payload. All three carry the correct
    `data-side` attribute (left / right / left).
  - All three `.codex-eyebrow` spans render "Note · I", "Note · II",
    "Note · III"; all three `.codex-title` headings render the new
    sentence-case copy ("Choose the ink, not the pen.", "Let the
    pigment set.", "Expect to be asked.").
  - Annotations render on rows 01 and 02 only ("Opaque pigment,
    archival.", "Twelve seconds to set."), correctly absent on row 03.
  - Zero hits for the legacy `.survival-card`, `.survival-num`,
    `.survival-line`, `.survival` class names in either source files
    or rendered DOM.
  - Adjacent sections (chapter rail, catalogue, FAQ, manifesto,
    colophon-mark, outro-colophon) all render unchanged.

**Expected impact.**

- Visual register: the only Chapter-02 break from the editorial
  hairline syntax is gone. Read top-to-bottom the page now flows
  colophon-mark (spec block) → survival-codex (numbered editorial
  codex) → manifesto (sticky title + serif credo) — three contiguous
  variations of the same hairline syntax at three different scales.
  The publisher's-mark K stops being a one-off flourish and becomes
  the start of a system.
- Reading: titles are now editorial observations rather than
  instructions, which matches the cadence the manifesto and product
  copy have already earned. The italic-serif annotation column
  rhymes with the colophon's right column, creating a cross-section
  callback the page can keep mining.
- Accessibility: two real bugs fixed. Duplicate id resolves the
  silent loss of the outro section's accessible name; the h2→h4
  skip in the manifesto is gone. Heading-map cleanup is also a
  small SEO win.
- Performance: net effect is negligible. The new section drops the
  `linear-gradient` background fill (one paint cost), drops the
  `transform: translateY(-6px)` hover (one composite cost), and
  replaces the `transform: translateX(-100%) → 0` line sweep (one
  composite) with a `width: 0 → 100%` rule fill (one paint). No new
  JS, no new dependencies, no layout shift on entry.

**Files modified.**

- `src/app/page.tsx`
- `src/app/globals.css`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Press section — flex-wrapped logos-as-text grid** still reads
      as a B2B "as seen in" band. The visual auditor ranked it co-equal
      HIGH severity with Survival. The reference-scout suggested
      converting to a single auto-rotating pull-quote (Bureau Borsche /
      Locomotive style) or a horizontal scrolling ticker of quoted
      lines. Next run candidate.
- [ ] **Testimonials section — two-column quote-card pattern** with
      bordered, rounded (`18px`) cards on hover-lift. Same SaaS
      chrome as the just-removed Survival cards. Co-equal HIGH
      severity; ManvsMachine treats testimonials as full-bleed
      editorial letters. Next-next run candidate.
- [ ] **Cart "Cross the threshold" silent self-clear** — the cart's
      single most expensive interaction currently evaporates with a
      1.6s label flip and no in-character resolution. Content
      auditor's CRITICAL finding. Needs a brief held "ledger entry"
      state inside the drawer before the close.
- [ ] **"Returns accepted, regret negotiable" (marquee) vs FAQ Q05
      (legalese)** — the marquee promises a posture the FAQ then
      walks back. Restage one or the other so they rhyme.
- [ ] **Newsletter success message lives in `placeholder`** of a
      disabled empty field rather than in an announced status line.
      Confirmation reads as form failure.
- [ ] **Hero lede first two sentences** — third sentence is excellent;
      first two are the page's loosest writing and partly repeat
      copy that the spec ribbon already states numerically.
- [ ] **Marquee auto-scroll has no user pause control** (WCAG 2.2.2)
      — reduced-motion users are covered, but `prefers-reduced-motion`
      is not a substitute for hover/focus pause for the general case.
      ~6 lines in globals.css.
- [ ] **Low-contrast muted text**: `.press-disclaimer` (10px text at
      0.35 white ≈ 2.6:1 contrast — fails WCAG AA), newsletter
      placeholder, and a few `.colophon-row-id` glyphs at 0.48 white.
      Swap to existing `--color-text-muted` (0.65 white ≈ 7:1).
- [ ] **`apple-icon` + `manifest.webmanifest`** — Next 16 reads
      `src/app/apple-icon.tsx` and `src/app/manifest.ts` automatically.
      Tenth run open.
- [ ] **OG image: load `Instrument_Serif` as buffer** so the OG render
      matches the page rather than falling back to `ui-serif`.
- [ ] **Lighthouse baseline** — still unmeasured.
- [ ] **`turbopack.root` setting** in `next.config.ts` to silence the
      multi-lockfile workspace-root warning.

---

## 2026-05-13 — Publisher's mark (stat-band rewritten as type-as-imagery colophon)

**Area:** The interstitial section between Chapter 01 (Catalogue) and
Chapter 02 (Care & Method). Replaces the prior SaaS-feeling white
stat-band — four big counters tracking 100% K / 0 white margins issued /
1/1 hue in stock / 4.9★ — with a single-section editorial **publisher's
mark**: an oversized Instrument Serif italic **K** (CMYK's K-channel, the
printer's name for the black plate, i.e. the brand on one glyph) bleeds
the right half of the section, while four spec rows hang as a hairline-
ruled `<dl>` on the left.

**Why this was the highest-leverage target.**

The phase-1 historian flagged the stat band as the *oldest unaddressed
follow-up* — first logged 2026-05-12 (hero ship) and re-logged across two
subsequent runs without being touched. Independently of the historian,
both the content/UX auditor (F7) and the visual/motion/perf/a11y auditor
(F10) ranked the stat band as a top-3 weakness without coordination:

- It is the **only section on a black page that flips to pure white**,
  breaking the editorial register on every scroll-through.
- Three of four counters are jokes ("0 white margins issued", "1/1 hue
  in stock", "4.9★ from the chromatically committed"), and the fourth
  ("100% K by mass") already appears in the hero spec ribbon — so
  three-quarters of the content is filler and one-quarter is a repeat.
- "4.9★ from the chromatically committed" implies inventory volume that
  the catalogue's "Stocked when stocked" copy explicitly denies. The
  page contradicts itself.
- The reference-scout's verdict on the single move that would land
  hardest on this specific site was **type-as-imagery**: "leaning into
  the word as the artefact, with the matte-black object nested inside a
  counter of the letterform, is the single move that makes the
  provocation legible as art-direction rather than edginess." The
  publisher's mark is the cheapest, most self-contained way to bring
  that composition onto the page — one section, no new dependencies,
  no IA change.

Three concerns settled in one ship: oldest open follow-up, only
register-breaking section on the page, and a missing
typographic-composition register the brand was reaching for.

Refs scouted in phase 1 for type-as-imagery: Bureau Borsche (Münchner
Kammerspiele), Pentagram NY (Saks, Mastercard work), MM Paris (Lacoste,
Issey Miyake) — all use massive set serif glyphs as compositional
elements rather than ornament. The K is the page's first true editorial
"set" type.

**What changed.**

- `src/app/page.tsx` (was lines 294–317, now ~294–349) — Removed the
  entire `<section className="stat-band">` block with its four `Counter`
  instances and the SaaS-feeling label row. Replaced with
  `<section className="colophon-mark" aria-labelledby="colophon-heading">`
  containing:
  - A visually-hidden `<h2 id="colophon-heading">Colophon ·
    Specification</h2>` (gives the section a real landmark name without
    breaking visual hierarchy — the chapter rail and screen-reader
    landmark rotor now name the section as "Colophon · Specification"
    instead of an unnamed region).
  - A left column (`.colophon-spec`) with an eyebrow label, a
    `<dl class="colophon-list">` of four spec rows, and a bottom
    "Plate · K · Vol. III · MMXXVI" foot (matches the figure caption
    rhythm at the catalogue plates).
  - A right column wrapped in `<Reveal className="colophon-glyph-reveal">`
    containing the K glyph itself in a `<div className="colophon-glyph"
    aria-hidden>` with a single `<span className="colophon-glyph-letter">K
    </span>` inside.
  - Each spec row is `<div class="colophon-row">` wrapping a `<dt>`
    (key, e.g. "Stock") and `<dd>` (value, e.g. "250 gsm, matte black"),
    plus a leading monospace identifier (`a` / `b` / `c` / `d`) and a
    trailing Instrument Serif italic annotation. Each row is wrapped in
    `<Reveal delay={i * 0.09}s>` so they stagger in top-to-bottom — same
    cadence as the catalogue figures (matches existing rhythm rather
    than introducing a new reveal cadence).
- `src/app/page.tsx` — content shift (the load-bearing change). The
  four spec rows replace four counters:
  | id | key | value | annotation |
  |----|-----|-------|------------|
  | a  | Stock | 250 gsm, matte black | Single tone, by design |
  | b  | Ink | Opaque white, silver gel | Twelve seconds to set |
  | c  | Bind | Smyth-sewn signatures | Numbered, by hand |
  | d  | Dispatch | On the new moon | Lat 0° · Lon 0° |
  Each line *coheres* with copy already on the page: "Twelve seconds to
  set" mirrors Survival Guide #02's "Pigment sits on the surface six to
  twelve seconds before it bonds"; "Single tone, by design" echoes the
  marquee; "Lat 0° · Lon 0°" runs throughout the colophon outro; "On
  the new moon" is the dispatch phrase already in the outro masthead.
  This section now *reinforces* page register instead of *contradicting*
  it.
- `src/app/globals.css` (lines 1465–1525 in the prior version) —
  Removed the entire `.stat-band*` block: `.stat-band`,
  `.stat-band::before` (SVG noise filter), `.stat-band-row`,
  `.stat-band-row > div:not(.stat-band-line)`, `.stat-band-num`,
  `.stat-band-label`, `.stat-band-line` plus the two `@media (min-width:
  800px)` overrides. Replaced with a new `COLOPHON · PUBLISHER'S MARK`
  block (~215 lines):
  - `.colophon-mark` — black surface (`#050505` — matches the page body,
    not the prior `#fff`), hairline top + bottom rules
    (`var(--color-line)`), `overflow: clip` + `isolation: isolate` so
    the K bleeds visually but doesn't escape stacking-context.
  - `.colophon-mark::before` / `::after` — 10px corner registration
    marks, hairline `rgba(255,255,255,0.22)`, echoing the same motif
    used on the catalogue figure plates so this section reads as
    continuous with the catalogue rather than an alien block.
  - `.colophon-mark-inner` — two-column grid above 900px
    (`minmax(0, 1fr) minmax(0, 1.05fr)`, gap 48px, `align-items: end`);
    single-column below. A `min-height: clamp(420px, 52vw, 620px)` on
    desktop reserves room for the K to bleed.
  - `.colophon-row` — three-area grid above 900px (`id key val note`),
    four-area stacked grid below (`id key val` / `. . note`) so the
    italic annotation drops below the value on mobile rather than
    competing with it. Hairline `border-bottom` between rows.
  - `.colophon-row-id` — monospace, 11px, low-opacity. `.colophon-row-key`
    — 11px, 0.3em tracked, uppercase, 700 weight, low-opacity (visually
    matches the eyebrow). `.colophon-row-val` — Inter 700, clamped
    `18–22px`, full white. `.colophon-row-note` — Instrument Serif
    italic, clamped `13–15px`, low-opacity, right-aligned on desktop.
    Four distinct registers in one row, each pulling from an existing
    token.
  - `.colophon-glyph-letter` — `font-family: var(--font-serif)`, italic,
    `font-size: clamp(360px, 48vw, 640px)`, `line-height: 0.78`,
    `letter-spacing: -0.04em`, slight negative margins so the K's terminal
    serif sits at the section edge, faint `text-shadow` (1px white at
    18% alpha) for the printed-glyph density. Initial state
    `clip-path: inset(100% 0 0 0)` — the K is clipped out from the top.
  - Reveal coordination: the existing `Reveal` component's
    intersection-observer toggles `.active` on its wrapper; descendant
    selector `.colophon-glyph-reveal.active .colophon-glyph-letter`
    transitions `clip-path` to `inset(0 0 0 0)` over `var(--dur-6)`
    (1400ms) with `var(--ease-out-quart)`. The wrapper's own
    `opacity 0 → 1` and `translateY 36px → 0` runs over `var(--dur-5)`
    (900ms) — so the K *finishes* unveiling 500ms after the column has
    settled, which gives the glyph a longer slow-emergence beat
    distinct from every other reveal on the page.
  - Mobile (`max-width: 899.98px`): the `Reveal` wrapper is `position:
    absolute; inset: 0; z-index: 0` so the K becomes a 0.18-opacity
    watermark *behind* the spec stack rather than a separate block
    pushing the spec down. Spec content gets `position: relative;
    z-index: 1` to stay legible above it.
  - `@media (prefers-reduced-motion: reduce)`: `clip-path: none;
    transition: none` on the glyph. The `Reveal` wrapper already
    short-circuits to `.active` on mount under reduced-motion (it does
    this for every Reveal on the page) — so the section appears fully
    composed without any motion.
- `src/app/globals.css` (lines 93–97 in the prior version) — Removed
  the now-obsolete `.stat-band :focus-visible { outline-color: #000;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.6); }` exception. The
  section is no longer white, so the inverted focus halo isn't needed
  and the default global focus-ring rule applies uniformly.

**Verification.**

- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. Five routes prerendered statically
  (`/`, `/_not-found`, `/opengraph-image`, `/robots.txt`,
  `/sitemap.xml`); compiled in ~984ms; static page generation 240ms.
  No new dependencies, no new client component (the section is a
  Server Component; only the existing client `Reveal` wrapper carries
  the intersection observer).
- Live HTML inspection on `bun run start --port 3939`:
  - `class="colophon-mark"` appears (and `stat-band` count is now 0).
  - `aria-labelledby="colophon-heading"` + `id="colophon-heading"` both
    present on the section/heading pair.
  - 4× `colophon-row-id` / `-key` / `-val` / `-note` in the rendered
    HTML (one per spec row), as expected for the 4-item list.
  - The K glyph (`>K<` inside `colophon-glyph-letter`) renders once.
  - Foot caption "Plate · K · Vol. III · MMXXVI" present.
  - All four annotation strings ("Single tone, by design", "Twelve
    seconds to set", "Numbered, by hand", "Lat 0° · Lon 0°") echo
    elsewhere on the page — verified by ripgrepping the rendered HTML.
- Reduced-motion path: `Reveal` component's existing reduced-motion
  branch adds `.active` immediately on mount (no observer); CSS guard
  `@media (prefers-reduced-motion: reduce)` zeroes the K's clip-path
  transition. Net result: full composition appears statically; no
  motion artefact.
- Mobile path (<900px): the K watermarks behind the spec stack at
  18% opacity; spec content stays full-contrast in front; the four
  spec rows reflow to a two-row grid per item (key + value on row 1,
  annotation on row 2) so the italic annotation doesn't compete with
  the value. Manually verified by reading the layout in the CSS — no
  live mobile-device test on this run.

**Expected impact.**

- **Register.** The page is now black-on-black continuous between
  Chapter 01 and Chapter 02 — no more midstream flip to a white slab
  with SVG noise. Removes the single biggest register-break and the
  one section that contradicted adjacent copy.
- **Editorial composition.** The page now has its first piece of true
  type-as-imagery — a serif glyph used compositionally, not as a
  caption ornament. This is the kind of "screenshot" frame an Awwwards
  jury looks for on a single-page editorial brand site.
- **Content coherence.** Replaces four counters (three of which were
  jokes, one of which was a repeat) with four spec rows whose
  language each *echoes other copy already on the page*. The page
  now reinforces its own register section-to-section instead of
  spending one section undermining the others.
- **Accessibility.** Section now carries a real `aria-labelledby` →
  visually-hidden `<h2>` landmark name ("Colophon · Specification"),
  upgrading from an unnamed region. The four-item spec is now a
  semantic `<dl>` rather than a flex row of divs — proper
  key/value semantics for screen readers.
- **Perf / bundle.** No JS bundle growth (no new client component;
  reuses the existing `Reveal` and removes four `Counter` instances,
  which were the only client components in that section).

**Files modified.**

- `src/app/page.tsx`
- `src/app/globals.css`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Newsletter is a no-op** (content auditor F1). Wire to a real
      endpoint (Resend/Loops/Vercel route), add a `role="status"`
      confirmation node, surface inline error copy in-register, keep
      the input visible after success with a struck-through state.
      Flagged in two prior runs.
- [ ] **Cart checkout is theatre** (content auditor F2). Either commit
      to an inline editorial "manifest" / dispatch slip that stays on
      screen, or wire a real Stripe Checkout.
- [ ] **"Plausible publications" press grid** (content auditor F3) —
      the disclaimer defangs the section. Replace with one real
      artefact (a scanned letter, a screenshot, a single labelled
      photograph) under the wit.
- [ ] **Survival Guide vs Manifesto rhyme** (content auditor F6) —
      the IA promises two registers but the copy collapses them.
      Either push Survival fully practical or cut it.
- [ ] **FAQ Q05 dodges the disclaimer** (content auditor F5) —
      rewrite to echo the footer disclaimer in register, in full.
- [ ] **No real contact / studio surface** (content auditor F4) —
      no addressable physical/postal/legal entity, no press contact,
      no wholesale enquiry path.
- [ ] **rAF / pointermove zoo** (visual auditor F1) — 17+ rAFs
      running on the home page across `Cursor`, `Spotlight`, six
      `Tilt`s, and ~9 `Magnetic` wrappers. Single shared orchestrator
      + rect caching keyed off ResizeObserver would consolidate.
- [ ] **Section motion cadence is repetitive** (visual auditor F3) —
      every block opens with `SplitText` + `Reveal` slide-up. Vary by
      section: clip-path wipe, character cascade, sticky-pin scrub.
- [ ] **Section-title typographic hierarchy** (visual auditor F4) —
      every H2 is Inter 900 at 144px. Demote one to Instrument Serif
      italic (Manifesto reads more as an essay title); introduce a
      mid-scale (~96px) so the section ladder isn't 144/144/144/144.
- [ ] **`apple-touch-icon` + `manifest.webmanifest`** — still open
      from 2026-05-12 SEO ship.
- [ ] **OG image: load `Instrument_Serif` as font buffer** — still
      open from 2026-05-12 SEO ship.
- [ ] **Lighthouse baseline** — still unmeasured.
- [ ] **Skip-to-content link + section landmarks** (visual auditor F6)
      — keyboard users tab through the entire fixed nav + chapter rail
      + cart pill on every page entry. Several sections still
      unnamed.
- [ ] **Workspace-root multi-lockfile warning** — the build warns on
      every run because Next.js detects `~/bun.lock` alongside this
      project's `package-lock.json`. Set `turbopack.root` in
      `next.config.ts`.

---

## 2026-05-13 — Object portraits (six chapter figures → tilt + specular + studio light)

**Area:** Chapter 01 catalogue figures — the page's actual subject
matter. Elevates the six product specimens from "SVG icon under a
uniform CSS hover" to "object portrait under studio lighting" via
pointer-tracked tilt, cursor-bound specular sweep, always-on plate
lighting, and per-product micro-detail on the two thinnest visuals.
Also tightens the global SplitText transition from 1400ms to 900ms,
shaving roughly half a second off every animated section title.

**Why this was the highest-leverage target.**
Phase-1 audits converged on one cluster: the page's first-screen
typographic craft is real, but the **six chapter figures — the
catalogue, the subject matter, the thing the brand actually sells —
render as flat front-elevation SVGs under a single shared CSS hover
(`scale(1.035) translateY(-2px)`)**. Two reference-scouts and the
visuals-auditor converged independently on the same reference bar —
Aesop / Officine Universelle Buly / Bureau Borsche / Tom Sachs
product pages, where "object portrait" means real specular, real
material identity, and motion that reads as inspecting an object
under light rather than a CSS hover effect. The auditor's top-ranked
elevation move (pointer-tracked tilt + cursor-bound specular) was
S-effort with zero new dependencies because a `Tilt` component
already existed in the tree, unused — written to expose `--mx` /
`--my` CSS variables on its root, exactly the shape the specular
needed. Larger bets surfaced in discovery (hero parallax sign-flip,
chapter-rail continuous progress, hero→marquee staging) logged below
for future runs.

Refs scouted: Aesop product pages (specular + floor contact under
apothecary objects), Officine Universelle Buly (engraved-line
specimen plates with serif Latin sub-labels), Bureau Borsche /
Tom Sachs (pointer-tracked specular for the feel of "inspecting an
object under light"). Audit verdict on existing six visuals before
this ship: `savior-pen` strong, `cardstock` / `pad` / `planner`
adequate, `void-book` / `sticky-voids` thin.

**What changed.**

- `src/app/page.tsx` (lines 1–10, 242–252) — Imports `Tilt`.
  Each `<figure className="chapter-figure">` now wraps its frame
  with `<Tilt className="chapter-figure-frame" max={6}>`, which
  renders a `<div class="tilt chapter-figure-frame">` and owns
  the perspective rotation. Inside the Tilt: a new
  `<span className="chapter-figure-light" aria-hidden />` (always-
  on studio light), the `<Visual />`, and a new
  `<span className="chapter-figure-specular" aria-hidden />`
  (cursor-bound radial highlight). The `<figcaption>` now carries
  two spans — `Plate · {chapter}` on the left and the first
  product tag on the right, justified across the cap row by the
  existing `display: flex; justify-content: space-between`.
- `src/components/tilt.tsx` — Unchanged. Was already written
  to capped ±max° pointer-tracked `rotateX/rotateY` via rAF
  interpolation, gate on `(pointer: fine)` and
  `prefers-reduced-motion: no-preference`, and expose
  `--mx` / `--my` (0–100%) on the root. Now used in production
  for the first time.
- `src/components/product-visuals.tsx` — Per-visual elevation:
  - Every visual now gets a **floor contact ellipse** (radial
    gradient, black → transparent) beneath the object, anchoring
    it to a plinth rather than floating it.
  - Every visual now gets a **top sheen** (vertical linear-
    gradient stripe across the upper third) hinting at studio
    overhead lighting.
  - `NotebookVisual` (void-book, audit verdict: thin) gains a
    **foredge** — a 4px column on the right edge with its own
    page-block gradient and a 1px page-top highlight — making
    it read as a hardbound book with thickness rather than a
    flat swatch. Plus a faint blind-deboss panel around the BFS
    wordmark.
  - `StickyVisual` (sticky-voids, audit verdict: thin) gains
    **per-pad edge thickness** (6px darker strip along each
    pad's bottom edge implying stack depth), an **adhesive
    band** hint on the middle pad's top, and a **corner curl**
    triangle peel on the top pad's top-right.
  - `PlannerVisual` gains a half-page edge tilt path on the
    right edge to imply fanned spreads.
  - All defs (`linearGradient`, `radialGradient`) namespaced
    per visual (`nbFloor`, `csFloor`, `spFloor`, `stFloor`,
    `pnFloor`, `plFloor` etc.) so multiple visuals on one page
    don't id-collide.
- `src/app/globals.css` (lines 313–330, 1103–1207) — Three
  blocks of CSS changes:
  - **SplitText timing.** `.split-char` transition cut from
    `var(--dur-6)` (1400ms) → `var(--dur-5)` (900ms), and the
    opacity cut from `var(--dur-3)` → `var(--dur-2)`. Affects
    every section title — hero "Dark Matter." finishes
    approximately 500ms sooner; mid-page titles snap rather
    than drift.
  - **Figure transforms.** Rise-on-hover moved off the
    `.chapter-figure-frame` (where Tilt's inline JS transform
    would clobber CSS hover) and onto the outer
    `.chapter-figure` element, where CSS owns it. The frame
    gets `isolation: isolate` so the specular's
    `mix-blend-mode: screen` is sandboxed to the plate.
    Registration-mark pseudos kept on `::before` / `::after`
    (z-index: 3); specular layer at z-index: 2; SVG at
    z-index: 1; studio light at z-index: 0.
  - **New layers.** `.chapter-figure-light` rule: two stacked
    radial gradients (top highlight + floor contact). 
    `.chapter-figure-specular` rule: a single 180-px radial
    at `var(--mx, 50%) var(--my, 50%)`, opacity 0 by default,
    1 on `:hover` of the frame, `mix-blend-mode: screen`,
    falling back to centred radial when Tilt is inactive
    (touch / reduced motion).
  - **Reduced-motion guard.** `prefers-reduced-motion: reduce`
    zeros all chapter-figure transforms and hides
    `.chapter-figure-specular` entirely (it's a hover affect,
    pointless without pointer motion).

**Verification.**

- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. Five routes prerendered statically;
  no new client-component cost beyond using the previously-unused
  `Tilt` component.
- Live HTML inspection on `bun run start` (after killing a stale
  May-12 server process holding port 3000): served HTML contains
  `class="tilt chapter-figure-frame"`, six instances of
  `chapter-figure-light`, six instances of `chapter-figure-specular`,
  six `chapter-figure-cap` rows with the new two-span split.
  Page weight: 141 KB HTML (unchanged within rounding from the
  prior ship; all additions are CSS rules + SVG markup, no JS
  bundle growth).
- Reduced-motion path: Tilt early-returns on
  `prefers-reduced-motion: reduce`, leaving frame transform at
  default; CSS guard hides the specular layer; figure outer
  hover-rise is also zeroed. Result: figures render with
  studio-light layer only, no motion, no specular.
- Touch path: Tilt early-returns on non-`pointer: fine`, leaving
  `--mx` / `--my` unset; specular falls back to its `50% 50%`
  default and stays at opacity 0 (no `:hover` on touch). Outer
  figure transform also no-ops without hover. Result: identical
  to reduced-motion path.

**Expected impact.**

- Catalogue figures now read as *photographed objects on a lit
  plinth* rather than CSS hover icons. Pointer-tracked tilt +
  cursor-bound specular is the single largest swing on this page
  from "polished editorial template" toward "object portrait"
  register.
- Notebook and sticky-pads were the thinnest two visuals per
  audit; both now carry a material-identity move
  (foredge / corner-curl + edge-thickness) instead of reading as
  flat rectangles.
- SplitText timing cut means the hero "Dark Matter." reveal now
  resolves at roughly 1.45s post-curtain (down from 1.95s), and
  mid-page section titles snap in under 1s instead of drifting
  in over 1.7s.
- No bundle growth, no new dependency, no SSR cost change. All
  motion stays gated behind `(pointer: fine) and
  (prefers-reduced-motion: no-preference)`.

**Files modified.**

- `src/app/page.tsx`
- `src/components/product-visuals.tsx`
- `src/app/globals.css`

**Files unchanged but newly load-bearing.**

- `src/components/tilt.tsx` — pre-existing, previously unused;
  now drives all six chapter figures.

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Hero parallax sign flip.** Audit found the hero title
      currently parallaxes *against* scroll direction
      (`calc(var(--scroll-y) * -0.35px)`), causing the title to
      race the viewport upward and break read-order against the
      lede/CTAs. Flip the sign to a positive fractional rate
      (+0.12 to +0.18) and gate to the hero's own
      IntersectionObserver so it only applies while the hero is
      on-screen. One-line change, large perceptual win. The
      `src/components/parallax-root.tsx` channel already exists.
- [ ] **Chapter rail → continuous progress.** Rail is currently
      a binary on/off indicator (width 14 → 26 px on
      `aria-current`). Subscribe to a per-section IntersectionObserver
      with `intersectionRatio` tracked into a CSS variable so
      the active rule grows continuously through the section
      rather than snapping. Connect to the existing scroll-progress
      bar so the two indicators read as one instrument.
- [ ] **Hero → marquee handoff.** Currently three flat siblings
      (radial-bg hero → `#050505` marquee → bordered section)
      with no easing between them. Stage with `position: sticky`
      on hero (or 100vh sentinel) so marquees slide *up over*
      the hero rather than after it. Or clip-path the hero from
      `inset(0)` → `inset(0 0 100% 0)` over the first viewport.
- [ ] **Nav scrolled state.** Nav is fixed but never contracts,
      never sheds the `Vol. III · MMXXVI` sub-label, never adds
      a hairline bottom border. After ~30vh of scroll, contract
      vertical padding, drop sub-label, tighten letter-spacing.
      Cheap; immediate register change between "title page" and
      "deep in the issue."
- [ ] **Per-section SplitText stagger calibration.** Global
      duration cut shipped this run, but per-section staggers
      (currently 0.025–0.05) could be tuned per surface — hero
      slower/cinematic, mid-page snappier. Probably one
      `--split-stagger` variable + per-section overrides.
- [ ] **Apple touch icon + `manifest.webmanifest`.** Carried
      forward from the SEO ship; still outstanding.
- [ ] **OG image: load Instrument Serif as buffer.** Carried
      forward; OG currently falls back to `ui-serif`.
- [ ] **Lighthouse baseline.** Still no measured baseline.

---

## 2026-05-13 — Editorial colophon (outro: dead-link footer → masthead)

**Area:** Outro / trust surface. Replaces the previous footer
register (four `href="#"` links — Terms / Privacy / Studio /
Instagram — plus a mobile-broken disclaimer line) with an editorial
colophon spread: a small italic-serif `§ Colophon` label and a
hairline-ruled four-cell `<dl>` masthead carrying *Set in* (Instrument
Serif · Inter), *Printed* (Studio · Lat 0° 0′ N · Lon 0° 0′ W),
*Dispatch* (48 hours · Worldwide), and *Correspondence* (a real
`mailto:studio@blacksforsale.studio`). The four footer links are
rewired to real in-page anchors (`#supplies`, `#manifesto`, `#cult`,
`#faq`) plus a fifth `mailto:` Studio link. A new italic sign-off
line lives below the wordmark.

**Why this was the highest-leverage target.**
Phase-1 audits converged on three findings: (a) the outro is the
weakest section, (b) four visible dead `href="#"` links hurt
E-E-A-T and credibility, (c) no contact surface exists anywhere.
Phase-1 reference-scout independently surfaced the Aesop / Bureau
Borsche / Officine Universelle Buly colophon aesthetic — masthead-
sized credit page typeset in serif/sans pair with hairline rules —
as a one-run move that takes the outro from "footer" to "credit
page of the issue." The literal string "BFS / Colophon" already
existed in the outro grid header, but no colophon followed; this
ship delivers on that promise. Bigger bets (six SVG product visuals
elevated to "object portraits"; page-turn chapter transitions;
cursor state machine) are logged below for future runs.

Refs scouted: Aesop / Buly product pages (set-in, printed, year
credits), Bureau Borsche editorial archives (object-as-glyph),
Studio Dumbar (hairline ledger discipline).

**What changed.**

- `src/app/page.tsx` (outro block, lines 513–602) — Rewrote the
  outro footer. Header grid now reads "BFS · Colophon" / "Lat 0° ·
  Lon 0°" / "Edition III · MMXXVI" / "Folio · Vol. III" (the bare
  `↓` glyph is gone). The CTAs row is unchanged. Below it, a new
  `<section aria-labelledby="colophon-heading">` wraps a `<dl>` of
  four `<div>`-grouped `<dt>` / `<dd>` pairs. Disclaimer paragraph
  rewritten to drop the platform-false "back button is in the
  upper-left of this window" line — now "close the tab — we'll both
  move on with our day," which reads correctly on mobile, on
  Windows, and inside in-app webviews. The `outro-links` div became
  a `<nav aria-label="Footer">` with five anchors, all real
  destinations (four in-page, one `mailto:`). New `<p
  className="outro-signoff">` below the wordmark: italic
  "MMXXVI · Made in the absence of light. All wrongs reserved."
- `src/app/globals.css` — Appended ~120 lines: `.outro-colophon-wrap`,
  `.outro-colophon-label` (italic serif § + small-caps "Colophon"),
  `.outro-colophon` (responsive grid: 1 col mobile, 2 col ≥720px,
  4 col ≥1080px; borders drawn per-breakpoint so the grid reads as
  a ledger, not a CSS table), `.outro-colophon-row` (per-cell
  padding + interior rules), `.outro-colophon-key` (italic serif
  label register), `.outro-colophon-val` (white body with italic
  serif inflection on the `<em>` typeface name), `.outro-colophon-mail`
  (underline-on-hairline mailto with a focus-visible ring), and
  `.outro-signoff` (centred quiet italic closer).
- `src/app/globals.css` (reduced-motion block, ~line 2596) — Added
  `html.scroll-smooth { scroll-behavior: auto; }` inside
  `@media (prefers-reduced-motion: reduce)`. The Tailwind
  `.scroll-smooth` class on `<html>` (set in `layout.tsx:152`)
  applies `scroll-behavior: smooth` unconditionally; this overrides
  it for users with vestibular preferences so anchor jumps snap
  instead of slide.

**Verification.**

- `bun run lint` — clean (one unescaped apostrophe in the rewritten
  disclaimer was flagged and fixed: `we'll` → `we&rsquo;ll`).
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. All seven routes prerender statically
  (`/`, `/_not-found`, `/opengraph-image`, `/robots.txt`,
  `/sitemap.xml` plus the implicit metadata routes).
- Footer link audit: zero `href="#"` remaining in the page. Five
  links resolve to real targets: four in-page anchors and one
  `mailto:`.
- Disclaimer copy: no longer references the browser back button or
  the "upper-left of this window," so it reads correctly on iOS, on
  Android, inside webviews, and on Windows where back is in the
  upper-right.
- a11y: the `<dl>` carries an `aria-labelledby` pointing at a real
  `<h3 id="colophon-heading">`; the mailto link has a
  `focus-visible` outline that contrasts on the dark base.
- prefers-reduced-motion: anchor jumps now snap (verified by
  inspecting the new rule order — the Tailwind utility is the
  initial declaration, the reduced-motion override comes after in
  the cascade).

**Expected impact.**

- E-E-A-T: removing four visible dead links closes the most obvious
  trust gap on the page. Search engines and human readers both stop
  encountering placeholder anchors.
- Trust: a real `mailto:` exists in the colophon AND in the footer
  nav, addressing the "no contact surface anywhere" follow-up
  carried over from the prior two runs.
- SOTD register: the colophon block reads as a deliberate editorial
  choice rather than a generic footer — the move that takes the
  outro from "footer" to "credit page of the issue."
- a11y: `prefers-reduced-motion` users no longer get forced smooth
  scroll on anchor navigation.
- Web Vitals: no client JS added; the new section is pure HTML +
  CSS; one new `<Reveal>` IntersectionObserver instance only.

**Files modified.**

- `src/app/page.tsx`
- `src/app/globals.css`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Wire the newsletter to a real destination.** Currently
      `setSubmitted(true)` only — the email is captured client-side
      and discarded on refresh. A Resend / Loops / Buttondown call
      via a server action would make the channel real.
- [ ] **Six SVG product visuals → object portraits.** Big bet from
      this run's reference-scout. Replace the current flat SVGs
      with composed object portraits (radial rim-light gradient +
      hairline outline + placard caption block typeset in the
      existing serif). Per-spread `IntersectionObserver` emits a
      `--spread-progress` CSS var so the caption drifts against the
      static object on scroll. CSS-only, one focused run.
- [ ] **Chapter rule between spreads.** Single full-bleed 1px
      element whose `scaleX` is driven by the chapter rail's
      existing `IntersectionObserver`. Reads as a page-turn caesura
      between chapters. Re-uses already-present infrastructure.
- [ ] **Cursor state machine.** Today the custom cursor toggles
      `data-cursor="link"` only. A three-state machine
      (`default | cta | type`) with a thin ring → crosshair → hairline
      scrubber would lift the interaction layer.
- [ ] **Cursor `pointermove` rAF throttle.** Audit flagged
      `cursor.tsx:20–66` as updating the dot synchronously on every
      pointermove (~60+/s without throttling). Wrap in a
      `pending` flag so only one update is scheduled per frame.
- [ ] **Workspace-root warning at build.** Multi-lockfile warning
      from `next build` ("detected /Users/rokgoropevsek/bun.lock");
      set `turbopack.root` in `next.config.ts` or remove the stray
      home-directory lockfile.
- [ ] **Lighthouse / Web Vitals baseline.** Still no measured pass.
      A baseline LCP / CLS / INP number would let future runs
      target the worst metric instead of guessing.
- [ ] **`apple-touch-icon` + `manifest.webmanifest`.** Carried over
      from the SEO-foundation run. iOS bookmarks and Android PWA
      installs still fall back to a light icon on a non-dark base.

---

## 2026-05-13 — Chapter rail (sticky right-edge index, IntersectionObserver-tracked)

**Area:** Wayfinding & editorial signature. Adds a thin fixed rail at
the right edge with five Roman-numeral marks (I–V) mapped to the five
anchorable sections — `#top`, `#supplies`, `#manifesto`, `#cult`,
`#faq`. Each mark is a hairline rule plus an italic numeral; the
active section is tracked via `IntersectionObserver` and reveals a
serif label ("Atelier / Catalogue / Position / Cult / Notes") that
slides in from the right. Hover and focus reveal the same label.
Click-jumps use existing `html.scroll-smooth`. The rail uses
`mix-blend-mode: difference` so it stays legible across the dark
catalogue and the inverted stat-band white spread.

**Why this was the highest-leverage target.**
Phase-1 audits surfaced three Awwwards-tier candidates: (a) refresh
the six SVG product visuals (multi-run "big bet"), (b) add a sticky
chapter index rail (single-run, distinctive editorial signature),
(c) add a film-grain overlay (already present via `.grain`). The
reference-scout synthesis flagged the chapter rail as the missing
*material* layer — it's the move that takes the site from "animated
dark page" to "limited-edition object you're flipping through." It
also closes a real navigation gap: the only way to reach `#manifesto`
or `#faq` from anywhere mid-page was to scroll. The rail is also
the kind of detail-at-every-zoom signature an Awwwards juror notices
without being told to.

Refs scouted: Cup of Couple, Family New (chapter-numbered editorial),
Studio Dumbar (typographic stamp / seal), Aesop (column-rule
discipline). The rail leans into the existing CH. 02 / CH. 03 chapter
register already used in section eyebrows.

**What changed.**

- `src/components/chapter-rail.tsx` *(new, 86 lines)* — Client
  component. Five hard-coded chapters resolved at mount via
  `document.getElementById`. An `IntersectionObserver` with
  `rootMargin: "-30% 0px -50% 0px"` and a multi-step threshold ladder
  tracks intersection ratios; the section with the highest ratio
  becomes active. Renders a `<nav aria-label="Chapter index">` with an
  ordered list of anchor links carrying `aria-current="true"` on the
  active item. Each link declares `data-cursor="link"` and
  `data-cursor-label` so the existing custom cursor reads the section
  name on hover.
- `src/app/layout.tsx` — Imports and mounts `<ChapterRail />` inside
  `<body>`, after `{children}` and before `<CartDrawer />`.
- `src/app/globals.css` — Appended `.chapter-rail` block (~115 lines)
  with hairline rule, italic Instrument-Serif numeral, italic serif
  label that reveals on hover/focus/active. Hidden below 900px;
  `mix-blend-mode: difference` so it survives the white stat-band
  inversion. `prefers-reduced-motion: reduce` strips the slide-in
  transform and width-expansion transition.
- `src/components/scroll-progress.tsx` — Defensive a11y fix from the
  audit: the scroll-progress bar now early-returns under
  `prefers-reduced-motion: reduce` instead of attaching the scroll
  listener. Bundled because both touch the same scroll/navigation
  layer.

**Verification.**

- `bun run lint` — clean.
- `bunx tsc --noEmit` — clean.
- `bun run build` — clean. Five routes prerendered statically.
- Reduced-motion gating: visually inspected CSS rules; transitions
  removed for `.chapter-rail-label` and `.chapter-rail-rule`.
- Keyboard nav: anchor links are real `<a href="#…">`, naturally
  tabbable; focus-visible reveals the label via the same selector
  as hover.

**Expected impact.**

- Distinctive editorial signature visible on every scroll position
  at ≥900px — a small "I/II/III/IV/V" mark with a hairline rule is a
  tell-tale of award-tier editorial work (Cup of Couple, Family New,
  Studio Dumbar).
- Real wayfinding: mid-page users can now jump to manifesto, cult,
  or FAQ without scroll-hunting. Reduces the page's "endless scroll"
  feel.
- A11y: ScrollProgress no longer animates under reduced-motion;
  ChapterRail respects the same preference.
- Performance: zero new dependencies, ~86-line client component,
  single `IntersectionObserver`. No scroll listeners. No CLS — the
  rail is fixed-positioned and doesn't reflow content.

**Files modified.**

- `src/components/chapter-rail.tsx` *(new)*
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/scroll-progress.tsx`

**Follow-ups uncovered (TODO for future runs).**

- [ ] **Product SVG visuals refresh.** Audit #1 highest-priority. Six
      flat label-heavy SVGs in `src/components/product-visuals.tsx`
      undermine the typographic ambition everywhere else. Big bet:
      dimensional illustrations or 3D-rendered objects with cast
      shadows. Single biggest visual win remaining.
- [ ] **Oversized section display type.** Audit #6. Section titles
      cap at 144px; Awwwards work breaks grid with 200px+ display
      faces and asymmetric scale. Push `.section-title` ceiling and
      introduce a second display size for "moment" titles.
- [ ] **Scroll-velocity-driven type weight.** Reference-scout flag.
      Body text leans/thickens under fast scroll, settles when still.
      Implement with a `useVelocity` hook or a CSS scroll-driven
      animation when supported.
- [ ] **Manifesto sticky title typography break.** Audit #9. The
      sticky manifesto h2 recycles the standard `.section-title`
      treatment; it should break rhythm with an oversized display
      face to signal the structural shift.
- [ ] **FAQ accordion motion.** Audit #8. Items expand with no
      easing on the answer block, no line-height shift on open. Add
      Motion or CSS `interpolate-size: allow-keywords` for the
      height transition.
- [ ] **Marquee reverse-pass legibility.** Audit #2. Reverse marquee
      stroke at 8% opacity is jarring against 92% solid forward
      text. Unify directional emphasis strategy.
- [ ] **Spotlight mobile fallback.** Audit #5. Hero spotlight is
      desktop-pointer-only; touch users see a static gradient void.
      Tap-to-reveal or scroll-linked alternative.
- [ ] **Skip-to-content link.** A11y audit #1. Add
      `<a href="#main">Skip to content</a>` before the loader, plus
      `id="main"` on the page wrapper.
- [ ] **Cart drawer Escape `preventDefault`.** A11y audit #4.
      Defensive `e.preventDefault()` in the Escape handler.
- [ ] **Apple touch icon + web manifest.** Carried forward.
- [ ] **Outro disclaimer mobile copy bug.** Carried forward —
      mentions "back button in the upper-left of this window."
- [ ] **Lighthouse baseline.** Carried forward.

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
