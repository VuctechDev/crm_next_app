import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { multerUpload } from "@/lib/server/services/multer";
import { handleCSVUpload } from "@/lib/server/routeHandlers/handleCSVUpload";
import { authGuard } from "../auth/authMid";
import { NextApiRequestExtended } from "@/types/reaquest";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .use(multerUpload.array("files", 10) as any)
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      if (!req.files?.length) {
        return res
          .status(400)
          .json({ success: false, message: "missingFilesException" });
      }

      const { userId, organizationId } = req.headers;
      const file = req.files[0];
      
      await handleCSVUpload(file?.key, {
        createdBy: userId,
        owner: organizationId,
      });
      return res
        .status(200)
        .json({ success: true, message: "csvFilesUploadSuccess", file: file });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
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
