import { OrganizationType } from "@/db/organizations";
import { apiClient } from "..";

const path = "/organization";

export const getOrganization = async (): Promise<OrganizationType> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const createOrganization = async (values: any): Promise<any> => {
  const response = await apiClient.post(`${path}`, values);
  return response.data;
};

export const updateOrganization = async (values: any): Promise<any> => {
  const response = await apiClient.post(`${path}`);
  return response.data;
};
