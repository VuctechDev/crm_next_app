import axios, { AxiosError } from "axios";
import { apiClient } from "..";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/components/providers/SnackbarContext";

export const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp ? decoded.exp < currentTime : true;
};

const path = "/auth";

export const validateSession = async (): Promise<any> => {
  const response = await apiClient.get(`${path}/session`);
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data;
};

export const getUser = async (): Promise<any> => {
  const response = await apiClient.get(`${path}/user`);
  return response.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await axios.post(`/api${path}/login`, data);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data.user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message);
  }
};

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
      queryClient.resetQueries({ queryKey: ["user"] });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const register = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await axios.post(`/api${path}/register`, data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message);
  }
};

export const useRegister = () => {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onError: (error) => openSnackbar(error.message, "error"),
    // throwOnError: false,
  });
};
