import type { NextApiRequest } from "next";

export interface NextApiRequestExtended extends NextApiRequest {
  files: Express.MulterS3.File[];
  headers: { userId: string; organizationId: string; username: string };
}
