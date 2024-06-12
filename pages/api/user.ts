import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
const jwt = require("jsonwebtoken");
// import { createTable, dropTable } from "@/db";
// import { getLeads } from "@/db/leads";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ username: "Vucko", age: 30 });
});

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
