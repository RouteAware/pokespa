// PokéSpa inquiry endpoint — sends the quote form (with photos) to Alexander
// via Resend. Provider note: sender domain is the Resend-verified
// berouteaware.com until pokespa.com is verified in Resend (DNS task).
// DECISION: photos travel as base64 JSON because Vercel caps request bodies
// at ~4.5MB — the form compresses images client-side to stay well under it.

const TO = 'info@alexandermhughes.com';
const FROM = 'PokéSpa <quotes@pokespa.com>';
const MAX_PHOTOS = 4;
const MAX_TOTAL_BASE64 = 3_800_000; // ~2.8MB of image data, under Vercel's body cap

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { name, email, message, photos = [], website } = req.body || {};

    // Honeypot: real users never fill "website"
    if (website) { res.status(200).json({ ok: true }); return; }

    const clean = (s, max) => String(s || '').trim().slice(0, max);
    const cName = clean(name, 120);
    const cEmail = clean(email, 200);
    const cMessage = clean(message, 4000);
    if (!cName || !cMessage || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)) {
      res.status(400).json({ error: 'Please fill in your name, a valid email, and the card details.' });
      return;
    }
    if (!Array.isArray(photos) || photos.length > MAX_PHOTOS) {
      res.status(400).json({ error: `Up to ${MAX_PHOTOS} photos, please.` });
      return;
    }
    let total = 0;
    const attachments = [];
    for (const p of photos) {
      const data = String(p && p.data || '');
      if (!/^[A-Za-z0-9+/=]+$/.test(data)) continue;
      total += data.length;
      const safeName = String(p.name || 'photo.jpg').replace(/[^\w.\-]/g, '_').slice(0, 80);
      attachments.push({ filename: safeName, content: data });
    }
    if (total > MAX_TOTAL_BASE64) {
      res.status(413).json({ error: 'Photos are too large — try fewer or smaller ones.' });
      return;
    }

    const text = [
      'New PokéSpa restoration inquiry',
      '--------------------------------',
      `Name:  ${cName}`,
      `Email: ${cEmail}`,
      `Photos attached: ${attachments.length}`,
      '',
      'The card & what needs help:',
      cMessage,
    ].join('\n');

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: cEmail,
        subject: `PokéSpa inquiry — ${cName}`,
        text,
        attachments,
      }),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('Resend error', r.status, detail.slice(0, 300));
      res.status(502).json({ error: "Couldn't send just now — please email us directly." });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('inquiry error', e);
    res.status(500).json({ error: "Something went wrong — please email us directly." });
  }
};
