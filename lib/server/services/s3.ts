const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

export const getS3Client = () => s3Client;

export const getS3File = async (key: string): Promise<Buffer> => {
  const getObjectParams = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(getObjectParams);
    const { Body } = await s3Client.send(command);
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      Body.on("data", (chunk: Buffer) => chunks.push(chunk));
      Body.on("end", () => resolve(Buffer.concat(chunks)));
      Body.on("error", reject);
    });
  } catch (error) {
    console.error("Failed to download file:", error);
    throw error;
  }
};
