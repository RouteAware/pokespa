# Amazon links — direct-product swap (2026-09-21)

Owner complaint: shop.html's Amazon links were all `amazon.com/s?k=...` search-result
URLs, so "the products we want don't always show up" first. Task: replace with direct
`amazon.com/dp/<ASIN>?tag=pokespa-20` links where there's a genuine single best-fit
product; keep (and tighten) a search link where real buyer choice/sizing varies
(binders, display cases, and similarly taste-driven categories).

**Link format verified against Amazon's documented Associates format:**
`http://www.amazon.com/dp/<ASIN>/ref=nosim?tag=<associateID>` — the `/ref=nosim` segment
is optional; `https://www.amazon.com/dp/<ASIN>?tag=pokespa-20` (what we used) is a fully
valid, un-cloaked, genuine Amazon URL carrying the tag, which is what the Associates
Operating Agreement requires (no redirects/shorteners hiding the amazon.com destination).

## Verification method + a real limitation

Amazon serves product pages as JS-rendered content and blocks automated scraping of the
body — `WebFetch` on any `amazon.com/dp/...` URL only returns page `<head>` metadata
(confirms the page **title**, not price/rating/stock). This is a platform-wide limitation,
not specific to any one product, and it also blocked a fallback attempt via
camelcamelcamel.com (403). So verification here is two-layered:

1. **Every one of the 27 Amazon links (all 14 new direct `dp` links + all 13 remaining
   search links) was HEAD/GET-checked and returned HTTP 200** — see `docs/link-check.js`
   output below. For a `dp/<ASIN>` link, a 200 confirms the ASIN is live and not
   delisted/404'd; it does not confirm price or stock level.
2. **Titles were cross-verified via independent web search** (multiple listings/sources
   agreeing on the same ASIN + title) rather than a single source.

Star ratings and review counts (the "≥4.3 / ≥500 reviews" criterion) could **not** be
independently confirmed through automated fetch for any item — that data lives behind
Amazon's rendered page/API, which this environment can't reach. Selections below lean on
brand-name match to the guide copy, search-result prominence, and (where a snippet
happened to surface it) third-party pricing — flagged per row. Alexander should spot-check
the 14 direct links in a browser before the branch merges; that's a 5-minute click pass,
not a re-research.

## Table: old search link → new link

