import { useSnackbar } from "@/components/providers/SnackbarContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEmailTemplate,
  getAllEmailTemplates,
  updateEmailTemplate,
  deleteEmailTemplate,
  getPaginatedTemplates,
} from "./actions";

export const useGetEmailTemplates = () => {
  return useQuery({
    queryKey: ["emailTemplates"],
    queryFn: getAllEmailTemplates,
  });
};

export const useGetPaginatedTemplates = (query: string) => {
  return useQuery({
    queryKey: ["tags", query],
    queryFn: () => getPaginatedTemplates(query),
  });
};

export const useCreateEmailTemplate = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: createEmailTemplate,
    onSuccess: () => {
      openSnackbar("emailTemplateUpdatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      openSnackbar(error?.response?.data?.message, "error");
    },
  });
};

export const useUpdateEmailTemplate = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: updateEmailTemplate,
    onSuccess: () => {
      openSnackbar("emailTemplateUpdatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      openSnackbar(error?.response?.data?.message, "error");
    },
  });
};

export const useDeleteEmailTemplate = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: deleteEmailTemplate,
    onSuccess: () => {
      openSnackbar("emailTemplateDeletedSuccess");
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      openSnackbar(error?.response?.data?.message, "error");
    },
  });
};
