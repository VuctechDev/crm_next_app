import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import {
  archiveLead,
  getPaginatedLeads,
  insertNewLead,
  updateLead,
} from "@/db/leads";
import { authGuard } from "../auth/authGuard";
import { NextApiRequestExtended } from "@/types/reaquest";
import { handleRequestMismatch } from "@/lib/server/utils/handleCors";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const filters = req.query as Record<string, string>;
    const { organizationId } = req.headers;
    const data = await getPaginatedLeads(filters, organizationId);
    res.status(200).json(data);
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId, organizationId } = req.headers;

    await insertNewLead(req.body, {
      createdBy: userId,
      owner: organizationId,
      tags: req.body.tags,
    });

    res.status(200).json({ success: true });
  })
  .patch(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const _id = req.query._id as string;
    if (!_id) {
      return res.status(404).json({ success: false, message: "notFound" });
    }

    await updateLead(req.body, _id);

    res.status(200).json({ success: true });
  })
  .delete(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const _id = req.query._id as string;
    if (!_id) {
      return res.status(404).json({ success: false, message: "notFound" });
    }

    await archiveLead(_id);

    res.status(200).json({ success: true });
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch: handleRequestMismatch,
});
