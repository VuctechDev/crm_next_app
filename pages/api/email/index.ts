import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "../auth/authMid";
import { NextApiRequestExtended } from "@/types/reaquest";
import { createNewEmail, getPaginatedEmails } from "@/db/emails";
import { sendEmail } from "@/lib/server/services/nodemailer";
import { getConfig } from "@/db/emails/configs";
import { decrypt } from "@/lib/server/services/crypto";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const filters = req.query as Record<string, string>;
    const { organizationId } = req.headers;

    const data = await getPaginatedEmails(filters, organizationId);

    res.status(200).json(data);
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      const { organizationId, userId } = req.headers;
      const { html, from, to, subject } = req.body;
      if (!html || !from || !to || !subject) {
        return res.status(400).json({ message: "badRequest" });
      }

      const emailID = await createNewEmail({
        ...req.body,
        organization: organizationId,
        sentBy: userId,
      });

      const config = {
        from,
        to,
        subject,
        html: `<div style="color: #2a2a2a !important;">
          ${html} 
          <p><img src="${process.env.API_BASE_URL}/api/email/read?_id=${emailID}" width="1" height="1" style="display:none;"></p>
        </div>`,
      };

      const emailConfig = await getConfig(userId);
      if (emailConfig) {
        const password = decrypt({
          iv: emailConfig?.iv ?? "",
          encryptedData: emailConfig?.password ?? "",
        });
        await sendEmail(config, { ...emailConfig, password });
      } else {
        await sendEmail(config);
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(400).json({ message: "somethingWentWrong" });
    }
  });

export default router.handler({
  onError(error: any, req, res) {
    console.log("CONFIG API ERROR: ", error);
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
