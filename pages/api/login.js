import { serialize } from "cookie";
import axios from "axios";

export default async function handler(req, res) {
  const response = await fetch(process.env.ADMIN_LOGIN_URL, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    body: req.body,
  });

  const data = await response.json();

  const {
    data: { user, token },
    type,
  } = data;

  console.log(data);

  if (type === "success") {
    res.setHeader(
      "Set-Cookie",
      serialize("userToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60,
        sameSite: true,
        path: "/admin",
      })
    );
  }

  res.status(response.status).json(data);
}
