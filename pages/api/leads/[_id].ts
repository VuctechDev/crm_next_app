import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { createTable, dropTable } from "@/db";
import { getLead, getLeads } from "@/db/leads";

interface NextApiRequestExtended extends NextApiRequest {
  files: Express.Multer.File[];
}

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router.get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const _id = req.query?._id;
  if (!_id) {
    return res
      .status(400)
      .json({ success: false, message: "missingIDException" });
  }
  const data = await getLead(_id as string);
  res.status(200).json({ data, success: true });
});

export const config = {
  api: {},
};

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
