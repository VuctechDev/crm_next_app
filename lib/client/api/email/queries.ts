import { useSnackbar } from "@/components/providers/SnackbarContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEmails, sendEmail } from "./actions";

export const useGetEmails = (query: string) => {
  return useQuery({
    queryKey: ["emails", query],
    queryFn: () => getEmails(query),
  });
};

export const useSendEmail = () => {
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      openSnackbar("emailSentSuccess");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      openSnackbar(error?.response?.data?.message, "error");
    },
  });
};
