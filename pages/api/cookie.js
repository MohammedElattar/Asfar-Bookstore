import { serialize } from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("token", "tokenValue", {
      httpOnly: true,
      secure: true,
    })
  );

  res.status(200).json({ msg: "done" });
}
