#!/usr/bin/env python3
"""Draw the pick-card object illustrations (img/picks/*.svg) and merch tiles.

Our own drawings, in the site palette. Rules (CLAUDE.md + docs/CHRISTMAS-REVAMP-2026-11.md):
no cards, no characters, no round red/white shapes, no lettering beyond our own mark.
Every drawing: 800x600 canvas, one soft ground shadow, light from the top-left,
3px ink outline, a frost highlight edge. Run: python3 scripts/draw-picks.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "img" / "picks"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#0b0d12"          # outline
FROST = "#e6f0ef"
TEAL = "#7fd1c9"
LAV = "#b9a7f0"
GOLD = "#f0c98a"

DEFS = f"""<defs>
  <linearGradient id="holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{TEAL}"/><stop offset=".5" stop-color="{LAV}"/><stop offset="1" stop-color="{GOLD}"/></linearGradient>
  <linearGradient id="slate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#525c7c"/><stop offset="1" stop-color="#262b3b"/></linearGradient>
  <linearGradient id="slateSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e2230"/><stop offset="1" stop-color="#343b52"/></linearGradient>
  <linearGradient id="slateTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a7496"/><stop offset="1" stop-color="#4a5270"/></linearGradient>
  <linearGradient id="clear" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{FROST}" stop-opacity=".26"/><stop offset=".55" stop-color="{FROST}" stop-opacity=".08"/><stop offset="1" stop-color="{LAV}" stop-opacity=".16"/></linearGradient>
  <linearGradient id="clearEdge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{FROST}" stop-opacity=".95"/><stop offset=".6" stop-color="{TEAL}" stop-opacity=".7"/><stop offset="1" stop-color="{LAV}" stop-opacity=".8"/></linearGradient>
  <linearGradient id="glare" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="tealCloth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f8f88"/><stop offset="1" stop-color="#2c4b48"/></linearGradient>
  <linearGradient id="lavCloth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f80c4"/><stop offset="1" stop-color="#4b4270"/></linearGradient>
  <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3efe6"/><stop offset="1" stop-color="#cfc9bb"/></linearGradient>
  <linearGradient id="nitrile" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4c5470"/><stop offset="1" stop-color="#1a1d28"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7dcae"/><stop offset="1" stop-color="#b8915a"/></linearGradient>
  <radialGradient id="lens" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#e6f0ef" stop-opacity=".55"/><stop offset=".45" stop-color="#7fd1c9" stop-opacity=".22"/><stop offset="1" stop-color="#1b1f2b" stop-opacity=".9"/></radialGradient>
  <filter id="soft" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="lift" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#000" flood-opacity=".45"/></filter>
</defs>"""


def svg(name, body, shadow=(400, 520, 220, 26)):
    cx, cy, rx, ry = shadow
    doc = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-hidden="true">
{DEFS}
<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#000" opacity=".55" filter="url(#soft)"/>
<g stroke-linejoin="round" stroke-linecap="round">
{body}
</g>
</svg>
"""
    (OUT / f"{name}.svg").write_text(doc)


def clear_rect(x, y, w, h, r, extra=""):
    """A clear-plastic sheet: frost fill, holo edge, diagonal glare."""
    return f"""<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="url(#clear)" stroke="url(#clearEdge)" stroke-width="3"{extra}/>
<path d="M{x+w*0.18} {y+h} L{x+w*0.62} {y} L{x+w*0.80} {y} L{x+w*0.36} {y+h} Z" fill="url(#glare)" opacity=".8"/>"""


# 1 penny sleeve — two soft sleeves, slightly fanned, open tops
svg("sleeve", f"""
<g transform="rotate(-9 400 300)" filter="url(#lift)">
  {clear_rect(260, 112, 240, 336, 8)}
  <path d="M262 132 H498" stroke="{FROST}" stroke-opacity=".5" stroke-width="2"/>
</g>
<g transform="rotate(6 420 310)" filter="url(#lift)">
  {clear_rect(312, 128, 240, 336, 8)}
  <path d="M314 148 H550" stroke="{FROST}" stroke-opacity=".55" stroke-width="2"/>
  <path d="M400 128 q32 22 64 0" fill="none" stroke="{FROST}" stroke-opacity=".7" stroke-width="3"/>
</g>""")

