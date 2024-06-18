import { apiClient } from "..";

export const handleFileDownload = async ({
  fileName,
  query,
  type,
}: {
  fileName: string;
  query?: string;
  type?: string;
}) => {
  try {
    const response = await apiClient.get(`/leads/export-csv?${query}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.${type ?? "csv"}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading the CSV file:", error);
  }
};
