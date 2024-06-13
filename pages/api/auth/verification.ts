import { verifyAuth } from "@/db/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import {
  getVerificationSession,
  removeVerificationSession,
} from "@/db/auth/verification-sessions";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, _id, email } = req.query;
  const baseURL = process.env.API_BASE_URL as string;

  if (!code || !_id) {
    return res.redirect(baseURL);
  }

  const session = await getVerificationSession(code as string);
  if (!session) {
    return res.redirect(baseURL);
  }

  if (session?.code !== code || _id?.toString() !== session?._id.toString()) {
    return res.redirect(baseURL);
  }

  await verifyAuth(_id as string);
  await removeVerificationSession(code as string);

  res.status(200).redirect(`${baseURL}/login?email=${email}`);
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