# 2 toploader — rigid, thick rim, thumb notch at the open top
svg("toploader", f"""
<g transform="rotate(-6 400 300)" filter="url(#lift)">
  <rect x="262" y="96" width="276" height="372" rx="12" fill="url(#clear)" stroke="url(#clearEdge)" stroke-width="4"/>
  <rect x="280" y="114" width="240" height="336" rx="6" fill="#0e1016" fill-opacity=".18" stroke="{FROST}" stroke-opacity=".35" stroke-width="2"/>
  <path d="M362 96 q38 34 76 0" fill="#0e1016" fill-opacity=".35" stroke="url(#clearEdge)" stroke-width="3"/>
  <path d="M300 468 L420 96 L470 96 L350 468 Z" fill="url(#glare)"/>
  <path d="M270 110 V454" stroke="{FROST}" stroke-opacity=".7" stroke-width="3"/>
</g>""")

# 3 magnetic one-touch holder — thick block, two halves, recess
svg("magnetic-holder", f"""
<g filter="url(#lift)">
  <path d="M536 120 l20 14 v330 l-20 -14 Z" fill="{FROST}" fill-opacity=".14" stroke="url(#clearEdge)" stroke-width="3"/>
  <path d="M244 450 h292 l20 14 h-292 Z" fill="{FROST}" fill-opacity=".1" stroke="url(#clearEdge)" stroke-width="3"/>
  <rect x="244" y="120" width="292" height="330" rx="16" fill="url(#clear)" stroke="url(#clearEdge)" stroke-width="4"/>
  <rect x="290" y="160" width="200" height="250" rx="6" fill="#0e1016" fill-opacity=".28" stroke="{FROST}" stroke-opacity=".45" stroke-width="2"/>
  <path d="M244 285 h292" stroke="{LAV}" stroke-opacity=".6" stroke-width="2" stroke-dasharray="2 8"/>
  <path d="M300 450 L400 120 L450 120 L350 450 Z" fill="url(#glare)"/>
  <path d="M258 134 h264" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>
</g>""")

# 4 zip binder — standing 3/4, zipper around the edge, pull tab
svg("zip-binder", f"""
<g filter="url(#lift)">
  <path d="M528 104 l34 22 v352 l-34 -22 Z" fill="url(#slateSide)" stroke="{INK}" stroke-width="3"/>
  <path d="M212 456 h316 l34 22 h-316 Z" fill="#141720" stroke="{INK}" stroke-width="3"/>
  <rect x="212" y="104" width="316" height="352" rx="18" fill="url(#slate)" stroke="{INK}" stroke-width="3"/>
  <rect x="212" y="104" width="44" height="352" rx="14" fill="#151822" stroke="{INK}" stroke-width="3"/>
  <path d="M262 128 H504 a10 10 0 0 1 10 10 V422 a10 10 0 0 1 -10 10 H262" fill="none" stroke="{TEAL}" stroke-width="5" stroke-dasharray="3 6" stroke-linecap="butt"/>
  <rect x="300" y="190" width="170" height="170" rx="12" fill="none" stroke="url(#holo)" stroke-width="3" opacity=".55"/>
  <path d="M514 236 l26 -8 v36 l-26 -8 Z" fill="url(#gold)" stroke="{INK}" stroke-width="2"/>
  <path d="M232 104 h282 a14 14 0 0 1 14 14" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="3"/>
</g>""")

# 5 microfiber cloth — two folded cloths, top one with a turned corner
svg("cloth", f"""
<g filter="url(#lift)">
  <path d="M206 300 q8 -26 36 -28 l300 -6 q28 0 34 26 l18 140 q2 26 -26 28 l-330 10 q-26 0 -30 -26 Z" fill="url(#lavCloth)" stroke="{INK}" stroke-width="3"/>
  <path d="M236 244 q4 -30 34 -32 l276 -16 q30 -2 34 26 l14 150 q2 28 -26 30 l-300 14 q-28 2 -32 -26 Z" fill="url(#tealCloth)" stroke="{INK}" stroke-width="3"/>
  <path d="M262 236 l260 -14 M262 404 l270 -12" stroke="{FROST}" stroke-opacity=".35" stroke-width="2" stroke-dasharray="6 6"/>
  <g stroke="{FROST}" stroke-opacity=".07" stroke-width="2">
    <path d="M280 400 L360 230 M330 400 L410 226 M380 398 L460 224 M430 396 L510 220"/>
  </g>
  <path d="M594 222 l-86 -24 q20 60 26 112 Z" fill="#7fd1c9" stroke="{INK}" stroke-width="3"/>
  <path d="M594 222 l-60 88" stroke="{FROST}" stroke-opacity=".5" stroke-width="2"/>
  <path d="M270 214 q130 -10 250 -16" stroke="#fff" stroke-opacity=".25" stroke-width="3" fill="none"/>
</g>""")

