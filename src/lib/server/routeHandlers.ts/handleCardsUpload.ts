import { getTextFromImage } from "../services/getTextFromImage";
import { getDataFromPrompt } from "../services/openAI";
import { isValidJsonObject } from "../utils/parseUserJSON";
import Queue from "queue";
import { LeadType, insertNewLead } from "@/db/leads";

const q = new Queue({ concurrency: 1, autostart: true });

const newCardJob = async (filePath: string) => {
  const extractedText = await getTextFromImage(filePath);
  const promptResult = await getDataFromPrompt(extractedText);
  if (promptResult) {
    const newItem = isValidJsonObject<LeadType>(promptResult);
    if (newItem) {
      insertNewLead(newItem);
    }
  }
};

export const handleCardsUpload = async (files: Express.Multer.File[]) => {
  files?.forEach((item) => {
    q.push(() => newCardJob(item?.path));
  });
};

q.addEventListener("success", (result: any) => {
  console.log(`Job completed with result: ${JSON.stringify(result)}`);
});
