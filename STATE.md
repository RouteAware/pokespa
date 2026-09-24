# STATE — PokeSpa-Site · updated 2026-09-24 01:10 ET

## Now
- Hale · SEO pass LIVE (merge a4861c4, Vercel READY 2026-09-23 ~16:15 ET); sitemap resubmitted in GSC 19:22. Next: check GSC "Last read" 2026-09-30; nothing else scheduled.
- Alexander · 10 raw card photos (IMG_2263–2272) + two iCloud " 2" dupes moved OUT of the repo to `~/Recursis-Digital/pokespa-untracked-2026-09-24/` at close (untracked, would have deployed via CLI); keep or delete — your photos.
- Hale · Kurt reply + affiliate items unchanged (memory pokespa-session-close-2026-09-02).

## Verified live
- pokespa.com: /privacy%202.html 404 · /IMG_2263.jpeg 404 · /nope-xyz 404 · JSON-LD on home · new creases/holo meta descriptions · `curl -s -o /dev/null -w '%{http_code}' https://pokespa.com/nope-xyz` · 2026-09-23 16:20 ET.

## Open owner calls
- Delete or keep the moved raw photos · default: keep 30 days then delete · decide-by 2026-10-24.
- Privacy page says "run by Recursis Holdings" — legal entity wording waits on Marlowe (must match the real LLC) · default: leave until his read · decide-by 2026-09-30.

## Rollback
- `vercel rollback https://pokespa-a0l25mhz7-alexander-hughes-projects.vercel.app --yes` (pre-SEO prod) or `git revert -m 1 a4861c4 && git push origin master`.

## Do-not-touch
- none — local branch `seo-2026-09-23` is merged; delete after 2026-09-30.
