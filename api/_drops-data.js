// Shared aggregator for the PokéSpa drop radar. Sources chosen for being
// public, TOS-clean, AND reachable from datacenter IPs (Reddit + pokemontcg.io
// block/500 from Vercel egress — learned the hard way; background in
// docs/DROP-ALERTS-RESEARCH.md):
//   sets  → raw.githubusercontent.com PokemonTCG/pokemon-tcg-data (the dataset
//           behind the TCG API; includes releaseDate)
//   news  → Google News RSS (syndicated hobby-press headlines, per-item source
//           attribution). We never touch pokemoncenter.com programmatically.

async function fetchWithRetry(url, opts = {}, attempts = 3) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      const r = await fetch(url, opts);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r;
    } catch (e) {
      lastErr = e;
      if (i < attempts) await new Promise((res) => setTimeout(res, 900 * i));
    }
  }
  throw lastErr;
}

async function getSets() {
  const r = await fetchWithRetry('https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/master/sets/en.json');
  const all = (await r.json())
    .filter((s) => s.releaseDate)
    .sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1));
  const cutoff = new Date(Date.now() - 270 * 86400000).toISOString().slice(0, 10).replace(/-/g, '/');
  return all
    .filter((s) => s.releaseDate >= cutoff)
    .slice(0, 12)
    .map((s) => ({
      name: s.name,
      series: s.series || '',
      releaseDate: s.releaseDate, // YYYY/MM/DD
      total: s.printedTotal || s.total || null,
    }));
}

async function getNews() {
  const q = encodeURIComponent('"pokemon tcg" OR "pokemon center" (restock OR preorder OR "release date" OR drop)');
  const r = await fetchWithRetry(`https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`);
  const xml = await r.text();
  const items = [];
  const seen = new Set();
  const chunks = xml.split('<item>').slice(1);
  const unesc = (t) => t
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();
  for (const c of chunks) {
    const pick = (tag) => {
      const m = c.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)</' + tag + '>'));
      return m ? unesc(m[1]) : '';
    };
    let title = pick('title');
    const link = pick('link');
    const pub = pick('pubDate');
    const src = pick('source');
    if (!title || !link) continue;
    // Google News titles end with " - Source"; strip when we have the source tag.
    if (src && title.endsWith(' - ' + src)) title = title.slice(0, -(' - ' + src).length);
    const ts = Date.parse(pub) || 0;
    if (Date.now() - ts > 21 * 86400000) continue;
    const key = title.toLowerCase().slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({ title, link, date: new Date(ts).toISOString().slice(0, 10), src: src || 'Google News' });
    if (items.length >= 10) break;
  }
  return items;
}

async function fetchDropsData() {
  const out = { generatedAt: new Date().toISOString(), sets: [], news: [], sources: {} };
  const [sets, news] = await Promise.allSettled([getSets(), getNews()]);
  if (sets.status === 'fulfilled') { out.sets = sets.value; out.sources.sets = 'ok'; }
  else out.sources.sets = 'unavailable';
  if (news.status === 'fulfilled') { out.news = news.value; out.sources.news = 'ok'; }
  else out.sources.news = 'unavailable';
  return out;
}

module.exports = { fetchDropsData };
