#!/usr/bin/env node
//
// Notion sync for the improvement-cycle routine.
//
// Reads/writes the BFS workspace's Tasks + Reports databases via the
// Notion HTTP API. The Notion DB IDs are read from state.yaml so this
// script has no hardcoded UUIDs.
//
// Auth:
//   - Reads $NOTION_TOKEN from the environment.
//   - If unset, exits 0 with `skipped: no NOTION_TOKEN`. The cron's
//     main thread can then fall back to invoking MCP Notion tools
//     directly (the SKILL.md describes both paths).
//
// Subcommands:
//   check-tasks
//     stdout when at least one open task exists:
//       tasks: <N>
//       top-task: <page_id>|<title>|<priority>|<surface(csv)>|<ship-description>
//     stdout when none:
//       tasks: 0
//
//   claim-task <page_id>
//     Flips Status: To do → In progress; sets Started=today.
//
//   complete-task <page_id> <commit-sha>
//     Flips Status: In progress → Done; sets Completed=today; Commit=<sha>.
//
//   release-task <page_id>
//     Flips Status: In progress → To do (used when a run aborts).
//
//   append-report --json-file=<path>
//     Reads a JSON object from the file, creates a new Reports row.
//     JSON shape:
//       {
//         "title": "BFS — 2026-05-13 — <title>",
//         "date": "2026-05-13",
//         "mode": "Shipped|No-focus|Task-driven|PR-opened",
//         "surface": "catalogue|hero|...",
//         "rubric": "T2 M2 L3 I3 A3 D2 = 15",
//         "risk": "Low|Medium|High",
//         "commit": "be5f4c2",
//         "files_changed": "newline-separated",
//         "follow_ups": "newline-separated",
//         "triggers_fired": "csv",
//         "body_markdown": "optional rich body content"
//       }
//
// Graceful-degrade: any HTTP failure logs to stderr, exits 0, stdout
// gets `skipped: <reason>`. The cron continues without breaking.

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';
const STATE_PATH = '.claude/improvement/state.yaml';

