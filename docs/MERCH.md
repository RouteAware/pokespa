# PokéSpa merch — Fourthwall shop

_Shop #5 on Alexander's shared Fourthwall account (see the global playbook +
gotchas in `~/Desktop/Recursis-Site/docs/MERCH.md` — READ IT before touching
the designer). Created + first products built by Hale 2026-08-31→09-01._

## Shop
- **pokespa-shop.fourthwall.com** — status: **Coming soon** (NOT launched).
- Linked from pokespa.com/merch.html ("being stocked" copy until doors open).
- Admin: pokespa-shop.fourthwall.com/admin/dashboard (Chrome extension has
  site permission as of 2026-09-01).

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

## OPEN — theme + launch (next session)
1. **Theme install HANGS** ("Installation in progress" spinner never resolves;
   tried 3× on 2026-09-01 ~00:15, two themes, fresh tabs — same hang; server
   never committed, picker returns on reload). Likely Fourthwall glitch or
   new-shop provisioning lag. RETRY first thing next session; if it persists,
   route Alexander to pick any theme manually (his click may behave the same —
   then it's a Fourthwall support ticket).
2. After theme lands: colors bg #0e1016 / primary #7fd1c9, upload banner.png
   as hero, logo, wire products on homepage.
3. Flip status **Coming soon → Live** (top bar dropdown in Site design).
4. Update pokespa.com/merch.html copy to "doors open" + verify storefront.
5. Alexander: Fourthwall payout setup still pending account-wide.

## Content rule (from CLAUDE.md)
Merch carries OUR mark only — no card artwork, no characters, no Pokémon
imagery, ever. Owner rule: front logos small over the left chest.
