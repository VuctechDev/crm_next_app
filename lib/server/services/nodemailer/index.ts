import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

let transporter = nodemailer.createTransport({
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

export const sendEmail = async (config: Mail.Options) => {
  try {
    await transporter.sendMail(config);
  } catch (error) {
    console.log("VERIFICATION EMAIL ERROR: ", error);
  }
};
