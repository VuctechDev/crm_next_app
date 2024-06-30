import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "./auth/authGuard";
import { getAuth } from "@/db/auth";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    // const { username } = req.headers as { username: string };
    // const user = await getAuth(username);
    // if (!user) {
    //   return res.status(401).json({ message: "notAuthorizedException" });
    // }
    res.status(200).json({});
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, username } = req.headers as {
      userId: string;
      username: string;
    };
    console.log(req.body, userId, username);

    // const user = await getAuth(username);
    // if (!user) {
    //   return res.status(401).json({ message: "notAuthorizedException" });
    // }
    res.status(200).json({});
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
