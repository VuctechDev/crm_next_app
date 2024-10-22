import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NextApiRequestExtended } from "@/types/reaquest";
import { authGuard } from "../auth/authGuard";
import {
  createNewTag,
  getTag,
  getPaginatedTags,
  updateTag,
  getTags,
  removeTag,
} from "@/db/tags";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { organizationId } = req.headers;
    const filters = req.query as Record<string, string>;
    if (!filters.page || !filters.limit) {
      const data = await getTags(organizationId);

      return res.status(200).json({ data });
    }

    const data = await getPaginatedTags(filters, organizationId);
    res.status(200).json(data);
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { organizationId } = req.headers;
      const { tag, description, color } = req.body;
      if (!tag || !description || !color) {
        return res.status(400).json({ message: "badRequest" });
      }

      const duplication = await getTag(tag, organizationId);
      if (duplication) {
        return res.status(400).json({ message: "tagAlreadyExists" });
      }

      const _id = await createNewTag({
        tag,
        description,
        color,
        organization: organizationId,
      });

      res.status(200).json({ success: true, _id });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "somethingWentWrong" });
    }
  })
  .patch(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { tag, description, color, _id } = req.body;
      console.log("req.body", req.body);
      if (!tag || !description || !color || !_id) {
        return res.status(400).json({ message: "badRequest" });
      }

      await updateTag(_id, {
        tag,
        description,
        color,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "somethingWentWrong" });
    }
  })
  .delete(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { _id } = req.query as { _id: string };
      console.log("req.body", _id);
      if (!_id) {
        return res.status(400).json({ message: "badRequest" });
      }

      await removeTag(_id);

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
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
