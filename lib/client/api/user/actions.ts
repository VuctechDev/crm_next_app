import { UserType } from "@/db/users";
import { apiClient } from "..";

const path = "/user";

export const getUser = async (): Promise<UserType> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const createUser = async (values: any): Promise<any> => {
  const response = await apiClient.post(`${path}`, values);
  return response.data;
};

export const updateUser = async (values: any): Promise<any> => {
  const response = await apiClient.post(`${path}`);
  return response.data;
};
