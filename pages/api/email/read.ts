import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { authGuard } from "../auth/authMid";
import { NextApiRequestExtended } from "@/types/reaquest";
import {
  createNewComment,
  getPaginatedComments,
  removeComment,
} from "@/db/comments";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();
let aaa = false;

router
  //   .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { _id } = req.query as Record<string, string>;

    if (_id) {
      console.log(`Email with ID ${_id} was opened.`);

      const pixel = Buffer.from(
        "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        "base64"
      );
      res.writeHead(200, {
        "Content-Type": "image/gif",
        "Content-Length": pixel.length,
      });
      res.end(pixel);
    } else {
      res.status(200).json({ aaa });
    }

    // res.status(200).json({ data });
  })
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { userId } = req.headers;
    await createNewComment({ ...req.body, createdBy: userId });

    res.status(200).json({ success: true });
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
