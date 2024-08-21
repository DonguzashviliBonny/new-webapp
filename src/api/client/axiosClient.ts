import { getCookie } from "@/utils/cookie";
import mediaModifier from "@/utils/media/mediaModifier";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * @description
 * This function returns an instance of Axios with the appropriate configuration set.
 * The configuration includes the base URL of the API, whether to send credentials with the request,
 * and the language of the request.
 * If a token is provided, it is added to the `Authorization` header of the request.
 *
 * @param {string} [token] The token to be added to the `Authorization` header.
 * @param {AxiosRequestConfig} [axiosConfig] The configuration for the Axios instance.
 * @returns {AxiosInstance} The configured Axios instance.
 */
export const getAxiosClient = (token?: string, axiosConfig?: AxiosRequestConfig | undefined): AxiosInstance => {
  // const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const apiUrl = "http://10.100.200.25:5001/api/v2";

  if (!apiUrl) {
    throw new Error(`
      Provide baseUrl as argument in axiosConfig or set REACT_APP_API_BASE_URL in the environment
    `);
  }

  const language = getCookie("language");

  const axiosClient = axios.create({
    /**
     * @description
     * The base URL of the API.
     * If not provided, the value of the `REACT_APP_API_BASE_URL` environment variable is used.
     */
    baseURL: new URL(apiUrl).toString(),
    /**
     * @description
     * Whether to send cookies with the request.
     * If set to `true`, the `Cookie` header is sent with the request.
     * If set to `false`, the `Cookie` header is not sent.
     */
    withCredentials: false,
    /**
     * @description
     * The headers to be sent with the request.
     * If a language is provided, it is added to the `Accept-Language` header.
     */
    headers: language ? { "Accept-Language": language } : {},
    ...axiosConfig,
  });

  /**
   * @description
   * Middleware for the response.
   * If the response is successful, the data is modified using the `mediaModifier` function.
   * The modified response is then returned.
   */
  axiosClient.interceptors.response.use((res) => {
    let newResponse;

    if (res) newResponse = mediaModifier(res.data);
    const result = { ...res, data: newResponse || res.data };

    return result;
  });

  if (!token) return axiosClient;

  /**
   * @description
   * Middleware for the request.
   * If a token is provided, it is added to the `Authorization` header of the request.
   * The modified request is then returned.
   */
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
