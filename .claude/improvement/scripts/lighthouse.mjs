#!/usr/bin/env node
//
// Lighthouse runner for the improvement-cycle routine.
//
// Usage:
//   node .claude/improvement/scripts/lighthouse.mjs [--url=URL] [--viewport=desktop|mobile]
//
// Behaviour:
//   - Spawns `bun run start` on localhost:3000 if a server isn't already up
//     (controlled by --no-spawn or LH_NO_SPAWN=1 to skip).
//   - Invokes `bunx --yes lighthouse@latest` against the URL.
//   - Parses LCP/CLS/INP/perf/a11y/bestpractices/seo scores.
//   - Appends one row to .claude/improvement/lighthouse.csv.
//   - Tears down the spawned server.
//
// Designed to **degrade gracefully**: if `bunx lighthouse` errors (chrome
// not available, network sandboxed, etc.), the script prints a one-line
// reason to stderr and exits 0 with no CSV write — so the hourly routine
// keeps going. The perf-a11y agent treats absence of a fresh row as
// "skipped, not failed."
//
// Not committed to package.json — invoked via bunx so we don't pin a
// version or bloat node_modules.

import { spawn, execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { setTimeout as wait } from 'node:timers/promises';

const CSV = '.claude/improvement/lighthouse.csv';
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v = 'true'] = a.replace(/^--/, '').split('=');
    return [k, v];
  }),
);
const URL = args.url || process.env.LH_TARGET || 'http://localhost:3000';
const VIEWPORT = (args.viewport || 'desktop').toLowerCase();
const SPAWN = args['no-spawn'] !== 'true' && process.env.LH_NO_SPAWN !== '1';

function log(...a) {
  console.error('[lighthouse]', ...a);
}

async function pingUrl(url, timeoutMs = 2000) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    return res.status < 500;
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
  // Poll for readiness up to 30s.
  for (let i = 0; i < 60; i++) {
    await wait(500);
    if (await pingUrl(URL, 1000)) {
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

function getCommit() {
  try {
    return execFileSync('git', ['log', '-1', '--format=%h'], { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

async function runLighthouse() {
  log('invoking bunx lighthouse — this can take 30–90s.');
  const preset = VIEWPORT === 'mobile' ? '' : '--preset=desktop';
  const chromeFlags = '--headless=new --no-sandbox --disable-gpu';
  const cmd = [
    'bunx',
    '--yes',
    'lighthouse@latest',
    URL,
    '--output=json',
    '--quiet',
    '--no-enable-error-reporting',
    `--chrome-flags=${chromeFlags}`,
  ];
  if (preset) cmd.push(preset);

  const out = await new Promise((resolve, reject) => {
    const child = spawn(cmd[0], cmd.slice(1), { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (b) => (stdout += b));
    child.stderr.on('data', (b) => (stderr += b));
    child.on('close', (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`lighthouse exited ${code}: ${stderr.slice(-400)}`));
    });
  });

  try {
    return JSON.parse(out);
  } catch (e) {
    throw new Error('lighthouse stdout was not JSON: ' + String(e));
  }
}

function pickMetrics(report) {
  const c = report?.categories ?? {};
  const a = report?.audits ?? {};
  const score = (k) => Math.round(((c[k]?.score ?? 0) * 100));
  const ms = (k) => Math.round(a[k]?.numericValue ?? 0);
  const num = (k) => Number((a[k]?.numericValue ?? 0).toFixed(3));
  return {
    perf: score('performance'),
    a11y: score('accessibility'),
    bestpractices: score('best-practices'),
    seo: score('seo'),
    lcp_ms: ms('largest-contentful-paint'),
    cls: num('cumulative-layout-shift'),
    inp_ms: ms('interaction-to-next-paint') || ms('experimental-interaction-to-next-paint'),
    tbt_ms: ms('total-blocking-time'),
    fcp_ms: ms('first-contentful-paint'),
    si_ms: ms('speed-index'),
    tti_ms: ms('interactive'),
  };
}

function bundleKB() {
  try {
    const path = '.next/static/chunks';
    if (!existsSync(path)) return '';
    const files = readdirSync(path).filter((f) => f.endsWith('.js'));
    const bytes = files.reduce((s, f) => s + statSync(`${path}/${f}`).size, 0);
    return Math.round(bytes / 1024);
  } catch {
    return '';
  }
}

function csvEscape(v) {
  const s = String(v ?? '');
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

async function main() {
  const commit = getCommit();
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
      return; // graceful skip
    }
  }

  let metrics;
  try {
    const report = await runLighthouse();
    metrics = pickMetrics(report);
  } catch (e) {
    log('skipping — lighthouse failed:', e.message);
    if (stopServer) await stopServer();
    return; // graceful skip
  } finally {
    if (stopServer) {
      await wait(200);
      await stopServer();
    }
  }

  const row = [
    new Date().toISOString(),
    commit,
    URL,
    VIEWPORT,
    metrics.perf,
    metrics.a11y,
    metrics.bestpractices,
    metrics.seo,
    metrics.lcp_ms,
    metrics.cls,
    metrics.inp_ms,
    metrics.tbt_ms,
    metrics.fcp_ms,
    metrics.si_ms,
    metrics.tti_ms,
    bundleKB(),
    '',
  ]
    .map(csvEscape)
    .join(',');

  if (!existsSync(CSV)) {
    log('CSV missing — refusing to append without header. Aborting.');
    return;
  }

  appendFileSync(CSV, row + '\n');
  log('appended row:', row);
}

main().catch((e) => {
  log('unhandled error:', e.message);
  // Graceful exit so the hourly routine keeps running.
  process.exit(0);
});
