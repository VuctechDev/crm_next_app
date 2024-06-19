import { LeadType } from "@/db/leads";
import { apiClient } from "..";

const path = "/leads";

export const getLeads = async (
  query: string
): Promise<{ data: LeadType[]; total: number }> => {
  const response = await apiClient.get(`${path}?${query}`);
  return response.data;
};

export const getLeadById = async (_id: string): Promise<LeadType> => {
  const response = await apiClient.get(`${path}/${_id}`);
  return response.data.data;
};

export const createLead = async (data: LeadType): Promise<any> => {
  const response = await apiClient.post(path, data);
  return response.data;
};

type UpdateLeadArgs = {
  _id: number;
  data: LeadType;
};

export const updateLead = async ({
  _id,
  data,
}: UpdateLeadArgs): Promise<any> => {
  const response = await apiClient.patch(`${path}?_id=${_id}`, data);
  return response.data;
};

export const deleteLead = async (_id: string) => {
  const response = await apiClient.delete(`${path}?_id=${_id}`);
  return response.data;
};
