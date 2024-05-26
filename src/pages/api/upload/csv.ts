import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import XLSX from "xlsx";
import { multerUpload } from "@/lib/server/multer";

interface NextApiRequestExtended extends NextApiRequest {
  file: Express.Multer.File;
}

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(multerUpload.single("file") as any)
  .post((req: NextApiRequestExtended, res: NextApiResponse) => {
    console.log(req.file);
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    console.log("JSON: ", json);
    return res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
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
