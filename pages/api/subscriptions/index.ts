import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NextApiRequestExtended } from "@/types/reaquest";
import { authGuard } from "../auth/authGuard";
import { handleRequestMismatch } from "@/lib/server/utils/handleCors";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

const subcription = {
  cardUploads: 50,
  // cardUploads: "∞",
  csvImportedLeads: 50,
  manualyCreatedLeads: 100,
  aiGeneratedEmails: 50,
  emailTemplates: 5,
  emailSignatures: 1,
  scheduledEmails: 100,
  users: 1,
  tags: 20,
  reminders: 20,
};

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { organizationId } = req.headers;
    res.status(200).json({ data: subcription });
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch: handleRequestMismatch,
});
