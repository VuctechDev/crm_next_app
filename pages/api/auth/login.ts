import { getAuth, updateLastLogin } from "@/db/auth";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/server/services/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import { getUser } from "@/db/users";
import { handleRequestMismatch } from "@/lib/server/utils/handleCors";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "invalidCredentialsException" });
  }

  const auth = await getAuth(email);
  if (!auth) {
    return res.status(400).json({ message: "invalidCredentialsException" });
  } else if (!auth.verified) {
    return res.status(400).json({ message: "notVerifiedException" });
  }

  const passwordMatch = await bcrypt.compare(password, auth.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "invalidCredentialsException" });
  }
  await updateLastLogin(auth._id);
  const user = await getUser(auth._id);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(200).json({ accessToken, refreshToken });
});

export default router.handler({
  onError(error: any, req, res) {
    console.log(error);
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch: handleRequestMismatch,
});
