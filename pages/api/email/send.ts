import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "../auth/authMid";
import { NextApiRequestExtended } from "@/types/reaquest";
import { sendEmail } from "@/lib/server/services/nodemailer";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { html, from, to, subject } = req.body;
      const config = {
        from: `${from} <neotech@pikado.net>`,
        to,
        subject,
        html: `<div style="color: #2a2a2a !important;">
        ${html} 
        <p><img src="${process.env.API_BASE_URL}/api/email/read?_id=123456789" width="1" height="1" style="display:none;"></p>
        </div>`,
      };
      await sendEmail(config);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "somethingWentWrong" });
    }
  });
// .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
//   const { userId } = req.headers;
//   await createNewComment({ ...req.body, createdBy: userId });

//   res.status(200).json({ success: true });
// });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
