import re, glob, json, html, urllib.request, sys
BASE="http://localhost:8931"
URLS=[("/","index.html"),("/quote.html",None),("/service.html",None),("/shop.html",None),
      ("/merch.html",None),("/value.html",None),("/shows.html",None),("/drops.html",None),
      ("/privacy.html",None),("/learn/","learn/index.html")]+\
     [(f"/learn/{s}.html",None) for s in ["how-to-clean-pokemon-cards","cleaning-cards-before-grading",
      "cleaning-vs-card-doctoring","diy-or-pro","edge-whitening","holo-scratches","creases-and-pressing",
      "warping-and-humidity","vintage-wax-and-stains","indents-and-dings"]]
fails=[]
def chk(cond,msg):
    if not cond: fails.append(msg)
seen_titles={}
for url,_ in URLS:
    s=urllib.request.urlopen(BASE+url).read().decode()
    h=s.split("</head>")[0]
    g=lambda p:(re.search(p,h,re.S).group(1) if re.search(p,h,re.S) else None)
    t=g(r'<title>(.*?)</title>'); d=g(r'<meta name="description" content="(.*?)"')
    can=g(r'<link rel="canonical" href="(.*?)"')
    chk(t and len(html.unescape(t))<=60, f"{url}: title missing/>60 ({t})")
    chk(d and len(html.unescape(d))<=155, f"{url}: desc missing/>155")
    chk(can and can.startswith("https://pokespa.com"), f"{url}: canonical bad ({can})")
    chk(html.unescape(t) not in seen_titles, f"{url}: DUPLICATE title with {seen_titles.get(html.unescape(t))}")
    seen_titles[html.unescape(t)]=url
    for tag in ['og:title','og:description','og:image','og:url','og:image:alt','og:locale',
                'twitter:card','twitter:title','twitter:description','twitter:image']:
        chk(tag in h, f"{url}: missing {tag}")
    chk('<html lang="en">' in s, f"{url}: no lang")
    chk('name="viewport"' in h, f"{url}: no viewport")
    chk(len(re.findall(r'<h1[ >]',s))==1, f"{url}: h1 count = {len(re.findall(r'<h1[ >]',s))}")
    # heading order: never skip a level
    lv=[int(x) for x in re.findall(r'<h([1-6])[ >]',s)]
    for a,b in zip(lv,lv[1:]):
        if b>a+1: fails.append(f"{url}: heading jump h{a}->h{b}"); break
    # every img has alt
    for i in re.findall(r'<img\b[^>]*>',s):
        chk('alt=' in i, f"{url}: img without alt: {i[:80]}")
    # json-ld parses
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S):
        try: json.loads(b)
        except Exception as e: fails.append(f"{url}: JSON-LD parse fail {e}")
    chk('noindex' not in h, f"{url}: unexpectedly noindex")
# 404
s404=urllib.request.urlopen(BASE+"/404.html").read().decode()
chk('name="robots" content="noindex' in s404, "404.html: not noindex")
chk(len(re.findall(r'<h1[ >]',s404))==1, "404.html: h1 count")
# robots + sitemap
rob=urllib.request.urlopen(BASE+"/robots.txt").read().decode()
chk("Sitemap: https://pokespa.com/sitemap.xml" in rob, "robots.txt: no Sitemap line")
sm=urllib.request.urlopen(BASE+"/sitemap.xml").read().decode()
locs=re.findall(r'<loc>(.*?)</loc>',sm)
chk(len(locs)==20, f"sitemap: {len(locs)} urls, expected 20")
chk(len(set(locs))==len(locs), "sitemap: duplicate urls")
for l in locs:
    p=l.replace("https://pokespa.com","") or "/"
    try: urllib.request.urlopen(BASE+p).getcode()
    except Exception as e: fails.append(f"sitemap url 404s locally: {l}")
chk(all(re.search(r'<lastmod>\d{4}-\d{2}-\d{2}</lastmod>',x) for x in re.findall(r'<url>.*?</url>',sm,re.S)), "sitemap: missing lastmod")
print(f"{len(URLS)} pages + 404 + robots + sitemap checked")
if fails:
    print(f"\n{len(fails)} FAILURES:"); [print("  ✗",f) for f in fails]; sys.exit(1)
print("\nALL CHECKS PASS ✓")
