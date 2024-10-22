import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NextApiRequestExtended } from "@/types/reaquest";
import { authGuard } from "../auth/authGuard";
import { getUsage } from "@/db/usage";
import moment from "moment-timezone";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { organizationId } = req.headers;

    const timezone = "America/New_York"; // replace with your timezone
    const period = moment().tz(timezone).format("YYYY-MM");

    const data = await getUsage(organizationId, period);
    res.status(200).json({ data });
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
