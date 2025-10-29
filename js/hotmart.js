async function getHotmartMock() {
  return [
    { id: 'HM-100', title: 'Curso Node.js Avançado', price: 197.0, currency: 'BRL', image: 'https://via.placeholder.com/300', affiliate_link: 'https://hotmart.link/ex1' },
    { id: 'HM-101', title: 'Marketing Digital', price: 297.0, currency: 'BRL', image: 'https://via.placeholder.com/300', affiliate_link: 'https://hotmart.link/ex2' }
  ];
}

module.exports = { getHotmartMock };
