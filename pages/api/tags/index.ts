import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NextApiRequestExtended } from "@/types/reaquest";
import { authGuard } from "../auth/authMid";
import { createNewTag, getTag, getTags } from "@/db/tags";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { organizationId } = req.headers;
    const data = await getTags(organizationId);
    res.status(200).json(data);
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { organizationId } = req.headers;
      const { tag, description, color } = req.body;
      if (!tag || !description || !color) {
        return res.status(400).json({ message: "badRequest" });
      }

      const duplication = await getTag(tag);
      if (duplication) {
        return res.status(400).json({ message: "tagAlreadyExists" });
      }

      await createNewTag({
        tag,
        description,
        color,
        organization: organizationId,
      });

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
