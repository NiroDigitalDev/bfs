#!/usr/bin/env node
//
// PR-merge close-the-loop for the improvement-cycle routine.
//
// Runs at the top of every hourly cron (Phase 0). Queries GitHub for
// improvement-cycle PRs merged since the last run, then backfills
// .claude/improvement/backlog.yaml and shipped.yaml so the historian
// doesn't carry stale in-progress items forward.
//
// Usage:
//   node .claude/improvement/scripts/pr-status.mjs
//
// Exits 0 always (graceful skip when gh is unauthed / missing).
// Writes to stdout for the routine to consume. Format:
//
//   merged: <list of PR refs>
//   updated: <list of backlog ids flipped to shipped>
//   appended: <list of shipped.yaml ids added>
//
// Or `skipped: <reason>` on graceful-degrade paths.

import { spawnSync, execFileSync } from 'node:child_process';
import { existsSync, readFileSync, appendFileSync, writeFileSync } from 'node:fs';

const STATE = '.claude/improvement/state.yaml';
const BACKLOG = '.claude/improvement/backlog.yaml';
const SHIPPED = '.claude/improvement/shipped.yaml';
const BRANCH_PREFIX = 'improvement/';
const LOOK_BACK_HOURS = 36; // a little more than the cron interval, just in case

function log(...a) {
  console.error('[pr-status]', ...a);
}

function hasGh() {
  try {
    const r = spawnSync('gh', ['auth', 'status'], { encoding: 'utf8' });
    return r.status === 0;
  } catch {
    return false;
  }
}

function ghPrList() {
  // Last 20 merged PRs sorted by merge time; we'll filter to ones from
  // an improvement-cycle branch.
  const out = execFileSync(
    'gh',
    [
      'pr',
      'list',
      '--state',
      'merged',
      '--limit',
      '20',
      '--json',
      'number,title,headRefName,mergedAt,mergeCommit,body',
    ],
    { encoding: 'utf8' },
  );
  return JSON.parse(out);
}

function readState() {
  if (!existsSync(STATE)) return { last_run_at: '' };
  // Tiny YAML reader — we only need `last_run_at:` for this filter.
  const src = readFileSync(STATE, 'utf8');
  const m = src.match(/^last_run_at:\s*(.+)$/m);
  return { last_run_at: m ? m[1].trim().replace(/['"]/g, '') : '' };
}

function readShippedIds() {
  if (!existsSync(SHIPPED)) return new Set();
  const src = readFileSync(SHIPPED, 'utf8');
  return new Set([...src.matchAll(/^\s+-\s+id:\s+(\S+)/gm)].map((m) => m[1]));
}

function readBacklog() {
  if (!existsSync(BACKLOG)) return null;
  return readFileSync(BACKLOG, 'utf8');
}

function slugFromBranch(branch) {
  // improvement/<slug>-YYYYMMDD-HHMM → <slug>
  if (!branch.startsWith(BRANCH_PREFIX)) return null;
  const after = branch.slice(BRANCH_PREFIX.length);
  return after.replace(/-\d{8}-\d{4}$/, '');
}

function flipBacklogItem(src, id) {
  // Walk YAML line-by-line. Find `id: <id>` under items; in the same
  // block, replace `status: in-progress` → `status: shipped`.
  const lines = src.split('\n');
  let inItem = false;
  let matched = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*-\s+id:\s+/.test(lines[i])) {
      const m = lines[i].match(/id:\s+(\S+)/);
      inItem = m && m[1] === id;
      if (inItem) matched = true;
    } else if (inItem && /^\s*status:\s+in-progress/.test(lines[i])) {
      lines[i] = lines[i].replace('in-progress', 'shipped');
      inItem = false;
    } else if (inItem && /^\s*-\s+id:/.test(lines[i])) {
      inItem = false;
    }
  }
  return { src: lines.join('\n'), changed: matched };
}

function appendShipped(entry) {
  const yaml = readFileSync(SHIPPED, 'utf8');
  const block = `
  - id: ${entry.id}
    title: ${JSON.stringify(entry.title)}
    commit: ${entry.commit}
    date: ${entry.date}
    surface: pr-merged
    tags: [pr-merged, autonomous-backfill]
    summary: ${JSON.stringify(entry.title)}
`;
  writeFileSync(SHIPPED, yaml.replace(/\s*$/, '') + block);
}

async function main() {
  if (!hasGh()) {
    console.log('skipped: gh not authed');
    return;
  }

  const state = readState();
  const sinceMs = state.last_run_at ? Date.parse(state.last_run_at) : 0;
  const cutoffMs = Date.now() - LOOK_BACK_HOURS * 3600 * 1000;
  const cutoff = Math.max(sinceMs, cutoffMs);

  let prs;
  try {
    prs = ghPrList();
  } catch (e) {
    console.log('skipped: gh pr list failed:', e.message.slice(0, 120));
    return;
  }

  const candidates = prs.filter((p) => {
    if (!p.headRefName?.startsWith(BRANCH_PREFIX)) return false;
    if (!p.mergedAt) return false;
    return Date.parse(p.mergedAt) > cutoff;
  });

  if (!candidates.length) {
    console.log('merged: 0');
    return;
  }

  const shippedIds = readShippedIds();
  const backlogSrc = readBacklog();
  let backlogOut = backlogSrc;

  const updated = [];
  const appended = [];

  for (const pr of candidates) {
    const slug = slugFromBranch(pr.headRefName);
    if (!slug) continue;

    if (backlogOut) {
      const flip = flipBacklogItem(backlogOut, slug);
      if (flip.changed) {
        backlogOut = flip.src;
        updated.push(slug);
      }
    }

    if (!shippedIds.has(slug)) {
      appendShipped({
        id: slug,
        title: pr.title,
        commit: pr.mergeCommit?.oid?.slice(0, 7) || 'merged',
        date: pr.mergedAt.slice(0, 10),
      });
      appended.push(slug);
    }
  }

  if (backlogOut && backlogOut !== backlogSrc) {
    writeFileSync(BACKLOG, backlogOut);
  }

  console.log('merged:', candidates.map((p) => `#${p.number}`).join(',') || '0');
  if (updated.length) console.log('updated:', updated.join(','));
  if (appended.length) console.log('appended:', appended.join(','));
}

main().catch((e) => {
  console.error('[pr-status] unhandled:', e.message);
  process.exit(0); // graceful
});
