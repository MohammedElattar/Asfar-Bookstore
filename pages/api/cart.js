import { getProduct } from "../../json/products";

export default function handler(req, res) {
  const product = () => {
    return {
      ...getProduct("random"),
      quantity: Math.floor(Math.random() * 4) + 1,
    };
  };

  setTimeout(() => {
    res.status(200).json({
      data: [product(), product()],
      type: "success",
    });
  }, 2000);
}
