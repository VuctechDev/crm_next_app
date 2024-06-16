import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { multerUpload } from "@/lib/server/services/multer";
import { handleCardsUpload } from "@/lib/server/routeHandlers/handleCardsUpload";
import { authGuard } from "../auth/authMid";
import { NextApiRequestExtended } from "@/types/reaquest";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .use(multerUpload.array("files", 10) as any)
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    if (!req.files?.length) {
      return res
        .status(400)
        .json({ success: false, message: "missingFilesException" });
    }
    const { userId, organizationId } = req.headers;
    await handleCardsUpload(req.files, {
      createdBy: userId,
      owner: organizationId,
    });
    return res.status(200).json({
      success: true,
      message: "cardFilesUploadSuccess",
      files: req.files,
    });
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
