import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";

export default async function handler(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    res.status(200).json({ user: cred.user });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
