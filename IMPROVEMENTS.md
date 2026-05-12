# Improvements log

A running record of focused changes shipped by the website-improvement routine.
One entry per run. Newest first.

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
