import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getLeads } from "@/db/leads";
import { authGuard } from "../auth/authMid";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(authGuard).get(async (req: NextApiRequest, res: NextApiResponse) => {
  const filters = req.query as Record<string, string>;
  const data = await getLeads(filters);
  res.status(200).json(data);
});

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
