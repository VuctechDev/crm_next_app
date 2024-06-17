import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "./auth/authMid";
import { createNewUser, getUser } from "@/db/users";
import { getOrganization } from "@/db/organizations";
import { countries } from "@/lib/shared/consts/countries";
import { NextApiRequestExtended } from "@/types/reaquest";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();
// email
// :
// "nemanja.elas@gmail.com"
// password
// :
// "Lesinari1987@"
router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId } = req.headers;
    let user = await getUser(userId);
    console.log("USER: ", user);
    if (!user) {
      return res.status(401).json({ message: "notAuthorizedException" });
    }
    let handler = { ...user } as any;
    if (user.country) {
      const country = countries.find((x) => x["iso3"] === user?.country);
      if (country) {
        handler = { ...handler, country };
      }
    }
    if (user.organization) {
      const organization = await getOrganization(user.organization);
      if (organization) {
        handler = { ...handler, organization };
      }
    }
    return res.status(200).json(handler);
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId } = req.headers;

    await createNewUser(req.body, userId);
    res.status(200).json({ success: true });
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
