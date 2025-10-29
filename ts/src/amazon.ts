export async function searchAmazonMock(q: string) {
  return [
    { asin: 'B0EX1', title: 'Fone Bluetooth Mock', price: 129.9, currency: 'BRL', image: 'https://via.placeholder.com/300' },
    { asin: 'B0EX2', title: 'Smartwatch Mock', price: 219.9, currency: 'BRL', image: 'https://via.placeholder.com/300' }
  ];
}

export function generateAffiliateFromASIN(asin: string) {
  const tag = process.env.AMAZON_ASSOC_TAG || 'yourtag-20';
  return `https://www.amazon.com/dp/${asin}/?tag=${tag}`;
}
