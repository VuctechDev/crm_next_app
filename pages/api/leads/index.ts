import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getLeads } from "@/db/leads";
import { authGuard } from "../auth/authMid";
import { NextApiRequestExtended } from "@/types/reaquest";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const filters = req.query as Record<string, string>;
    const { organizationId } = req.headers;
    const data = await getLeads(filters, organizationId);
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
