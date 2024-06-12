import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import axiosRetry from "axios-retry";

export const apiClient = axios.create({
  baseURL: "/api",
});

// axiosRetry(apiClient, {
//   retries: 1, // Number of retries
//   retryDelay: (retryCount) => retryCount * 1000,

//   //   retryCondition(error) {
//   //     // Conditional check the error status code
//   //     switch (error?.response?.status) {
//   //       case 401:
//   //       case 429:
//   //         return true;
//   //       default:
//   //         return false; // Do not retry the others
//   //     }
//   //   },
// });

export const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp ? decoded.exp < currentTime : true;
};

export const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    const response = await axios.post("/api/auth/refresh", {
      token: refreshToken,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data.accessToken;
  }
  return "";
};

export const validateSession = async (): Promise<any> => {
  let accessToken = localStorage.getItem("accessToken") ?? "";
  if (!accessToken) {
    // return "";
    // throw new Error("noToken");
    return Promise.reject("noToken");
  }
  const expired = isTokenExpired(accessToken);
  if (expired) {
    return await refreshToken();
  }
  return accessToken;
};

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await validateSession();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const MAX_RETRY_ATTEMPTS = 1;

// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retryCount?: number;
//     };

//     // Initialize _retryCount if it doesn't exist
//     originalRequest._retryCount = originalRequest._retryCount ?? 0;

//     // Check if the request has been retried already
//     if (error.response?.status === 401 && originalRequest._retryCount < 2) {
//       originalRequest._retryCount += 1;
//       try {
//         // Retry the original request
//         return await apiClient(originalRequest);
//       } catch (retryError) {
//         // If retry fails, return the original error
//         return Promise.reject(retryError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
