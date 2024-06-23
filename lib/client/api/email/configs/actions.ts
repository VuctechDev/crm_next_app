import { EmailConfigCreateType, EmailConfigPublic } from "@/db/emails/configs";
import { apiClient } from "../..";

const path = "/email/configs";

export const getEmailConfig = async (): Promise<EmailConfigPublic> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const createEmailConfig = async (
  data: Partial<EmailConfigCreateType>
): Promise<{ success: boolean }> => {
  const response = await apiClient.post(`${path}`, data);
  return response.data;
};

export const updateEmailConfig = async (
  data: Partial<EmailConfigCreateType>
): Promise<{ success: boolean }> => {
  const response = await apiClient.patch(`${path}`, data);
  return response.data;
};
