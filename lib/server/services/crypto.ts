import * as crypto from "crypto";

const algorithm = "aes-256-cbc";

const secretKey = process.env.CRYPTO_SECRET_KEY ?? "";
const secretIV = process.env.CRYPTO_SECRET_IV ?? "";

const key = Buffer.from(secretKey, "hex");
const iv = Buffer.from(secretIV, "hex");

export const encrypt = (
  text: string
): { iv: string; encryptedData: string } => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
};
