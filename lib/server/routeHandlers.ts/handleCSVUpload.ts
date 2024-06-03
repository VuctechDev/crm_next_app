import { LeadType, insertNewLead } from "@/db/leads";
import { entryModel } from "@/db/local";
import { readFile, utils, read } from "xlsx";
import { getS3File } from "../services/s3";
import { forwardJobToFileService } from "./handleCardsUpload";

export const handleCSVUpload = async (fileKey: string) => {
  await forwardJobToFileService("csv", [fileKey]);
};
