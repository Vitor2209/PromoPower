const axios = require('axios');
async function getMLProducts(q) {
  try {
    const res = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=3`);
    return res.data.results.map(r => ({ title: r.title, price: 'R$' + r.price, link: r.permalink }));
  } catch (e) {
    return [
      { title: 'Produto ML Mock 1', price: 'R$99,90', link: 'https://mercadolivre.com/ex1' },
      { title: 'Produto ML Mock 2', price: 'R$199,90', link: 'https://mercadolivre.com/ex2' }
    ];
  }
}

module.exports = { getMLProducts };
