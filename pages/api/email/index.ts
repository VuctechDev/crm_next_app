import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "../auth/authGuard";
import { NextApiRequestExtended } from "@/types/reaquest";
import { getPaginatedEmails } from "@/db/emails";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const filters = req.query as Record<string, string>;
    const { organizationId } = req.headers;

    const data = await getPaginatedEmails(filters, organizationId);

    res.status(200).json(data);
  });

export default router.handler({
  onError(error: any, req, res) {
    console.log("CONFIG API ERROR: ", error);
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
