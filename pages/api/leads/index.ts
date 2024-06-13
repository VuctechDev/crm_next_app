import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { createTable, dropTable } from "@/db";
import { getLeads } from "@/db/leads";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  // createTable();
  // dropTable();
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
