module.exports = async (req, res) => {
  res.setHeader('Cache-Control','no-store');
  const out = {};
  const UA = {'User-Agent':'PokeSpaDropRadar/1.0 (+https://pokespa.com/drops.html)'};
  for (const [k,u,h] of [
    ['tcgapi','https://api.pokemontcg.io/v2/sets?pageSize=250',{}],
    ['reddit','https://www.reddit.com/r/PKMNTCGDeals/new.rss',UA],
    ['reddit_json','https://www.reddit.com/r/PKMNTCGDeals/new.json?limit=10',UA],
    ['libreddit','https://old.reddit.com/r/PKMNTCGDeals/new.rss',UA],
  ]) {
    try { const r = await fetch(u,{headers:h}); const t = await r.text(); out[k]={status:r.status,len:t.length,head:t.slice(0,80)}; }
    catch(e){ out[k]={err:e.message}; }
  }
  res.status(200).json(out);
};
