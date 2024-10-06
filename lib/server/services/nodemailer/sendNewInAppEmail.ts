import { load } from "cheerio";
import { sendEmail } from "@/lib/server/services/nodemailer";
import { getConfig } from "@/db/emails/configs";
import { decrypt } from "@/lib/server/services/crypto";
import { EmailType } from "@/db/emails";
import { LeadType } from "@/db/leads";

const addInlineBodyStyle = (body: string) => {
  const $ = load(body);
  const elements = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];
  elements.forEach((element) =>
    $(element).each(function () {
      $(this).attr("style", (i, style) => {
        return (style || "") + "margin: 0px !important; color: #2a2a2a;";
      });
    })
  );

  return $.html();
};

const parseDynamicBody = (body: string, data?: LeadType): string => {
  const segments = body.split("##");
  const dynamicBody = segments.length > 1;
  if (!dynamicBody || !data) {
    return body;
  }
  const parsed = segments.map((segment, i: number) => {
    if (i % 2 === 1) {
      if (segment === "name") {
        return `${data?.firstName} ${data?.lastName}`;
      }
      return data[segment as keyof LeadType];
    }
    return segment;
  });

  return parsed.join("");
};

const getHTMLTemplate = (body: string, emailId: number) => {
  return `
    <div style="color: #2a2a2a !important;">
      ${addInlineBodyStyle(body)} 
      <p><img src="${
        process.env.API_BASE_URL
      }/api/email/read?_id=${emailId}" width="1" height="1" style="display:none;"></p>
    </div>`;
};

export const sendNewInAppEmail = async (
  data: EmailType[],
  body: string,
  userId: string,
  leads: LeadType[]
) => {
  const credentials = await getConfig(userId);

  const configs = data.map((item) => ({
    from: item.from,
    to: item.to,
    subject: item.subject,
    html: getHTMLTemplate(
      parseDynamicBody(
        body,
        leads.find((lead) => +lead._id === +item?.lead)
      ),
      item._id
    ),
  }));

  if (credentials) {
    const password = decrypt({
      iv: credentials?.iv ?? "",
      encryptedData: credentials?.password ?? "",
    });
    for (const config of configs) {
      await sendEmail(config, { ...credentials, password });
    }
  } else {
    for (const config of configs) {
      await sendEmail(config);
    }
  }
};
