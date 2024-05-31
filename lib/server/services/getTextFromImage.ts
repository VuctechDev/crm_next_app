import { createWorker } from "tesseract.js";
import sharp from "sharp";

export const getTextFromImage = async (filePath: string) => {
  const rotations = [0, -90, 90, 180];
  let maxConfidence = 0;
  let bestText = "";
  let bestRotation = 0;
  for (let rotation of rotations) {
    const buffer = await sharp(filePath)
      // .resize(1000) // Resize to width 1000px to enhance text clarity
      .grayscale()
      .sharpen()
      .rotate(rotation)
      .toBuffer();
    const worker = await createWorker();
    const ret = await worker.recognize(buffer);
    await worker.terminate();
    if (ret.data.confidence > maxConfidence) {
      maxConfidence = ret.data.confidence;
      bestText = ret.data.text;
      bestRotation = rotation;
      if (maxConfidence > 59) {
        console.log(
          `Best rotation found: ${bestRotation} degrees with confidence ${maxConfidence}`
        );
        return bestText;
      }
    }
  }

  if (maxConfidence < 30) {
    throw new Error("Image not of enough quality");
  }

  console.log(
    `Best rotation found: ${bestRotation} degrees with confidence ${maxConfidence}`
  );
  return bestText;
};