| # | Item (shop.html) | Type | Old query | New link | Title confirmed | Price seen | Date |
|---|---|---|---|---|---|---|---|
| 1 | Rubber-bulb air blower | **Direct** | `giottos+rocket+air+blower` | [dp/B00017LSPI](https://www.amazon.com/dp/B00017LSPI?tag=pokespa-20) | Giottos AA1900 Rocket Air Blaster Large – Black | not independently confirmed (site est. $8–15 stands) | 2026-09-21 |
| 2 | Clean microfiber cloths | **Direct** | `microfiber+lens+cleaning+cloth` | [dp/B0050R67U0](https://www.amazon.com/dp/B0050R67U0?tag=pokespa-20) | MagicFiber Microfiber Cleaning Cloth, 6-Pack (Amazon's Choice per search context) | ~$7.99 (list ~$11.99) per third-party deal listing, not live-fetched | 2026-09-21 |
| 3 | Soft anti-static brush | Tightened search | `anti+static+soft+detailing+brush+camera` | `kinetronics+staticwisk+anti+static+camera+sensor+brush` | n/a (several close competitors; no single dominant SKU with confirmed review volume) | n/a | 2026-09-21 |
| 4 | Cotton inspection gloves | Tightened search | `lint+free+cotton+inspection+gloves` | `lisle+white+cotton+lint+free+inspection+gloves` | n/a (commodity category) | n/a | 2026-09-21 |
| 5 | Kurt's Care Kit | **Direct** | `kurts+card+care+kit` | [dp/B0D6GTBY3Y](https://www.amazon.com/dp/B0D6GTBY3Y?tag=pokespa-20) | Kurt's Card Care Kit | not independently confirmed (site est. ~$50 stands) | 2026-09-21 |
| 6 | Kurt's Card Care Spray | **Direct** | `kurts+card+care+spray` | [dp/B0DPR8J4TN](https://www.amazon.com/dp/B0DPR8J4TN?tag=pokespa-20) | Kurt's Card Care 8oz. Spray | not independently confirmed (site est. $20–30 stands) | 2026-09-21 |
| 7 | Kurt's Card Polish | **Direct** | `kurts+card+care+polish` | [dp/B0DGP2GM4D](https://www.amazon.com/dp/B0DGP2GM4D?tag=pokespa-20) | Kurt's Card Care Polish | not independently confirmed (site est. $25–45 stands) | 2026-09-21 |
| 8 | Kurt's Card Care Recovery | **Direct** | `kurts+card+care+recovery` | [dp/B0FHZKSCQ1](https://www.amazon.com/dp/B0FHZKSCQ1?tag=pokespa-20) | Kurt's Card Care Recovery | not independently confirmed (site est. $25–30 stands) | 2026-09-21 |
| 9 | Kurt's Card Tool | **UNCHANGED — could not verify** | `kurts+card+care+tool` | *(left as search link)* | No standalone "Kurt's Card Tool" ASIN found on Amazon — the tool is only sold bundled, inside the Kit (B0D6GTBY3Y) or the larger Accessory Pack (B0DWZ2XL2R, ~8 items incl. the tool). Linking either as "the Card Tool" would misrepresent price/contents, so this one stays a search link. | n/a | 2026-09-21 |
| 10 | Two-way humidity packs | **Direct** | `boveda+58+humidity+packs` | [dp/B06XCZ6V2Y](https://www.amazon.com/dp/B06XCZ6V2Y?tag=pokespa-20) | Boveda 58% Two-Way Humidity Control Packs, Size 67 (1lb), 4-Pack | not independently confirmed (site est. $10–20 stands, matches 4-pack tier) | 2026-09-21 |
| 11 | Card storage humidor | Tightened search | `card+humidor+trading+card+storage` | `card+humidor+airtight+storage+box+with+humidity+pack` | n/a (copy itself says "purpose-built ones exist... or an airtight box" — genuinely open-ended) | n/a | 2026-09-21 |
| 12 | Mini digital hygrometer | Tightened search | `mini+digital+hygrometer` | `govee+mini+digital+hygrometer+thermometer` | n/a (biased toward Govee, a widely-recognized brand in this category; not hard-linked since size/style varies) | n/a | 2026-09-21 |
| 13 | Penny sleeves + toploaders | **Direct** | `ultra+pro+penny+sleeves+toploaders` | [dp/B07DZN6J9J](https://www.amazon.com/dp/B07DZN6J9J?tag=pokespa-20) | 100 UltraPro Premium Toploaders + 100 Penny Sleeves Bundle | not independently confirmed (site est. $8–15 — flagged low, see note below) | 2026-09-21 |
| 14 | Card Saver 1 | **Direct** | `card+saver+1+cardboard+gold` | [dp/B002UL5I8Q](https://www.amazon.com/dp/B002UL5I8Q?tag=pokespa-20) | Cardboard Gold Card Saver 1, 100-Count | not independently confirmed (site est. $9–14 stands) | 2026-09-21 |
| 15 | Magnetic one-touch holders | **Direct** | `ultra+pro+one+touch+35pt+uv` | [dp/B073G9MZSZ](https://www.amazon.com/dp/B073G9MZSZ?tag=pokespa-20) | Ultra Pro One-Touch 35pt Magnetic Card Holder, UV-Blocking, Diamond Corners, 5-Pack | not independently confirmed (site est. $10–18 stands) | 2026-09-21 |
| 16 | Side-loading binder | Tightened search (owner example: choice matters) | `side+loading+trading+card+binder+9+pocket` | `ultra+pro+9+pocket+zippered+side+loading+trading+card+binder` | n/a — kept as search deliberately | n/a | 2026-09-21 |
| 17 | Graded slab sleeves (team bags) | **Direct** | `graded+card+sleeves+team+bags+psa` | [dp/B002PF48J2](https://www.amazon.com/dp/B002PF48J2?tag=pokespa-20) | BCW Resealable Graded Card Sleeves, 100-Pack, universal fit PSA/Beckett/SGC/CGC | not independently confirmed (site est. $7–12 stands) | 2026-09-21 |
| 18 | Slab bumper cases | Tightened search | `graded+card+protector+case+psa+slab` | `BCW+graded+card+slab+guard+protective+bumper+case` | n/a — copy says "get the version cut for your grader's case," genuinely size-dependent | n/a | 2026-09-21 |
| 19 | NOVUS plastic polish (1 & 2) | **Direct** | `novus+plastic+polish+1+2` | [dp/B002UD0GIG](https://www.amazon.com/dp/B002UD0GIG?tag=pokespa-20) | Novus 7136 Plastic Polish Kit, 2oz (includes #1, #2, #3 + Polish Mates — a superset of the "1 & 2" in the copy) | ~$14.99 seen at a third-party retailer (Detailing.com), not Amazon-confirmed live | 2026-09-21 |
| 20 | Graded card storage box | Tightened search | `graded+card+storage+box+slab` | `BCW+graded+card+storage+box+holds+slabs` | n/a — box size/capacity is a real buyer choice | n/a | 2026-09-21 |
| 21 | Slab display stands | Tightened search | `graded+card+display+stand+acrylic` | `acrylic+display+stand+easel+for+graded+card+slab` | n/a — style/size is taste | n/a | 2026-09-21 |
| 22 | UV-blocking slab display | Tightened search (owner example: display cases) | `uv+protected+graded+card+display+case` | `UV+protected+wall+mount+display+case+for+graded+card+slab` | n/a — kept as search deliberately | n/a | 2026-09-21 |
| 23 | 10x jeweler's loupe | **Direct** | `10x+jewelers+loupe+led` | [dp/B00OZOGDNU](https://www.amazon.com/dp/B00OZOGDNU?tag=pokespa-20) | SE Illuminated 10X Magnifying Loupe, 21mm glass lens, folding, case + batteries included | not independently confirmed (site est. $8–15 stands) | 2026-09-21 |
| 24 | Digital microscope | Tightened search | `digital+microscope+1000x+coin+card` | `usb+digital+microscope+1000x+coin+card+inspection` | n/a — connectivity (USB/wireless/screen) is a real choice | n/a | 2026-09-21 |
| 25 | 365nm UV flashlight | **Direct** | `365nm+uv+flashlight` | [dp/B01CV1XW5K](https://www.amazon.com/dp/B01CV1XW5K?tag=pokespa-20) | uvBeast V3 365nm Black Light UV Flashlight — genuine 365nm (many cheap "365nm" listings are mislabeled 395nm, which the guide's residue-detection use case needs to avoid) | not independently confirmed (site est. $12–25 stands) | 2026-09-21 |
| 26 | Acrylic plates (press) | Tightened search | `clear+acrylic+sheet+4x6` | `clear+acrylic+plexiglass+sheet+4x6+inch+2+pack` | n/a — commodity, thickness/pack-size varies | n/a | 2026-09-21 |
| 27 | Soft-jaw spring clamps | Tightened search | `soft+jaw+mini+spring+clamps` | `mini+spring+clamps+soft+silicone+tip+small` | n/a — commodity | n/a | 2026-09-21 |
| 28 | Card press | Tightened search | `trading+card+press+flattening` | `trading+card+press+flattening+tool+screw` | n/a — brand/size is real buyer choice (BCW vs Card Vice vs others) | n/a | 2026-09-21 |

(Row count is 28 because row 13's Amazon search covered "penny sleeves + toploaders" as
one link — table numbers the 27 hrefs found in shop.html plus row 9 which is the one left
untouched; 27 links total, matches `grep -c amazon.com shop.html`.)

**Note on row 13 (penny sleeves + toploaders bundle):** the site's price hint says
"typically $8–15" but a 100+100 bundle of two separate Ultra Pro products is very likely
priced above that band. Flagging for Alexander to eyeball — if it reads high, either
raise the price hint copy or swap back to two separate tightened searches instead of one
bundle SKU. Did not change the copy myself (scope says copy changes are out of bounds
beyond product-name matches).

## Link-check script + run output

`docs/link-check.js` — dependency-free Node 18+ script, HEADs (falls back to GET on
405/5xx) every `http(s)` link found in a given HTML file and reports non-200s.

```
node docs/link-check.js shop.html
```

Run 2026-09-21 (Node v22.18.0) — **33 links checked (27 Amazon + 6 non-Amazon: pokespa.com
self-link, kurtscardcare.com ×2, bcwsupplies.com, recursisdigital.com), 33 OK, 0 non-200s.**
All 14 new direct `dp/<ASIN>` links returned 200, confirming none of the ASINs are dead or
delisted as of this run.

## Amazon Associates rule that affects the 3-sales/180-day clock

Both link types (`s?k=` search and `dp/<ASIN>`) carry the `tag=pokespa-20` param equally
and **both count toward a qualifying sale** — Amazon tracks by the referral tag + 24-hour
click cookie, not by URL shape, so switching link type doesn't change *eligibility* to
count a sale. What it changes is **conversion odds**: a search-result link makes the
visitor pick from a list (an extra decision + click before checkout, higher
drop-off/bounce risk, and a real chance they never click through to *any* product) while a
direct product link removes that friction entirely. That's the literal mechanism behind
Alexander's complaint ("the products we want don't always show up") and it's also the
lever that matters most for the 180-day/3-sale deadline (~2027-03-01 per ROADMAP) — more
completed click-throughs per visitor, not a different counting rule. No other
Associates-agreement rule change applies here; both link formats are genuine,
uncloaked amazon.com URLs, which is what the Operating Agreement requires either way.
