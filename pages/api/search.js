import products from "../../json/products.json";

export default function handler(req, res) {
  const { q } = req.query;
  const searchedProducts = products
    .filter((product) => {
      return (
        product.title.includes(q) ||
        product.writter?.includes(q) ||
        product.publisher?.includes(q)
      );
    })
    .slice(0, 20);

  res.status(200).json({ products: searchedProducts });
}
