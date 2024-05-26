import { createWorker } from "tesseract.js";
import sharp from "sharp";

export const detectAndCorrectRotation = async (imagePath: string) => {
  const rotations = [0, -90, 90, 180];
  let maxConfidence = 0;
  let bestText = "";
  let bestRotation = 0;
  const fileName = new Date().getTime().toString();
  const outputPath = `./images/${fileName}.${imagePath?.split(".").pop()}`;
  for (let rotation of rotations) {
    const buffer = await sharp(imagePath).rotate(rotation).toBuffer();

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
        await sharp(imagePath)
          .sharpen()
          .rotate(bestRotation)
          .toFile(outputPath);
        return outputPath;
      }
    }
  }

  if (maxConfidence < 30) {
    throw new Error("");
  }

  console.log(
    `Best rotation found: ${bestRotation} degrees with confidence ${maxConfidence}`
  );
  await sharp(imagePath).sharpen().rotate(bestRotation).toFile(outputPath);
  return outputPath;
};

export const getTextFromImage = async (fileName: string) => {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(fileName);
  console.log(ret.data.text);
  await worker.terminate();
  return ret.data.text;
  // return ""
};
