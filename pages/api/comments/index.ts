import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "../auth/authMid";
import { NextApiRequestExtended } from "@/types/reaquest";
import { createNewComment, getPaginatedComments, removeComment } from "@/db/comments";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { count, parent } = req.query as Record<string, string>;

    const data = await getPaginatedComments(count, parent);

    res.status(200).json({ data });
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId } = req.headers;
    await createNewComment({ ...req.body, createdBy: userId });

    res.status(200).json({ success: true });
  })
  //   .patch(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  //     const _id = req.query._id as string;
  //     if (!_id) {
  //       return res.status(404).json({ success: false, message: "notFound" });
  //     }

  //     await updateLead(req.body, _id);

  //     res.status(200).json({ success: true });
  //   })
  .delete(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const _id = req.query._id as string;
    if (!_id) {
      return res.status(404).json({ success: false, message: "notFound" });
    }

    await removeComment(_id);

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
