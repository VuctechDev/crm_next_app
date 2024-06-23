import { useSnackbar } from "@/components/providers/SnackbarContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEmailSignature,
  createEmailSignature,
  updateEmailSignature,
} from "./actions";

export const useGetEmailSignature = () => {
  return useQuery({
    queryKey: ["emailSignature"],
    queryFn: getEmailSignature,
  });
};

export const useCreateEmailSignature = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: createEmailSignature,
    onSuccess: () => {
      openSnackbar("signatureUpdatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["emailSignature"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useUpdateEmailSignature = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: updateEmailSignature,
    onSuccess: () => {
      openSnackbar("signatureUpdatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["emailSignature"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};
