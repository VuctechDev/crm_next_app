import { forwardJobToFileService } from "./handleCardsUpload";

export const handleCSVUpload = async (fileKey: string) => {
  await forwardJobToFileService("csv", [fileKey]);
};
