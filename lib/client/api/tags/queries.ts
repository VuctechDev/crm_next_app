import { useSnackbar } from "@/components/providers/SnackbarContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTags, createTag } from "./actions";

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      openSnackbar("tagUpdatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("AXIOS ERROR: ", error);
      openSnackbar(error?.response?.data?.message, "error");
    },
  });
};
