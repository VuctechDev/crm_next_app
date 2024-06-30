import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NextApiRequestExtended } from "@/types/reaquest";
import { updateSignature } from "@/db/emails/signatures";
import { authGuard } from "../../auth/authGuard";
import { createNewConfig, getConfigPublic } from "@/db/emails/configs";
import { encrypt } from "@/lib/server/services/crypto";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId } = req.headers;
    const data = await getConfigPublic(userId);
    res.status(200).json(data);
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { userId, organizationId } = req.headers;
      const { host, email, password, port } = req.body;
      if (!host || !email || !password || !port) {
        return res.status(400).json({ message: "badRequest" });
      }

      const encriptedPassword = encrypt(password);

      await createNewConfig({
        host,
        email,
        password: encriptedPassword.encryptedData,
        iv: encriptedPassword.iv,
        port,
        user: userId,
        organization: organizationId,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "somethingWentWrong" });
    }
  })
  .patch(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { userId } = req.headers;
      const { body } = req.body;
      if (!body) {
        return res.status(400).json({ message: "badRequest" });
      }

      await updateSignature(userId, body);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "somethingWentWrong" });
    }
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
