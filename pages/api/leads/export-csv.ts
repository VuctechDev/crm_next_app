import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getCSVExportLeads } from "@/db/leads";
import { authGuard } from "../auth/authGuard";
import { NextApiRequestExtended } from "@/types/reaquest";
import xlsx from "xlsx";
import { handleRequestMismatch } from "@/lib/server/utils/handleCors";

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
  .use(authGuard)
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { organizationId } = req.headers;
    const filters = req.query as Record<string, string>;
    const data = await getCSVExportLeads(filters, organizationId);

    const worksheet = xlsx.utils.json_to_sheet(data, {});
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet);
    const csvBuffer = xlsx.write(workbook, { type: "buffer", bookType: "csv" });

    res.setHeader("Content-Disposition", 'attachment; filename="data.csv"');
    res.setHeader("Content-Type", "text/csv");

    res.status(200).send(csvBuffer);
  });

export default router.handler({
  onError(error: any, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch: handleRequestMismatch,
});
