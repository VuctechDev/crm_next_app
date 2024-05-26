// pages/api/user/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import { NextResponse } from "next/server";
import multer from "multer";

interface NextApiRequestExtended extends NextApiRequest {
  files: Express.Multer.File[];
}

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads", // Destination folder for uploads
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
  }),
});

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  //   .use(async (req, res, next) => {
  //     const start = Date.now();
  //     await next(); // call next in chain
  //     const end = Date.now();
  //     console.log(`Request took ${end - start}ms`);
  //   })
  .use(upload.array("files", 10) as any)
  .get((req: NextApiRequestExtended, res) => {
    const user = { name: "Stefan2" };
    return res.json(user);
    const end = Date.now();
  })
  .post((req: NextApiRequestExtended, res: NextApiResponse) => {
    console.log(req.files);
    return res
      .status(200)
      .json({ message: "Files uploaded successfully", files: req.files });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
