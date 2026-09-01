# PokéSpa merch — Fourthwall shop

_Shop #5 on Alexander's shared Fourthwall account (see the global playbook +
gotchas in `~/Desktop/Recursis-Site/docs/MERCH.md` — READ IT before touching
the designer). Created + first products built by Hale 2026-08-31→09-01._

## Shop
- **pokespa-shop.fourthwall.com** — **LIVE 2026-09-01** ("Your site went live").
- Linked from pokespa.com/merch.html (doors-open copy).
- Admin: pokespa-shop.fourthwall.com/admin/dashboard (Chrome extension has
  site permission as of 2026-09-01).
- Theme: dark Creator variant; Primary #7fd1c9, bg #161616 (close enough to
  brand ink; picker mis-targets swatches — verify hex landed on the right row).
  Hero: "WEAR THE SHINE" + collage = hero2 (rainbow foil) / hero1 (neon foil) /
  icon-mark (card mark). Fourthwall slot quirk: only EMPTY image slots expose a
  file input — JS-click the slot's Remove button first, then tag the input with
  aria-label and file_upload to it (panel Remove buttons no-op via normal click).

## Products (both PUBLIC, ready for launch)
| Product | Price | Base/Margin | Design |
|---|---|---|---|
| The PokéSpa Tee (black Bella+Canvas 3001 Supersoft) | $32 | $17.70 / $14.30 | Front: card mark 3.71" left chest ("Fit to area → Left chest"). Back: full crest — mark + holo PokéSpa wordmark + "RESTORATION, DISCLOSED. ALWAYS." |
| The Holo Mug (Black Glossy WGM79B, 11/15oz) | $18 / $21 | $8.95+ / ~$9-10.50 | Card mark 2.14" left of handle |

## Print masters (merch-art/, transparent, print-grade)
- front-mark.png 4200×4200 — card mark (copy of Recursis-Site back-pokespa.png)
- back-tee.png 4500×5400 — mark + wordmark + tagline (Inter 800 + JetBrains
  Mono via Google Fonts; headless Chrome w/ --default-background-color=00000000
  + --virtual-time-budget=10000; source back-tee.html)
- banner.png 2400×1000 — shop hero: holo bg + lockup + WEAR THE SHINE
  (source banner.html; NOT YET uploaded to the shop)
- pokespa-mark.svg — the vector source

## DONE 2026-09-01 — theme + launch
Theme installed on retry (the overnight hangs eventually committed server-side
— lesson: the "Installation in progress" spinner can be stale; reload the
store-design page later before assuming failure). Hero collage + colors set,
status flipped **Live**, storefront verified (hero + both products + teal CTA),
merch.html copy updated to doors-open.

## Backlog
- Header logo upload (wordmark POKESPA text currently — fine, mark would be nicer)
- Sticker product (icon-mark master exists)
- banner.png (2400×1000 lockup) unused — the collage won instead
- Alexander: Fourthwall payout setup still pending account-wide (before first sale!)

## Content rule (from CLAUDE.md)
Merch carries OUR mark only — no card artwork, no characters, no Pokémon
imagery, ever. Owner rule: front logos small over the left chest.
