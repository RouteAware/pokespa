# PokéSpa — project context (for Hale)

Alexander's Pokémon / collectible trading-card **restoration** service. Side
venture under Recursis Holdings. LIVE at **pokespa.com** (Vercel project
"pokespa", repo RouteAware/pokespa, static single-page site). Inherits the
global profile (`~/.claude/CLAUDE.md`) + portfolio home (`~/Desktop/HALE.md`).

## Hard rules (non-negotiable)
1. **TRADEMARK CARE.** No Pokémon/Nintendo logos or character artwork used as
   a design element, hero art, background, or logo anywhere on the site.
   **Carve-out (ruling 2026-09-21, council/2026-09-21-photos-and-california-privacy.md
   §1):** documentation photos of Alexander's own physical cards are allowed
   — site, organic social, and paid ads, same rule for all three — under
   these conditions: never used as hero art, a background, or a logo; the
   non-affiliation disclaimer stays visible on the same page/post; never
   captioned or framed as "improves grade" (rule 5); card and set named
   plainly, not stylized to spotlight the character art; any takedown or
   complaint request = stop and pull immediately, never fight. The
   non-affiliation disclaimer in the footer stays. "PokéSpa" is our name;
   everything else belongs to its owners.
2. **Disclosed restoration is the identity.** The whole pitch is honest
   restoration — documented work, disclosure when selling or grading, never
   helping anyone deceive a grader or buyer. Copy must never drift toward
   "improve your grade" marketing.
3. **No invented specifics.** Prices, turnaround times, and service guarantees
   don't exist yet — don't write them into copy until Alexander sets them.
4. **Honest copy** (portfolio-wide rule): the page never claims what the
   service doesn't do. The gallery says "coming soon" until real photos exist.

## Brand
- Palette: bg `#0e1016`, panel `#161923`, text `#f1efe9`, muted `#9aa0ad`,
  accent teal `#7fd1c9`, holo gradient `#7fd1c9 → #b9a7f0 → #f0c98a`.
- Logo (2026-08-29): tilted card, holo-gradient stroke, gold + teal sparkles.
  "Card catching the light" = restored shine. Favicon/header are inline SVG.
- Voice: warm, careful, craftsperson-honest. Short sentences.

## Expansion-era rules (2026-08-31 — full context: docs/EXPANSION-2026-08-31.md)
5. **NEVER grade-improvement marketing.** PSA treats cleaning/pressing as
   alteration (N5/N7) and has decertified Kurt's-treated cards. Products and
   guides are framed as card care / display prep / preservation — education
   states plainly that a restored card is an altered card under grader policy.
6. **FTC affiliate disclosure** adjacent to every monetized link ("paid link"
   style, visible with the recommendation) — footer boilerplate isn't compliant.
7. **Never file a USPTO application for "PokéSpa"** — TPCi actively opposes
   Poké-prefix marks in the card space. Name stays unregistered; keep clean.

## State (2026-08-29, gallery updated 2026-09-21)
Landing: hero (CTA → /quote.html) → What we do → How it works (4 steps) →
The PokéSpa promise (disclosure tenets) → From the bench (real photo gallery,
Alexander's own cards, shipped 2026-09-21 per rule 1 carve-out) → Learn card
care → footer w/ legal. **Backend: one Vercel function, `api/inquiry.js`** — quote
form w/ photo attachments via Resend (RESEND_API_KEY in Vercel env, key
shared w/ lane-watch; stored SENSITIVE so `vercel env pull` returns it
empty — the plaintext lives in lane-watch/.env.local). Sender is
alerts@berouteaware.com until pokespa.com is Resend-verified. No analytics.
Privacy: /privacy.html + pixel opt-out (branch privacy-2026-09-06); meta-pixel.js
must stay byte-identical across all five Recursis brand sites; the weekly digest
cron no-ops until POSTAL_ADDRESS env exists (CAN-SPAM). Direction: `ROADMAP.md`.
