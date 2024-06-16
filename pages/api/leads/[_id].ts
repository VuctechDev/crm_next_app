import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getLead } from "@/db/leads";
import { authGuard } from "../auth/authMid";
import { NextApiRequestExtended } from "@/types/reaquest";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const _id = req.query?._id;
    if (!_id) {
      return res
        .status(400)
        .json({ success: false, message: "missingIDException" });
    }
    const data = await getLead(_id as string);
    res.status(200).json({ data, success: true });
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
