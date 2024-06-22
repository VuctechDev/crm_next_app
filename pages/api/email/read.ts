import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NextApiRequestExtended } from "@/types/reaquest";
import { markAsRead } from "@/db/emails";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router.get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const { _id } = req.query as Record<string, string>;

  if (_id) {
    await markAsRead(_id);
  }

  const pixel = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
    "base64"
  );
  res.writeHead(200, {
    "Content-Type": "image/gif",
    "Content-Length": pixel.length,
  });
  res.end(pixel);
});

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
