// Shared aggregator for the PokéSpa drop radar. Sources are public and
// TOS-clean by design (see docs/DROP-ALERTS-RESEARCH.md): official set
// release dates from the community Pokémon TCG API, and headline syndication
// from public community feeds (linked + attributed — we never touch
// pokemoncenter.com programmatically).

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
  // pokemontcg.io quirks (learned in value.html): small pages only, no big
  // pageSize. Sets endpoint is light; 40 covers ~2 years.
  const r = await fetchWithRetry('https://api.pokemontcg.io/v2/sets?pageSize=250');
  const d = await r.json();
  const all = (d.data || [])
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
  // r/PKMNTCGDeals Atom feed: crowd-verified deals/restocks, updated all day.
  const r = await fetchWithRetry('https://www.reddit.com/r/PKMNTCGDeals/new.rss', {
    headers: { 'User-Agent': 'PokeSpaDropRadar/1.0 (+https://pokespa.com/drops.html)' },
  });
  const xml = await r.text();
  const items = [];
  const chunks = xml.split('<entry>').slice(1);
  for (const c of chunks) {
    const t = c.match(/<title>([\s\S]*?)<\/title>/);
    const l = c.match(/<link href="([^"]+)"/);
    const u = c.match(/<updated>([^<]+)<\/updated>/);
    if (!t || !l) continue;
    const title = t[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
    if (/^(question|help|psa:|meta)|thread|weekly|monthly/i.test(title)) continue;
    const ts = u ? Date.parse(u[1]) : Date.now();
    items.push({ title, link: l[1], date: new Date(ts).toISOString().slice(0, 10), src: 'r/PKMNTCGDeals' });
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
