import { useSnackbar } from "@/components/providers/SnackbarContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTags,
  getPaginatedTags,
  createTag,
  updateTag,
  deleteTag,
} from "./actions";

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};

export const useGetPaginatedTags = (query: string) => {
  return useQuery({
    queryKey: ["tags", query],
    queryFn: () => getPaginatedTags(query),
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
      openSnackbar(error?.response?.data?.message, "error");
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      openSnackbar("tagUpdatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      openSnackbar(error?.response?.data?.message, "error");
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      openSnackbar("tagDeletedSuccess");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};
