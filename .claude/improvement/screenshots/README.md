# Ship screenshots — local-only

This directory holds per-ship visual artifacts captured by the
improvement-cycle routine.

Layout: `<commit-sha>/<surface>-{desktop,mobile}.png`

Files are gitignored. The directory is tracked via `.gitkeep` so the
capture script doesn't need to create it.

To regenerate manually:

```bash
# Surface ids the script knows about:
#   home, hero, supplies, manifesto, cult (field-notes), faq,
#   outro/colophon, 404

node .claude/improvement/scripts/capture-ship.mjs --surface=supplies
node .claude/improvement/scripts/capture-ship.mjs --surface=manifesto
```

The routine invokes this script automatically as the **last step
before commit** in Phase 6, scoped to whichever surface the focus
landed on. If Playwright isn't installed it'll be auto-installed on
first run into the system cache (~/Library/Caches/ms-playwright on
macOS).

If the capture fails (no server, no chromium, network sandbox) the
script logs the reason to stderr and exits 0 — the routine continues
without a screenshot rather than blocking the ship.