// File-path → surface tag mapping. Used by deriveSurface() to backfill
// the Task row's Surface field at complete-task time, so the user
// doesn't have to set it manually. Patterns are matched in order;
// the FIRST match wins, then we move to the next file.
const FILE_SURFACE_RULES = [
  { re: /^src\/app\/checkout\//, surfaces: ['cart'] },
  { re: /^src\/app\/supplies\//, surfaces: ['catalogue'] },
  { re: /^src\/app\/not-found\.tsx$/, surfaces: ['404'] },
  { re: /^src\/app\/(sitemap|robots|opengraph-image)/, surfaces: ['seo'] },
  { re: /^src\/app\/apple-icon|^src\/app\/manifest/, surfaces: ['seo'] },
  { re: /^src\/app\/layout\.tsx$/, surfaces: ['system'] },
  { re: /^src\/components\/cart-/, surfaces: ['cart'] },
  { re: /^src\/components\/index-menu/, surfaces: ['nav'] },
  { re: /^src\/components\/(chapter-rail|running-folio|scroll-progress|cursor|loader|parallax-root|site-chrome)/, surfaces: ['chrome'] },
  { re: /^src\/components\/(specimen-plate|product-visuals)/, surfaces: ['catalogue'] },
  { re: /^src\/components\/faq-item/, surfaces: ['faq'] },
  { re: /^src\/components\/newsletter/, surfaces: ['outro'] },
  { re: /^src\/components\/related-products/, surfaces: ['catalogue'] },
  { re: /^src\/components\/(checkout-form|checkout-summary)/, surfaces: ['cart'] },
  { re: /^src\/components\/(magnetic|tilt|reveal|split-text|spotlight|counter|marquee)/, surfaces: ['system'] },
  { re: /^src\/data\/products/, surfaces: ['catalogue'] },
  { re: /^src\/data\/faqs/, surfaces: ['faq'] },
  { re: /^src\/data\/testimonials/, surfaces: ['field-notes'] },
  { re: /^src\/data\/chapters/, surfaces: ['chrome'] },
  { re: /^src\/lib\//, surfaces: ['system'] },
  { re: /^\.claude\//, surfaces: ['system'] },
  { re: /^IMPROVEMENTS/, surfaces: ['system'] },
  { re: /^public\//, surfaces: ['seo'] },
];

// page.tsx is the homepage spread — multiple surfaces in one file.
// Parse the diff hunks to find section markers. Markers MUST be
// unique to their section (e.g. class-name prefixes that only appear
// in that section's JSX/CSS, never in nav lookup tables or hrefs).
// String "#manifesto" is NOT unique — it appears in nav menus too.
// String "manifesto-rule" IS unique — only in manifesto section CSS.
const PAGE_SECTION_MARKERS = {
  hero: ['hero-frame', 'hero-title', 'hero-meta-row', 'hero-spec-row', 'hero-edge-stem', 'hero-aside-line', 'hero-bottom', 'hero-scroll'],
  catalogue: ['chapter-figure', 'chapter-title', 'chapter-colophon', 'chapter-eyebrow', 'chapter-tags', 'chapter-numeral', 'chapter-lede', 'chapter-actions', 'chapter-permalink', 'colophon-mark', 'specimen-plate', 'SpecimenPlate'],
  manifesto: ['manifesto-rule', 'manifesto-stack', 'manifesto-stat', 'manifesto-quote', 'manifesto-body'],
  'field-notes': ['pull-quote', 'cult-quote', 'cult-marginalia', 'testimonial-'],
  codex: ['codex-row', 'codex-rule', 'codex-numeral', 'survival-codex'],
  colophon: ['publisher-mark', 'colophon-row', 'colophon-key', 'colophon-val'],
  faq: ['faq-item', 'faq-list', 'faq-toggle', 'faq-reply'],
  outro: ['outro-row', 'outro-wordmark', 'outro-disclaimer', 'outro-links', 'outro-colophon', 'outro-signoff', 'Newsletter />'],
  nav: ['nav-logo', 'nav-links', 'nav-center', 'nav-cart', 'IndexMenu', 'nav-cta'],
  cart: ['cart-island', 'cart-drawer', 'CartDrawer', 'cart-line', 'cart-empty'],
};

function deriveSurface(commit) {
  // Returns a deduped CSV string of surface tags inferred from the diff.
  let nameOnly = '';
  let diffBody = '';
  try {
    nameOnly = execFileSync('git', ['diff', '--name-only', `${commit}~1`, commit], { encoding: 'utf8' });
  } catch {
    try {
      // Fallback: just the files in this commit
      nameOnly = execFileSync('git', ['show', '--name-only', '--pretty=format:', commit], { encoding: 'utf8' });
    } catch {
      return '';
    }
  }
  const files = nameOnly
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (!files.length) return '';

  const surfaces = new Set();
  let needsPageDiff = false;

  for (const f of files) {
    if (/^src\/app\/page\.tsx$/.test(f)) {
      needsPageDiff = true;
      continue;
    }
    let matched = false;
    for (const rule of FILE_SURFACE_RULES) {
      if (rule.re.test(f)) {
        rule.surfaces.forEach((s) => surfaces.add(s));
        matched = true;
        break;
      }
    }
    if (!matched && /^src\/app\/globals\.css$/.test(f)) {
      // globals.css alone is ambiguous; we'll resolve via the page.tsx hunks
      // if page.tsx is also in the changeset, else tag system.
      needsPageDiff = true;
    }
    // Files matching nothing fall through silently — better than a noisy 'system' default.
  }

  // Resolve page.tsx (or stand-alone globals.css) by reading the actual diff content.
  if (needsPageDiff) {
    try {
      diffBody = execFileSync(
        'git',
        ['diff', '--unified=0', `${commit}~1`, commit, '--', 'src/app/page.tsx', 'src/app/globals.css'],
        { encoding: 'utf8' },
      );
    } catch {
      diffBody = '';
    }
    // Filter to actually-changed lines (+/-) only. Hunk header lines (@@ ... @@)
    // contain function-context excerpts that leak unrelated symbols into the scan.
    const changedLines = diffBody
      .split('\n')
      .filter((l) => (l.startsWith('+') || l.startsWith('-')) && !l.startsWith('+++') && !l.startsWith('---'))
      .join('\n');
    for (const [surface, markers] of Object.entries(PAGE_SECTION_MARKERS)) {
      for (const m of markers) {
        if (changedLines.includes(m)) {
          surfaces.add(surface);
          break;
        }
      }
    }
    // If page.tsx changed but nothing matched, tag chrome as a safer default
    // than 'system' (page.tsx is rarely truly "system" work).
    if (surfaces.size === 0) surfaces.add('chrome');
  }

  return [...surfaces].sort().join(',');
}

function log(...a) {
  console.error('[notion-sync]', ...a);
}

function readState() {
  if (!existsSync(STATE_PATH)) {
    return null;
  }
  const src = readFileSync(STATE_PATH, 'utf8');
  // Tiny YAML reader — just the notion: subtree.
  const reportsDs = src.match(/^\s+reports_data_source_id:\s+"([^"]+)"/m);
  const tasksDs = src.match(/^\s+tasks_data_source_id:\s+"([^"]+)"/m);
  if (!reportsDs || !tasksDs) return null;
  return {
    reports_data_source_id: reportsDs[1],
    tasks_data_source_id: tasksDs[1],
  };
}

async function notionFetch(path, init = {}) {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error('NOTION_TOKEN unset');
  const r = await fetch(`${NOTION_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  if (!r.ok) {
    const body = await r.text();
    throw new Error(`HTTP ${r.status}: ${body.slice(0, 240)}`);
  }
  return r.json();
}

function richText(s) {
  if (s == null || s === '') return [];
  return [{ type: 'text', text: { content: String(s).slice(0, 1990) } }];
}

function selectValue(name) {
  return name ? { select: { name } } : { select: null };
}

function multiSelect(csv) {
  if (!csv) return { multi_select: [] };
  const names = String(csv)
    .split(/[,\s]+/)
    .filter(Boolean)
    .map((name) => ({ name }));
  return { multi_select: names };
}

function dateValue(iso) {
  return iso ? { date: { start: iso } } : { date: null };
}

// ------- check-tasks -------

async function checkTasks(state) {
  // Query the Tasks data source for Status="To do" sorted by Priority desc then Added asc.
  // Newer Notion API: data sources are queried via /v1/data_sources/<id>/query.
  // For our token, this endpoint is accessible.
  const ds = state.tasks_data_source_id;
  // Try data_sources endpoint first; fall back to databases endpoint for older API tokens.
  let res;
  try {
    res = await notionFetch(`/data_sources/${ds}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          property: 'Status',
          select: { equals: 'To do' },
        },
        sorts: [
          { property: 'Priority', direction: 'descending' },
          { property: 'Added', direction: 'ascending' },
        ],
        page_size: 25,
      }),
    });
  } catch (e) {
    // Older API: same UUID is usable as a database_id.
    res = await notionFetch(`/databases/${ds}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: { property: 'Status', select: { equals: 'To do' } },
        sorts: [
          { property: 'Priority', direction: 'descending' },
          { property: 'Added', direction: 'ascending' },
        ],
        page_size: 25,
      }),
    });
  }

  const results = res.results || [];
  if (!results.length) {
    console.log('tasks: 0');
    return;
  }
  console.log(`tasks: ${results.length}`);
  // Top-task: first result after the priority/added sort.
  const top = results[0];
  const props = top.properties || {};
  const title =
    (props.Title?.title || []).map((t) => t.plain_text).join('') || 'untitled';
  const priority = props.Priority?.select?.name || '';
  const surface = (props.Surface?.multi_select || [])
    .map((s) => s.name)
    .join(',');
  const ship =
    (props['Ship description']?.rich_text || [])
      .map((t) => t.plain_text)
      .join('')
      .replace(/\n/g, ' ⏎ ')
      .slice(0, 1200) || '';
  console.log(`top-task: ${top.id}|${title}|${priority}|${surface}|${ship}`);
}

// ------- claim-task -------

async function claimTask(pageId) {
  const today = new Date().toISOString().slice(0, 10);
  await notionFetch(`/pages/${pageId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      properties: {
        Status: selectValue('In progress'),
        Started: dateValue(today),
      },
    }),
  });
  console.log(`claimed: ${pageId}`);
}

