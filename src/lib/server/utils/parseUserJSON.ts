
export const isValidJsonObject = <T>(str: string): T | null => {
  try {
    const cleanedJsonData = str.replace(/```json|```/g, "").trim();
    const obj = JSON.parse(cleanedJsonData);
    return obj;
  } catch (e) {
    console.log("Not a valid JSON!", e);
    return null;
  }
};
