// Drops digest signup — adds a contact to the Resend "PokéSpa Drops"
// audience. Same honeypot pattern as the inquiry form.
const AUDIENCE_ID = '25aac3cb-6f49-4ec1-9924-6d43813ebcd0';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  try {
    const { email, website } = req.body || {};
    if (website) { res.status(200).json({ ok: true }); return; } // honeypot
    const cEmail = String(email || '').trim().slice(0, 200);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)) {
      res.status(400).json({ error: 'That email doesn’t look right.' });
      return;
    }
    const r = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: cEmail, unsubscribed: false }),
    });
    if (!r.ok && r.status !== 409) { // 409 = already subscribed, treat as ok
      const t = await r.text();
      console.error('resend contact error', r.status, t.slice(0, 300));
      res.status(502).json({ error: 'Couldn’t save that right now — try again in a minute.' });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('subscribe error', e);
    res.status(500).json({ error: 'Something went sideways — try again.' });
  }
};
