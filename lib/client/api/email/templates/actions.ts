import { apiClient } from "../..";
import { EmailTemplateType } from "@/db/emails/templates";

const path = "/email/templates";

export const getAllEmailTemplates = async (): Promise<{
  data: EmailTemplateType[];
}> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const getPaginatedTemplates = async (
  query: string
): Promise<{ data: EmailTemplateType[]; total: number }> => {
  const response = await apiClient.get(`${path}?${query}`);
  return response.data;
};

export const getEmailTemplate = async (): Promise<EmailTemplateType> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const createEmailTemplate = async (
  data: Partial<EmailTemplateType>
): Promise<{ success: boolean }> => {
  const response = await apiClient.post(`${path}`, data);
  return response.data;
};

export const updateEmailTemplate = async (
  data: Partial<EmailTemplateType>
): Promise<{ success: boolean }> => {
  const response = await apiClient.patch(`${path}`, data);
  return response.data;
};

export const deleteEmailTemplate = async (
  _id: number
): Promise<{ success: boolean }> => {
  const response = await apiClient.delete(`${path}?_id=${_id}`);
  return response.data;
};
