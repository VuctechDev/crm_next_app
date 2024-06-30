import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NextApiRequestExtended } from "@/types/reaquest";
import { authGuard } from "../../auth/authMid";
import {
  createNewTemplate,
  deleteTemplate,
  getPaginatedTemplates,
  getTemplates,
  updateTemplate,
} from "@/db/emails/templates";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const filters = req.query as Record<string, string>;
    const { userId } = req.headers;
    if (!filters.page || !filters.limit) {
      const data = await getTemplates(userId);
      return res.status(200).json({ data });
    }
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
      const { body, name, description, _id } = req.body;
      if (!body || !name || !description) {
        return res.status(400).json({ message: "badRequest" });
      }
      console.log(req.body);
      await updateTemplate(_id, req.body);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "somethingWentWrong" });
    }
  })
  .delete(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const _id = req.query._id as string;
      if (!_id) {
        return res.status(404).json({ success: false, message: "notFound" });
      }
      await deleteTemplate(_id);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "somethingWentWrong" });
    }
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
