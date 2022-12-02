import products from "../../json/products.json";

export default async function handler(req, res) {
  res.status(200).json({ products });
}
