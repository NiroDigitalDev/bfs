#!/usr/bin/env node
//
// Backlog pruner — fires in Phase 0 of every hourly run.
//
// Flips `open` items that have aged past 30 days OR have been
// disqualified twice in a row to `wontfix-stale`, with a one-line
// `notes:` field explaining why. Prevents zombie candidates from
// bloating the picker's pool.
//
// Decisions:
//   - opened_on > 30 days ago AND last_verified > 14 days ago
//       → wontfix-stale (no auditor has refreshed it; system has
//         likely moved past it)
//   - dq_count >= 2  (a `dq_count:` integer the picker increments
//                     each time the item is disqualified)
//       → wontfix-stale
//
// Outputs to stdout the ids that were flipped, for the routine to
// include in the IMPROVEMENTS.md entry.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const BACKLOG = '.claude/improvement/backlog.yaml';
const NOW = new Date();
const STALE_DAYS = 30;
const REFRESH_GAP_DAYS = 14;

function ago(d) {
  return (NOW - new Date(d)) / (1000 * 60 * 60 * 24);
}

if (!existsSync(BACKLOG)) {
  console.log('skipped: backlog.yaml missing');
  process.exit(0);
}

const src = readFileSync(BACKLOG, 'utf8');
const lines = src.split('\n');

// Split into items by detecting `  - id:` at depth 2.
const items = [];
let cur = null;
let header = '';
let seenItems = false;

for (const ln of lines) {
  if (/^\s*-\s+id:\s+/.test(ln)) {
    if (cur) items.push(cur);
    cur = { lines: [ln] };
    seenItems = true;
  } else if (cur) {
    cur.lines.push(ln);
  } else if (!seenItems) {
    header += ln + '\n';
  }
}
if (cur) items.push(cur);

const flipped = [];

for (const it of items) {
  const text = it.lines.join('\n');
  const idMatch = text.match(/^\s*-\s+id:\s+(\S+)/m);
  const id = idMatch ? idMatch[1] : null;
  const statusMatch = text.match(/^\s+status:\s+(\S+)/m);
  const status = statusMatch ? statusMatch[1] : null;
  if (status !== 'open') continue;

  const openedMatch = text.match(/^\s+opened_on:\s+(\S+)/m);
  const verifiedMatch = text.match(/^\s+last_verified:\s+(\S+)/m);
  const dqMatch = text.match(/^\s+dq_count:\s+(\d+)/m);
  const opened = openedMatch ? openedMatch[1] : null;
  const verified = verifiedMatch ? verifiedMatch[1] : null;
  const dq = dqMatch ? Number(dqMatch[1]) : 0;

  let reason = null;
  if (dq >= 2) {
    reason = `disqualified ${dq}× in a row — likely no longer worth shipping`;
  } else if (opened && verified && ago(opened) > STALE_DAYS && ago(verified) > REFRESH_GAP_DAYS) {
    reason = `open for ${Math.floor(ago(opened))} days with no auditor refresh in ${Math.floor(ago(verified))} days`;
  }
  if (!reason) continue;

  // Edit in place: status: open → wontfix-stale, append a notes line.
  it.lines = it.lines.map((ln) => {
    if (/^\s+status:\s+open/.test(ln)) return ln.replace('open', 'wontfix-stale');
    return ln;
  });
  // Inject a notes line directly after status if not already present.
  const statusIx = it.lines.findIndex((ln) => /^\s+status:\s+wontfix-stale/.test(ln));
  if (statusIx >= 0 && !it.lines.some((ln) => /^\s+notes:\s+/.test(ln))) {
    const indent = (it.lines[statusIx].match(/^(\s+)/)?.[1]) || '    ';
    it.lines.splice(statusIx + 1, 0, `${indent}notes: ${JSON.stringify(reason)}`);
  }
  flipped.push({ id, reason });
}

if (!flipped.length) {
  console.log('pruned: 0');
  process.exit(0);
}

const out = header + items.map((it) => it.lines.join('\n')).join('\n');
writeFileSync(BACKLOG, out);

console.log('pruned:', flipped.map((f) => `${f.id} (${f.reason})`).join(' | '));
