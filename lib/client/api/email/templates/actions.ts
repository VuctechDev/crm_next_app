import { EmailConfigCreateType, EmailConfigPublic } from "@/db/emails/configs";
import { apiClient } from "../..";
import { EmailTemplateType } from "@/db/emails/templates";

const path = "/email/templates";

export const getEmailTemplates = async (
  query: string
): Promise<{ data: EmailTemplateType[]; total: number }> => {
  const response = await apiClient.get(`${path}?${query}`);
  return response.data;
};

export const getEmailTemplate = async (): Promise<EmailTemplateType> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const createEmailTemplate= async (
  data: Partial<EmailTemplateType>
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