// ------- complete-task -------

async function completeTask(pageId, commit) {
  const today = new Date().toISOString().slice(0, 10);
  const properties = {
    Status: selectValue('Done'),
    Completed: dateValue(today),
    Commit: { rich_text: richText(commit) },
  };
  // Derive Surface from the actual diff and backfill the Task row so the
  // user doesn't have to set it manually. Only sets it if non-empty —
  // existing user-provided values are NOT overwritten when this returns
  // empty (Notion's PATCH semantics omit unchanged fields when you don't
  // include them).
  const surfaceCsv = deriveSurface(commit);
  if (surfaceCsv) {
    properties.Surface = multiSelect(surfaceCsv);
  }
  await notionFetch(`/pages/${pageId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties }),
  });
  console.log(`completed: ${pageId}${surfaceCsv ? ` (Surface: ${surfaceCsv})` : ''}`);
}

// ------- release-task -------

async function releaseTask(pageId) {
  await notionFetch(`/pages/${pageId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      properties: {
        Status: selectValue('To do'),
        Started: dateValue(null),
      },
    }),
  });
  console.log(`released: ${pageId}`);
}

// ------- split-task -------

async function splitTask(state, parentId, jsonPath) {
  // Read a JSON file with the subtask definitions, create N new Task rows
  // (Status: To do), mark the parent as Split, and cross-reference both
  // directions. JSON shape:
  //   {
  //     "parent_title": "Editorial Journal — full scope",  (used as prefix; optional)
  //     "parent_url": "https://notion.so/<id>",            (auto-derived if absent)
  //     "subtasks": [
  //       { "title": "[1/3] Add SiteChrome wrapper",
  //         "priority": "High",
  //         "ship_description": "...",
  //         "notes": "..." },
  //       ...
  //     ]
  //   }
  if (!existsSync(jsonPath)) throw new Error(`json file not found: ${jsonPath}`);
  const data = JSON.parse(readFileSync(jsonPath, 'utf8'));
  if (!Array.isArray(data.subtasks) || data.subtasks.length < 2) {
    throw new Error('split-task requires data.subtasks with at least 2 entries');
  }

  // Fetch parent to get its current title + URL.
  const parent = await notionFetch(`/pages/${parentId}`, { method: 'GET' });
  const parentUrl =
    data.parent_url ||
    parent.url ||
    `https://www.notion.so/${parentId.replace(/-/g, '')}`;
  const parentTitle =
    (parent.properties?.Title?.title || []).map((t) => t.plain_text).join('') ||
    data.parent_title ||
    '(parent)';

  // Create each subtask under the same data source as the parent.
  const subtaskRefs = [];
  const total = data.subtasks.length;
  for (let i = 0; i < total; i++) {
    const st = data.subtasks[i];
    const titlePrefix = `[${i + 1}/${total}] `;
    const fullTitle = st.title.startsWith('[') ? st.title : titlePrefix + st.title;
    const body = {
      parent: { data_source_id: state.tasks_data_source_id },
      properties: {
        Title: { title: richText(fullTitle) },
        Status: selectValue('To do'),
        Priority: selectValue(st.priority || parent.properties?.Priority?.select?.name || 'Medium'),
        'Ship description': { rich_text: richText(st.ship_description || '') },
        Parent: { rich_text: richText(`${parentTitle} — ${parentUrl}`) },
        Notes: { rich_text: richText(st.notes || `Subtask ${i + 1} of ${total} (split from parent).`) },
      },
    };
    let r;
    try {
      r = await notionFetch('/pages', { method: 'POST', body: JSON.stringify(body) });
    } catch {
      const fallback = { ...body, parent: { database_id: state.tasks_data_source_id } };
      r = await notionFetch('/pages', { method: 'POST', body: JSON.stringify(fallback) });
    }
    subtaskRefs.push({ id: r.id, url: r.url, title: fullTitle });
  }

  // Mark the parent as Split and list the subtask URLs in its Subtasks
  // column. Status: Split makes check-tasks ignore it (filter is To do).
  const subtaskList = subtaskRefs.map((s) => `${s.title} → ${s.url}`).join('\n');
  await notionFetch(`/pages/${parentId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      properties: {
        Status: selectValue('Split'),
        Subtasks: { rich_text: richText(subtaskList) },
      },
    }),
  });

  console.log(`split: ${parentId} → ${subtaskRefs.length} subtasks`);
  for (const s of subtaskRefs) {
    console.log(`subtask: ${s.id} ${s.title}`);
  }
}

// ------- append-report -------

async function appendReport(state, jsonPath) {
  if (!existsSync(jsonPath)) throw new Error(`json file not found: ${jsonPath}`);
  const data = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const properties = {
    Title: { title: richText(data.title || 'BFS report') },
    Mode: selectValue(data.mode),
    Surface: selectValue(data.surface),
    Risk: selectValue(data.risk),
    Rubric: { rich_text: richText(data.rubric) },
    Commit: { rich_text: richText(data.commit) },
    'Files changed': { rich_text: richText(data.files_changed) },
    'Follow-ups': { rich_text: richText(data.follow_ups) },
    'Triggers fired': { rich_text: richText(data.triggers_fired) },
  };
  if (data.date) {
    properties.Date = dateValue(data.date);
  }

  const body = {
    parent: { data_source_id: state.reports_data_source_id },
    properties,
  };

  // Optional body content as a single paragraph (Markdown not supported via
  // raw API without parsing — the cron's main thread may follow up by
  // appending block children if it wants rich content).
  if (data.body_markdown) {
    body.children = [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: { rich_text: richText(data.body_markdown) },
      },
    ];
  }

  let r;
  try {
    r = await notionFetch('/pages', { method: 'POST', body: JSON.stringify(body) });
  } catch (e) {
    // Fallback for older API: use parent.database_id with the same UUID.
    const fallback = { ...body, parent: { database_id: state.reports_data_source_id } };
    r = await notionFetch('/pages', { method: 'POST', body: JSON.stringify(fallback) });
  }
  console.log(`report: ${r.id}`);
}

// ------- entry point -------

async function main() {
  const [cmd, ...args] = process.argv.slice(2);

  // derive-surface is a pure local diagnostic — doesn't need NOTION_TOKEN
  // or state.yaml. Handle it before the auth gate.
  if (cmd === 'derive-surface') {
    const csv = deriveSurface(args[0] || 'HEAD');
    console.log(csv ? `surface: ${csv}` : 'surface: (none inferred)');
    return;
  }

  if (!process.env.NOTION_TOKEN) {
    console.log('skipped: no NOTION_TOKEN — main thread should use MCP Notion tools directly');
    return;
  }

  const state = readState();
  if (!state) {
    console.log('skipped: could not read notion section from state.yaml');
    return;
  }
  try {
    switch (cmd) {
      case 'check-tasks':
        await checkTasks(state);
        break;
      case 'claim-task':
        await claimTask(args[0]);
        break;
      case 'complete-task':
        await completeTask(args[0], args[1]);
        break;
      case 'release-task':
        await releaseTask(args[0]);
        break;
      case 'append-report':
        const jsonArg = args.find((a) => a.startsWith('--json-file='));
        if (!jsonArg) throw new Error('append-report requires --json-file=<path>');
        await appendReport(state, jsonArg.slice('--json-file='.length));
        break;
      case 'split-task': {
        const parentId = args[0];
        const jf = args.find((a) => a.startsWith('--json-file='));
        if (!parentId || !jf) {
          throw new Error('split-task requires <parent-page-id> --json-file=<path>');
        }
        await splitTask(state, parentId, jf.slice('--json-file='.length));
        break;
      }
      default:
        console.log(
          `skipped: unknown subcommand "${cmd}" — try check-tasks | claim-task | complete-task | release-task | split-task | append-report | derive-surface`,
        );
    }
  } catch (e) {
    log('error:', e.message);
    console.log(`skipped: ${e.message.slice(0, 240)}`);
  }
}

main();
