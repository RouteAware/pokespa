module.exports = async (req, res) => {
  res.setHeader('Cache-Control','no-store');
  const out = {};
  for (const [k,u] of [
    ['gh_sets','https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/master/sets/en.json'],
    ['gnews','https://news.google.com/rss/search?q=%22pokemon%20tcg%22%20(restock%20OR%20preorder%20OR%20%22release%20date%22)&hl=en-US&gl=US&ceid=US:en'],
    ['tcgapi_again','https://api.pokemontcg.io/v2/sets?pageSize=250'],
  ]) {
    try { const r = await fetch(u); const t = await r.text(); out[k]={status:r.status,len:t.length,head:t.slice(0,100).replace(/\s+/g,' ')}; }
    catch(e){ out[k]={err:e.message}; }
  }
  res.status(200).json(out);
};
