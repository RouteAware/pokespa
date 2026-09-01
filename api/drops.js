// Drop radar data endpoint — cached at the edge for an hour so the
// upstream sources see a handful of requests a day, not our traffic.
const { fetchDropsData } = require('./_drops-data.js');

module.exports = async (req, res) => {
  try {
    const data = await fetchDropsData();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json(data);
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).json({ error: 'sources unavailable' });
  }
};
