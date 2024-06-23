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

export const decrypt = (encryptedData: {
  iv: string;
  encryptedData: string;
}): string => {
  const iv = Buffer.from(encryptedData.iv, "hex");
  const encryptedText = Buffer.from(encryptedData.encryptedData, "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText); // No encoding needed when using Buffer
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf8");
};