# 6 air blower — rubber bulb on its side with a long nozzle
svg("air-blower", f"""
<g filter="url(#lift)">
  <path d="M232 300 q0 -118 128 -118 q90 0 120 74 l14 34 q-30 64 -134 64 q-128 0 -128 -54 Z" fill="url(#slate)" stroke="{INK}" stroke-width="3"/>
  <path d="M262 256 q30 -54 104 -56" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="10"/>
  <path d="M300 352 q40 14 96 6" fill="none" stroke="{LAV}" stroke-opacity=".35" stroke-width="4"/>
  <path d="M480 262 l40 -10 v68 l-40 -10 Z" fill="#232838" stroke="{INK}" stroke-width="3"/>
  <path d="M520 266 L640 280 v12 L520 306 Z" fill="url(#holo)" stroke="{INK}" stroke-width="3"/>
  <path d="M640 280 h18 v12 h-18 Z" fill="{TEAL}" stroke="{INK}" stroke-width="3"/>
  <path d="M676 274 l26 -10 M680 286 h30 M676 298 l26 10" stroke="{FROST}" stroke-opacity=".55" stroke-width="3"/>
</g>""", shadow=(430, 420, 230, 22))

# 7 humidity pack — paper pouch with crimped ends and a droplet mark
crimp_top = "".join(f"l10 -10 l10 10 " for _ in range(14))
crimp_bot = "".join(f"l-10 10 l-10 -10 " for _ in range(14))
svg("humidity-pack", f"""
<g transform="rotate(-5 400 300)" filter="url(#lift)">
  <path d="M260 150 {crimp_top} V430 {crimp_bot} Z" fill="url(#paper)" stroke="{INK}" stroke-width="3"/>
  <path d="M260 176 H540 M260 404 H540" stroke="#8a8476" stroke-width="2" stroke-dasharray="4 5"/>
  <rect x="300" y="210" width="200" height="160" rx="14" fill="#1b1f2b" stroke="{INK}" stroke-width="3"/>
  <path d="M400 236 q42 52 0 96 q-42 -44 0 -96 Z" fill="url(#holo)" stroke="{INK}" stroke-width="3"/>
  <path d="M388 270 q-8 14 0 30" stroke="#fff" stroke-opacity=".6" stroke-width="4" fill="none"/>
  <path d="M270 190 q120 -8 260 0" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none"/>
</g>""")

# 8 storage box — open-top box, upright slabs (blank) inside, hand slot
slabs = "".join(
    f'<rect x="{252+i*44}" y="{150 - (i%2)*10}" width="36" height="120" rx="5" fill="url(#clear)" stroke="url(#clearEdge)" stroke-width="2.5"/>'
    for i in range(7))
svg("storage-box", f"""
<g filter="url(#lift)">
  {slabs}
  <path d="M232 230 h336 l40 -30 v228 l-40 30 Z" fill="url(#slateSide)" stroke="{INK}" stroke-width="3"/>
  <path d="M232 230 h336 l40 -30 h-336 Z" fill="none" stroke="{INK}" stroke-width="3"/>
  <rect x="200" y="230" width="368" height="228" rx="10" fill="url(#slate)" stroke="{INK}" stroke-width="3"/>
  <rect x="340" y="262" width="88" height="22" rx="11" fill="#0e1016" stroke="{INK}" stroke-width="3"/>
  <rect x="226" y="318" width="316" height="112" rx="8" fill="none" stroke="url(#holo)" stroke-width="3" opacity=".5"/>
  <path d="M212 238 h344" stroke="#fff" stroke-opacity=".25" stroke-width="3"/>
</g>""")

# 9 card stand — two-piece acrylic stand (ledge + leaning back plate), empty
svg("card-stand", f"""
<g filter="url(#lift)">
  <path d="M286 396 L322 196 H478 L514 396 Z" fill="url(#clear)" stroke="url(#clearEdge)" stroke-width="3"/>
  <path d="M330 222 H470" stroke="{FROST}" stroke-opacity=".5" stroke-width="2"/>
  <path d="M332 396 L362 196 H392 L362 396 Z" fill="url(#glare)"/>
  <path d="M236 392 h328 l34 50 h-396 Z" fill="url(#clear)" stroke="url(#clearEdge)" stroke-width="3"/>
  <path d="M202 442 h396 v22 h-396 Z" fill="{FROST}" fill-opacity=".14" stroke="url(#clearEdge)" stroke-width="3"/>
  <path d="M262 412 h276" stroke="{TEAL}" stroke-opacity=".85" stroke-width="5"/>
  <path d="M250 398 h300" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>
</g>""")

