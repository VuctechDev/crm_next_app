import { getTextFromImage } from "../services/getTextFromImage";
import { getDataFromPrompt } from "../services/openAI";
import { isValidJsonObject } from "../utils/parseUserJSON";
import Queue from "queue";
import { LeadType, insertNewLead } from "@/db/leads";

const q = new Queue({ concurrency: 1, autostart: true });

const forwardKeysToService = async (type: "card" | "csv", keys: string[]) => {
  const apiUrl = "https://stefan.pikado.net/process"; // Change to your API's URL
  const itemData = {
    type,
    keys,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(itemData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

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
export const handleCardsUpload = async (files: any[]) => {
  const keys = files.map((item) => item.key);
  forwardKeysToService("card", keys);
};

q.addEventListener("success", (result: any) => {
  console.log(`Job completed with result: ${JSON.stringify(result)}`);
});
