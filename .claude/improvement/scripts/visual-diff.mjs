#!/usr/bin/env node
//
// Visual-diff for the improvement-cycle routine.
//
// After Phase 6's capture-ship.mjs produces a new screenshot, this
// script finds the previous shipped commit's screenshot of the SAME
// surface, compares them with pixelmatch, and writes:
//
//   .claude/improvement/screenshots/<cur-sha>/<surface>-<viewport>-diff.png
//
// plus a one-line stdout summary the routine pastes into the
// IMPROVEMENTS.md "**Visual diff**" line:
//
//   diff: <surface> <viewport> <delta%> vs <prev-sha>
//   skipped: <reason>
//
// Uses pixelmatch (auto-installed via bunx) + the pngjs PNG reader.
// Both are small, pure-JS, fast.
//
// Graceful-degrade: exits 0 with `skipped:` if anything is missing.

import { spawnSync, execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v = 'true'] = a.replace(/^--/, '').split('=');
    return [k, v];
  }),
);
const SURFACE = args.surface;
const VIEWPORT = args.viewport || 'desktop';
const THRESHOLD = Number(args.threshold || 0.1); // 0..1 pixel sensitivity
const FLAG_PCT = Number(args.flag || 2);          // flag if delta% ≥ this
const SCREENSHOTS = '.claude/improvement/screenshots';

function log(...a) {
  console.error('[visual-diff]', ...a);
}

if (!SURFACE) {
  console.log('skipped: --surface required');
  process.exit(0);
}

function shortSha() {
  try {
    return execFileSync('git', ['log', '-1', '--format=%h'], { encoding: 'utf8' }).trim();
  } catch {
    return 'pending';
  }
}

function findPrevSha(curSha) {
  // List commit-named subdirs of screenshots/, sorted by mtime desc;
  // first one that isn't the current sha AND has the target image is
  // our "previous."
  if (!existsSync(SCREENSHOTS)) return null;
  const dirs = readdirSync(SCREENSHOTS)
    .filter((d) => {
      const full = `${SCREENSHOTS}/${d}`;
      try {
        return statSync(full).isDirectory() && d !== curSha;
      } catch {
        return false;
      }
    })
    .map((d) => ({
      d,
      mtime: statSync(`${SCREENSHOTS}/${d}`).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  const target = `${SURFACE}-${VIEWPORT}.png`;
  for (const { d } of dirs) {
    if (existsSync(`${SCREENSHOTS}/${d}/${target}`)) return d;
  }
  return null;
}

async function loadPixelmatch() {
  // Try local first.
  try {
    const pm = await import('pixelmatch');
    const png = await import('pngjs');
    return { pixelmatch: pm.default || pm, PNG: png.PNG };
  } catch {
    /* fall through */
  }
  log('installing pixelmatch + pngjs via bunx…');
  const r = spawnSync('bunx', ['--yes', 'npm-install', '--prefix', '/tmp/.imp-vd', 'pixelmatch@^7', 'pngjs@^7'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (r.status !== 0) {
    // Try the standard "bun add --no-save" approach via a tmp install.
    const r2 = spawnSync('bun', ['add', '--no-save', 'pixelmatch@^7', 'pngjs@^7'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (r2.status !== 0) {
      throw new Error('pixelmatch install failed: ' + (r2.stderr || r.stderr || '').slice(-200));
    }
  }
  const pm = await import('pixelmatch');
  const png = await import('pngjs');
  return { pixelmatch: pm.default || pm, PNG: png.PNG };
}

async function main() {
  const curSha = shortSha();
  const curPath = `${SCREENSHOTS}/${curSha}/${SURFACE}-${VIEWPORT}.png`;
  if (!existsSync(curPath)) {
    console.log(`skipped: current screenshot missing (${curPath})`);
    return;
  }

  const prev = findPrevSha(curSha);
  if (!prev) {
    console.log(`skipped: no prior ${SURFACE}-${VIEWPORT}.png to compare`);
    return;
  }
  const prevPath = `${SCREENSHOTS}/${prev}/${SURFACE}-${VIEWPORT}.png`;

  let mod;
  try {
    mod = await loadPixelmatch();
  } catch (e) {
    console.log('skipped: pixelmatch unavailable —', e.message);
    return;
  }
  const { pixelmatch, PNG } = mod;

  const img1 = PNG.sync.read(readFileSync(prevPath));
  const img2 = PNG.sync.read(readFileSync(curPath));

  if (img1.width !== img2.width || img1.height !== img2.height) {
    console.log(
      `skipped: dimensions differ (${img1.width}x${img1.height} vs ${img2.width}x${img2.height}) — likely a resize`,
    );
    return;
  }

  const diff = new PNG({ width: img1.width, height: img1.height });
  const ndiff = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {
    threshold: THRESHOLD,
    diffColor: [255, 0, 0],
    alpha: 0.25,
  });
  const total = img1.width * img1.height;
  const pct = (ndiff / total) * 100;

  const diffPath = `${SCREENSHOTS}/${curSha}/${SURFACE}-${VIEWPORT}-diff.png`;
  writeFileSync(diffPath, PNG.sync.write(diff));

  const flagged = pct >= FLAG_PCT;
  console.log(
    `diff: ${SURFACE} ${VIEWPORT} ${pct.toFixed(2)}% vs ${prev}${flagged ? ' [FLAGGED]' : ''} — ${diffPath}`,
  );
}

main().catch((e) => {
  console.error('[visual-diff] unhandled:', e.message);
  process.exit(0);
});
