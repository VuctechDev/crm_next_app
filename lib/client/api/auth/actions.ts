import { apiClient, publicApiClient } from "..";

const path = "/auth";

export const getUser = async (): Promise<any> => {
  const response = await apiClient.get(`${path}/user`);
  return response.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await publicApiClient.post(`${path}/login`, data);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data.user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message);
  }
};

export const register = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await publicApiClient.post(`${path}/register`, data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message);
  }
};
