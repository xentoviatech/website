#!/usr/bin/env node
/**
 * Verifies every internal link, image and script reference on the site resolves.
 *
 *   node tools/check-links.mjs
 *
 * This exists because a rename once rewrote `src="assets/simplimpex_hero.jpg"`
 * in a page without moving the file, and nothing caught it — the images 404'd in
 * production. Checking `href` alone is not enough; `src` is where that class of
 * break hides.
 *
 * Skips partials/, which contain unfilled {{TOKENS}} by design, and directories
 * that are not deployed as pages.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, posix } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'test-results', 'partials']);
const EXTERNAL = /^(https?:|mailto:|tel:|javascript:|data:|#)/;

function htmlFiles(dir = ROOT, found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles(full, found);
    else if (entry.name.endsWith('.html')) found.push(posix.relative(ROOT, full));
  }
  return found;
}

const unescape = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');

/** Anchor ids declared by a page, so fragment links can be checked too. */
const idsOf = (file) => new Set([...readFileSync(join(ROOT, file), 'utf8').matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));

const pages = htmlFiles();
const ids = new Map(pages.map((p) => [p, idsOf(p)]));
const problems = [];
let checked = 0;

for (const page of pages) {
  const html = readFileSync(join(ROOT, page), 'utf8');
  for (const [, attr, raw] of html.matchAll(/\b(src|href)="([^"]+)"/g)) {
    const url = unescape(raw);
    if (EXTERNAL.test(url) && !url.startsWith('#')) continue;

    let target, fragment;
    if (url.startsWith('#')) {
      target = page;
      fragment = url.slice(1);
    } else {
      const [path, frag] = url.split('#');
      fragment = frag;
      if (!path) continue;
      target = path.startsWith('/')
        ? path.slice(1)
        : normalize(join(dirname(page), path)).split('\\').join('/');
      if (target === '' || target.endsWith('/')) target += 'index.html';
    }

    checked++;
    if (!existsSync(join(ROOT, target))) {
      problems.push(`${page}: ${attr}="${url}" -> missing ${target}`);
    } else if (fragment && ids.has(target) && !ids.get(target).has(fragment)) {
      problems.push(`${page}: ${attr}="${url}" -> no #${fragment} on that page`);
    }
  }
}

if (problems.length) {
  console.error(`Broken references (${problems.length}):\n` + problems.map((p) => `  ${p}`).join('\n'));
  process.exit(1);
}
console.log(`All ${checked} internal references resolve across ${pages.length} pages.`);