# 10 deck box — upright box, flip lid, holo seam
svg("deck-box", f"""
<g filter="url(#lift)">
  <path d="M492 190 l58 -36 v262 l-58 36 Z" fill="url(#slateSide)" stroke="{INK}" stroke-width="3"/>
  <path d="M286 190 l58 -36 h206 l-58 36 Z" fill="url(#slateTop)" stroke="{INK}" stroke-width="3"/>
  <rect x="286" y="190" width="206" height="262" rx="10" fill="url(#lavCloth)" stroke="{INK}" stroke-width="3"/>
  <path d="M286 262 H492 l58 -36" fill="none" stroke="url(#holo)" stroke-width="5"/>
  <rect x="368" y="250" width="42" height="18" rx="6" fill="url(#gold)" stroke="{INK}" stroke-width="2"/>
  <path d="M298 202 h182" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>
</g>""")

# 11 playmat — flat mat in perspective, rolled at the back, stitched edge
svg("playmat", f"""
<g filter="url(#lift)">
  <path d="M150 440 L240 250 H620 L690 440 Z" fill="#14171f" stroke="{INK}" stroke-width="3"/>
  <path d="M166 430 L250 260 H612 L674 430 Z" fill="none" stroke="{LAV}" stroke-opacity=".75" stroke-width="3" stroke-dasharray="7 6"/>
  <path d="M150 440 L240 250 H620 L690 440 Z" fill="url(#holo)" opacity=".08"/>
  <rect x="226" y="196" width="412" height="62" rx="31" fill="url(#slate)" stroke="{INK}" stroke-width="3"/>
  <ellipse cx="626" cy="227" rx="14" ry="31" fill="#0e1016" stroke="{INK}" stroke-width="3"/>
  <ellipse cx="626" cy="227" rx="6" ry="16" fill="none" stroke="{LAV}" stroke-opacity=".6" stroke-width="2"/>
  <path d="M244 212 h360" stroke="#fff" stroke-opacity=".25" stroke-width="4"/>
  <path d="M150 440 h540 v14 h-540 Z" fill="#0b0d12" stroke="{INK}" stroke-width="3"/>
</g>""", shadow=(420, 470, 290, 24))

# 12 loupe — folding loupe, open, LED dot
svg("loupe", f"""
<g filter="url(#lift)">
  <path d="M240 420 l220 -40 l40 46 l-220 40 Z" fill="url(#slateSide)" stroke="{INK}" stroke-width="3"/>
  <path d="M282 420 q-10 -168 120 -196 q132 -20 160 140 l-62 62 Z" fill="url(#slate)" stroke="{INK}" stroke-width="3"/>
  <circle cx="420" cy="320" r="92" fill="#232838" stroke="{INK}" stroke-width="3"/>
  <circle cx="420" cy="320" r="72" fill="url(#lens)" stroke="url(#holo)" stroke-width="4"/>
  <path d="M376 288 q22 -30 58 -30" stroke="#fff" stroke-opacity=".7" stroke-width="6" fill="none"/>
  <rect x="520" y="240" width="22" height="12" rx="4" fill="{TEAL}" stroke="{INK}" stroke-width="2"/>
  <path d="M552 236 l20 -10 M556 248 h22" stroke="{TEAL}" stroke-opacity=".7" stroke-width="3"/>
</g>""", shadow=(400, 480, 220, 24))

# 13 display case — thick UV acrylic block on a base, empty recess
svg("display-case", f"""
<g filter="url(#lift)">
  <path d="M536 92 l22 16 v340 l-22 -16 Z" fill="{LAV}" fill-opacity=".18" stroke="url(#clearEdge)" stroke-width="3"/>
  <rect x="264" y="92" width="272" height="340" rx="10" fill="url(#clear)" stroke="url(#clearEdge)" stroke-width="4"/>
  <rect x="264" y="92" width="272" height="340" rx="10" fill="{LAV}" fill-opacity=".08"/>
  <rect x="300" y="150" width="200" height="254" rx="5" fill="#0e1016" fill-opacity=".3" stroke="{FROST}" stroke-opacity=".45" stroke-width="2"/>
  <rect x="300" y="112" width="200" height="26" rx="4" fill="#0e1016" fill-opacity=".3" stroke="{FROST}" stroke-opacity=".35" stroke-width="2"/>
  <path d="M310 432 L420 92 L470 92 L360 432 Z" fill="url(#glare)"/>
  <path d="M226 432 h348 l20 24 h-388 Z" fill="url(#slateTop)" stroke="{INK}" stroke-width="3"/>
  <path d="M206 456 h388 v20 h-388 Z" fill="url(#slate)" stroke="{INK}" stroke-width="3"/>
  <path d="M276 104 h248" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>
</g>""")

