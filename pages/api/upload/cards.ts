import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { multerUpload } from "@/lib/server/services/multer";
import { handleCardsUpload } from "@/lib/server/routeHandlers.ts/handleCardsUpload";

interface NextApiRequestExtended extends NextApiRequest {
  files: Express.MulterS3.File[];
}

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(multerUpload.array("files", 10) as any)
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    if (!req.files?.length) {
      return res
        .status(400)
        .json({ success: false, message: "missingFilesException" });
    }
    // console.log(req.files)
    await handleCardsUpload(req.files);
    return res
      .status(200)
      .json({ success: true, message: "cardFilesUploadSuccess", files: req.files });
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
