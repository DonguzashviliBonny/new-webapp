import { getCookie } from "@/utils/cookie";
import mediaModifier from "@/utils/media/mediaModifier";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const getAxiosClient = (token?: string, axiosConfig?: AxiosRequestConfig | undefined): AxiosInstance => {
  // const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const apiUrl = "http://10.100.200.25:5001/api/v2";

  if (!apiUrl) {
    throw new Error(`Provide baseUrl as argument in axiosConfig or set REACT_APP_API_BASE_URL in the environment`);
  }

  const language = getCookie("language");

  const axiosClient = axios.create({
    baseURL: new URL(apiUrl).toString(),
    withCredentials: false,
    headers: language ? { "Accept-Language": language } : {},
    ...axiosConfig,
  });

  // ** middleware for response
  axiosClient.interceptors.response.use((res) => {
    let newResponse;

    if (res) newResponse = mediaModifier(res.data);
    const result = { ...res, data: newResponse || res.data };

    return result;
  });

  if (!token) return axiosClient;

  // ** middleware for request
  axiosClient.interceptors.request.use((req) => {
    if (req && req.headers) {
      if (!req.headers.authorization) {
        req.headers.authorization = `Bearer ${token}`;
      }
    }
    return req;
  });

  return axiosClient;
};

export const axiosPrivateGateWay = (token: string) => getAxiosClient(token);
export const axiosPublicGateway = getAxiosClient();
