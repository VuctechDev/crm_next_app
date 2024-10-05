import { EmailType } from "@/db/emails";
import { apiClient, apiClient2 } from "..";

const path = "/email";

export const getEmails = async (
  query: string
): Promise<{ data: EmailType[]; total: number }> => {
  const response = await apiClient.get(`${path}?${query}`);
  return response.data;
};

export const sendEmail = async (data: {
  body: string;
  from: string;
  to: string;
  subject: string;
  lead: string;
}): Promise<{ success: boolean }> => {
  const response = await apiClient2.post(`${path}`, data);
  return response.data;
};
