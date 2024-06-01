import { getTextFromImage } from "../services/getTextFromImage";
import { getDataFromPrompt } from "../services/openAI";
import { isValidJsonObject } from "../utils/parseUserJSON";
import Queue from "queue";
import { LeadType, insertNewLead } from "@/db/leads";

const q = new Queue({ concurrency: 1, autostart: true });

const newCardJob = async (fileKey: string) => {
  const extractedText = await getTextFromImage(fileKey);
  console.log("Extracted text: " + extractedText);
  const promptResult = await getDataFromPrompt(extractedText);
  if (promptResult) {
    const newItem = isValidJsonObject<LeadType>(promptResult);
    if (newItem) {
      insertNewLead(newItem);
    }
  }
};
// files: Express.Multer.File[]
export const handleCardsUpload = async (files: any) => {
  for (const item of files) {
    try {
      console.log("Processing file:", item.key);
      await newCardJob(item.key);
      console.log("File processed:", item.key);
    } catch (error) {
      console.error("Error processing file:", item.key, error);
    }
  }
};

q.addEventListener("success", (result: any) => {
  console.log(`Job completed with result: ${JSON.stringify(result)}`);
});