# 14 gloves — a pair of black nitrile gloves, overlapping
glove = ("M0 0 c-6 -40 -2 -80 4 -110 c3 -14 22 -14 24 0 l6 70 "
         "l4 -96 c1 -16 24 -16 25 0 l2 96 "
         "l8 -88 c2 -15 24 -14 24 1 l-4 92 "
         "l14 -66 c3 -14 23 -11 22 4 l-12 100 "
         "c20 -24 42 -40 56 -30 c8 6 4 16 -4 24 c-30 30 -48 66 -64 92 "
         "l-6 64 h-108 Z")
svg("gloves", f"""
<g filter="url(#lift)">
  <g transform="translate(380 330) rotate(14) scale(1.3)">
    <path d="{glove}" fill="url(#nitrile)" stroke="{INK}" stroke-width="3"/>
    <path d="M-10 64 h108" stroke="{LAV}" stroke-opacity=".4" stroke-width="3"/>
  </g>
  <g transform="translate(226 326) rotate(-10) scale(1.3)">
    <path d="{glove}" fill="url(#nitrile)" stroke="{INK}" stroke-width="3"/>
    <path d="M10 -90 q6 -20 12 -22 M44 -110 q4 -16 10 -18 M76 -100 q6 -14 10 -16" stroke="#fff" stroke-opacity=".35" stroke-width="4" fill="none"/>
    <path d="M-10 64 h108" stroke="{TEAL}" stroke-opacity=".5" stroke-width="3"/>
  </g>
</g>""", shadow=(400, 520, 220, 24))

# --- Merch tiles (our own products; our mark only) ---
MARK = """<g transform="rotate(-8 50 50)"><rect x="31" y="21" width="40" height="56" rx="5" fill="none" stroke="url(#holo)" stroke-width="5"/></g>
<path d="M71,13 l3,7 7,3 -7,3 -3,7 -3,-7 -7,-3 7,-3 z" fill="#f0c98a"/>"""

svg("merch-mug", f"""
<g filter="url(#lift)">
  <path d="M500 230 q86 0 86 74 q0 74 -86 74" fill="none" stroke="#1b1f2b" stroke-width="30"/>
  <path d="M500 230 q86 0 86 74 q0 74 -86 74" fill="none" stroke="{INK}" stroke-width="3"/>
  <path d="M256 170 h260 v260 q0 34 -34 34 h-192 q-34 0 -34 -34 Z" fill="url(#slate)" stroke="{INK}" stroke-width="3"/>
  <ellipse cx="386" cy="170" rx="130" ry="20" fill="#0e1016" stroke="{INK}" stroke-width="3"/>
  <path d="M282 196 v220" stroke="#fff" stroke-opacity=".3" stroke-width="12"/>
  <g transform="translate(330 236) scale(1.25)">{MARK}</g>
</g>""")

svg("merch-sticker", f"""
<g transform="rotate(-7 400 300)" filter="url(#lift)">
  <rect x="260" y="140" width="280" height="300" rx="56" fill="#f3efe6" stroke="{INK}" stroke-width="3"/>
  <rect x="280" y="160" width="240" height="260" rx="42" fill="#12151d"/>
  <g transform="translate(310 196) scale(1.8)">{MARK}</g>
  <path d="M540 380 q-40 6 -60 60 q46 -6 60 -60 Z" fill="#cfc9bb" stroke="{INK}" stroke-width="3"/>
</g>""")

svg("merch-mat", f"""
<g filter="url(#lift)">
  <rect x="120" y="190" width="560" height="270" rx="26" fill="#12151d" stroke="{INK}" stroke-width="3"/>
  <rect x="120" y="190" width="560" height="270" rx="26" fill="url(#holo)" opacity=".1"/>
  <rect x="140" y="210" width="520" height="230" rx="18" fill="none" stroke="{FROST}" stroke-opacity=".22" stroke-width="2"/>
  <g transform="translate(190 262) scale(1.3)">{MARK}</g>
  <text x="352" y="350" font-family="-apple-system,Segoe UI,Inter,Arial,sans-serif" font-weight="800" font-size="62" fill="#f1efe9" letter-spacing="-1"><tspan fill="url(#holo)">Poké</tspan>Spa</text>
  <path d="M140 204 h520" stroke="#fff" stroke-opacity=".18" stroke-width="3"/>
</g>""", shadow=(400, 490, 300, 24))

print("wrote", len(list(OUT.glob("*.svg"))), "drawings to", OUT)
