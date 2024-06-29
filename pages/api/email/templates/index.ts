import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NextApiRequestExtended } from "@/types/reaquest";
import {
  createNewSignature,
  getSignature,
  updateSignature,
} from "@/db/emails/signatures";
import { authGuard } from "../../auth/authMid";
import {
  createNewTemplate,
  getPaginatedTemplates,
} from "@/db/emails/templates";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const filters = req.query as Record<string, string>;
    const { userId } = req.headers;

    const data = await getPaginatedTemplates(filters, userId);

    res.status(200).json(data);
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { userId } = req.headers;
      const { body, name, description } = req.body;
      if (!body) {
        return res.status(400).json({ message: "badRequest" });
      }

      await createNewTemplate({
        name,
        description,
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
      const { html } = req.body;
      if (!html) {
        return res.status(400).json({ message: "badRequest" });
      }

      await updateSignature(userId, html);

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
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
