#!/usr/bin/env node
//
// Per-ship screenshot capture for the improvement-cycle routine.
//
// Usage:
//   node .claude/improvement/scripts/capture-ship.mjs --surface=<id> [--url=URL]
//
// Behaviour:
//   - Spawns `bun run start` on :3000 if no server is up.
//   - Uses Playwright (auto-installed via bunx) to capture two PNGs:
//       desktop  1440 × 900   (full-page screenshot, capped at 4000px)
//       mobile    390 × 844
//     scrolling to the surface's anchor (e.g. #supplies, #manifesto)
//     before capture, then waiting 1500ms for entrance motion to land.
//   - Writes to `.claude/improvement/screenshots/<sha>/<surface>-{desktop,mobile}.png`.
//   - The screenshots directory is gitignored — keep storage local.
//
// Designed to **degrade gracefully** if Playwright can't install or
// Chromium can't run: prints a one-line skip reason and exits 0.
//
// On first run, Playwright will install chromium into the system cache
// (~/Library/Caches/ms-playwright on macOS). Subsequent runs reuse it.

import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { setTimeout as wait } from 'node:timers/promises';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v = 'true'] = a.replace(/^--/, '').split('=');
    return [k, v];
  }),
);
const URL = args.url || process.env.SHIP_TARGET || 'http://localhost:3000';
const SURFACE = args.surface || 'home';
const ANCHOR = args.anchor || ''; // optional explicit anchor; else inferred
const SPAWN = args['no-spawn'] !== 'true';

function log(...a) {
  console.error('[capture-ship]', ...a);
}

const SURFACE_TO_ANCHOR = {
  home: '',
  hero: '#top',
  supplies: '#supplies',
  catalogue: '#supplies',
  manifesto: '#manifesto',
  cult: '#cult',
  'field-notes': '#cult',
  faq: '#faq',
  outro: '#colophon',
  colophon: '#colophon',
  chrome: '',
  404: '/not-a-real-page',
};

function getCommit() {
  try {
    return execFileSync('git', ['log', '-1', '--format=%h'], { encoding: 'utf8' }).trim();
  } catch {
    return 'pending';
  }
}

async function pingUrl(url, timeoutMs = 1500) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const r = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    return r.status < 500;
  } catch {
    return false;
  }
}

async function spawnServer() {
  log('starting `bun run start` on :3000…');
  const child = spawn('bun', ['run', 'start'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false,
  });
  child.stdout.on('data', () => {});
  child.stderr.on('data', () => {});
  for (let i = 0; i < 60; i++) {
    await wait(500);
    if (await pingUrl(URL)) {
      log('server is up.');
      return () => {
        try {
          child.kill('SIGTERM');
        } catch {}
      };
    }
  }
  try {
    child.kill('SIGTERM');
  } catch {}
  throw new Error('server did not become ready within 30s');
}

async function loadPlaywright() {
  // Try resolving from local node_modules first; fall back to bunx install.
  try {
    const mod = await import('playwright');
    return mod;
  } catch {
    log('playwright not found locally — attempting bunx install…');
  }
  // Install on-demand; ignore stderr noise so the script stays quiet.
  await new Promise((resolve, reject) => {
    const c = spawn('bunx', ['--yes', 'playwright@latest', 'install', '--with-deps', 'chromium'], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let err = '';
    c.stderr.on('data', (b) => (err += b));
    c.on('close', (code) => (code === 0 ? resolve() : reject(new Error('install failed: ' + err.slice(-200)))));
  });
  return import('playwright');
}

async function main() {
  const commit = getCommit();
  const outdir = `.claude/improvement/screenshots/${commit}`;
  mkdirSync(outdir, { recursive: true });

  let stopServer = null;
  const reachable = await pingUrl(URL);
  if (!reachable) {
    if (!SPAWN) {
      log('skipping — URL unreachable and --no-spawn set:', URL);
      return;
    }
    try {
      stopServer = await spawnServer();
    } catch (e) {
      log('skipping — server unavailable:', e.message);
      return;
    }
  }

  let pw;
  try {
    pw = await loadPlaywright();
  } catch (e) {
    log('skipping — playwright unavailable:', e.message);
    if (stopServer) await stopServer();
    return;
  }

  const anchor = ANCHOR || SURFACE_TO_ANCHOR[SURFACE] || '';
  const targetUrl = anchor.startsWith('/') ? URL + anchor : URL + (anchor ? anchor : '');

  let browser;
  try {
    browser = await pw.chromium.launch({ headless: true });
    const viewports = [
      { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 2 },
      { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
    ];

    for (const v of viewports) {
      const ctx = await browser.newContext({
        viewport: { width: v.width, height: v.height },
        deviceScaleFactor: v.deviceScaleFactor,
        isMobile: !!v.isMobile,
        reducedMotion: 'no-preference',
        colorScheme: 'dark',
      });
      const page = await ctx.newPage();
      log(`navigating ${v.name} → ${targetUrl}`);
      await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
      // Settle entrance motion + reveal observers + folio typeset.
      await page.waitForTimeout(1600);
      if (anchor && !anchor.startsWith('/')) {
        await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }, anchor);
        await page.waitForTimeout(900);
      }
      const path = `${outdir}/${SURFACE}-${v.name}.png`;
      await page.screenshot({
        path,
        fullPage: !anchor || anchor === '#top',
        animations: 'disabled',
      });
      log('wrote', path);
      await ctx.close();
    }
  } catch (e) {
    log('capture error:', e.message);
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (stopServer) {
      await wait(200);
      await stopServer();
    }
  }
}

main().catch((e) => {
  log('unhandled error:', e.message);
  process.exit(0);
});
