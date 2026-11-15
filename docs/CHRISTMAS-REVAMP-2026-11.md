# PokéSpa Christmas revamp — build spec (Hale's ruling on Sloane, Ansel, Marlowe, Delphi) · 2026-11-15
Owner (dialog, his words): "i want it all revamped, images depth add, user flows, organization, amazon links, great gifts for pokemon collectors, etc, also christmas theming and styling for the season". Waitlist: "Leave it as is". Nothing goes live without Nyla's read and the owner's word.

## Hard rules (Marlowe, read on Amazon's pages 2026-11-15; repo CLAUDE.md still binds)
- Above the first pick on any page with paid links: "As an Amazon Associate, PokéSpa earns from qualifying purchases."
- Every pick: button "View on Amazon" + "(paid link)" beside it + `rel="sponsored nofollow noopener"` + the existing tag/link pattern from shop.html.
- NEVER: prices, price bands, "deal", star ratings, review quotes, Amazon logo, "arrives by Christmas", "Prime", "best", "tested", "official", "our favorite", "we use" (shop.html lines 7, 9, 20, 136 change to neutral wording: "we recommend" / "Why it's here: …").
- Images: only our own SVG/PNG drawings, the licensed photos already in img/ (see img/CREDITS.md), and our merch mockups. NO Amazon or manufacturer photos, NO cards, NO characters, NO Poké Ball-like round red/white shapes, NO Pokémon lettering.
- Merch delivery line: "See the shop for holiday shipping dates." linking to the merch shop. No date of our own.
- Keep the not-affiliated footer. quote.html and waitlist-thanks.html are NOT touched.

## Structure (Sloane)
- NEW `/gifts.html` = gift guide for people who do not collect. `/shop.html` stays the collector's care shop, restyled to the same pick-card layout, "we use" wording fixed, Kurt's chemical items stay on shop.html only (never on gifts.html).
- Nav everywhere: Gifts · Shop · Learn · Merch · Restoration (→ /quote.html). `service.html` leaves the nav (page stays). `drops`, `value`, `shows` move to a footer group "Collector tools".
- Home, top to bottom: notice bar (as is; add the merch shipping line only if it fits in the same bar, no second bar) → hero → "What do they do with their cards?" four tiles that jump to gift-guide groups → Stocking stuffers merch row (Sticker, Mug, Mat → merch shop, `?utm_source=pokespa`) → restoration waitlist block (as shipped, unchanged wording) → Learn: three damage guides → bench gallery → promise (3 lines) → footer.
- Fix now-false copy: home "What we do" must not offer restoration; og.png text "Bring tired cards back to life." is replaced.
- Add the Vercel Analytics script to gifts, shop, merch and learn pages the same way home has it.

## Look (Ansel, "frost on foil")
- Base palette and logo unchanged. Christmas accents in ONE removable file `holiday.css` (linked on every page, removed Jan 2): evergreen #173a32 (band tint, 25% over the panel colour), gold #f0c98a (gift-page accent, gift-tag line), frost #e6f0ef (highlights). The logo sparkle is the snow: a few slow drifting gold sparkles, OFF under prefers-reduced-motion. No red-and-white.
- Depth (permanent, in the main CSS): real section headings 28–36px white with the mono label kept as a small line above; split hero (copy left, image right, existing silk-dark photo behind); alternating bands; pick tiles = 4:3 object drawing with a soft shadow, gold gift-tag line above the name, 1px top highlight rgba(255,255,255,.06); sticky row of jump buttons for the gift groups; page header banners from the licensed photos.
- Images to make for launch (SVG drawn, exported PNG where needed, 800×600 unless noted): sleeve, toploader, magnetic holder, zip binder, microfiber cloth, air blower, humidity pack, storage box, card stand, deck box, playmat, loupe; og.png and og-gifts.png 1200×630 ("Gifts for card collectors" / "Card-care picks and guides from PokéSpa."). Hero still-life: use a licensed photo from img/ for now (Hale may add a generated still-life later).

## Copy (Ansel; Marlowe-safe)
- Home hero: "Gifts for the collector who sleeves everything." / "Card-care supplies, storage, and free guides for the collector on your list." Buttons: "Gift guide" · "Card-care guides".
- Gift page: title "Gifts for card collectors"; intro "The best gifts are the things a collector uses every day. Here are the ones we'd pick."; helper line "Not sure? Ask them: binder or plastic cases?"
- Pick card: name in plain words · "Why it's here: …" (one line, what it does) · "Good for: …" · size note where sizes vary · button · "Price on Amazon".

## Gift groups and picks (Delphi verified each listing on Amazon 2026-11-15 unless noted; links https://www.amazon.com/dp/ASIN + our tag)
1. **Stocking stuffers:** Ultra Pro penny sleeves B08B9GVG36 · BCW team set bags B002PF61O2 · Ultra Pro small stands 5-pack B0058KET5Y · (+ our Sticker and Mug as merch tiles)
2. **Just starting out:** Vault X 9-pocket zip binder B071V91LGC · Ultra Pro toploaders B000Q5ZMM0 · BCW Spectrum playmat B09MWHBTCK
3. **For the binder builder:** Vault X 12-pocket zip binder B07S93V4GP · Dragon Shield Card Codex 576 B0C35WS2YD · Dragon Shield perfect-fit inner sleeves B01NAG6W60
4. **For the graded shelf:** Card Saver 1 B002UL5I8Q · slab sleeves B002PF48J2 · VALUN graded card storage box B0D7TWCMMZ
5. **Show it off:** Ultra PRO UV ONE-Touch + stands 5-pack B09R659NZG · Ultra Pro 35pt UV One-Touch B073G9MZSZ · DisplayGifts UV graded display case B0033RZCPK
6. **Keep it clean:** microfiber cloths B0050R67U0 · 10x LED loupe B00OZOGDNU · Boveda 58% packs B06XCZ6V2Y · nitrile gloves B0D6KBSFYV
Left out on purpose: centering tool and "fireproof" box (weak listings), bulk cardboard boxes (2 left in stock), hygrometer (listing not opened), sealed Pokémon product, cleaning chemicals.
Recheck every ASIN resolves in the week it publishes.

## Not built
Quiz, countdowns, snow that ignores reduced motion, static prices, gift cards for the closed service, new pixel events, a second notice bar.

## Owner items (not blocking the build)
- Per-page Amazon tracking IDs (gifts / shop / learn) need his Associates login: 10 minutes.
- Bench photos of gear he owns would let some picks honestly say "we use".
