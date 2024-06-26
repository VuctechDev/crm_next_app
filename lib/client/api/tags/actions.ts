import { apiClient } from "..";
import { TagType } from "@/db/tags";

const path = "/tags";

export const getTags = async (): Promise<{ data: TagType[] }> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const getPaginatedTags = async (
  query: string
): Promise<{ data: TagType[]; total: number }> => {
  const response = await apiClient.get(`${path}?${query}`);
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

export const deleteTag = async (_id: number) => {
  const response = await apiClient.delete(`${path}?_id=${_id}`);
  return response.data;
};
