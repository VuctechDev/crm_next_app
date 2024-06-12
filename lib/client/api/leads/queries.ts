import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from "./actions";

export const useGetLeads = (query: string) => {
  return useQuery({
    queryKey: ["leads", query],
    queryFn: () => getLeads(query),
  });
};

export const useGetLeadById = (id: string) => {
  return useQuery({
    queryKey: ["lead", id],
    queryFn: () => getLeadById(id),
  });
};

// // Hook to create a new customer
// export const useCreateCustomer = () => {
//   const queryClient = useQueryClient();
//   return useMutation(createCustomer, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["customers"]);
//     },
//   });
// };

// // Hook to update a customer
// export const useUpdateCustomer = (id) => {
//   const queryClient = useQueryClient();
//   return useMutation((customerData) => updateCustomer(id, customerData), {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["customer", id]);
//       queryClient.invalidateQueries(["customers"]);
//     },
//   });
// };

// // Hook to delete a customer
// export const useDeleteCustomer = () => {
//   const queryClient = useQueryClient();
//   return useMutation(deleteCustomer, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["customers"]);
//     },
//   });
// };
