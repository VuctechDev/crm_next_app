import { load } from "cheerio";
import { sendEmail } from "@/lib/server/services/nodemailer";
import { getConfig } from "@/db/emails/configs";
import { decrypt } from "@/lib/server/services/crypto";

const addInlineBodyStyle = (html: string) => {
  const $ = load(html);
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

export const sendNewInAppEmail = async (
  data: any,
  emailId: number,
  userId: string
) => {
  const { html, from, to, subject } = data;
  console.log(to.split(",").map((x: string) => x?.trim()));
  console.log(html.split("$").filter((x: string, i: number) => i % 2 === 1));
  console.log(
    '<p>exex</p><p><br></p><p>S poštovanjem • Kind regards • Mit freundlichen Grüßen,</p><p><br></p><p><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);"><img src="https://ci3.googleusercontent.com/meips/ADKq_NZUXkJeclYlVxQimF0BeAm1fcpKxbsxC4SMF9nsKUhtD9JWrISWy5EVGVj3j3sq1JXIKrEliw=s0-d-e1-ft#http://hr.elas.ba/industrial.png" alt="slika" height="30" width="110"></span></p><p><br></p><p>Ramićka 32,</p><p>Poslovna zona Ramići,</p><p>78000 Banja Luka, BiH</p><p><br></p><p><strong class="ql-size-huge">Nemanja Vučić</strong></p><p><span style="color: rgb(102, 185, 102);">Direktor divizije mašina i opreme</span></p><p><span style="color: rgb(102, 185, 102);">Director of Industrial division</span></p><p><span style="color: rgb(102, 185, 102);">Direktor Industrieabteilung</span></p><p><strong>ELAS d.o.o.</strong></p><p><br></p><p>T:&nbsp;<u>+387 51 378 200</u></p><p>M:&nbsp;<u>+387 66 880 994</u></p><p>E:&nbsp;<u>info@elas.ba</u></p><p>W:&nbsp;<u>www.elas.ba</u></p><p><br></p><p><span style="color: rgb(34, 34, 34);">E:</span><u style="color: rgb(34, 34, 34);">&nbsp;info@elas.ba</u></p><p><span style="color: rgb(34, 34, 34);">W:&nbsp;</span><u style="color: rgb(34, 34, 34);">www.elas.ba</u></p>'
      .length
  );
  const config = {
    from,
    to,
    subject,
    html: `<div style="color: #2a2a2a !important;">
          ${addInlineBodyStyle(html)} 
          <p><img src="${
            process.env.API_BASE_URL
          }/api/email/read?_id=${emailId}" width="1" height="1" style="display:none;"></p>
        </div>`,
  };

  const emailConfig = await getConfig(userId);
  // if (emailConfig) {
  //   const password = decrypt({
  //     iv: emailConfig?.iv ?? "",
  //     encryptedData: emailConfig?.password ?? "",
  //   });
  //   await sendEmail(config, { ...emailConfig, password });
  // } else {
  //   await sendEmail(config);
  // }
};
