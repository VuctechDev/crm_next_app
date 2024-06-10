import { LeadType } from "@/db/leads";
import { useQuery } from "@tanstack/react-query";

const getLeads = async (
  query: string
): Promise<{ data: LeadType[]; total: number }> => {
  const response = await fetch(`/api/leads?${query}`);
  const data = await response.json();
  return data;
};

const getLead = async (_id: string): Promise<LeadType> => {
    const response = await fetch(`/api/leads/${_id}`);
    const data = await response.json();
    return data.data;
  };

export const useLeads = (query: string) => {
  return useQuery({
    queryKey: ["leads", query],
    queryFn: () => getLeads(query),
  });
};
