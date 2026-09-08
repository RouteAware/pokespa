// Shared request guards for the tiny form endpoints (underscore-prefixed, so
// Vercel does not deploy this file as its own function).
//
// The rate limit is IN-MEMORY, per function instance: it resets on every cold
// start and is not shared across instances or regions. That is a deliberate
// trade — these endpoints see a handful of real submissions a week, so a cheap
// brake on bursts from one address is all they need. If abuse ever outgrows
// it, swap the Map for Upstash/Vercel KV without touching the callers.

const buckets = new Map();

function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  const first = typeof xf === 'string' ? xf.split(',')[0].trim() : '';
  return first || (req.socket && req.socket.remoteAddress) || 'unknown';
}

// Sliding window: true when this IP has already made `limit` requests in the
// last `windowMs`. Successful and failed submissions both count.
function rateLimited(req, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const ip = clientIp(req);
  const hits = (buckets.get(ip) || []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) { buckets.set(ip, hits); return true; }
  hits.push(now);
  buckets.set(ip, hits);
  if (buckets.size > 5000) { // keep the map from growing forever on a warm instance
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return false;
}

// Body-size cap from the declared Content-Length (Vercel enforces its own
// ~4.5MB ceiling; this lets each endpoint set a much smaller honest limit).
function tooLarge(req, maxBytes) {
  return Number(req.headers['content-length'] || 0) > maxBytes;
}

// Collapse newlines/tabs so a field can never inject extra headers or lines
// into an email subject.
const oneLine = (s) => String(s || '').replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();

module.exports = { rateLimited, tooLarge, oneLine, clientIp };
