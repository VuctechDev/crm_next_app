import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NextApiRequestExtended } from "@/types/reaquest";
import {
  createNewSignature,
  getSignature,
  updateSignature,
} from "@/db/emails/signatures";
import { authGuard } from "../../auth/authGuard";
import { handleRequestMismatch } from "@/lib/server/utils/handleCors";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId } = req.headers;

    const data = await getSignature(userId);

    res.status(200).json(data);
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { userId } = req.headers;
      const { body } = req.body;
      if (!body) {
        return res.status(400).json({ message: "badRequest" });
      }

      await createNewSignature({
        body,
        user: userId,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "somethingWentWrong" });
    }
  })
  .patch(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { userId } = req.headers;
      const { body } = req.body;
      if (!body) {
        return res.status(400).json({ message: "badRequest" });
      }

      await updateSignature(userId, body);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "somethingWentWrong" });
    }
  });
// updateSignature
export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch: handleRequestMismatch,
});
