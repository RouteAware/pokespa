# PokéSpa — roadmap

Status marks: ✅ done · 🔄 in progress · ⬜ not started · 🅿️ parked

## Now (landing era)
- ✅ Landing page live at pokespa.com (2026-08-29)
- ✅ Brand mark (tilted holo card + sparkles) — favicon, header, touch icon
- ✅ Depth pass: How it works + PokéSpa promise sections (2026-08-29)
- ⬜ Real before/after photos into the gallery (needs Alexander's first
  restorations photographed — blocker: content, not code)

## Next (when Alexander wants inquiries flowing)
- ✅ Proper inquiry form (2026-08-29): /quote.html + /api/inquiry — Resend,
  photo attachments (client-compressed, max 4), honeypot, reply-to submitter.
  Verified end-to-end: test email w/ photo landed in info@ inbox.
- ✅ pokespa.com verified in Resend (2026-08-30, via Namecheap API) — quotes
  now send from quotes@pokespa.com; proof email delivered
- ⬜ Pricing / turnaround copy — ONLY once Alexander sets real numbers
- ⬜ OG share checks after any copy change

## Expansion — Service + Shop + Learn (plan: docs/EXPANSION-2026-08-31.md)
- ✅ Three-agent research (market/SEO, vendors, legal) — 2026-08-31
- 🔄 Kurt's Card Care dealer outreach (Alexander emailed 2026-08-31; awaiting
  reply — no formal program exists; anchors: 30% reseller / 10–15% affiliate)
- ✅ **Phase 1 — Learn era SHIPPED 2026-08-31** (Alexander's "make it happen"):
  /learn hub + 4 guides (cleaning pillar, grading-policy matrix, cleaning-vs-
  doctoring, DIY-or-pro) + /service.html + site nav + sitemap. Homepage
  placeholder gallery removed (Alexander's ask), replaced with Learn grid.
  Links are PLAIN retail links for now — swap to affiliate once accounts exist
  (Amazon Associates + BCW = Alexander signups; disclosure copy already in place).
- ✅ Depth pass 2026-08-31 (Alexander loved the holo foil, asked for more
  depth w/o overdoing): aurora radial ground on all pages, holo-gradient-edge
  card hovers ("card catching the light"), holo frame on the promise panel,
  holo-swirl CTA underlays, gradient footer hairlines, holo "back to life."
  hero line, nav added to quote.html
- ✅ Glow-up pass 2026-08-31: license-verified Unsplash imagery (img/CREDITS.md
  — NEVER use card/character photos; watch for watermarked Unsplash+ tier),
  article banners, hub image cards, holo homepage hero, wider desktop
  (articles 860px / hub+home 1080–1100px), mobile verified at 390px
- ✅ Shop + Merch pages 2026-08-31: /shop.html (curated gear, PLAIN links —
  the pre-affiliate storefront) + /merch.html + nav/footers/sitemap.
  **Fourthwall shop #5 CREATED: pokespa-shop.fourthwall.com** (Hale, via
  Chrome on Alexander's account).
- ✅ Fourthwall first products LIVE-READY 2026-09-01: The PokéSpa Tee $32
  (left-chest mark + full back crest) + The Holo Mug $18/$21 — both Public.
  Masters + state: docs/MERCH.md
- ✅ Fourthwall shop LIVE 2026-09-01: themed (holo hero collage, teal primary)
  + launched; merch.html doors-open copy shipped. Backlog in docs/MERCH.md.
  ⚠️ Alexander: payout setup before first sale.
- ⬜ Learn era next articles (1–2/session): whitening · holo scratches ·
  creases · warping · vintage wax · indents (hub already teases them)
- ✅ Image refresh 2026-09-01 (Alexander disliked muddier set): premium dark
  holo-silk imagery sitewide + FW store hero rebuilt as designed brand cards
  (merch-art/card-a+b); credits/rules in img/CREDITS.md
- ✅ Amazon Associates ACTIVE 2026-09-01: ID **pokespa-20**, tags baked into
  shop.html hrefs statically, "(paid link)" markers + Associates disclosure
  live. ⚠️ Amazon requires QUALIFIED SALES within 180 days (by ~2027-03-01)
  or the account is withdrawn — drive shop traffic.
- ✅ Shop catalog expansion 2026-09-01: 26 curated cards in 6 sections (dry
  kit, full Kurt's line, humidity/storage, protect, inspect, bench tools w/
  pressing caveat) — 22 tagged Amazon links, all with paid-link markers
- ✅ Merch expansion 2026-09-01: Shine Sticker $6 + Bench Hoodie $48 + Bench
  Mat $28 (5 products total); storefront flipped to LIGHT theme (Alexander:
  black items on black bg) — details docs/MERCH.md
- ✅ EXPANSION WAVE shipped 2026-09-01 (Alexander: "do all these"):
  · Store-feel shop: 26 tiles w/ custom holo-line SVG icon set, price hints,
    buy buttons (Amazon PA-API real images still gated on first 3 sales)
  · Damage encyclopedia COMPLETE: whitening, holo scratches, creases &
    pressing, warping, vintage wax/stains, indents (10 Learn articles total)
  · /value.html card value lookup (pokemontcg.io + TCGplayer market prices;
    API quirks: pageSize≤24, no orderBy, no multi-term q, needs retry —
    all handled; text-only results, NO card images per trademark rule)
  · /shows.html card show finder (live local searches + recurring majors)
  · Hub: encyclopedia live + Toolbox section
- ✅ Slab care shop section 2026-09-01 (Alexander's ask): sleeves, bumper
  cases, NOVUS polish ("polish the case, never the card"), storage, stands,
  UV displays — 6 tiles, 6 new icons, all tagged
- ✅ DROP RADAR shipped 2026-09-01 (Alexander: "add all that + fully
  automate"): /drops.html (auto set calendar + news + drop-day guide + free
  alert-tool directory + signup) · /api/drops (edge-cached 1h) · /api/subscribe
  → Resend audience 25aac3cb-6f49-4ec1-9924-6d43813ebcd0 · /api/digest weekly
  broadcast, Vercel cron Mon 14:00 UTC w/ CRON_SECRET (prod env; NOTE: first
  set attempt stored EMPTY — re-add needs file-redirect not var pipe).
  ZERO-MAINTENANCE by design; we never touch pokemoncenter.com
  (docs/DROP-ALERTS-RESEARCH.md). HARD-WON: Vercel egress is blocked by
  Reddit (403/429) and pokemontcg.io 500s from DCs — server sources are
  GitHub raw PokemonTCG/pokemon-tcg-data (sets) + Google News RSS (news).
  Live test broadcast sent to Alexander (subscriber #1) 2026-09-01.
- ⬜ pokemontcg.io API key (Alexander, free signup at dev.pokemontcg.io) →
  add X-Api-Key header in value.html for reliable rate limits
- ⬜ Alexander's personally curated Amazon list → add as tiles (tag applied)
- ⬜ Amazon PA-API images + live prices after first 3 qualifying sales
- ⬜ BCW affiliate/wholesale (Alexander) — later, for the dropship era
- ⬜ **Phase 2 — Shop era** (trigger: Kurt's reply or Learn traffic): BCW
  dropship account + storefront checkout (Shopify vs Stripe-on-Vercel decision)
- 🅿️ **Phase 3 — Brand era** (trigger: real sales): white-label PokéSpa
  microfiber cloth, short-form video channel

## Later / parked
- 🅿️ Booking or queue system — only if volume justifies it
- 🅿️ Restoration write-ups (case-study pages per card) — great SEO, needs
  real work to document first
