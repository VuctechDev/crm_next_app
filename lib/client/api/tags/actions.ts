import { apiClient } from "..";
import { TagType } from "@/db/tags";

const path = "/tags";

export const getTags = async (): Promise<TagType[]> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const createTag = async (
  data: Partial<TagType>
): Promise<{ success: boolean }> => {
  const response = await apiClient.post(`${path}`, data);
  return response.data;
};

export const updateTag = async (
  data: Partial<TagType>
): Promise<{ success: boolean }> => {
  const response = await apiClient.patch(`${path}`, data);
  return response.data;
};
