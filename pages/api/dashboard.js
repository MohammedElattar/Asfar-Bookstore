const info = {
  users: 50,
  products: 1830,
  categories: 84,
  writters: 144,
};

export default function handler(req, res) {
  res.status(200).json({ info });
}
