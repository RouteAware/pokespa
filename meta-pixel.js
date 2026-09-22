/* Meta Pixel — Recursis shared, CONSENT-GATED. The ID lives ONLY in this file; every page loads it from <head>.
   Nothing reaches Meta until the visitor presses OK: fbevents.js is not requested, fbq is not defined, no cookie
   is set. That is the point — California CIPA §631 needs consent BEFORE the pixel fires, not after.
   Guard: with the placeholder still in place this file is a no-op, so previews are safe to ship.
   LDU = Meta "Limited Data Use" is still sent on every consented load.
   Never loads when the browser sends Global Privacy Control, or when the old
   localStorage recursis_pixel_optout=1 opt-out is still set (those choices are honored forever).
   Keep this file byte-identical across recursisdigital.com, terribleshirtco.com and pokespa.com. */
(function () {
  var ID = '2211437245831748';

  /* ---------- ALL COPY LIVES HERE (per-site voice; the file stays byte-identical) ---------- */
  var COPY = {
    'recursisdigital.com': {
      bar: 'We’d like to load Meta’s ad pixel so we can tell whether our ads actually bring anyone here. Nothing loads until you say OK, and you can change your mind any time.',
      privacy: '/privacy#do-not-sell'
    },
    'terribleshirtco.com': {
      bar: 'We’d love to know whether our ads are working, and that takes Meta’s ad pixel. Tap “Not now” and nothing loads — the shirts are exactly as terrible either way.',
      privacy: '/privacy.html#do-not-sell'
    },
    'pokespa.com': {
      bar: 'We’d like to load Meta’s ad pixel so we can see whether our ads bring collectors here. Nothing loads unless you say OK, and you can change your mind any time.',
      privacy: '/privacy.html#do-not-sell'
    },
    _default: {
      bar: 'We’d like to load Meta’s ad pixel so we can tell whether our ads bring anyone here. Nothing loads until you say OK, and you can change your mind any time.',
      privacy: '/privacy.html#do-not-sell'
    }
  };
  var UI = {
    yes: 'OK',
    no: 'Not now',
    more: 'What this is',
    label: 'Ad pixel choice',
    /* the control on the privacy page */
    onBtn: 'Turn the ad pixel on',
    offBtn: 'Turn the ad pixel off',
    stateOn: 'The ad pixel is on for this browser. It stays on until you turn it off, or for 12 months, whichever comes first.',
    stateOff: 'The ad pixel is off for this browser. Nothing has been sent to Meta.',
    stateGpc: 'Your browser is sending Global Privacy Control, so the ad pixel is off here and we never ask. Nothing to press.',
    stateNone: 'You haven’t been asked yet on this browser. The ad pixel is off until you say otherwise.',
    noStorage: 'Your browser is blocking site storage, so we can’t remember the choice here. The ad pixel stays off.'
  };
  /* ---------------------------------------------------------------------------------------- */

  if (!/^\d{14,17}$/.test(ID)) return;

  var KEY = 'recursis_pixel_consent';      // {"v":1,"c":true|false,"t":<ms>}
  var LEGACY = 'recursis_pixel_optout';    // the pre-2026-09-21 opt-out; still honored
  var TTL = 365 * 24 * 60 * 60 * 1000;     // 12 months
  var GPC = false;
  try { GPC = navigator.globalPrivacyControl === true; } catch (e) {}

  var T = (function () {
    var h = '';
    try { h = (location.hostname || '').replace(/^www\./, ''); } catch (e) {}
    for (var k in COPY) {
      if (k === '_default' || !COPY.hasOwnProperty(k)) continue;
      if (h === k || h.slice(-(k.length + 1)) === '.' + k) return COPY[k];
    }
    return COPY._default;
  })();

  function store() { try { return window.localStorage; } catch (e) { return null; } }

  /* true = consented · false = refused · null = never asked */
  function state() {
    if (GPC) return false;
    var s = store(); if (!s) return null;
    try {
      if (s.getItem(LEGACY) === '1') return false;
      var raw = s.getItem(KEY); if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || typeof o.c !== 'boolean' || !o.t) return null;
      if (Date.now() - o.t > TTL) { s.removeItem(KEY); return null; }
      return o.c;
    } catch (e) { return null; }
  }

  function remember(yes) {
    var s = store(); if (!s) return false;
    try {
      s.setItem(KEY, JSON.stringify({ v: 1, c: !!yes, t: Date.now() }));
      /* A "no" also sets the old opt-out key, because ga.js still reads it — one no turns
         everything off. A "yes" clears it. So a yes is remembered for 12 months and then
         re-asked; a no sticks until the visitor changes it here. */
      if (yes) s.removeItem(LEGACY); else s.setItem(LEGACY, '1');
      return true;
    } catch (e) { return false; }
  }

  var loaded = false;
  function load() {
    if (loaded || GPC) return;
    loaded = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('dataProcessingOptions', ['LDU'], 0, 0);
    fbq('init', ID);
    fbq('track', 'PageView');
  }

  /* Public: RecursisPixel.track('Lead') — a no-op unless the visitor has consented. */
  function track(event, params) {
    if (state() !== true) return false;
    load();
    try { if (params) window.fbq('track', event, params); else window.fbq('track', event); } catch (e) { return false; }
    return true;
  }

  /* ---------- the bar ---------- */
  var bar = null, lastFocus = null;

  function css() {
    if (document.getElementById('rcx-pixel-css')) return;
    var s = document.createElement('style');
    s.id = 'rcx-pixel-css';
    s.textContent =
      '.rcx-bar{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;box-sizing:border-box;' +
      'padding:14px 16px calc(14px + env(safe-area-inset-bottom,0px));background:#14161a;color:#f1f2f4;' +
      'border-top:1px solid rgba(255,255,255,.18);font:400 14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;' +
      'display:flex;gap:14px;align-items:center;justify-content:center;flex-wrap:wrap;box-shadow:0 -8px 30px rgba(0,0,0,.25)}' +
      '.rcx-bar:focus{outline:none}' +
      '.rcx-bar p{margin:0;max-width:62ch;flex:1 1 320px;min-width:0}' +
      '.rcx-bar a{color:#f1f2f4;text-decoration:underline;text-underline-offset:2px}' +
      '.rcx-acts{display:flex;gap:8px;flex:0 0 auto;flex-wrap:wrap}' +
      '.rcx-bar button{font:inherit;font-weight:600;cursor:pointer;border-radius:8px;padding:9px 18px;min-height:40px;' +
      'border:1px solid rgba(255,255,255,.4);background:transparent;color:#f1f2f4}' +
      '.rcx-bar button.rcx-yes{background:#f1f2f4;color:#14161a;border-color:#f1f2f4}' +
      '.rcx-bar button:focus-visible{outline:2px solid #7cb7ff;outline-offset:2px}' +
      '@media (max-width:560px){.rcx-bar{align-items:stretch;flex-direction:column;gap:10px}' +
      '.rcx-bar p{flex:0 1 auto}.rcx-acts button{flex:1 1 0}}';
    (document.head || document.documentElement).appendChild(s);
  }

  function closeBar() {
    if (!bar) return;
    if (bar.parentNode) bar.parentNode.removeChild(bar);
    bar = null;
    try { if (lastFocus && lastFocus.focus) lastFocus.focus(); } catch (e) {}
    lastFocus = null;
  }

  function choose(yes) {
    var ok = remember(yes);
    closeBar();
    if (yes && ok) load();
    if (yes && !ok) showControl();   // storage blocked: say so where the control is
    paint();
    return ok;
  }

  function openBar() {
    if (GPC || bar || !document.body) return;
    css();
    try { lastFocus = document.activeElement; } catch (e) {}
    bar = document.createElement('div');
    bar.className = 'rcx-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', UI.label);
    bar.setAttribute('tabindex', '-1');

    var p = document.createElement('p');
    p.appendChild(document.createTextNode(T.bar + ' '));
    var more = document.createElement('a');
    more.href = T.privacy;
    more.textContent = UI.more;
    p.appendChild(more);

    var acts = document.createElement('div');
    acts.className = 'rcx-acts';
    var no = document.createElement('button');
    no.type = 'button'; no.textContent = UI.no;
    no.addEventListener('click', function () { choose(false); });
    var yes = document.createElement('button');
    yes.type = 'button'; yes.className = 'rcx-yes'; yes.textContent = UI.yes;
    yes.addEventListener('click', function () { choose(true); });
    acts.appendChild(no); acts.appendChild(yes);

    bar.appendChild(p); bar.appendChild(acts);
    bar.addEventListener('keydown', function (e) { if (e.key === 'Escape') choose(false); });
    document.body.appendChild(bar);
    /* Focus the bar itself, never a button: neither answer is pre-selected for you. */
    try { bar.focus(); } catch (e) {}
  }

  /* ---------- the control on the privacy page (#do-not-sell) ---------- */
  function showControl() {
    var box = document.getElementById('do-not-sell');
    if (box && box.scrollIntoView) { try { box.scrollIntoView(); } catch (e) {} }
  }

  function paint() {
    var btn = document.getElementById('optout-btn');
    var st = document.getElementById('optout-status');
    if (!btn && !st) return;
    var v = state();
    if (st) st.textContent = GPC ? UI.stateGpc : (v === true ? UI.stateOn : (v === false ? UI.stateOff : UI.stateNone));
    if (btn) {
      btn.textContent = v === true ? UI.offBtn : UI.onBtn;
      btn.disabled = !!GPC;
    }
  }

  function wire() {
    var btn = document.getElementById('optout-btn');
    if (btn && !btn.getAttribute('data-rcx')) {
      btn.setAttribute('data-rcx', '1');
      btn.addEventListener('click', function () {
        var want = state() !== true;
        if (!choose(want)) {
          var st = document.getElementById('optout-status');
          if (st) st.textContent = UI.noStorage;
        }
      });
    }
    var links = document.querySelectorAll('[data-pixel-choice]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('data-rcx')) continue;
      links[i].setAttribute('data-rcx', '1');
      links[i].addEventListener('click', function (e) {
        if (GPC) return;                 // let the link go to the privacy page and explain
        e.preventDefault();
        closeBar();
        openBar();
      });
    }
    paint();
  }

  window.RecursisPixel = {
    track: track,
    state: state,
    choose: choose,
    ask: openBar,
    id: ID
  };

  function start() {
    wire();
    var v = state();
    if (v === true) load();
    else if (v === null) openBar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
