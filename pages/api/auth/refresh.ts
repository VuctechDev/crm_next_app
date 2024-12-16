import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { validateRefreshToken } from "@/lib/server/services/jwt";
import { handleRequestMismatch } from "@/lib/server/utils/handleCors";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({ message: "unauthorizedException" });
    }

    const data = await validateRefreshToken(token);
    return res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: "unauthorizedException" });
  }
});

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch: handleRequestMismatch,
});
