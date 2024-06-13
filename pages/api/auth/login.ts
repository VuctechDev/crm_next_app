import { getAuth } from "@/db/auth";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/server/services/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import bcrypt from "bcrypt";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "invalidCredentialsException" });
  }

  const user = await getAuth(email);

  console.log(user);
  if (!user) {
    return res.status(400).json({ message: "invalidCredentialsException" });
  } else if (!user.verified) {
    return res.status(400).json({ message: "notVerifiedException" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "invalidCredentialsException" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(200).json({ accessToken, refreshToken });
});

export default router.handler({
  onError(error: any, req, res) {
    console.log(error);
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
