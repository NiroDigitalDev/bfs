# Improvement-cycle state

The website-improvement routine (see
`~/.claude/scheduled-tasks/improvement-cycle/SKILL.md`) reads and
writes the files in this directory to keep its state honest across
runs. Without these files, every run would re-discover the same
backlog, re-suggest already-shipped moves, and drift on what
"Awwwards-grade" means.

## Files

| File | Role | Mutation |
|---|---|---|
| `backlog.yaml` | Source of truth for open follow-ups. Decoupled from IMPROVEMENTS.md (which is prose-only). | Read every run by the **historian** and **picker**. Written when items are opened, closed-by-drift, or shipped. |
| `shipped.yaml` | Append-only registry of moves the site already has. Lets the **reference-scout** filter its suggestions and lets the **historian** answer "what's been touched recently?" without re-parsing the prose log. | Append-only. Never delete. |
| `rubric.md` | Awwwards-readiness scoring rubric (6 axes, 0–3 each). Shared vocabulary across auditors, designer, and the synthesis step. | Reference doc. Evolve by PR, not by routine. |
| `lighthouse.csv` *(future)* | Per-run Lighthouse capture. Tracks LCP / CLS / INP / scores over time. | Appended by `perf-a11y` agent. |

`IMPROVEMENTS.md` (at repo root) is the prose history — one entry
per ship, newest first. It's the human-readable record. **Do not
treat it as the working backlog.** Backlog state lives here in YAML.

## Lifecycle of a backlog item

```
        ┌── opened (by an auditor or as a follow-up of a ship)
        │
        ▼
  open ───────► in-progress ──► shipped
        │            │
        │            └──► (also append to shipped.yaml)
        │
        └───► closed-by-drift  (historian verified item is no longer real)
        │
        └───► wontfix         (explicit decision, with reason)
```

The historian agent **must verify** every `open` item against current
code each run before reporting it as eligible. Items that are no
longer real are flipped to `closed-by-drift` with a `last_verified`
date, never silently dropped. This was the single biggest failure
mode of the v1 routine (open items lingered after the underlying
issue was fixed in an unrelated commit).

## How agents use this state

**historian** — reads both YAMLs + recent `git log`, verifies open
items, reports "still-real backlog + recent ships brief."

**reference-scout** — reads `shipped.yaml` for the "don't re-suggest"
filter, reads `backlog.yaml` for the "what's already on deck" filter,
returns 3–5 candidates outside both sets.

**auditor** — reads `backlog.yaml` so it doesn't re-report the same
weakness, reads `rubric.md` so its severity bands are consistent.

**designer** / **copywriter** / **seo-tech** — receive a focus + the
spec to design against; do not touch the state YAMLs directly.

**picker (main thread)** — scores each candidate against `rubric.md`,
records the score in the IMPROVEMENTS.md entry, flips the chosen
item to `in-progress` in `backlog.yaml`.

**Phase 6 (commit step, main thread)** —
1. Append to `shipped.yaml` with the commit SHA.
2. Flip the picked item from `in-progress` → `shipped` in `backlog.yaml`.
3. Update `last_verified` dates the historian touched.
4. Append the prose entry to `IMPROVEMENTS.md`.

## Editing rules

- `backlog.yaml`: edits are routine. Open / close / re-rank freely.
- `shipped.yaml`: append-only. Never rewrite prior entries. If a
  ship is reverted, append a new `reverted-*` entry rather than
  deleting the original.
- `rubric.md`: should change rarely. Treat as a versioned spec.

## Why this exists

Without structured state, every run re-reads ~3,000 lines of prose
log to figure out what's open, fabricates a backlog from memory, and
ends up either re-suggesting moves that already shipped or
re-claiming bugs that are already fixed. The YAMLs collapse that
into ~200 lines of queryable state and a verification contract.
