const admins = [
  {
    token: "85|k6Ytlm3d22xaIGLU6dSivjtUhpsZbCadKOc5gIQw",
    email: "admin@admin.com",
    password: "admin",
    id: "1",
  },
];

export default async function handler(req, res) {
  const { secretKey, token } = req.query;
  if (secretKey === process.env.SECRET_KEY && token && req.method === "GET") {
    const adminWithToken = admins.find((e) => e.token === token);
    if (adminWithToken) {
      res.status(200).json({ type: "success", isAdmin: true, received: token });
    } else {
      res
        .status(200)
        .json({ type: "success", isAdmin: false, received: token });
    }
  } else {
    res.status(404).json({ type: "Failed" });
  }
}
