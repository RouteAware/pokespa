#!/usr/bin/env node
// Internal link check for the static site: every root-relative or relative
// href/src in every .html page must resolve to a file in the repo, an api/
// function, or a vercel.json redirect source. Outbound links: docs/link-check.js.
// Usage: node scripts/check-internal-links.js   (exit 1 on any broken link)
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', '.vercel', 'merch-art', 'docs']);
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name)); }
    else if (e.name.endsWith('.html')) pages.push(path.join(dir, e.name));
  }
})(ROOT);
let redirects = [];
try { redirects = (JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')).redirects || []).filter(r => !r.has).map(r => r.source); } catch {}
const exists = (p) => { try { return fs.statSync(p).isFile(); } catch { return false; } };
function resolves(urlPath) {
  if (urlPath.startsWith('/_vercel/')) return true;               // injected by Vercel at deploy
  if (redirects.includes(urlPath)) return true;
  if (urlPath.startsWith('/api/')) return exists(path.join(ROOT, 'api', urlPath.slice(5).replace(/\/$/, '') + '.js'));
  const f = path.join(ROOT, decodeURIComponent(urlPath));
  if (urlPath.endsWith('/')) return exists(path.join(f, 'index.html'));
  return exists(f) || exists(f + '.html') || exists(path.join(f, 'index.html'));
}
const RE = /\s(?:href|src)="([^"]*)"/g;
let checked = 0, broken = [];
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  let m;
  while ((m = RE.exec(html))) {
    const raw = m[1];
    if (!raw || /^(https?:|mailto:|tel:|data:|javascript:|#)/.test(raw) || raw.includes("'+")) continue; // skip JS-built hrefs
    const clean = raw.split('#')[0].split('?')[0];
    if (!clean) continue;
    const abs = clean.startsWith('/') ? clean : '/' + path.relative(ROOT, path.resolve(path.dirname(page), clean));
    checked++;
    if (!resolves(abs)) broken.push(`${path.relative(ROOT, page)} → ${raw}`);
  }
}
console.log(`${pages.length} pages, ${checked} internal links checked, ${broken.length} broken.`);
broken.forEach((b) => console.log('BROKEN ' + b));
process.exit(broken.length ? 1 : 0);
