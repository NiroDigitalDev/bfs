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

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';
const STATE_PATH = '.claude/improvement/state.yaml';

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
  await notionFetch(`/pages/${pageId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      properties: {
        Status: selectValue('Done'),
        Completed: dateValue(today),
        Commit: { rich_text: richText(commit) },
      },
    }),
  });
  console.log(`completed: ${pageId}`);
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
  if (!process.env.NOTION_TOKEN) {
    console.log('skipped: no NOTION_TOKEN — main thread should use MCP Notion tools directly');
    return;
  }

  const state = readState();
  if (!state) {
    console.log('skipped: could not read notion section from state.yaml');
    return;
  }

  const [cmd, ...args] = process.argv.slice(2);
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
      default:
        console.log(
          `skipped: unknown subcommand "${cmd}" — try check-tasks | claim-task | complete-task | release-task | append-report`,
        );
    }
  } catch (e) {
    log('error:', e.message);
    console.log(`skipped: ${e.message.slice(0, 240)}`);
  }
}

main();
