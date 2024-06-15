import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "./auth/authMid";
import { createNewUser, getUser } from "@/db/users";
import { countries } from "@/components/forms/fields/CountrySelect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.headers as { userId: string };
    let user = await getUser(userId);
    if (!user) {
      return res.status(401).json({ message: "notAuthorizedException" });
    }
    if (user.country) {
      const country = countries.find((x) => x["iso3"] === user?.country);
      if (country) {
        return res.status(200).json({ ...user, country });
      }
    }
    return res.status(200).json(user);
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, username } = req.headers as {
      userId: string;
      username: string;
    };

    await createNewUser(req.body, userId);
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
