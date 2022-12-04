export default function handler(req, res) {
  const categories = [];
  for (let i = 0; i < 500; i++) {
    categories.push({
      id: i,
      active: Math.random() < 0.5,
      name: `Category${i}`,
      productsCount: Math.round(Math.random() * 200),
    });
  }
  res.status(200).json({ categories });
}
