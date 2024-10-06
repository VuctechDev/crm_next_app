import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "../auth/authGuard";
import { NextApiRequestExtended } from "@/types/reaquest";
import { createNewEmail, getPaginatedEmails } from "@/db/emails";
import { sendNewInAppEmail } from "@/lib/server/services/nodemailer/sendNewInAppEmail";
import { getEmailLeadsData } from "@/db/leads";

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
      const { body, from, to, subject, tags } = req.body;
      if (!body || !from || !subject) {
        return res.status(400).json({ message: "badRequest" });
      }
      // if (tags?.length) {
      //   const leads = await getEmailLeadsData({ tags });
      //   const emailTemplates = leads.map((lead) => ({
      //     ...req.body,
      //     organization: organizationId,
      //     user: userId,
      //     lead: lead._id,
      //     to: lead.email,
      //   }));
      //   const emails = await createNewEmail(emailTemplates);
      //   await sendNewInAppEmail(emails, body, userId, leads);
      // } else if (to) {
      //   const lead = await getEmailLeadsData({ _id: req.body.lead });
      //   const emailTemplate = [
      //     {
      //       ...req.body,
      //       organization: organizationId,
      //       user: userId,
      //     },
      //   ];
      //   const email = await createNewEmail(emailTemplate);
      //   await sendNewInAppEmail(email, body, userId, lead);
      // }

      const leads = await getEmailLeadsData({ tags, _id: req.body.lead });
      const emailTemplates = leads.map((lead) => ({
        ...req.body,
        organization: organizationId,
        user: userId,
        lead: lead._id,
        to: lead.email,
      }));
      const emails = await createNewEmail(emailTemplates);
      await sendNewInAppEmail(emails, body, userId, leads);
      
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
