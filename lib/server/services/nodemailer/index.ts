import { EmailConfigType } from "@/db/emails/configs";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

let defaultTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (
  config: Mail.Options,
  credentials?: EmailConfigType
) => {
  try {
    if (credentials) {
      const transporter = nodemailer.createTransport({
        host: credentials.host,
        port: Number(credentials.port),
        secure: Number(credentials.port) === 465, // true for 465, false for other ports
        auth: {
          user: credentials.email, // generated ethereal user
          pass: credentials.password,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      await transporter.sendMail(config);
    } else {
      await defaultTransporter.sendMail(config);
    }
  } catch (error) {
    console.log("VERIFICATION EMAIL ERROR: ", error);
    throw error;
  }
};
