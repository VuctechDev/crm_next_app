import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { createTable, dropTable } from "@/db";
import { getLeads } from "@/db/leads";

interface NextApiRequestExtended extends NextApiRequest {
  files: Express.Multer.File[];
}

// function parseFilters(query:) {
//   const filters = {};
//   for (const key in query) {
//       if (key.startsWith('filter[')) {
//           const filterKey = key.match(/filter\[(.*?)\]/)[1]; // Extracts string between brackets
//           filters[filterKey] = query[key];
//       }
//   }
//   return filters;
// }

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router.get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  // createTable();
  // dropTable();

  const filters = req.query as Record<string, string>;
  const data = await getLeads(filters);
  res.status(200).json({ data });
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
