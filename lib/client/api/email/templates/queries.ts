import { useSnackbar } from "@/components/providers/SnackbarContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEmailTemplate, getEmailTemplates } from "./actions";

export const useGetEmailTemplates = (query: string) => {
  return useQuery({
    queryKey: ["emailTemplates", query],
    queryFn: () => getEmailTemplates(query),
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
