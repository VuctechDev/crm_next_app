export interface Payload {
  createdBy: string;
  owner: string;
}

export const forwardJobToFileService = async (
  type: "card" | "csv",
  keys: string[],
  payload: Payload
) => {
  const apiUrl = "https://stefan.pikado.net/process";
  // const apiUrl = "http://localhost:2302/process"; // Change to your API's URL
  const itemData = {
    type,
    keys,
    ...payload,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(itemData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const handleCardsUpload = async (
  files: Express.MulterS3.File[],
  payload: Payload
) => {
  const keys = files.map((item) => item.key);
  await forwardJobToFileService("card", keys, payload);
};
