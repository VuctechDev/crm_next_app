import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getItems } from "@/db/local";
import { localInit } from "@/lib/server/middlewares/localDBInit";

interface NextApiRequestExtended extends NextApiRequest {
  files: Express.Multer.File[];
}

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(localInit)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    res.status(200).json({ data: getItems() });
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
