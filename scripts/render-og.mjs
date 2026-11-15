// Render og.png and og-gifts.png (1200x630) from merch-art/og-card.html.
// Playwright is borrowed read-only from gwa-ops (no deps in this repo).
// Usage: node scripts/render-og.mjs
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
const require = createRequire('/Users/alexanderhughes/Recursis-Digital/gear-wizard-armory/gwa-ops/package.json');
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = 'file://' + path.join(root, 'merch-art/og-card.html');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [q, out] of [['', 'og.png'], ['?v=gifts', 'og-gifts.png']]) {
  await p.goto(src + q, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(root, out) });
  console.log('wrote', out);
}
await b.close();
