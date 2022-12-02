import { serialize } from "cookie";
import axios from "axios";

export default async function handler(req, res) {
  const response = await fetch("http://127.0.0.1:8000/api/admin/v1/auth", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify({
      email: "admin@admin.com",
      password: "admin",
    }),
  });

  const data = await response.json();

  const { data: user, token } = data;
  // console.log(req.headers);
  console.log(data);

  // console.log(user, token);

  res.setHeader(
    "Set-Cookie",
    serialize("token", "testToken", {
      httpOnly: true,
      secure: true,
    })
  );

  res.status(200).json({ ...data });
}
