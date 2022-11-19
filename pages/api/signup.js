import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";

export default async function handler(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.name;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, {
      displayName: username,
    });

    res.status(200).json({ user: cred.user });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
