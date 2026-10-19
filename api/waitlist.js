// PokéSpa restoration waitlist — emails each sign-up to the owner's inbox via
// Resend (same key + sender domain as api/inquiry.js). No mailing list: the
// inbox is the record, and the only email a sign-up ever gets is a personal
// one when the bench opens (consent line on /quote.html says exactly that).
// DECISION: inbox over a Resend audience so nobody lands on a list that could
// be mistaken for marketing mail (no CMRA / postal address yet, CAN-SPAM).

const { rateLimited, tooLarge, oneLine } = require('./_guard.js');

const TO = 'info@alexandermhughes.com';
const FROM = 'PokéSpa <quotes@pokespa.com>';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  try {
    if (tooLarge(req, 8192)) { res.status(413).json({ error: 'That request is too large.' }); return; }
    if (rateLimited(req)) { res.status(429).json({ error: 'Too many sign-ups from this connection. Try again in a few minutes.' }); return; }
    const { email, cards, note, website } = req.body || {};
    if (website) { res.status(200).json({ ok: true }); return; } // honeypot

    const cEmail = oneLine(String(email || '').trim().slice(0, 200));
    const nCards = parseInt(String(cards || '').trim(), 10);
    const cNote = String(note || '').trim().slice(0, 1000);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)) {
      res.status(400).json({ error: 'Please enter a valid email.' });
      return;
    }
    if (!Number.isFinite(nCards) || nCards < 1 || nCards > 999) {
      res.status(400).json({ error: 'Please enter how many cards (1 to 999).' });
      return;
    }

    const text = [
      'PokéSpa restoration waitlist sign-up',
      '------------------------------------',
      `Email: ${cEmail}`,
      `Cards: ${nCards}`,
      `Signed up: ${new Date().toISOString()}`,
      'Consent shown: "We\'ll only email you about restoration openings."',
      '',
      'Note:',
      cNote || '(none)',
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
        subject: `PokéSpa waitlist: ${nCards} card${nCards === 1 ? '' : 's'}`,
        text,
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('Resend error', r.status, detail.slice(0, 300));
      res.status(502).json({ error: "Couldn't save that just now. Please try again in a minute." });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('waitlist error', e);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
