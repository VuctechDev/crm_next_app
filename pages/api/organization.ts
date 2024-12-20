import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "./auth/authGuard";
import { updateUserFromOrganization } from "@/db/users";
import { createNewOrganization } from "@/db/organizations";
import { NextApiRequestExtended } from "@/types/reaquest";
import { handleRequestMismatch } from "@/lib/server/utils/handleCors";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId } = req.headers;
    const role = req.body?.role;
    const organizationId = await createNewOrganization(req.body, userId);
    await updateUserFromOrganization(organizationId, role, userId);
    return res.status(200).json({ success: true });
  });

export default router.handler({
  onError(error: any, req, res) {
    console.log(error);
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch: handleRequestMismatch,
});
