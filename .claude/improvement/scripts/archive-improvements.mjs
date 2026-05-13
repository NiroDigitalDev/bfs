#!/usr/bin/env node
//
// Archival for IMPROVEMENTS.md. Fires in Phase 0 of every hourly run
// when the prose log exceeds 200 KB. Moves entries older than 60 days
// into a date-namespaced archive file under IMPROVEMENTS/, keeping the
// root file lean for the historian to read.
//
// Strategy:
//   - Parse top-level "## YYYY-MM-DD — Title" headers.
//   - Anything dated > 60 days ago AND not the last 10 entries → archive.
//   - Archive file name: `IMPROVEMENTS/YYYY-MM.md`. Existing archive
//     files get appended to (preserving newest-first order within them).
//
// Output:
//   archived: <N> entries → <list of archive files>
//   skipped: <reason>

import { existsSync, readFileSync, writeFileSync, mkdirSync, appendFileSync, statSync } from 'node:fs';

const SRC = 'IMPROVEMENTS.md';
const ARCHIVE_DIR = 'IMPROVEMENTS';
const SIZE_THRESHOLD = 200 * 1024;
const AGE_DAYS = 60;
const MIN_KEEP_LAST = 10;

if (!existsSync(SRC)) {
  console.log('skipped: IMPROVEMENTS.md missing');
  process.exit(0);
}

const size = statSync(SRC).size;

if (size < SIZE_THRESHOLD) {
  console.log(`skipped: ${size} bytes < ${SIZE_THRESHOLD} threshold`);
  process.exit(0);
}

const src = readFileSync(SRC, 'utf8');

// Split into entries. An entry starts at "## YYYY-MM-DD — " and runs
// until the next "## YYYY-MM-DD — " or end of file. Preserve the
// preamble (top of file before the first entry).
const re = /^## (\d{4}-\d{2}-\d{2}) — /gm;
const matches = [...src.matchAll(re)];
if (matches.length === 0) {
  console.log('skipped: no dated entries found');
  process.exit(0);
}

const preamble = src.slice(0, matches[0].index);
const entries = matches.map((m, i) => ({
  date: m[1],
  start: m.index,
  end: matches[i + 1]?.index ?? src.length,
}));

const NOW = new Date();
const ageDays = (iso) => (NOW - new Date(iso)) / (1000 * 60 * 60 * 24);

// Decide: keep the first MIN_KEEP_LAST entries (they're newest first
// per the routine's convention); archive any others older than AGE_DAYS.
const keep = [];
const archive = [];

for (let i = 0; i < entries.length; i++) {
  if (i < MIN_KEEP_LAST) {
    keep.push(entries[i]);
    continue;
  }
  if (ageDays(entries[i].date) > AGE_DAYS) {
    archive.push(entries[i]);
  } else {
    keep.push(entries[i]);
  }
}

if (!archive.length) {
  console.log('skipped: nothing old enough to archive');
  process.exit(0);
}

// Group archived entries by YYYY-MM.
const byMonth = new Map();
for (const e of archive) {
  const month = e.date.slice(0, 7);
  if (!byMonth.has(month)) byMonth.set(month, []);
  byMonth.get(month).push(src.slice(e.start, e.end));
}

mkdirSync(ARCHIVE_DIR, { recursive: true });
const writtenTo = [];
for (const [month, slabs] of byMonth) {
  const path = `${ARCHIVE_DIR}/${month}.md`;
  const header = existsSync(path)
    ? ''
    : `# Improvements log — archive — ${month}\n\nEntries archived from the root IMPROVEMENTS.md. Newest first.\n\n---\n\n`;
  const body = slabs.join('').trimEnd() + '\n';
  if (existsSync(path)) {
    appendFileSync(path, body);
  } else {
    writeFileSync(path, header + body);
  }
  writtenTo.push(path);
}

// Rewrite the root file with kept entries only.
const newSrc =
  preamble.trimEnd() +
  '\n\n' +
  keep.map((e) => src.slice(e.start, e.end)).join('').trimEnd() +
  '\n';
writeFileSync(SRC, newSrc);

console.log(`archived: ${archive.length} entries → ${writtenTo.join(', ')}`);
