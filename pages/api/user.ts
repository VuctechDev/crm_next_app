import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "./auth/authGuard";
import { createNewUser, getUser } from "@/db/users";
import { getOrganization } from "@/db/organizations";
import { countries } from "@/lib/shared/consts/countries";
import { NextApiRequestExtended } from "@/types/reaquest";
import { handleRequestMismatch } from "@/lib/server/utils/handleCors";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();
// nemanja.elas@gmail.com
// Lesinari1987@

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId } = req.headers;
    let user = await getUser(userId);
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
  onNoMatch: handleRequestMismatch,
});
