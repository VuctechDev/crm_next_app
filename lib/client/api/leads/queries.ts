import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from "./actions";
import { useSnackbar } from "@/components/providers/SnackbarContext";

export const useGetLeads = (query: string) => {
  return useQuery({
    queryKey: ["leads", query],
    queryFn: () => getLeads(query),
  });
};

export const useGetLeadById = (_id: string) => {
  return useQuery({
    queryKey: ["lead", _id],
    queryFn: () => getLeadById(_id),
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      openSnackbar("leadCreatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useUpdateLead = (_id: string) => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: updateLead,
    onSuccess: () => {
      openSnackbar("leadUpdatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["lead", _id] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useDeleteLead = (_id: string) => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      openSnackbar("leadDeletedSuccess");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.resetQueries({ queryKey: ["lead", _id] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};
