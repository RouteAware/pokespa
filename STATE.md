# STATE — PokeSpa-Site · updated 2026-09-24 01:10 ET
<!-- machine header (hale-close): branch master · HEAD cd28249 · dirty 0 · unpushed 0 · worktrees 4 · verified-at 2026-09-24 06:44 -->

## Now
- Hale · 2026-10-19 17:33 ET · **Branch `pokespa-affiliate-funnel-2026-10-19` @ d81e6cc, pushed, ready for the owner's merge go; prod still dc7fadf.** Worktree ~/Recursis-Digital/worktrees/pokespa-affiliate-funnel (Desktop copy is on master). Morning: site pivot off restoration (red banner, copy on 20 pages). Evening: /quote.html → waitlist (api/waitlist.js → one Resend email to info@ per sign-up, no list; honeypot, rate limit, 1–3 digit card count), waitlist-thanks.html, FAQ from the 9 inquiries; 3 "(paid link)" supply kits on how-to-clean / edge-whitening / warping-and-humidity (tag pokespa-20, no prices); all 10 guides reviewed (docs/GUIDES-REVIEW-2026-10-19.md, 32 edits) + shared learn-page ending; share-image text fixed on 17 pages; notice bar trimmed to "Restoration orders are closed. Guides and shop are open." (hidden on quote + thanks); privacy.html dated 10-19, "a Recursis Digital company"; service.html closed-tense, FAQ schema removed; shop links rel="sponsored noopener"; tests/waitlist.test.js 11/11 (`npm test`); links 658/0 broken.
- Gates: Ansel 17:17 · Marlowe 17:17 · Nyla PASS W/ CONDITIONS 17:25 ET (hale/council/2026-10-19-nyla-evening-gates.md §C). Owner: one real test submit on the preview (pokespa-1d9zv10vy or newer) → email reaches info@; Q-88 Advanced Matching OFF check; then "merge". Rollback: promote dc7fadf.
- S-13: NO "restoration reopens" email to the waitlist until the CMRA address exists (CAN-SPAM). The 9 inquiry reply drafts are in Gmail (Q-85, owner sends). Holiday posts for PokéSpa HOLD until the FB About/IG bio stop saying "restoration".

## Verified live
- pokespa.com: /privacy%202.html 404 · /IMG_2263.jpeg 404 · /nope-xyz 404 · JSON-LD on home · new creases/holo meta descriptions · `curl -s -o /dev/null -w '%{http_code}' https://pokespa.com/nope-xyz` · 2026-09-23 16:20 ET.

## Open owner calls
- Delete or keep the moved raw photos · default: keep 30 days then delete · decide-by 2026-10-24.
- Privacy page says "run by Recursis Holdings" — legal entity wording waits on Marlowe (must match the real LLC) · default: leave until his read · decide-by 2026-09-30.

## Rollback
- `vercel rollback https://pokespa-a0l25mhz7-alexander-hughes-projects.vercel.app --yes` (pre-SEO prod) or `git revert -m 1 a4861c4 && git push origin master`.

## Do-not-touch
- none — local branch `seo-2026-09-23` is merged; delete after 2026-09-30.
