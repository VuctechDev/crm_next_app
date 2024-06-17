import { apiClient, publicApiClient } from "..";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/components/providers/SnackbarContext";
import { login, register } from "./actions";

export const useLogin = () => {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};
export const useLogout = () => {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => null,
    onSuccess: () => {
      queryClient.resetQueries();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useRegister = () => {
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: register,
    onError: (error) => openSnackbar(error.message, "error"),
  });
};
