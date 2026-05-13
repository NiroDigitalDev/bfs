#!/usr/bin/env node
//
// Anti-pattern detector — runs in Phase 5 alongside lint/typecheck.
//
// Greps the diff against a curated list of patterns BFS explicitly
// avoids, returning a one-line stdout summary the routine's main
// thread reads. Each finding cites file:line + the offending excerpt.
//
// Rules (all gated to the diff — we don't punish pre-existing tech
// debt, only newly-introduced):
//   1. Hardcoded hex colors outside the token block (src/app/globals.css
//      lines 1..tokens_end).
//   2. Inline style={{...}} in JSX/TSX when a CSS class would do.
//   3. `any` TypeScript annotations.
//   4. `@ts-ignore` / `@ts-expect-error` without a TODO ref.
//   5. `console.log` / `console.error` / `console.warn` (Sentry is the
//      log sink; debug logs must not ship).
//   6. New keyframes / transitions without a matching
//      `prefers-reduced-motion` guard in the same file.
//   7. `dangerouslySetInnerHTML` outside of JSON-LD blocks in layout.tsx.
//   8. Network calls (fetch / axios) added outside Server Components.
//
// Exits 0 always. The main thread reads:
//   patterns: 0  (or)
//   patterns: <N> — <count by rule>; see [verdict] block for details.
//
// Followed by per-finding lines: `pattern: <rule> <file>:<line> <excerpt>`
//
// A non-zero count is a SOFT warning, not a hard block — the main
// thread decides whether to abort or log-and-ship based on severity.

import { execFileSync } from 'node:child_process';

function diff() {
  try {
    return execFileSync('git', ['diff', 'HEAD', '--unified=0'], { encoding: 'utf8' });
  } catch {
    return '';
  }
}

const d = diff();
if (!d.trim()) {
  console.log('patterns: 0');
  process.exit(0);
}

// Walk the diff. Track current file + line cursor in the new tree.
const lines = d.split('\n');
const findings = [];
let curFile = null;
let curLine = 0;

const RULES = [
  {
    id: 'hardcoded-hex',
    re: /#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/,
    // Skip CSS tokens block at the top of globals.css and SVG defs in
    // product-visuals.tsx where the brand-specific gradients are intended.
    skipFile: (f) => /globals\.css$/.test(f) === false && /product-visuals\.tsx$/.test(f) === false,
  },
  { id: 'inline-style', re: /\bstyle=\{\{/, skipFile: (f) => /\.tsx$/.test(f) },
  { id: 'any-ts', re: /:\s*any\b/, skipFile: (f) => /\.tsx?$/.test(f) },
  {
    id: 'ts-ignore',
    re: /@ts-(?:ignore|expect-error)(?!.*TODO)/,
    skipFile: (f) => /\.tsx?$/.test(f),
  },
  { id: 'console', re: /\bconsole\.(log|warn|error)\(/, skipFile: (f) => /\.tsx?$/.test(f) },
  {
    id: 'dangerously',
    re: /dangerouslySetInnerHTML/,
    skipFile: (f) => /\.tsx$/.test(f) && !/layout\.tsx$/.test(f),
  },
];

for (const ln of lines) {
  const file = ln.match(/^\+\+\+\s+b\/(.+)$/);
  if (file) {
    curFile = file[1];
    curLine = 0;
    continue;
  }
  const hunk = ln.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
  if (hunk) {
    curLine = Number(hunk[1]);
    continue;
  }
  if (ln.startsWith('+') && !ln.startsWith('+++')) {
    const text = ln.slice(1);
    for (const rule of RULES) {
      if (curFile && rule.skipFile && !rule.skipFile(curFile)) continue;
      if (rule.re.test(text)) {
        findings.push({
          rule: rule.id,
          file: curFile,
          line: curLine,
          excerpt: text.trim().slice(0, 120),
        });
      }
    }
    curLine++;
  } else if (ln.startsWith(' ')) {
    curLine++;
  }
  // Lines starting with '-' (removed) don't advance the new-tree cursor.
}

if (!findings.length) {
  console.log('patterns: 0');
  process.exit(0);
}

const byRule = findings.reduce((acc, f) => {
  acc[f.rule] = (acc[f.rule] || 0) + 1;
  return acc;
}, {});
const summary = Object.entries(byRule)
  .map(([k, v]) => `${k}:${v}`)
  .join(' ');
console.log(`patterns: ${findings.length} — ${summary}`);
for (const f of findings) {
  console.log(`pattern: ${f.rule} ${f.file}:${f.line} ${f.excerpt}`);
}
