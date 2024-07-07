import { apiClient, publicApiClient } from "..";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/components/providers/SnackbarContext";
import { login, register } from "./actions";
import { useRouter } from "next/router";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";

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
  const { locale, push } = useRouter();
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => null,
    onSuccess: () => {
      queryClient.resetQueries();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      push(ROUTES.LOGIN, ROUTES.LOGIN);
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
