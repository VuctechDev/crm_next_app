import { DBRecord, addItem, entryModel } from "@/db/local";
import { readFile, utils } from "xlsx";

const hasExtraKeys = (object: DBRecord) => {
  const validationKeys = new Set(Object.keys(entryModel));
  return !Object.keys(object).some((key) => !validationKeys.has(key));
};

export const handleCSVUpload = (file: Express.Multer.File) => {
  const workbook = readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const json = utils.sheet_to_json(sheet, { defval: "" }) as DBRecord[];
  if (json) {
    const match = hasExtraKeys(json[0]);
    if (!match) {
      throw new Error("Not valid key values", { cause: "erthrth" });
    }
    json.forEach((item) => addItem(item));
  }
  console.log("JSON from CSV saved: ", json);
};
