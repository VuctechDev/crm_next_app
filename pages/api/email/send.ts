import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "../auth/authMid";
import { NextApiRequestExtended } from "@/types/reaquest";
import {
  createNewComment,
  getPaginatedComments,
  removeComment,
} from "@/db/comments";
import { sendVerificationEmail } from "@/lib/server/services/nodemailer/verification";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
//   .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    await sendVerificationEmail("", "iygigwhd", 3333);

    res.status(200).json({ ok: true });
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId } = req.headers;
    await createNewComment({ ...req.body, createdBy: userId });

    res.status(200).json({ success: true });
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
