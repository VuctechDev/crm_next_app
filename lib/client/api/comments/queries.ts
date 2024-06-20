import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "./actions";
import { useSnackbar } from "@/components/providers/SnackbarContext";

export const useGetComments = (parent: string, count: number) => {
  return useQuery({
    queryKey: ["comments", count],
    queryFn: () => getComments(parent, count),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      openSnackbar("commentCreatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useUpdateComment = (_id: string) => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      openSnackbar("commentUpdatedSuccess");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      openSnackbar("commentDeletedSuccess");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};
