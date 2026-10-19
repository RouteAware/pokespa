// Waitlist handler tests (node:test, no deps). Run: npm test
// The Resend send is stubbed: global.fetch records every call, nothing leaves the machine.
const test = require('node:test');
const assert = require('node:assert/strict');
const handler = require('../api/waitlist.js');

let sends = [];
global.fetch = async (url, opts) => { sends.push({ url, body: JSON.parse(opts.body) }); return { ok: true, text: async () => '' }; };

let ipSeq = 0;
const freshIp = () => `10.0.0.${++ipSeq}`;
function req({ method = 'POST', body = {}, ip = freshIp(), length } = {}) {
  const len = length != null ? length : Buffer.byteLength(JSON.stringify(body));
  return { method, body, headers: { 'content-length': String(len), 'x-forwarded-for': ip }, socket: {} };
}
function res() {
  const r = { code: 0, json: null, headers: {} };
  r.setHeader = (k, v) => { r.headers[k] = v; };
  r.status = (c) => { r.code = c; return r; };
  r.json = (j) => { r.body = j; return r; };
  return r;
}
async function call(opts) { const r = res(); await handler(req(opts), r); return r; }
test.beforeEach(() => { sends = []; });

test('1 good submit → 200, one send', async () => {
  const r = await call({ body: { email: 'a@b.co', cards: '3', note: 'Charizard' } });
  assert.equal(r.code, 200);
  assert.equal(sends.length, 1);
  assert.match(sends[0].body.subject, /3 cards/);
});

test('2 bad email → 400, no send', async () => {
  const r = await call({ body: { email: 'not-an-email', cards: '3' } });
  assert.equal(r.code, 400); assert.equal(sends.length, 0);
});

for (const [n, cards] of [['3', '0'], ['4', '1000'], ['5', 'abc'], ['5b', '3abc']]) {
  test(`${n} card count ${JSON.stringify(cards)} → 400, no send`, async () => {
    const r = await call({ body: { email: 'a@b.co', cards } });
    assert.equal(r.code, 400); assert.equal(sends.length, 0);
  });
}

test('6 honeypot filled → 200, no send', async () => {
  const r = await call({ body: { email: 'a@b.co', cards: '3', website: 'http://spam' } });
  assert.equal(r.code, 200); assert.equal(sends.length, 0);
});

test('7 GET → 405', async () => {
  const r = await call({ method: 'GET' });
  assert.equal(r.code, 405); assert.equal(sends.length, 0);
});

test('8 sixth hit from one IP in 10 min → 429', async () => {
  const ip = freshIp();
  for (let i = 0; i < 5; i++) {
    const r = await call({ ip, body: { email: 'a@b.co', cards: '2' } });
    assert.equal(r.code, 200);
  }
  const r6 = await call({ ip, body: { email: 'a@b.co', cards: '2' } });
  assert.equal(r6.code, 429);
  assert.equal(sends.length, 5);
});

test('9 9 KB body → 413, no send', async () => {
  const r = await call({ body: { email: 'a@b.co', cards: '3', note: 'x'.repeat(9 * 1024) } });
  assert.equal(r.code, 413); assert.equal(sends.length, 0);
});

test('10 recipient is info@ only', async () => {
  await call({ body: { email: 'visitor@example.com', cards: '1' } });
  assert.equal(sends.length, 1);
  assert.deepEqual(sends[0].body.to, ['info@alexandermhughes.com']);
  assert.equal(sends[0].body.cc, undefined);
  assert.equal(sends[0].body.bcc, undefined);
  assert.equal(sends[0].body.reply_to, 'visitor@example.com');
});
