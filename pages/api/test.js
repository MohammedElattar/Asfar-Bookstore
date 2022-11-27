export default function handler(req, res) {
  const { body } = req;

  console.log(body);

  res.status(200).json({ message: "done", body });
}
