import { EmailType } from "@/db/emails";
import { apiClient } from "..";

const path = "/email";

export const getEmails = async (
  query: string
): Promise<{ data: EmailType[]; total: number }> => {
  const response = await apiClient.get(`${path}?${query}`);
  return response.data;
};

export const sendEmail = async (data: {
  html: string;
  from: string;
  to: string;
  subject: string;
  recipient: string;
}): Promise<{ success: boolean }> => {
  const response = await apiClient.post(`${path}`, data);
  return response.data;
};