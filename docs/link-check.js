#!/usr/bin/env node
// Tiny dependency-free link checker for PokéSpa's shop.html (and optionally other pages).
// HEADs every outbound http(s) link found in <a href="..."> attributes and reports
// any response that isn't a 200 (redirects included, since Amazon's tagged links
// commonly 301/302 to the canonical product URL — that's expected, not a failure).
//
// Usage: node docs/link-check.js [file1.html file2.html ...]
// Defaults to shop.html if no files are given. No npm install required (Node 18+).

const fs = require("node:fs");
const path = require("node:path");

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["shop.html"];

const HREF_RE = /href="(https?:\/\/[^"]+)"/g;

function extractLinks(file) {
  const abs = path.resolve(file);
  const html = fs.readFileSync(abs, "utf-8");
  const links = new Set();
  let m;
  while ((m = HREF_RE.exec(html)) !== null) {
    links.add(m[1]);
  }
  return [...links];
}

async function checkLink(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (PokeSpa-LinkCheck/1.0)" },
    });
    // Some hosts (Amazon included) don't answer HEAD well; fall back to GET.
    if (res.status === 405 || res.status === 501 || res.status >= 500) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 (PokeSpa-LinkCheck/1.0)" },
      });
    }
    return { url, status: res.status, finalUrl: res.url, ok: res.status === 200 };
  } catch (err) {
    return { url, status: null, error: String(err.message || err), ok: false };
  } finally {
    clearTimeout(timeout);
  }
}

(async () => {
  let allLinks = [];
  for (const file of files) {
    try {
      allLinks.push(...extractLinks(file));
    } catch (err) {
      console.error(`Could not read ${file}: ${err.message}`);
      process.exitCode = 1;
    }
  }
  allLinks = [...new Set(allLinks)];

  console.log(`Checking ${allLinks.length} outbound links from: ${files.join(", ")}\n`);

  const results = [];
  // Small concurrency to be polite and avoid rate limits.
  const CONCURRENCY = 4;
  let i = 0;
  async function worker() {
    while (i < allLinks.length) {
      const idx = i++;
      const url = allLinks[idx];
      const r = await checkLink(url);
      results.push(r);
      const mark = r.ok ? "OK " : "!! ";
      console.log(`${mark}${r.status ?? "ERR"}  ${url}${r.error ? "  (" + r.error + ")" : ""}`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const bad = results.filter((r) => !r.ok);
  console.log(`\n${results.length} checked, ${results.length - bad.length} OK, ${bad.length} non-200/failed.`);
  if (bad.length) {
    console.log("\nNon-200 / failed links:");
    for (const r of bad) {
      console.log(`  ${r.status ?? "ERR"}  ${r.url}${r.error ? "  (" + r.error + ")" : ""}`);
    }
    process.exitCode = 1;
  }
})();
