# Risk rules — direct commit vs. PR-mode

The improvement-cycle routine usually commits straight to `main`
(an hourly autonomous run can't wait for review). But some ships
deserve a second look before they land. This file defines the
threshold.

Risk is scored **on the spec, before implementation**, by the picker
in Phase 2. Three bands:

```
low     → commit to main, push (the default; ~80% of runs).
medium  → commit to main, push, BUT capture screenshots on both
          viewports and surface them in the IMPROVEMENTS.md entry.
high    → branch off main, commit on branch, push branch,
          open a PR via `gh pr create` — do NOT commit to main.
```

## High-risk triggers (any one matches → high)

- Modifies a **shared primitive** that is consumed by multiple
  surfaces: `src/components/reveal.tsx`, `split-text.tsx`,
  `magnetic.tsx`, `tilt.tsx`, `cursor.tsx`, `parallax-root.tsx`,
  `scroll-progress.tsx`, `chapter-rail.tsx`, `running-folio.tsx`,
  `cart-drawer.tsx`.
- Modifies the **design-token block** at the top of
  `src/app/globals.css` (color, spacing, type-scale, easing,
  duration tokens).
- Modifies `src/app/layout.tsx` (top-level rendering, fonts,
  metadata, JSON-LD).
- Modifies a Next.js config file: `next.config.ts`,
  `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`.
- Modifies `package.json` (any new dep, any version bump).
- Net change `>` 250 lines added + deleted across `src/`.
- Touches `> 8` files under `src/`.
- Removes or renames a public-facing route, anchor (`#supplies`,
  `#manifesto`, `#cult`, `#faq`, `#colophon`), or a sitemap entry.
- Introduces a new client `"use client"` boundary on `layout.tsx`
  or `page.tsx`.

## Medium-risk triggers (any one → medium, unless a high-risk
trigger already escalated it)

- Net change 100–250 lines.
- Touches 4–8 files under `src/`.
- Introduces a new client component anywhere.
- Modifies a sub-component consumed by exactly one surface but
  visible above the fold (hero, nav, scroll-progress).
- Adds a new keyframe / transition that affects layout (height,
  width, transform that changes element size).
- Touches SEO surface: metadata, JSON-LD, sitemap, robots,
  opengraph-image.

## Low-risk default

Everything else.

## PR-mode (high) — the routine's behaviour

When the picker scores `risk: high`:

1. **Phase 4 implementation** happens normally (in main thread or
   parallel implementers).
2. **Phase 5 verification** runs as usual.
3. **Phase 6 commit step** branches:

```bash
slug="<commit-subject-slug>"               # e.g. "primitive-refactor-reveal"
branch="improvement/${slug}-$(date +%Y%m%d-%H%M)"
git checkout -b "$branch"
git add -A
git commit -m "<conventional commit message>"
git push -u origin "$branch"
gh pr create \
  --title "improvement: <subject>" \
  --body-file <(cat <<EOF
## Why this is a PR, not a direct push
$risk_reasons   # one bullet per high-risk trigger that fired

## Spec
$spec_summary

## Files touched
$files_list

## Verification
$verifier_summary
$perf_a11y_summary
$regression_spotter_summary

## Rubric
$rubric_score
EOF
)
```

4. After opening the PR, **switch back to main**:

```bash
git checkout main
```

5. `.claude/improvement/backlog.yaml` still gets the picked item
   flipped to `status: in-progress` (not `shipped` yet — the PR has
   to merge first). The historian on the next run will see it's
   still in-progress and skip it as a candidate.
6. `.claude/improvement/shipped.yaml` is **not** appended until the
   PR merges. A follow-up `chore: backfill shipped.yaml` commit on
   main does the append once the PR is in.

If `gh` is missing or unauthenticated, the routine falls back to
committing on the branch and pushing it — no PR — and logs the
fallback in the IMPROVEMENTS.md entry. The branch sits there until
a human opens the PR.

## Medium-risk — the routine's behaviour

When the picker scores `risk: medium`:

- Standard commit-to-main flow.
- **Also** run `capture-ship.mjs` for the affected surface(s) at
  both desktop and mobile **before commit**, and embed the
  screenshot paths in the IMPROVEMENTS.md entry.
- Embed a `Risk: medium · <reasons>` line near the top of the
  entry.

## Low-risk — the routine's behaviour

Standard commit-to-main flow. Screenshot only the primary surface
at desktop; embed path in the IMPROVEMENTS.md entry.

## Picker contract

The picker (Phase 2 in the main thread) MUST emit a `risk:` field
alongside the rubric scores. If it doesn't, default to `medium`
(safer than `low`, less disruptive than `high`).

If the picker is uncertain, **prefer the higher band**. The cost
of a needless PR is small; the cost of a regression shipped
straight to main is high.
