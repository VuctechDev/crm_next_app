import { createNewAuth, getAuth } from "@/db/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/lib/server/services/nodemailer/verification";
import { generateCode } from "@/lib/server/utils/generateRandomCode";
import { createNewVerificationSession } from "@/db/auth/verification-sessions";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const existingAuth = await getAuth(email);
  if (existingAuth) {
    return res.status(400).json({ message: "existingUserException" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const _id = await createNewAuth({
    username: email,
    password: hashedPassword,
  });

  const code = generateCode();

  await createNewVerificationSession(code, _id);
  await sendVerificationEmail(email, code, _id);

  res.status(200).json({ success: true });
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
