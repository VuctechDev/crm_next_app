import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { multerUpload } from "@/lib/server/services/multer";
import { handleCSVUpload } from "@/lib/server/routeHandlers.ts/handleCSVUpload";

interface NextApiRequestExtended extends NextApiRequest {
  files: Express.Multer.File[];
}

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(multerUpload.array("files", 10) as any)
  .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    try {
      if (req.files?.[0]) {
        const file = req.files[0] as unknown as { key: string };
        await handleCSVUpload(file.key);
        return res
          .status(200)
          .json({ message: "File uploaded successfully", file: file });
      }
      return res.status(400).json({ success: false, message: "Missing File" });
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
