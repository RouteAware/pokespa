// Weekly "drops this week" digest — fired by Vercel Cron (Mondays 14:00 UTC).
// Vercel sends `Authorization: Bearer ${CRON_SECRET}` automatically when the
// CRON_SECRET env var exists. Composes from the same aggregator as /api/drops
// and broadcasts to the Resend audience (Resend injects unsubscribe links).
const { fetchDropsData } = require('./_drops-data.js');

const AUDIENCE_ID = '25aac3cb-6f49-4ec1-9924-6d43813ebcd0';
const FROM = 'PokéSpa Drops <quotes@pokespa.com>';

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fmtDate(yyyymmdd) {
  const d = new Date(yyyymmdd.replace(/\//g, '-') + 'T12:00:00Z');
  return isNaN(d) ? yyyymmdd : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function buildHtml(data) {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
  const upcoming = data.sets.filter((s) => s.releaseDate >= today);
  const recent = data.sets.filter((s) => s.releaseDate < today).slice(0, 4);
  const li = (t) => `<li style="margin:0 0 10px;line-height:1.5">${t}</li>`;
  let html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1c1e24">
  <h1 style="font-size:22px">PokéSpa <span style="color:#2ea99e">Drops</span> — this week</h1>`;
  if (upcoming.length) {
    html += `<h2 style="font-size:16px">📅 Upcoming sets</h2><ul style="padding-left:18px">` +
      upcoming.map((s) => li(`<b>${esc(s.name)}</b> (${esc(s.series)}) — releases <b>${fmtDate(s.releaseDate)}</b>`)).join('') + `</ul>`;
  }
  if (recent.length) {
    html += `<h2 style="font-size:16px">🆕 Just released</h2><ul style="padding-left:18px">` +
      recent.map((s) => li(`<b>${esc(s.name)}</b> (${esc(s.series)}) — out ${fmtDate(s.releaseDate)}`)).join('') + `</ul>`;
  }
  if (data.news.length) {
    html += `<h2 style="font-size:16px">📰 Drop &amp; preorder chatter</h2><ul style="padding-left:18px">` +
      data.news.slice(0, 6).map((n) => li(`<a href="${esc(n.link)}" style="color:#2ea99e">${esc(n.title)}</a> <span style="color:#888">(via ${esc(n.src||'community')}, ${esc(n.date)})</span>`)).join('') + `</ul>`;
  }
  html += `<p style="line-height:1.6">Drop day coming up? <a href="https://pokespa.com/drops.html" style="color:#2ea99e">Read how the queue actually works</a> — and once you pull the hits, <a href="https://pokespa.com/shop.html" style="color:#2ea99e">the slab-care shelf</a> is waiting.</p>
  <p style="color:#888;font-size:12px;line-height:1.6">Sourced from public announcements and the Pokémon TCG API; headlines via Google News. PokéSpa is not affiliated with Nintendo, The Pokémon Company, or Google. Prices and dates move — always confirm with the retailer.<br>
  <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#888">Unsubscribe</a></p></div>`;
  return html;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const auth = req.headers['authorization'] || '';
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }
  try {
    const key = process.env.RESEND_API_KEY;
    const contacts = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      headers: { Authorization: `Bearer ${key}` },
    }).then((r) => r.json());
    const live = (contacts.data || []).filter((c) => !c.unsubscribed);
    if (!live.length) { res.status(200).json({ skipped: 'no subscribers' }); return; }

    const data = await fetchDropsData();
    if (!data.sets.length && !data.news.length) {
      res.status(200).json({ skipped: 'no content this week' });
      return;
    }
    const create = await fetch('https://api.resend.com/broadcasts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audience_id: AUDIENCE_ID,
        from: FROM,
        subject: 'Pokémon drops this week — PokéSpa',
        html: buildHtml(data),
      }),
    });
    const cj = await create.json();
    if (!create.ok || !cj.id) {
      console.error('broadcast create failed', create.status, JSON.stringify(cj).slice(0, 300));
      res.status(502).json({ error: 'broadcast create failed' });
      return;
    }
    const send = await fetch(`https://api.resend.com/broadcasts/${cj.id}/send`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!send.ok) {
      console.error('broadcast send failed', send.status, await send.text());
      res.status(502).json({ error: 'broadcast send failed' });
      return;
    }
    res.status(200).json({ ok: true, broadcast: cj.id, subscribers: live.length });
  } catch (e) {
    console.error('digest error', e);
    res.status(500).json({ error: 'digest failed' });
  }
};
