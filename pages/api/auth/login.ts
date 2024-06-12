import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/server/services/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (email !== "stefan@mail.io" || password !== "Aa123123@") {
    return res.status(400).json({ message: "invalidCredentialsException" });
  }

  const user = { id: "12344", username: "Vucko" };

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.status(200).json({ user, accessToken, refreshToken });
});

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

// const { username, password } = req.body;

// try {
//   const user = await User.findOne({ username });
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
//   res.json({ token });
// } catch (err) {
//   res.status(500).json({ message: 'Server error' });
// }
