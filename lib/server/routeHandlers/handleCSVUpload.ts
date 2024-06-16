import { Payload, forwardJobToFileService } from "./handleCardsUpload";

export const handleCSVUpload = async (fileKey: string, payload: Payload) => {
  await forwardJobToFileService("csv", [fileKey], payload);
};
