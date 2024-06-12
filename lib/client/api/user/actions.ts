import { apiClient } from "..";

const path = "/user";

export const getUser = async (): Promise<any> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};
