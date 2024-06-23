import { useSnackbar } from "@/components/providers/SnackbarContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmailConfig, createEmailConfig } from "./actions";

export const useGetEmailConfig = () => {
  return useQuery({
    queryKey: ["emailConfig"],
    queryFn: getEmailConfig,
  });
};

export const useCreateEmailConfig = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: createEmailConfig,
    onSuccess: () => {
      openSnackbar("emailConfigUpdatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["emailConfig"] });
    },
    onError: (error) => {
      console.log("AXIOS ERROR: ", error);
      openSnackbar(error.message, "error");
    },
  });
};
