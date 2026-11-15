// Static page checks for the 2026-11 Christmas revamp (node:test, no deps). Run: npm test
// Guards the Amazon Associates + FTC rules (CLAUDE.md rule 6, docs/CHRISTMAS-REVAMP-2026-11.md).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

const SPEC_ASINS = ['B08B9GVG36', 'B002PF61O2', 'B0058KET5Y', 'B071V91LGC', 'B000Q5ZMM0', 'B09MWHBTCK',
  'B07S93V4GP', 'B0C35WS2YD', 'B01NAG6W60', 'B002UL5I8Q', 'B002PF48J2', 'B0D7TWCMMZ',
  'B09R659NZG', 'B073G9MZSZ', 'B0033RZCPK', 'B0050R67U0', 'B00OZOGDNU', 'B06XCZ6V2Y', 'B0D6KBSFYV'];
const DISCLOSURE = 'As an Amazon Associate, PokéSpa earns from qualifying purchases.';
const anchors = (html) => [...html.matchAll(/<a\b[^>]*href="(https:\/\/www\.amazon\.com[^"]*)"[^>]*>[\s\S]*?<\/a>(.{0,60})/g)]
  .map((m) => ({ tag: m[0], href: m[1], after: m[2] }));
const visibleText = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');

test('gifts: exactly the spec ASINs, each as /dp/ASIN?tag=pokespa-20', () => {
  const links = anchors(read('gifts.html'));
  const asins = links.map((l) => {
    const m = l.href.match(/^https:\/\/www\.amazon\.com\/dp\/([A-Z0-9]{10})\?tag=pokespa-20$/);
    assert.ok(m, `bad Amazon link ${l.href}`);
    return m[1];
  });
  assert.deepEqual([...asins].sort(), [...SPEC_ASINS].sort());
});

for (const page of ['gifts.html', 'shop.html']) {
  test(`${page}: every Amazon link is sponsored nofollow noopener and has "(paid link)" beside it`, () => {
    for (const l of anchors(read(page))) {
      assert.match(l.tag, /rel="sponsored nofollow noopener"/, l.href);
      assert.match(l.after, /\(paid links?\)/, l.href);
    }
  });
  test(`${page}: Associates sentence sits above the first Amazon link`, () => {
    const html = read(page);
    const d = html.indexOf(DISCLOSURE.replace('é', 'é'));
    assert.ok(d > 0, 'disclosure missing');
    assert.ok(d < html.indexOf('https://www.amazon.com'), 'disclosure must come first');
  });
  test(`${page}: no prices, stars or banned words in visible text`, () => {
    const t = visibleText(read(page));
    assert.doesNotMatch(t, /\$\s?\d/, 'price');
    assert.doesNotMatch(t, /[★☆⭐]/, 'stars');
    assert.doesNotMatch(t, /\b(we (actually )?use|best|official|tested|our favorite|deal|Prime|arrives by)\b/i);
  });
}

test('gifts: no cleaning chemicals on the gift page', () => {
  assert.doesNotMatch(read('gifts.html'), /Kurt|NOVUS|polish|spray/i);
});

test('holiday.css: removable, dated, honours reduced motion, no red', () => {
  const css = read('holiday.css');
  assert.match(css, /remove after 2027-01-02/);
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*animation:\s*none/);
  assert.doesNotMatch(css, /#c8342a|#ff0000|\bred\b(?!-and-white)/i);
});

const pages = [...fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')),
  ...fs.readdirSync(path.join(ROOT, 'learn')).filter((f) => f.endsWith('.html')).map((f) => 'learn/' + f)];
const UNTOUCHED = new Set(['quote.html', 'waitlist-thanks.html']);
for (const p of pages.filter((f) => !UNTOUCHED.has(f))) {
  test(`${p}: new nav, holiday.css, not-affiliated footer`, () => {
    const html = read(p);
    const nav = html.match(/<nav>([\s\S]*?)<\/nav>/)[1];
    const labels = [...nav.matchAll(/>([^<]+)<\/a>/g)].map((m) => m[1]);
    assert.deepEqual(labels, ['Gifts', 'Shop', 'Learn', 'Merch', 'Restoration']);
    assert.match(html, /href="\/holiday\.css"/);
    assert.match(html, /not affiliated with, endorsed by, or sponsored by/);
    assert.match(html, /Collector tools/);
  });
}
for (const p of ['gifts.html', 'shop.html', 'merch.html', 'index.html', ...pages.filter((f) => f.startsWith('learn/'))]) {
  test(`${p}: Vercel Analytics script present`, () => assert.match(read(p), /\/_vercel\/insights\/script\.js/));
}

test('home: no restoration offer, new hero copy', () => {
  const t = visibleText(read('index.html'));
  assert.doesNotMatch(t, /What we do|De-creasing|Surface repair/);
  assert.match(t, /Gifts for the collector who/);
  assert.match(read('index.html'), /utm_source=pokespa/);
});

test('sitemap lists gifts.html', () => assert.match(read('sitemap.xml'), /https:\/\/pokespa\.com\/gifts\.html/));
