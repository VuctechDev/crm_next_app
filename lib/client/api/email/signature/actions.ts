import { apiClient } from "../..";
import { SignatureType } from "@/db/emails/signatures";

const path = "/email/signature";

export const getEmailSignature = async (): Promise<SignatureType> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const createEmailSignature = async (
  html: string
): Promise<{ success: boolean }> => {
  const response = await apiClient.post(`${path}`, { html });
  return response.data;
};

export const updateEmailSignature = async (
  html: string
): Promise<{ success: boolean }> => {
  const response = await apiClient.patch(`${path}`, { html });
  return response.data;
};
