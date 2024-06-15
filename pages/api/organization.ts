import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "./auth/authMid";
import { updateUserFromOrganization } from "@/db/users";
import { createNewOrganization } from "@/db/organizations";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(authGuard)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.headers as {
      userId: string;
      username: string;
    };
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
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
