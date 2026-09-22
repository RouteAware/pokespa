# Shop product images — research (2026-09-21)

Owner ask: "is it possible to add a product preview image on pokespa" — shop.html's
14 direct-link (`amazon.com/dp/<ASIN>`) product tiles had no photo, only a brand-neutral
SVG icon. Rule (Associates Operating Agreement): never hotlink/copy Amazon product
images. Allowed sources: manufacturer/brand press or dealer image kits with stated
reuse terms, or images explicitly licensed for reuse.

## Result: 0 of 14 cleared for real photos — all 14 stay placeholders

Every brand below was checked (official site + wholesale/dealer/resale/resources page
where one exists, plus a general press-kit search). **None of the ten brands publish an
affiliate/retailer media kit or state that product photos may be reused off their own
site.** Boveda's Terms of Service explicitly *prohibits* reuse without written
permission. The rest are simply silent on image rights — silence isn't permission, so
per the task's rule they stay "needs photo," not downloaded.

| Product (shop.html) | Brand | Source(s) checked | Terms seen | Status |
|---|---|---|---|---|
| Rubber-bulb air blower | Giottos | web search (no giottos.com press/dealer page surfaced) | none found | needs photo |
| Clean microfiber cloths | MagicFiber | magicfiber.com/wholesale/ | bulk-order/logo program only; no image-reuse terms | needs photo |
| Kurt's Care Kit | Kurt's Card Care | kurtscardcare.com/resale | asks resellers to *photograph the product themselves* and tag Kurt's on Instagram — no license to use Kurt's own photos | needs photo |
| Kurt's Card Care Spray | Kurt's Card Care | kurtscardcare.com/resale | same as above | needs photo |
| Kurt's Card Polish | Kurt's Card Care | kurtscardcare.com/resale | same as above | needs photo |
| Kurt's Card Care Recovery | Kurt's Card Care | kurtscardcare.com/resale | same as above | needs photo |
| Two-way humidity packs | Boveda | bovedabrands.com/terms-of-service | explicit: "may not copy... or exploit in any way any of the content"; "content is not for resale"; written permission required | needs photo |
| Penny sleeves + toploaders | Ultra Pro | ultrapro.com (retailer-resources page 404s) | none found | needs photo |
| Card Saver 1 | Cardboard Gold | cardboardgold.com/wholesale.html | wholesale/distribution terms only (and bars Amazon/eBay resale by anyone but their master distributor); no image-reuse grant | needs photo |
| Magnetic one-touch holders | Ultra Pro | ultrapro.com (retailer-resources page 404s) | none found | needs photo |
| Graded slab sleeves | BCW | bcwsupplies.com/resources, /wholesale | wholesale account + partner links only; no downloadable media/press kit | needs photo |
| NOVUS plastic polish (1 & 2) | NOVUS | novuspolish.com (wholesale page 404s) | none found | needs photo |
| 10x jeweler's loupe | SE (generic import brand) | no dedicated brand site found | n/a — no manufacturer site to check | needs photo |
| 365nm UV flashlight | uvBeast | uvbeast.com/pages/catalog | policy links only (warranty/refund/privacy/ToS); no affiliate or press-kit page found | needs photo |

## What shipped instead

Every tile already used a hand-drawn, brand-neutral SVG icon in the site's holo
gradient (`stroke:url(#pg)`, the same teal→purple→gold as the logo) — that already
satisfies "tasteful placeholder in the site's holo-gradient." Per the site's existing
honesty precedent ("the gallery says 'coming soon' until real photos exist," CLAUDE.md
rule 4), added a small `Photo coming soon` micro-label (9px mono, muted color, bottom-right
corner of the thumb, `.needs-photo` class) to the same 14 tiles above — so visitors see
it's a known gap, not a broken image, without it reading as an error state. The 14
non-direct-link ("tightened search") and 2 "browse the brand" tiles were left exactly as
they were (icon only, no label) since the ASIN-swap doc explicitly scoped this to the 14
direct-link products.

## Next step if real photos are wanted later

Email each brand and ask directly (Kurt's Card Care and Cardboard Gold both list contact
emails; Boveda requires written request per their ToS) for retailer/affiliate image
permission, or buy one unit of each product and photograph it in-house (same rule PokéSpa
already applies to its own gallery — real, owned photos, never someone else's IP).
