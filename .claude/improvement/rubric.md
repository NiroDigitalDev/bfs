# Awwwards-readiness rubric

The improvement cycle picks **one** focus per run. To make picks
reproducible across runs (and across the people / agents doing the
picking), every candidate is scored against this rubric and the
highest combined score wins. Tiebreaker: lower effort.

The rubric is the shared vocabulary. When the SKILL.md says "would
this hold up next to a current SOTD?" — *this* is what that means.

## Axes

Each axis is scored **0–3**.

```
0 — Generic. Could appear on any Next.js template.
1 — Considered. Brand-coherent but not distinctive.
2 — Distinctive. Looks like the BFS register specifically.
3 — Awwwards-grade. A jury would screenshot it.
```

### 1. Typography (T)

Does the move use type as a *feature*? Real scale, intentional
pairings, variable axes earning their weight, oversized display
where the layout calls for it, italic / serif / hairline vocabulary
matching the brand register.

- **0** — System fonts at default sizes/spacing.
- **1** — Brand fonts loaded; consistent scale.
- **2** — Display moments that *re-typeset* between states; italic
  serif numerals; hairline-rule treatment.
- **3** — Type behaves as a living element — kerning shifts on
  interaction, optical-size axis tied to motion, baseline-break
  errata, typesetting-as-craft visible to a literate eye.

### 2. Motion (M)

Is the motion *designed*, with considered enter/exit, scroll
binding, view transitions, or pointer-bound effects — or is it
just decorative fade-ins?

- **0** — No motion; or stock fade/slide.
- **1** — Reveal-on-scroll, magnetic hovers — competent.
- **2** — Scroll-bound parallax, splittext stagger, mix-blend
  cursor — system-level motion.
- **3** — Motion that is the *point* of the surface (page-turn,
  re-typesetting, draw-in dimensioning, view transitions used as
  navigation).

### 3. Layout (L)

Is the composition *composed* — asymmetry, overlap, broken grid,
intentional whitespace — or is it center-aligned-hero-three-card-
row?

- **0** — Stacked, centered, predictable.
- **1** — Some asymmetry; deliberate margins.
- **2** — Composed spreads with hairline registers, marginalia,
  spec ribbons, overlap.
- **3** — A spread that could be photographed and printed.

### 4. Micro-interaction density (I)

Does *every* interactive element have a considered hover, focus,
active, and disabled state? Are non-obvious touchpoints rewarded
(cursor effects, magnetic edges, plate hovers)?

- **0** — Default browser affordances.
- **1** — Hover and focus styled.
- **2** — Custom cursors, magnetic hovers, splittext reveals on
  text-level elements.
- **3** — Even decorative chrome rewards attention (e.g. running
  folio re-typesetting, plate lines intensifying on figure hover).

### 5. Accessibility under heavy motion (A)

Non-negotiable. Reduced-motion respected, focus order intact,
contrast met, ARIA correct, decorative chrome `aria-hidden`. A
move scoring <2 here is **disqualified** regardless of total.

- **0** — Breaks under reduced-motion or keyboard.
- **1** — Reduced-motion works; minor focus / contrast issues.
- **2** — Reduced-motion graceful; focus / contrast / ARIA correct.
- **3** — A11y is a feature (e.g. plate aria-hidden + canonical
  specs in `<dl>` for AT; AT users get the *better* data).

### 6. Distinctiveness / ownability (D)

Could a competitor's site ship this verbatim? Or is the move
*recognisably BFS* — extending the established register
(Instrument Serif italic, hairlines, italic numerals, mix-blend
chrome, codex voice)?

- **0** — Generic SaaS pattern.
- **1** — Stock editorial move.
- **2** — Extends the BFS register.
- **3** — Could be screenshotted and identified as BFS at a glance.

## Picking the focus

For each candidate, fill in:

```
candidate: <name>
T: <0–3>   M: <0–3>   L: <0–3>   I: <0–3>   A: <0–3>   D: <0–3>
effort:    S | M | L
total:     <sum>
disqualified: <true if A < 2 OR not Out-of-Scope-clean>
```

**Ship the highest `total` that is not disqualified.**
**Tiebreaker 1:** lower effort.
**Tiebreaker 2:** higher D (distinctiveness).
**Tiebreaker 3:** surface variety — prefer a surface that hasn't
shipped recently (see `shipped.yaml` — last 5 ships).

**Abort threshold.** If the highest non-disqualified total is **≤ 8**,
do not force a ship. Append every candidate to `backlog.yaml`,
update IMPROVEMENTS.md with a one-line "no focus this run" entry
naming the highest-scoring candidate and why it didn't clear the
bar, and stop. The commit-and-push step still runs (so the new
backlog state is persisted).

## Why a rubric

Without one, "Awwwards-grade" drifts toward whatever the picker
finds emotionally exciting that hour. The rubric forces every
candidate through the same six questions, makes picks justifiable
in the IMPROVEMENTS.md entry, and lets the historian agent diff
"what we said would score 3" against "what actually shipped."

Total range: 0–18.
- 0–6   — generic. Don't ship.
- 7–10  — competent. Ship only if backlog is otherwise empty.
- 11–14 — distinctive. Ship.
- 15–18 — Awwwards-grade. Ship now, push hard.

Use these bands in IMPROVEMENTS.md entries:
`Rubric: T2 M3 L2 I2 A3 D3 = 15 / Awwwards-grade.`
