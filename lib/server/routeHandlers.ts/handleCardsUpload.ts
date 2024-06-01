import { getTextFromImage } from "../services/getTextFromImage";
import { getDataFromPrompt } from "../services/openAI";
import { isValidJsonObject } from "../utils/parseUserJSON";
import Queue from "queue";
import { LeadType, insertNewLead } from "@/db/leads";

const q = new Queue({ concurrency: 1, autostart: true });

const newCardJob = async (filePath: string) => {
  const extractedText = await getTextFromImage(filePath);
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
  console.log("FILE in process2 " + files?.[0]?.key);
  for (const item of files) {
    const contents = await newCardJob(item?.key);
    console.log("FILE in process " + item?.key);
  }
  // files?.forEach((item: any) => {
  //   console.log(item);
  //   q.push(async () => await newCardJob(item?.key));
  // });
};

q.addEventListener("success", (result: any) => {
  console.log(`Job completed with result: ${JSON.stringify(result)}`);
});
